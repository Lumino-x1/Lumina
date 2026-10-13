import { execFileSync } from 'node:child_process'
import { fileURLToPath, URL } from 'node:url'
import { prisma } from '@db/client'

const schemaPath = fileURLToPath(
  new URL('../../../packages/db/prisma/schema.prisma', import.meta.url)
)
const databasePackagePath = fileURLToPath(new URL('../../../packages/db/', import.meta.url))

let testDatabaseUrl = process.env.TEST_DATABASE_URL

export function setTestDatabaseUrl() {
  testDatabaseUrl = process.env.TEST_DATABASE_URL || process.env.DATABASE_URL
  if (!testDatabaseUrl) {
    throw new Error('TEST_DATABASE_URL is required to run integration tests.')
  }
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
  if (process.env.SKIP_DB_PUSH === 'true') {
    return
  }
  const databaseUrl = getTestDatabaseUrl()

  const execPath = process.platform === 'win32' ? `"${process.execPath}"` : process.execPath
  const shellCmd =
    process.platform === 'win32' ? process.env.ComSpec || 'C:\\Windows\\System32\\cmd.exe' : false

  execFileSync(
    execPath,
    ['x', 'prisma', 'db', 'push', '--schema', schemaPath, '--accept-data-loss'],
    {
      cwd: databasePackagePath,
      env: {
        ...process.env,
        DATABASE_URL: databaseUrl,
        PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION: 'go on and complete alll',
      },
      stdio: 'pipe',
      shell: shellCmd,
    }
  )
}

export async function connectTestDatabase() {
  await prisma.$connect()
}

export async function disconnectTestDatabase() {
  await prisma.$disconnect()
}

export async function clearDatabase() {
  const targetDb = process.env.DATABASE_URL || ''
  // Safety guard: NEVER truncate the development database!
  if (targetDb.includes('lumina_dev') && !targetDb.includes('lumina_test')) {
    console.warn(
      '[SAFETY GUARD] Prevented clearDatabase() from truncating lumina_dev! Tests must use an isolated test database.'
    )
    return
  }

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
