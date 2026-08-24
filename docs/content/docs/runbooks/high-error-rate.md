# Runbook: High Error Rate Spikes

Standard operating runbook for responding to elevated 5xx HTTP error rates.

## Symptoms

- Prometheus metric `lumina_http_errors_total` spiking above baseline (> 1%).
- Error tracking platform (Sentry) reporting high volume of unhandled exceptions.
- API returning `500 Internal Server Error` responses.

## Possible Causes

- Uncaught exception in Express router handlers.
- Database connection failure or query syntax error after deployment.
- Third-party API authorization or rate-limit failure.
- Corrupted request payloads or schema validation mismatches.

## Diagnostics

1. Query error tracking platform (Sentry) for top exception stack traces.
2. Filter application logs by level `error` (`logger.error`).
3. Check status code breakdown in `lumina_http_requests_total{status_code=~"5.."}`.

## Immediate Mitigation

1. If errors started immediately after a deployment, execute **Deployment Rollback Runbook**
   ([`deployment-rollback.md`](./deployment-rollback.md)).
2. If caused by downstream rate limiting, apply rate-limiting fallback middleware.

## Recovery

1. Deploy hotfix for unhandled edge case.
2. Confirm error rate drops to zero baseline.

## Verification

1. Verify `lumina_http_errors_total` counter stops incrementing.
2. Run smoke tests (`bun packages/cli/src/smoke-test.ts`).

## Post-Incident Actions

1. Add regression unit/integration test covering the failing case in `tests/`.
2. Update validation schemas in `@lumina/core/validators`.
