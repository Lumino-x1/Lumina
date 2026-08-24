# Runbook: High API Response Latency

Standard operating runbook for diagnosing and mitigating high API response times and latency spikes.

## Symptoms

- `lumina_http_request_duration_seconds` p95/p99 histograms exceeding SLA threshold (> 500ms).
- HTTP client requests timing out.
- High CPU or memory usage on API container hosts.

## Possible Causes

- Unindexed PostgreSQL queries locking tables or causing full table scans.
- Event loop blockage or heavy synchronous CPU operations in Express handlers.
- Downstream third-party API slowness (e.g. Stream Chat, Resend, LeetCode GraphQL).
- Thread/connection pool saturation.

## Diagnostics

1. Check Prometheus histogram metric `lumina_http_request_duration_seconds` grouped by route.
2. Check database query durations in `lumina_db_query_duration_seconds`.
3. Inspect active container CPU/Memory metrics (`lumina_process_cpu_seconds_total`,
   `lumina_process_resident_memory_bytes`).

## Immediate Mitigation

1. **Scale Out API Container Tasks**: Increase ECS task count to distribute incoming load:
   ```bash
   aws ecs update-service --cluster lumina-ecs-production --service lumina-api-service-production --desired-count 5
   ```
2. **Enable Circuit Breakers / Fallbacks**: Temporarily degrade non-essential downstream calls.

## Recovery

1. Add missing database indexes identified by slow query logs.
2. Reduce high load until latency normalizes to baseline (< 50ms).

## Verification

1. Monitor `/metrics` histogram output.
2. Run `bun packages/cli/src/smoke-test.ts` to verify latency < 100ms.

## Post-Incident Actions

1. Optimize identified slow Prisma queries.
2. Implement redis caching for high-frequency read endpoints.
