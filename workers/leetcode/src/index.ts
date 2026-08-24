import { redis } from '../../../apps/api/config/config.redis'
import {
  LEETCODE_JOB_DAILY_SYNC,
  LEETCODE_JOB_SYNC_PROFILE,
  LEETCODE_QUEUE_NAME,
} from '../../../apps/api/config/leetcode.queue'
import { syncProfileById } from '../../../apps/api/src/api/service'
import { runLeetcodeDailySync } from '../../../apps/api/cron/leetcode.daily-sync.job'
import {
  backgroundJobFailuresTotal,
  generateCorrelationContext,
  logger,
  runWithCorrelation,
} from '@lumina/observability'
import { Worker } from 'bullmq'

export const leetcodeWorker = new Worker(
  LEETCODE_QUEUE_NAME,
  async (job) => {
    const jobData = job.data as { profileId?: string; request_id?: string; trace_id?: string }
    const correlation = generateCorrelationContext(jobData?.request_id, jobData?.trace_id)

    return runWithCorrelation(correlation, async () => {
      logger.info(`[leetcode-worker] Processing job ${job.name}`, {
        request_id: correlation.requestId,
        trace_id: correlation.traceId,
        metadata: { jobId: job.id, jobName: job.name },
      })

      if (job.name === LEETCODE_JOB_DAILY_SYNC) {
        return runLeetcodeDailySync()
      }

      if (job.name === LEETCODE_JOB_SYNC_PROFILE) {
        const { profileId } = jobData
        if (!profileId) throw new Error('MISSING_PROFILE_ID')
        return syncProfileById(profileId)
      }

      throw new Error(`UNKNOWN_JOB_TYPE:${job.name}`)
    })
  },
  {
    connection: redis,
    concurrency: 2,
    limiter: {
      max: 10,
      duration: 60_000,
    },
  }
)

leetcodeWorker.on('completed', (job) => {
  logger.info(`[leetcode-worker] Job ${job.id} (${job.name}) completed`, {
    metadata: { jobId: job.id, jobName: job.name },
  })
})

leetcodeWorker.on('failed', (job, error) => {
  backgroundJobFailuresTotal.inc({ job_name: job?.name || 'unknown' })
  logger.error(`[leetcode-worker] Job ${job?.id} (${job?.name}) failed`, {
    metadata: { jobId: job?.id, jobName: job?.name, error: error.message },
  })
})
