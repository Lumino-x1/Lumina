# ADR-004: Docker Standardization and Container Vulnerability Scanning

## Context

Lumina deploys backend API services, background workers, and web frontend applications as containerized services across
development, staging, and production environments.

## Problem

Unstandardized container builds present security risks, bloated image footprints, non-reproducible runtime dependencies,
privilege escalation threats from running containers as root, and unvetted container vulnerabilities.

## Options Considered

- Single-stage bloated Docker images running as root without automated scanning.
- Pre-built static binaries deployed directly onto virtual machines without containers.
- Multi-stage Docker builds with unprivileged non-root runtime users and Trivy container vulnerability scanning in CI.

## Decision

Standardize all production Dockerfiles on multi-stage builds (`build` -> `runtime`), lockfile-driven reproducible Bun
dependencies (`bun install --frozen-lockfile`), non-root runtime users (`USER bun` / `nginxinc/nginx-unprivileged`),
runtime health checks, and mandatory Trivy container vulnerability scanning in GitHub Actions CI.

## Reasoning

1. Multi-stage builds isolate build tooling and TypeScript source files from minimal production runtime layers.
2. Running containers under unprivileged users (`USER bun` or unprivileged Nginx) eliminates root privilege escalation
   attacks inside containers.
3. Trivy CI integration automatically gates deployments against critical base image or dependency vulnerabilities before
   image publication.
4. Clean context isolation via `.dockerignore` prevents accidental inclusion of local `.env` files or credentials into
   image layers.

## Consequences

- All Dockerfiles must explicitly declare build stages, user permissions, and health check parameters.
- CI pipeline execution includes container build and Trivy vulnerability scan steps, which will block pull requests if
  `CRITICAL` un-whitelisted CVEs are detected.

## Alternatives Rejected

- **Running images as root**: Rejected due to high container breakout and privilege escalation risks.
- **Baking credentials into image layers**: Rejected in favor of runtime secret injection via orchestrator environment
  configuration.
