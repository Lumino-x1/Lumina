// @ts-nocheck
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))

export default {
  root: '..',
  envDir: repoRoot,
  resolve: {
    alias: [
      { find: '@auth/index', replacement: path.resolve(repoRoot, 'packages/auth/src/index.ts') },
      { find: '@auth', replacement: path.resolve(repoRoot, 'packages/auth/src') },
      {
        find: '@profile',
        replacement: path.resolve(repoRoot, 'apps/api/src/api'),
      },
      {
        find: '@db/client',
        replacement: path.resolve(repoRoot, 'packages/db/src/client.ts'),
      },
      { find: '@db', replacement: path.resolve(repoRoot, 'packages/db/src') },
      { find: '@test', replacement: path.resolve(repoRoot, 'tests') },
    ],
  },
  test: {
    environment: 'node',
    include: [
      'tests/integration/**/*.{test,spec}.{ts,tsx}',
      'tests/unit/**/*.{test,spec}.{ts,tsx}',
    ],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.turbo/**'],
    setupFiles: ['tests/setup.ts'],
    testTimeout: 15000,
    hookTimeout: 30000,
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: 'tests/coverage',
      exclude: ['tests/**/*.d.ts', 'tests/**/*.config.{ts,js}', 'tests/**/helpers/**'],
    },
  },
}
