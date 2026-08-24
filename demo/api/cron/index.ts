import { scheduleLeetcodeDailySync } from './leetcode.scheduler'

export async function startCronJobs() {
  await scheduleLeetcodeDailySync()
}

export { runLeetcodeDailySync } from './leetcode.daily-sync.job'
export { scheduleLeetcodeDailySync } from './leetcode.scheduler'
