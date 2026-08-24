# CLAUDE.md

This repository is a pnpm + Turborepo TypeScript monorepo. Follow `AGENTS.md` for layout and conventions.

- Workspace tool: pnpm only.
- Published libraries live in `packages/` and build with tsdown.
- Product apps live in `demo/`. Documentation lives in `docs/` (content in `docs/content/docs/`).
- Shared unit tests: `test/`. Playwright-style or API integration tests: `e2e/`.
- Prefer `vitest path/to/test -t <pattern>` for focused tests instead of only `pnpm test`.
