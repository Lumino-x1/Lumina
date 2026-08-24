# Runbook: PostgreSQL Database Outage

Standard operating runbook for diagnosing and recovering from database connectivity failures.

## Symptoms

- `GET /ready` returns `503 Service Unavailable` (`checks.database = "error: ..."`).
- API logs reporting `PrismaClientInitializationError` or `PrismaClientKnownRequestError`.
- High count of `500 Internal Server Error` responses on database-backed API routes.

## Possible Causes

- PostgreSQL primary instance crash or host failure.
- Database connection pool exhaustion (`pg` connection pool max limit reached).
- Network security group or VPC routing misconfiguration.
- High disk utilization or storage volume fill on RDS instance.

## Diagnostics

1. Check RDS status in AWS Console / CLI:
   ```bash
   aws rds describe-db-instances --db-instance-identifier lumina-db-production
   ```
2. Verify database TCP connectivity from API container:
   ```bash
   pg_isready -h lumina-db-production.rds.amazonaws.com -p 5432 -U lumina_user
   ```
3. Inspect CloudWatch metrics for CPU utilization, freeable memory, and active connection count.

## Immediate Mitigation

1. **Restart Application Pool / Service Tasks**: If connection pool exhausted, restart API container tasks to flush
   stale handles.
2. **Failover to Multi-AZ Standby**: If primary RDS instance un-responsive, initiate Multi-AZ failover:
   ```bash
   aws rds reboot-db-instance --db-instance-identifier lumina-db-production --force-failover
   ```

## Recovery

1. Confirm primary RDS instance returns to `available` state.
2. Verify application auto-reconnects via Prisma Client.

## Verification

1. Run readiness check:
   ```bash
   curl -i http://localhost:3000/ready
   ```
2. Verify `checks.database` returns `"ok"`.

## Post-Incident Actions

1. Audit connection pool settings (`max` pool size in `@lumina/db`).
2. Review slow query logs (`lumina_db_query_duration_seconds`).
