import { LEETCODE_JOB_DAILY_SYNC, leetcodeQueue } from '../config/leetcode.queue'

const DAILY_SYNC_CRON = '0 3 * * *'
const DAILY_SYNC_SCHEDULER_ID = 'leetcode-daily-sync'

export async function scheduleLeetcodeDailySync() {
  await leetcodeQueue.upsertJobScheduler(
    DAILY_SYNC_SCHEDULER_ID,
    { pattern: DAILY_SYNC_CRON },
    {
      name: LEETCODE_JOB_DAILY_SYNC,
      data: {},
      opts: {
        removeOnComplete: true,
        removeOnFail: false,
      },
    }
  )

  console.log(`[leetcode-cron] Daily sync scheduled with cron: ${DAILY_SYNC_CRON}`)
}
