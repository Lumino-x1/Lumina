# Staging Environment Guide

The Lumina staging environment provides an isolated pre-production validation environment matching production container
specifications, database schemas, and networking configuration.

---

## 1. Environment Deployment Flow

```text
main branch commit
       ↓
Staging Build & Container Deploy (docker-compose.staging.yml)
       ↓
Staging Database Migration (prisma migrate deploy)
       ↓
Automated Smoke Tests (bun packages/cli/src/smoke-test.ts)
       ↓
Production Approval & Release Cutover
```

---

## 2. Running Staging Locally

To spin up the local staging environment matching production:

```bash
docker compose -f docker-compose.staging.yml up -d --build
```

Verify service readiness:

```bash
curl -i http://localhost:3000/ready
```
