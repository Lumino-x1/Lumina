# AGENTS.md

Guidance for coding agents working in this monorepo.

## Layout

```text
apps/
  api/          Express API (modules: chat, clubs, friends, leaderboard, leetcode, posts, profile, video)
  web/          Vite product UI
  admin/        Internal console (stub)
  docs/         Docs app (stub)
  storybook/    Design-system explorer (stub)
packages/
  db/           Prisma (@lumina/db)
  auth/         Better Auth (@lumina/auth)
  env/          Env loading (@lumina/env)
  storage/      S3 uploads (@lumina/storage)
  contracts/    Shared types (@lumina/contracts)
  constants/    Shared constants
  design-system/ UI primitives
  shared/       Cross-cutting helpers
  validators/   Validation schemas
  observability/ Logging & Metrics (@lumina/observability)
  kv/           Cache layer (@lumina/kv)
  transactional/ Emails
  realtime/     Notifications
  sdk/          Public SDK (stub)
  analytics/    Analytics (stub)
  api-client/   HTTP client (stub)
tooling/        Shared eslint / tsconfig / prettier
infra/          Docker + CI stubs
workers/        Background workers (leetcode)
internal/       Internal scripts (seed, smoke-test, check-openapi)
tests/          Integration + unit tests
```

## Engineering Workflow Standards (Non-Negotiable)

- **Linear Source of Truth**: All tasks reference Linear IDs in format `LUMINA-###`.
- **Git Branch Naming**: `feature/LUMINA-###-description`, `fix/LUMINA-###-description`, `chore/LUMINA-###-description`,
  `refactor/LUMINA-###-description`. Never work or push directly to `main`.
- **PR Title Format**: `type(scope): description [LUMINA-###]` (e.g.
  `feat(video): implement Stream token service [LUMINA-142]`).
- **Conventional Commits**: Always format commit messages with standard type prefixes (`feat:`, `fix:`, `refactor:`,
  `docs:`, `test:`, `chore:`, `ci:`, `build:`).
- **Mandatory Pre-PR Checks**: Always run `bun test`, `bun run lint`, `bun run check-types`, `bun run check-openapi`,
  `bun run --filter api build`, and `bun run --filter web build` before requesting review.
- **OpenAPI Policy (ADR-005)**: Any change to API endpoints MUST update `docs/api/openapi.yaml` in the same PR.
- **Package Conventions**: Package names are `@lumina/*` (never `@repo/*`).
- **API Architecture**: API domain code lives under `apps/api/modules/<domain>/` with `*.handler.ts`, `*.service.ts`,
  `*.repo.ts`, `*.router.ts`.
- **Runtime**: Prefer Bun for scripts and local runs (`bun run <script>`).
- **Minimal Stubs**: Do not invent product behavior in stub packages — keep stubs minimal until wired.
