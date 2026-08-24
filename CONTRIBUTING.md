# Contributing to Lumina

First off — **thank you** for considering contributing to Lumina! Every contribution, no matter how small, makes a real
difference. This document will guide you through everything you need to know to make a great contribution.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Branching Strategy](#branching-strategy)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)
- [OpenAPI Specification Policy](#openapi-specification-policy-adr-005)

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before
contributing. We are committed to providing a welcoming and inclusive environment for everyone.

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating a bug report, please check the [existing issues](https://github.com/luminohq/lumina/issues) to see if
the problem has already been reported.

When filing a bug report, include:

- A clear and descriptive title
- Exact steps to reproduce the problem
- What you expected to happen vs. what actually happened
- Screenshots or screen recordings if applicable
- Your environment details (OS, Node version, Bun version, browser)
- Any relevant log output

### 💡 Suggesting Features

Feature requests are welcome! Please open a [GitHub Discussion](https://github.com/luminohq/lumina/discussions) in the
"Ideas" category. Describe:

- The problem your feature would solve
- Your proposed solution
- Any alternative solutions you've considered
- Why this feature would benefit most Lumina users

### 🛠️ Submitting Code

We welcome all types of code contributions:

- **Bug fixes** — always welcome!
- **New features** — please open a discussion first for significant changes
- **Performance improvements** — with benchmarks
- **Documentation improvements** — typos, clarifications, examples
- **Test coverage** — more tests are always better
- **Refactoring** — with clear justification

---

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repo via GitHub UI, then:
git clone https://github.com/<your-username>/lumina.git
cd lumina

# Add the upstream remote
git remote add upstream https://github.com/luminohq/lumina.git
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Set Up Environment

```bash
cp .env.example .env
# Edit .env with your local values
```

### 4. Start Development

```bash
bun run dev
```

---

## Branching Strategy

| Branch            | Purpose                                       |
| ----------------- | --------------------------------------------- |
| `main`            | Production-ready code. All PRs merge here.    |
| `feature/<name>`  | New features                                  |
| `fix/<name>`      | Bug fixes                                     |
| `docs/<name>`     | Documentation-only changes                    |
| `chore/<name>`    | Build process, dependency, or tooling changes |
| `refactor/<name>` | Code refactoring                              |
| `hotfix/<name>`   | Urgent production fix                         |

Always branch from the latest `main`:

```bash
git checkout main
git pull upstream main
git checkout -b feature/my-amazing-feature
```

---

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/). Your commits **must** follow this format:

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

### Types

| Type       | When to use                                  |
| ---------- | -------------------------------------------- |
| `feat`     | A new feature                                |
| `fix`      | A bug fix                                    |
| `docs`     | Documentation changes only                   |
| `style`    | Code formatting (no logic change)            |
| `refactor` | Code restructuring (no feature/bug)          |
| `test`     | Adding or fixing tests                       |
| `chore`    | Build, CI, or dependency updates             |
| `perf`     | Performance improvements                     |
| `build`    | Build-system or external dependency changes  |
| `ci`       | Continuous-integration or deployment changes |

### Scopes

Use the package or app name: `auth`, `dashboard`, `web`, `database`, `ui`, `emails`, `storage`, `cache`, `logger`,
`utils`, `validation`, `types`, `notifications`, `config`.

### Examples

```
feat(dashboard): add real-time WebSocket chart updates
fix(auth): handle token expiry race condition
docs(readme): add Docker deployment guide
chore(deps): upgrade Prisma to 7.9.1
test(utils): add unit tests for date formatters
perf(cache): implement Redis pipeline batching
build: upgrade the production image
ci: add pull request checks
```

---

## Pull Request Process

1. **Keep PRs focused** — one feature or fix per PR
2. **Update documentation** if your change affects the public API or user experience
3. **Update OpenAPI specification** (`docs/api/openapi.yaml`) whenever API endpoints change (see
   [ADR-005](docs/architecture/decisions/ADR-005-openapi-contract-and-api-versioning.md))
4. **Add or update tests** — aim for coverage on new code
5. **Pass all CI checks** — linting, type checking, OpenAPI checks, and tests must be green
6. **Request a review** from at least one maintainer
7. **Respond to feedback** promptly and respectfully

### PR Title Format

Follow the same Conventional Commits format for your PR title:

```
feat(auth): add WebAuthn passkey support
```

### PR Description Template

```markdown
## What does this PR do?

<!-- Brief description of your changes -->

## Why is this change needed?

<!-- Context and motivation -->

## How was this tested?

<!-- Testing approach and coverage -->

## Screenshots / recordings (if applicable)

<!-- UI changes should include before/after screenshots -->

## Related issues

<!-- Fixes #123 -->
```

---

## Coding Standards

### TypeScript

- **Strict mode** is enabled everywhere. No `any` types unless absolutely unavoidable (add a `// eslint-disable` comment
  with justification).
- Prefer `interface` over `type` for object shapes.
- Always add return types to exported functions.
- Use Zod schemas for all runtime validation at API boundaries.

### React

- Use **functional components** only — no class components.
- Prefer **named exports** over default exports for components.
- Keep components small and focused. If a component exceeds ~200 lines, consider splitting it.
- Co-locate CSS files with their component files.
- Use CSS Custom Properties for all design tokens, never hard-code values.

### File Naming

| Type             | Convention                      | Example           |
| ---------------- | ------------------------------- | ----------------- |
| React components | PascalCase                      | `UserProfile.tsx` |
| Hooks            | camelCase with `use` prefix     | `useUserData.ts`  |
| Utilities        | camelCase                       | `formatDate.ts`   |
| Constants        | SCREAMING_SNAKE_CASE            | `MAX_RETRY_COUNT` |
| CSS files        | PascalCase (matching component) | `UserProfile.css` |

### Code Formatting

We use Prettier with the config in `.prettierrc`. Run `bun run format` before committing. The CI will fail if formatting
is not applied.

---

## Testing Requirements

- **New features** must include unit tests covering the happy path and key edge cases.
- **Bug fixes** must include a regression test that would have caught the original bug.
- **Utilities** must have comprehensive unit tests with edge cases.
- **API endpoints** must have integration tests.
- **UI components** in `@lumina/ui` should have visual regression tests.

Run tests locally before submitting:

```bash
bun run test                    # All unit tests
bun run test:e2e                # E2E tests
bun run test:coverage           # Coverage report
```

Aim for **>80% code coverage** on new code.

---

## Documentation

- **Code comments**: Document non-obvious logic with `//` comments. For complex algorithms, add a comment block
  explaining the approach.
- **JSDoc**: Add JSDoc comments to all exported functions, types, and classes.
- **README updates**: If your change affects the getting-started flow or introduces new configuration, update the root
  README.
- **Changelog**: Do **not** manually edit `CHANGELOG.md`. It is auto-generated by our semantic-release pipeline.

---

## OpenAPI Specification Policy (ADR-005)

In accordance with [ADR-005](docs/architecture/decisions/ADR-005-openapi-contract-and-api-versioning.md), any Pull
Request that adds, modifies, or deprecates Express API endpoints **must update
[`docs/api/openapi.yaml`](docs/api/openapi.yaml) in the same PR**.

Automated CI checks (`bun run check-openapi`) enforce that:

1. `docs/api/openapi.yaml` exists and parses as valid OpenAPI 3.x.
2. All mounted Express API routes (`/api/profile`, `/api/friends`, `/api/posts`, `/api/leaderboard`, `/api/video/*`) are
   documented in the specification paths inventory.

PRs with stale or missing OpenAPI declarations will fail CI.

---

## Questions?

If you are stuck or unsure about something, do not hesitate to:

- Open a [GitHub Discussion](https://github.com/luminohq/lumina/discussions)
- Ask in our [Discord community](https://discord.gg/lumina) in the `#contributors` channel
- Email the maintainers at **hello@luminohq.com**

We are here to help. Happy contributing! 🚀
