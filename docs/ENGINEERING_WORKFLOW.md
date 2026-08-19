# Lumina Development Workflow & Engineering Standards

> **Required reading for the entire Lumina engineering team.** This policy applies to everyone who ships code in the
> Lumina monorepo.

---

## Workflow Overview

```text
Linear Issue ──► In Progress ──► Git Branch ──► Implementation ──► Local Testing
                                                                       │
Linear Done ◄── PR Merged ◄── Approved ◄── In Review ◄── CI Pass ◄── GitHub PR
```

**Linear is the source of truth for work.** **GitHub is the source of truth for code.** **CI is the automated quality
gate.**

---

## 1. Linear Issue Management

- Team key: **`LUMINA`** (Issue IDs look like `LUMINA-142`).
- Always include `LUMINA-###` in branch names and PR titles for automatic GitHub ↔ Linear linkage.
- Every development task must originate from a Linear issue containing:
  - Objective & Context
  - Requirements & Acceptance Criteria
  - Dependencies & Priority
  - Definition of Done

---

## 2. Issue Status Workflow

Standard status path: `Backlog` ──► `Todo` ──► `In Progress` ──► `In Review` ──► `Done`

- **Todo**: Task is ready but development has not started.
- **In Progress**: Developer is actively implementing the issue.
- **In Review**: Implementation complete, PR created, CI checks passing.
- **Done**: Set ONLY after the Pull Request has been approved and merged into `main`. Never set `Done` early.

---

## 3. Git Branching Rules

- **NEVER push directly to `main`.**
- **NEVER develop directly on `main`.**
- Standard branch format containing the Linear issue ID:
  - `feature/LUMINA-###-feature-name`
  - `fix/LUMINA-###-bug-name`
  - `refactor/LUMINA-###-refactor-name`
  - `docs/LUMINA-###-documentation`
  - `chore/LUMINA-###-maintenance`
  - `hotfix/LUMINA-###-critical-fix`

_Example:_ `feature/LUMINA-142-stream-token-service`

---

## 4. Pre-PR Local Checks

Run the required monorepo checks locally before pushing and opening a PR:

```bash
bun test                    # Integration & unit tests
bun run lint                # Linter checks (ESLint / Oxlint)
bun run check-types         # TypeScript strict typecheck
bun run check-openapi       # OpenAPI 3.x spec & contract check
bun run --filter api build  # API production bundle check
bun run --filter web build  # Web Vite production build check
```

---

## 5. GitHub Pull Request Standards

- **Title Format**: `type(scope): short description [LUMINA-###]`
  - _Example:_ `feat(video): implement Stream video token service [LUMINA-142]`
- Use `.github/pull_request_template.md` for PR body:
  - What changed?
  - Why was it required?
  - Implementation details
  - Testing performed
  - Potential risks & breaking changes
  - Related Linear issue
- PRs must remain focused on a single Linear issue. Do not mix unrelated work into a single PR.

---

## 6. Automated CI Quality Gates

Every PR must pass all required GitHub Actions CI checks before merging:

1. `bun install --frozen-lockfile`
2. `bun run format:check` (Prettier code formatting)
3. `bun run lint` (ESLint & Oxlint)
4. `bun run check-types` (TypeScript strict mode)
5. `bun run check-openapi` (OpenAPI spec & route coverage verification)
6. `bun run --filter api build` & `bun run --filter web build` (Production app builds)
7. Container Vulnerability Scanning (Trivy Docker security scan)

---

## 7. Code Review & Tech Lead Approval Gate

- Developers must not merge their own P0/P1 Pull Requests without explicit authorization from the Tech Lead.
- Designated reviewers evaluate: Architecture, Correctness, Security, Performance, Maintainability, Testing, Error
  Handling, API Design, and Observability.
- Once approved and merged, GitHub ↔ Linear automation moves the issue to `Done`.

---

## 8. Conventional Commits Requirement

Commits must follow the Conventional Commits specification:

- `feat:` — A new feature
- `fix:` — A bug fix
- `refactor:` — Code restructuring (no logic change)
- `docs:` — Documentation changes
- `test:` — Adding or updating tests
- `chore:` — Maintenance, tooling, or dependency updates
- `perf:` — Performance improvements
- `build:` — Build system changes
- `ci:` — CI/CD workflow updates

_Forbidden commit messages:_ `final`, `changes`, `updated`, `working`, `done`, `fix`, `test`.

---

## 9. Non-Negotiable Lumina Principles

1. Never push directly to `main`.
2. Every major task must have a Linear issue (`LUMINA-###`).
3. Every implementation must use a dedicated branch format (`feature/LUMINA-###-...`).
4. Every feature must have appropriate integration or unit tests.
5. Every implementation must pass through a GitHub Pull Request.
6. All required CI checks must pass before merging.
7. Never commit secrets, production credentials, or `.env` files.
8. Never mark an issue `Done` before the PR is merged.
9. Do not mix unrelated features in one PR.
10. Ask for clarification from the Tech Lead when requirements are ambiguous.
