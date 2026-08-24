# ADR-003: AWS Secrets Manager runtime injection

## Context

Lumina requires database credentials, authentication secrets, storage credentials, and third-party API tokens in
production.

## Problem

Secrets must not enter Git history or container images and must be rotatable with least-privilege access.

## Options Considered

- Repository or Docker environment files
- SSM Parameter Store for all configuration
- AWS Secrets Manager for secrets and Parameter Store for non-secret configuration

## Decision

Use AWS Secrets Manager for production secrets and ECS runtime injection. Use Parameter Store only for non-secret
configuration.

## Reasoning

Secrets Manager provides the lifecycle, rotation, audit, and access-control capabilities required for credentials and
API keys.

## Consequences

ECS task roles and deployment pipelines require scoped IAM configuration. Rotated values require new tasks to start.

## Alternatives Rejected

Repository-managed secret files and image build arguments create unacceptable exposure risk; Parameter Store alone lacks
dedicated secret lifecycle support.
