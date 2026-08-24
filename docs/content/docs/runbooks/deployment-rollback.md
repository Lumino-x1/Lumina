# Runbook: Deployment Rollback Procedure

Standard operating runbook for detecting failed production deployments and executing container image / schema rollbacks.

## Symptoms

- Automated post-deployment smoke tests (`bun packages/cli/src/smoke-test.ts`) failed.
- Spikes in 5xx HTTP server response error rates.
- Endpoint `/ready` returning `503 Service Unavailable`.
- Elevated latency on core application routes (`/api/profile`, `/api/chat`).

## Possible Causes

- Application regression introduced in newly deployed container image.
- Database schema migration incompatibility.
- Environment variable / configuration injection failure.
- Downstream third-party dependency breakage.

## Diagnostics

1. Inspect deployment log outputs in GitHub Actions CD pipeline.
2. Query error tracking (Sentry) and application logs (`logger.error`) filtering by active release tag.
3. Execute `curl -i http://api.lumina.app/ready` to evaluate dependency readiness.
4. Compare commit SHA of running container against previous stable git release tag.

## Immediate Mitigation

1. **Initiate ECS Service Task Rollback**:
   ```bash
   aws ecs update-service --cluster lumina-ecs-production --service lumina-api-service-production --task-definition lumina-api:PREVIOUS_REVISION
   ```
2. **Revert Load Balancer Target Group Cutover**: Switch traffic back to previous stable target group.

## Recovery

1. Revert failed git commit on `main` branch.
2. If database migration was applied, execute down-migration script or restore database from point-in-time snapshot.
3. Re-deploy previous stable container image tag.

## Verification

1. Run automated smoke tests:
   ```bash
   bun packages/cli/src/smoke-test.ts https://api.lumina.app
   ```
2. Confirm `GET /health` and `GET /ready` return `200 OK`.
3. Verify Prometheus metrics dashboard (`lumina_http_errors_total` returning to zero baseline).

## Post-Incident Actions

1. Mark deployment incident as contained.
2. Schedule blameless post-mortem review within 48 hours.
3. File GitHub issue documenting root cause and prevention measures.
