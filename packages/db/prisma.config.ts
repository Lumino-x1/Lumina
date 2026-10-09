import '@lumina/env'

import { defineConfig } from 'prisma/config'

const databaseUrl =
  'postgresql://lumina_user:lumina_password@localhost:5432/lumina_dev'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: databaseUrl,
  },
})
