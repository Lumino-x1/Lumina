import { execFileSync } from 'node:child_process'
import { URL } from 'node:url'
import { prisma } from '@db/client'

const schemaPath = new URL('../../../packages/db/prisma/schema.prisma', import.meta.url).pathname
const databasePackagePath = new URL('../../../packages/db/', import.meta.url).pathname

let testDatabaseUrl = process.env.TEST_DATABASE_URL

export function setTestDatabaseUrl() {
  if (!testDatabaseUrl) {
    throw new Error('TEST_DATABASE_URL is required to run integration tests.')
  }

  const workerId = process.env.VITEST_WORKER_ID ?? '1'
  const schema = `lumina_test_${workerId}`
  const url = new URL(testDatabaseUrl)
  url.searchParams.set('schema', schema)
  testDatabaseUrl = url.toString()
  process.env.DATABASE_URL = testDatabaseUrl
  return testDatabaseUrl
}

export function getTestDatabaseUrl() {
  if (!testDatabaseUrl) {
    return setTestDatabaseUrl()
  }

  return testDatabaseUrl
}

export async function prepareTestDatabase() {
  const databaseUrl = getTestDatabaseUrl()

  execFileSync('bun', ['x', 'prisma', 'db', 'push', '--schema', schemaPath, '--skip-generate'], {
    cwd: databasePackagePath,
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
    },
    stdio: 'pipe',
    shell: true,
  })
}

export async function connectTestDatabase() {
  await prisma.$connect()
}

export async function disconnectTestDatabase() {
  await prisma.$disconnect()
}

export async function clearDatabase() {
  const schemaResult = await prisma.$queryRaw<Array<{ schema_name: string }>>`
    SELECT current_schema()::text AS schema_name
  `
  const schemaName = schemaResult[0]?.schema_name

  if (!schemaName) {
    return
  }

  const tables = await prisma.$queryRaw<Array<{ table_name: string }>>`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = ${schemaName}
      AND table_type = 'BASE TABLE'
      AND table_name <> '_prisma_migrations'
    ORDER BY table_name
  `

  if (tables.length === 0) {
    return
  }

  const qualifiedTables = tables.map((table) => `"${schemaName}"."${table.table_name}"`).join(', ')

  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${qualifiedTables} RESTART IDENTITY CASCADE;`)
}
