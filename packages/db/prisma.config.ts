import '@lumina/env'

import { defineConfig } from 'prisma/config'

const databaseUrl = process.env.DATABASE_URL || 'postgresql://dummy:dummy@localhost:5432/lumina'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: databaseUrl,
  },
})
