import { prisma } from '@lumina/db'
import { logger } from '@lumina/observability'

import { enqueuePublishPost, publishingQueue } from './publish.queue'

const BATCH_SIZE = 100

/** Delivers committed schedule changes to BullMQ. Safe to call from API, worker, or a singleton scheduler. */
export async function dispatchPublishOutbox(limit = BATCH_SIZE) {
  const events = await prisma.publishOutboxEvent.findMany({
    where: { processedAt: null },
    orderBy: { createdAt: 'asc' },
    take: limit,
  })

  for (const event of events) {
    try {
      const post = await prisma.post.findUnique({
        where: { id: event.postId },
        select: { status: true, scheduleVersion: true, scheduledAt: true },
      })
      if (post?.status === 'SCHEDULED' && post.scheduleVersion === event.scheduleVersion && post.scheduledAt) {
        await enqueuePublishPost(event.postId, event.scheduleVersion, post.scheduledAt)
      }
      await prisma.publishOutboxEvent.update({
        where: { id: event.id },
        data: { processedAt: new Date(), attempts: { increment: 1 }, lastError: null },
      })
    } catch (error) {
      logger.error('Failed to dispatch publishing outbox event', {
        metadata: { eventId: event.id, error: String(error) },
      })
      await prisma.publishOutboxEvent.update({
        where: { id: event.id },
        data: { attempts: { increment: 1 }, lastError: String(error).slice(0, 1000) },
      }).catch(() => undefined)
    }
  }
  return events.length
}

/** Re-enqueues overdue schedules after Redis outages or process restarts. */
export async function reconcileOverduePublishedPosts(limit = BATCH_SIZE) {
  const posts = await prisma.post.findMany({
    where: { status: 'SCHEDULED', scheduledAt: { lte: new Date() } },
    select: { id: true, scheduleVersion: true, scheduledAt: true },
    orderBy: { scheduledAt: 'asc' },
    take: limit,
  })
  for (const post of posts) {
    if (!post.scheduledAt) continue
    // A prematurely completed/failed job may retain the deterministic ID. It
    // is safe to remove only terminal jobs before recreating it; active and
    // delayed jobs are left alone.
    const job = await publishingQueue.getJob(`publish-${post.id}-v${post.scheduleVersion}`)
    if (job) {
      const state = await job.getState()
      if (state === 'completed' || state === 'failed') await job.remove()
      else continue
    }
    await enqueuePublishPost(post.id, post.scheduleVersion, post.scheduledAt)
  }
  return posts.length
}
