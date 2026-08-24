# Changelog

All notable changes to Lumina are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-08-15

### Added

- **Production Engineering Foundation**: Established production-grade Git workflows, branch protection rules,
  Conventional Commits, PR templates, issue templates, and CODEOWNERS.
- **Docker & Container Standardization**: Multi-stage unprivileged Docker builds (`demo/api`, `demo/web`,
  `demo/worker-leetcode`) using `oven/bun:1-alpine`, health check probes (`/ok`, `/health`, `/ready`), and container
  security guidelines in `docs/DOCKER.md`.
- **Security & Vulnerability Automation**: Integrated Trivy container scanning in CI (`.github/workflows/ci.yml`),
  Dependabot (`.github/dependabot.yml`), Dependency Review (`.github/workflows/dependency-review.yml`), and CodeQL
  scanning (`.github/workflows/codeql.yml`).
- **Secret Remediation**: Eliminated hardcoded Redis passwords and GitGuardian alerts across `docker-compose.yml` and
  `infra/docker/docker-compose.yml`.
- **Database Migration Lifecycle**: Enforced `prisma migrate deploy` for non-development environments in
  `docs/DATABASE_MIGRATIONS.md`.
- **OpenAPI 3.1.0 Contract**: Published complete OpenAPI 3.1.0 contract in `docs/api/openapi.yaml` and versioning
  guidelines in `docs/API.md`.
- **Architecture Documentation & ADRs**: Comprehensive 8-domain system architecture guide in
  `docs/architecture/README.md` and ADRs 001–005.
- **Observability & Request Correlation**: Integrated W3C request correlation (`request_id` & `trace_id`), OpenTelemetry
  tracing foundation, and Prometheus metrics telemetry (`GET /metrics`) in `@lumina/observability`.
- **Error Tracking & Health Probes**: Added sanitized Sentry error tracking interface, `/health` liveness probe,
  `/ready` readiness probe, and global error handling.
- **Continuous Deployment Pipeline**: Configured 5-stage CD pipeline in `.github/workflows/cd.yml` with automated smoke
  testing CLI (`packages/cli/src/smoke-test.ts`).
- **Infrastructure as Code (Terraform)**: Modular Terraform infrastructure under `infrastructure/terraform/` covering
  VPC, ECS Fargate, RDS PostgreSQL, ElastiCache Redis, S3, and environment configs (`dev`, `staging`, `production`).
- **Operational Runbooks**: Published incident runbooks under `docs/runbooks/` covering Deployment Rollback, Database
  Outages, Redis Outages, High Latency, High Error Rates, and Production Incidents.

---

## [0.9.0] - 2026-07-15

### Added

- **Real-time WebSocket chart updates** — dashboards now refresh live without page reload
- **Row-Level Security (RLS)** — dynamic data filtering based on authenticated user context
- **Dashboard version history** — full diff view with one-click restore capability

---

[1.0.0]: https://github.com/Lumino-x1/Lumina/compare/v0.9.0...v1.0.0
[0.9.0]: https://github.com/Lumino-x1/Lumina/compare/v0.8.0...v0.9.0
