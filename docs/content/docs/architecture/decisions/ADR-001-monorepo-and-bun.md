# ADR-001: Turborepo monorepo and Bun workspace tooling

## Context

Lumina has independently runnable applications and shared packages that change together.

## Problem

The team needs atomic changes, consistent tooling, and fast local/CI dependency installation.

## Options Considered

- Separate repositories per application
- A TypeScript monorepo with npm/pnpm
- A Turborepo monorepo with Bun workspaces

## Decision

Use the existing Turborepo monorepo and Bun workspace tooling.

## Reasoning

It permits atomic API/package changes, shared lockfile resolution, and task orchestration from one repository.

## Consequences

Engineers must understand workspace boundaries and validate cross-package changes in CI.

## Alternatives Rejected

Separate repositories add release and contract coordination overhead for the current team size.
