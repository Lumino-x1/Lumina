import { enqueueProfileSync } from '../config/leetcode.queue'
import * as syncRepository from '../modules/leetcode/leetcode.sync.repo'

const STALE_SYNC_MS = 24 * 60 * 60 * 1000
const DAILY_SYNC_STAGGER_MS = 3000

export async function runLeetcodeDailySync() {
  const staleBefore = new Date(Date.now() - STALE_SYNC_MS)
  const profiles = await syncRepository.findStaleProfiles(staleBefore)

  console.log(`[leetcode-cron] Daily sync scheduling ${profiles.length} profiles`)

  for (let index = 0; index < profiles.length; index++) {
    await enqueueProfileSync(profiles[index]?.id as string, {
      delay: index * DAILY_SYNC_STAGGER_MS,
    })
  }

  return { scheduled: profiles.length }
}
