# Release & Versioning Policy

Lumina enforces Semantic Versioning (`MAJOR.MINOR.PATCH`) and Conventional Commits for all production releases.

---

## 1. Semantic Versioning Rules

- **MAJOR (`v1.0.0` -> `v2.0.0`)**: Incompatible API schema or breaking system architectural changes.
- **MINOR (`v1.0.0` -> `v1.1.0`)**: Backward-compatible new features and domain module additions.
- **PATCH (`v1.0.0` -> `v1.0.1`)**: Backward-compatible bug fixes, security patches, and minor refactoring.

---

## 2. Release Tagging Procedure

1. Verify that all CI quality checks (`pnpm format:check`, `pnpm lint`, `pnpm typecheck`) pass on `main`.
2. Update [`CHANGELOG.md`](../CHANGELOG.md) with notable release changes.
3. Create and push a signed annotated Git tag:
   ```bash
   git tag -a v1.0.0 -m "Release v1.0.0 - Production Engineering Foundation"
   git push origin v1.0.0
   ```

---

## 3. Automated CD Release Trigger

Pushing a `v*` tag automatically triggers the CD Pipeline ([`.github/workflows/cd.yml`](../.github/workflows/cd.yml)):

1. Runs Code Verification (`format:check`, `lint`, `check-types`).
2. Builds & Scans production Docker images with Trivy.
3. Deploys to Staging & applies database migrations (`prisma migrate deploy`).
4. Executes automated smoke tests (`bun packages/cli/src/smoke-test.ts`).
5. Awaits production deployment approval & executes ECS Fargate service update.
