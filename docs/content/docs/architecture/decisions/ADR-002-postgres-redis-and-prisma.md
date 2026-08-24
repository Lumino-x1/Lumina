# ADR-002: PostgreSQL/Prisma for durable data and Redis for hot asynchronous paths

## Context

Lumina persists relational campus and social data while maintaining LeetCode ranking and background synchronization.

## Problem

The system needs transactional durable records without making ranking and job operations database-bound.

## Options Considered

- PostgreSQL only
- Redis only
- PostgreSQL/Prisma plus Redis/BullMQ

## Decision

Keep PostgreSQL as the durable source of truth through Prisma and use Redis for BullMQ and leaderboard sorted sets.

## Reasoning

The worker persists LeetCode data before updating Redis, and the leaderboard can be rebuilt from PostgreSQL when Redis
is empty.

## Consequences

Redis is derived state requiring monitoring and rebuild capability; data-model changes require Prisma migrations.

## Alternatives Rejected

Redis alone does not provide a durable relational model; PostgreSQL-only ranking would sacrifice fast sorted-set reads.
