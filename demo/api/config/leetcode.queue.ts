import { redis } from './config.redis'
import { getCorrelationContext } from '@lumina/observability'
import { Queue } from 'bullmq'

export const LEETCODE_QUEUE_NAME = 'leetcode-sync'
export const LEETCODE_JOB_SYNC_PROFILE = 'sync-profile'
export const LEETCODE_JOB_DAILY_SYNC = 'daily-sync'

export const leetcodeQueue = new Queue(LEETCODE_QUEUE_NAME, {
  connection: redis,
})

const defaultJobOptions = {
  attempts: 3,
  backoff: {
    type: 'exponential' as const,
    delay: 10000,
  },
  removeOnComplete: true,
  removeOnFail: false,
}

export async function enqueueProfileSync(
  profileId: string,
  options?: { delay?: number; priority?: number }
) {
  const correlation = getCorrelationContext()
  return leetcodeQueue.add(
    LEETCODE_JOB_SYNC_PROFILE,
    {
      profileId,
      request_id: correlation?.requestId,
      trace_id: correlation?.traceId,
    },
    {
      ...defaultJobOptions,
      delay: options?.delay,
      priority: options?.priority,
      jobId: `sync-profile:${profileId}:${Date.now()}`,
    }
  )
}

export async function enqueueDailySync() {
  const correlation = getCorrelationContext()
  return leetcodeQueue.add(
    LEETCODE_JOB_DAILY_SYNC,
    {
      request_id: correlation?.requestId,
      trace_id: correlation?.traceId,
    },
    {
      ...defaultJobOptions,
      jobId: `daily-sync:${new Date().toISOString().slice(0, 10)}`,
    }
  )
}
