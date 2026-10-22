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
  : (process.env.DATABASE_URL || process.env.DATABASE_URL_DEV || 'postgresql://lumina_user:lumina_password@localhost:5432/lumina_dev')

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
  pool?: pg.Pool
}

const pool =
  globalForPrisma.pool ??
  new pg.Pool({
    connectionString,
    max: process.env.DB_POOL_MAX ? Number(process.env.DB_POOL_MAX) : 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 15000,
    keepAlive: true,
    keepAliveInitialDelayMillis: 10000,
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.pool = pool
}

const adapter = new PrismaPg(pool)

function createPrismaClient() {
  return new PrismaClient({
    adapter,
  }).$extends({
    query: {
      $allModels: {
        async $allOperations({
          model,
          operation,
          args,
          query,
        }: {
          model?: string
          operation: string
          args: any
          query: (args: any) => Promise<any>
        }) {
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
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

