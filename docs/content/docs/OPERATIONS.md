# Operations Guide

This guide defines the minimum operating standard for the Lumina production service. It is intentionally
provider-neutral: keep provider-specific credentials, dashboards, and emergency contacts in the team's private
operations workspace.

## Service ownership

Every production service needs a named primary owner, a backup owner, a runbook URL, and an alert destination. Maintain
that information outside the repository and review it quarterly.

| Service           | Minimum health signal                   | Recovery objective                 |
| ----------------- | --------------------------------------- | ---------------------------------- |
| Web application   | HTTP health check and error rate        | Restore within 60 minutes          |
| PostgreSQL        | Connectivity, backups, storage use      | No more than 24 hours of data loss |
| Redis             | Connectivity, memory use, eviction rate | Restore within 60 minutes          |
| Email and storage | Provider status and failed jobs         | Restore within one business day    |

## Deployments

1. CI must be green and the pull request must have an approved review.
2. Confirm database migrations are backward compatible and have a rollback plan.
3. Deploy to staging first, then verify sign-in, a primary user journey, and error monitoring.
4. Deploy production during a staffed window and observe error rate, latency, and logs for 30 minutes.
5. Record the release version, migration identifiers, and any follow-up work in the release notes.

Do not apply destructive database changes in the same release as code that still depends on the old schema. Use
expand/migrate/contract changes instead.

## Incident response

1. Acknowledge the alert and assign an incident lead.
2. State impact, start time, and current mitigation in the incident channel.
3. Prioritize stopping user harm: roll back, disable a feature flag, or place the affected service in maintenance mode.
4. Update stakeholders at least every 30 minutes while impact continues.
5. After recovery, document timeline, root cause, corrective actions, and owners within five business days.

Never paste credentials, access tokens, or personally identifiable customer data into an incident channel or ticket.

## Backups and recovery

- Run encrypted PostgreSQL backups at least daily and retain them for 30 days.
- Test a restore into an isolated environment at least quarterly.
- Keep infrastructure and production database access limited to least-privilege roles.
- Rotate secrets after suspected exposure and whenever an administrator leaves the company.

## Release readiness

Before enabling a customer-facing feature, ensure that it has an owner, support documentation, relevant analytics, error
monitoring, and a way to disable or roll it back. The launch owner is responsible for confirming each item.
