import '@lumina/env'

import { logger } from '@lumina/observability'

import { dispatchPublishOutbox, reconcileOverduePublishedPosts } from './src/api/publish/publish.outbox'
import { closePublishingWorker } from './src/api/publish/publish.worker'

await dispatchPublishOutbox()
await reconcileOverduePublishedPosts()

const interval = setInterval(() => {
  Promise.all([dispatchPublishOutbox(), reconcileOverduePublishedPosts()]).catch((error) => {
    logger.error('Publishing recovery pass failed', { metadata: { error: String(error) } })
  })
}, Number(process.env.PUBLISHING_RECOVERY_INTERVAL_MS ?? 60_000))

async function shutdown() {
  clearInterval(interval)
  await closePublishingWorker()
  process.exit(0)
}

process.once('SIGINT', shutdown)
process.once('SIGTERM', shutdown)
