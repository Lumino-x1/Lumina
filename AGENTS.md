# AGENTS.md

Guidance for coding agents working in this monorepo.

## Layout

```text
packages/
  core/            Shared types, env, errors, constants, validators (@lumina/core)
  lumina/          Primary published SDK (package name: lumina)
  cli/             Env, seed, OpenAPI, smoke scripts (@lumina/cli)
  auth/            Better Auth plugin (@lumina/auth)
  observability/   Logging and metrics plugin
  analytics/       Analytics plugin (stub)
  realtime/        Notifications plugin (stub)
  transactional/   Email plugin (stub)
  design-system/   UI primitives (not app UI)
  db/              Prisma adapter (@lumina/db)
  storage/         S3 adapter
  kv/              Cache adapter (stub)
  test-utils/      Shared Vitest helpers
docs/              Docs site; markdown lives in docs/content/docs/
demo/              Example apps (api, web, admin, storybook, worker-leetcode)
test/              Cross-package unit tests
e2e/
  smoke/           Workspace smoke tests
  integration/     API integration tests
  adapter/         Database adapter tests
```

## Conventions

- Package manager is **pnpm workspaces** (never npm/yarn/bun as the workspace tool).
- Scoped packages are `@lumina/*`. The main library is unscoped `lumina`.
- Internal dependencies: `workspace:*` (dev) and `workspace:^` (peer).
- Library packages build with **tsdown** (ESM only). Demos are not published.
- `import type` for types. Import Zod as `import * as z from "zod"`.
- Use the `node:` protocol for Node builtins.
- API domain code lives under `demo/api/modules/<domain>/` with `*.handler.ts`, `*.service.ts`, `*.repo.ts`, `*.router.ts`, `*.lib.ts`.
- Do not invent product behavior in stub packages — keep stubs minimal until wired.

## Tests

Packages have their own Vitest config. Do not treat `pnpm test` at the root as the only way to run tests.

Focused run:

```sh
vitest path/to/test -t <pattern>
```

Examples:

```sh
pnpm --filter @lumina/core test
vitest packages/core/test/constants.test.ts -t constants
pnpm e2e:integration
```

## Scripts

- `pnpm build` — turbo build for `packages/*`
- `pnpm dev` — turbo dev for `packages/*`
- `pnpm typecheck` — `tsc --build --force`
- `pnpm lint` — Biome at the repo root
