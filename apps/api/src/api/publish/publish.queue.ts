import { redis } from '../../../config/config.redis'
import { Queue } from 'bullmq'

export interface PublishPostJob {
  postId: string
  scheduleVersion: number
}

export const publishingQueue = new Queue<PublishPostJob>('lumina-publishing', {
  connection: redis,
  defaultJobOptions: {
    attempts: 5,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: {
      age: 86400,
    },
    removeOnFail: {
      age: 604800,
    },
  },
})

export const publishJobId = (postId: string, scheduleVersion: number) =>
  `publish-${postId}-v${scheduleVersion}`

export async function enqueuePublishPost(postId: string, scheduleVersion: number, scheduledAt: Date) {
  return publishingQueue.add(
    'publish-post',
    { postId, scheduleVersion },
    {
      jobId: publishJobId(postId, scheduleVersion),
      delay: Math.max(0, scheduledAt.getTime() - Date.now()),
    }
  )
}

export async function removePublishPost(postId: string, scheduleVersion: number) {
  const job = await publishingQueue.getJob(publishJobId(postId, scheduleVersion))
  await job?.remove()
}
