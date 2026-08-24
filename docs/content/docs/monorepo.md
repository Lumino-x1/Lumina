# Monorepo layout

Lumina uses a Better Auth–style pnpm workspace.

- Libraries: `packages/` (`@lumina/core`, unscoped `lumina`, plugins, adapters, CLI)
- Docs site: `docs/` with markdown in `docs/content/docs/`
- Example apps: `demo/`
- Shared unit tests: `test/`
- End-to-end suites: `e2e/smoke`, `e2e/integration`, `e2e/adapter`

Install with `pnpm install`. Build libraries with `pnpm build`. Typecheck with `pnpm typecheck`.

Run a focused unit test:

```sh
vitest packages/core/test/constants.test.ts -t constants
```

Root `pnpm test` orchestrates package tests via Turbo; it is not the only way to run tests.
