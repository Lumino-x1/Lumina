import '@lumina/env'

import { dbQueryDurationSeconds } from '@lumina/observability'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import pg from 'pg'

export { Prisma } from '@prisma/client'
export type { Profile, User, Visibility } from '@prisma/client'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)

export const prisma = new PrismaClient({
  adapter,
}).$extends({
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        const start = Date.now()
        try {
          return await query(args)
        } finally {
          const durationSec = (Date.now() - start) / 1000
          dbQueryDurationSeconds.observe(
            { model: model || 'unknown', action: operation },
            durationSec
          )
        }
      },
    },
  },
}) as unknown as PrismaClient
