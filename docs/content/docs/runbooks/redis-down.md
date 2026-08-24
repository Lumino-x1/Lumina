# Runbook: Redis Cache & Queue Outage

Standard operating runbook for diagnosing and recovering from Redis caching and BullMQ queue failures.

## Symptoms

- `GET /ready` returns `503 Service Unavailable` (`checks.redis = "error: ..."`).
- Background worker jobs (`demo/worker-leetcode`) failing to pick up or process tasks.
- Spikes in `lumina_background_job_failures_total` metrics.

## Possible Causes

- Redis container/node crash or OOM (Out Of Memory) eviction.
- Exceeded maxmemory allocation.
- Network disconnection between API/Worker containers and Redis host.

## Diagnostics

1. Execute Redis ping command:
   ```bash
   redis-cli -h lumina-redis-production.cache.amazonaws.com ping
   ```
2. Check memory usage and stats:
   ```bash
   redis-cli info memory
   ```
3. Inspect BullMQ worker logs for connection retry messages.

## Immediate Mitigation

1. **Restart Redis Instance / Container**:
   ```bash
   docker restart lumina-redis-production
   ```
2. **Flush Volatile Cache Keys** (if OOM occurs):
   ```bash
   redis-cli flushdb
   ```

## Recovery

1. Confirm Redis returns `PONG`.
2. Restart background workers (`demo/worker-leetcode`) to re-establish BullMQ listeners.

## Verification

1. Verify `GET /ready` returns `"redis": "ok"`.
2. Monitor BullMQ queue depth (`lumina_queue_depth_total`).

## Post-Incident Actions

1. Review maxmemory eviction policies in Redis configuration.
2. Tune BullMQ job removal settings (`removeOnComplete`, `removeOnFail`).
