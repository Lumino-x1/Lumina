import { Worker } from 'bullmq'
import { prisma } from '@lumina/db'
import { logger } from '@lumina/observability'

import { redis } from '../../../config/config.redis'
import { PostsRepo } from '../posts/posts.repo'
import { enqueuePublishPost, publishingQueue, type PublishPostJob } from './publish.queue'

export type ProcessJobResult =
  | { status: 'published'; postId: string; scheduleVersion: number }
  | { status: 'skipped'; reason: string; postId?: string; scheduleVersion?: number }
  | { status: 'delayed'; delayMs: number; postId: string; scheduleVersion: number }

/**
 * Executes the 15-step scheduled publishing verification and transition workflow.
 * Exported for standalone execution and unit testing without live BullMQ queues.
 */
export async function processPublishPostJob(job: {
  id?: string
  name: string
  data: Partial<PublishPostJob>
}): Promise<ProcessJobResult> {
  if (job.name !== 'publish-post') {
    return { status: 'skipped', reason: 'IGNORED_JOB_NAME' }
  }

  // Step 1: Read postId and scheduleVersion from the job.
  const { postId, scheduleVersion } = job.data
  if (!postId || typeof scheduleVersion !== 'number') {
    logger.warn('Publish job missing required payload fields', {
      metadata: { jobId: job.id, data: job.data },
    })
    return { status: 'skipped', reason: 'INVALID_JOB_PAYLOAD' }
  }

  try {
    // Step 2: Fetch the current post from PostgreSQL.
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        id: true,
        status: true,
        scheduleVersion: true,
        scheduledAt: true,
        authorId: true,
      },
    })

    // Step 3: If the post does not exist, finish safely.
    if (!post) {
      logger.info('Scheduled post does not exist, finishing safely', {
        metadata: { postId, scheduleVersion },
      })
      return { status: 'skipped', reason: 'POST_NOT_FOUND', postId, scheduleVersion }
    }

    // Step 4: If the post is no longer SCHEDULED, finish safely.
    if (post.status !== 'SCHEDULED') {
      logger.info('Post is no longer SCHEDULED, finishing safely', {
        metadata: { postId, currentStatus: post.status, scheduleVersion },
      })
      return { status: 'skipped', reason: 'POST_NOT_SCHEDULED', postId, scheduleVersion }
    }

    // Step 5: If the stored scheduleVersion differs from the job's version, treat as stale and finish without publishing.
    if (post.scheduleVersion !== scheduleVersion) {
      logger.info('Stale schedule job version detected, finishing without publishing', {
        metadata: {
          postId,
          jobVersion: scheduleVersion,
          currentVersion: post.scheduleVersion,
        },
      })
      return { status: 'skipped', reason: 'STALE_VERSION', postId, scheduleVersion }
    }

    // Step 6: If scheduledAt is missing, finish safely.
    if (!post.scheduledAt) {
      logger.warn('Scheduled post missing scheduledAt timestamp, finishing safely', {
        metadata: { postId, scheduleVersion },
      })
      return { status: 'skipped', reason: 'MISSING_SCHEDULED_AT', postId, scheduleVersion }
    }

    // Step 7: If scheduledAt is still in the future, reschedule or retry safely.
    const now = Date.now()
    const scheduledTime = post.scheduledAt.getTime()
    if (scheduledTime > now + 1000) {
      const delayMs = scheduledTime - now
      logger.info('Post scheduled time is still in the future, re-enqueuing delayed job', {
        metadata: { postId, scheduleVersion, delayMs },
      })
      await enqueuePublishPost(postId, scheduleVersion, post.scheduledAt)
      return { status: 'delayed', delayMs, postId, scheduleVersion }
    }

    // Step 8 & 9: Atomically claim the post for publication using a conditional database update.
    // Ensure concurrent worker executions cannot publish the same post twice.
    // Step 10 & 11: Set status to PUBLISHED, set publishedAt, and clear scheduledAt.
    const published = await PostsRepo.publishScheduledPost(postId, scheduleVersion)
    if (!published) {
      logger.info('Post claim failed (concurrent worker already published or modified), skipping', {
        metadata: { postId, scheduleVersion },
      })
      return { status: 'skipped', reason: 'CONCURRENT_CLAIM_LOST', postId, scheduleVersion }
    }

    // Step 12: Execute necessary publishing side effects safely.

    // Step 13: Log success using the existing logging system.
    logger.info('Scheduled post published successfully', {
      metadata: { postId, scheduleVersion },
    })

    return { status: 'published', postId, scheduleVersion }
  } catch (error) {
    // Step 14: Do not crash the worker because one job fails.
    // Step 15: Make retrying a job safe and idempotent.
    logger.error('Error during scheduled publishing job execution', {
      metadata: { postId, scheduleVersion, error: String(error) },
    })
    throw error
  }
}

export const publishingWorker = new Worker(
  'lumina-publishing',
  async (job) => {
    await processPublishPostJob(job)
  },
  {
    connection: redis,
    concurrency: Number(process.env.PUBLISHING_WORKER_CONCURRENCY ?? 5),
  }
)

publishingWorker.on('failed', (job, error) => {
  logger.error('Scheduled publishing job failed', {
    metadata: { jobId: job?.id, error: String(error) },
  })
})

export async function closePublishingWorker() {
  await publishingWorker.close()
  await publishingQueue.close()
}
