# Continuous Deployment (CD) Pipeline Guide

Lumina enforces automated continuous deployment configured in `.github/workflows/cd.yml`.

---

## Deployment Architecture Workflow

```text
Developer Push to main / Tag v*
               ↓
   1. Code Verification (Linting, Formatting, OpenAPI & Type Checks)
               ↓
   2. Production Application Builds (API Bun bundle & Web Vite build)
               ↓
   3. Build & Security Scan Containers (Multi-stage Docker & Trivy)
               ↓
   4. Deploy Staging Environment (Container Registry Push & Prisma Migration)
               ↓
   5. Staging Readiness Smoke Tests (GET /ready)
               ↓
   6. Production Environment Approval
               ↓
   7. Deploy Production Environment (AWS ECS Fargate Rollout & GET /ready Probe)
```

---

## Pipeline Jobs & Security Controls

1. **Code Verification**: Runs `format:check`, `lint`, `check-types`, and `check-openapi` before image creation.
2. **Production App Builds**: Executes `bun run --filter api build` and `bun run --filter web build` to fail CI if
   unbuildable code passes typecheck.
3. **Container Vulnerability Scan**: Scans production Docker images with Trivy. Rejects deployment if `CRITICAL` unfixed
   vulnerabilities exist.
4. **Database Migrations**: Applies production migrations using `prisma migrate deploy` before container service traffic
   cutover.
5. **Smoke Tests**: Verifies readiness endpoint `GET /ready` before marking deployment successful.
