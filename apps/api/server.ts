import '@lumina/env'
import { createApp } from './app.ts'
import { startCronJobs } from './cron/index.ts'
import { logger } from '@lumina/observability'

const app = createApp()
const PORT = process.env.SERVER_PORT

const runWorkers = process.env.RUN_WORKERS === 'true'
const runScheduler = process.env.RUN_SCHEDULER === 'true'

if (runWorkers) {
  await import('../../workers/leetcode/src/index.ts')
}

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
  if (runScheduler) {
    startCronJobs().catch((error) => {
      logger.error('[cron] Failed to start cron jobs', { metadata: { error: String(error) } })
    })
  }
})
