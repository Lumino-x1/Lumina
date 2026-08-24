import IORedis from 'ioredis'

import 'dotenv/config'

if (!process.env.REDIS_URL) {
  throw new Error('REDIS_URL is not set')
}

export const redis = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
})
