import '@lumina/env'

import { dbQueryDurationSeconds } from '@lumina/observability'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import pg from 'pg'

export { Prisma } from '@prisma/client'
export type { Profile, User, Visibility } from '@prisma/client'

const isTest = process.env.NODE_ENV === 'test' || Boolean(process.env.VITEST)

const connectionString = isTest
  ? (process.env.DATABASE_URL_TEST || 'postgresql://lumina_user:lumina_password@localhost:5432/lumina_test')
  : (process.env.DATABASE_URL_DEV || 'postgresql://lumina_user:lumina_password@localhost:5432/lumina_dev')

const pool = new pg.Pool({
  connectionString,
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
