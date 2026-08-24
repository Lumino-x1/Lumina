# Runbook: Production Incident Management Lifecycle

Standard operating runbook governing incident response command, communication, containment, and post-mortem review.

## 1. Incident Severity Levels

- **SEV-1 (Critical Outage)**: Core API down, authentication broken, or complete database failure affecting all users.
- **SEV-2 (Major Degradation)**: Major feature unavailable (e.g. chat or LeetCode sync down), elevated latency > 1s, or
  error rate > 5%.
- **SEV-3 (Minor Issue)**: Non-critical feature bug, minor UI issue, isolated edge case error.

## 2. Response Lifecycle Stages

```text
Detection → Command & Mobilization → Containment → Eradication & Recovery → Post-Mortem
```

### Stage 1: Detection

Incident triggered via automated PagerDuty alert, Sentry alert, or customer report.

### Stage 2: Command & Mobilization

- Designate Incident Commander (IC).
- Open dedicated incident channel (`#incident-YYYYMMDD-description`).
- Post initial internal status update within 15 minutes.

### Stage 3: Containment

- Execute immediate mitigation (e.g. traffic redirection, container scale-out, feature-flag disable, or deployment
  rollback).
- Prioritize customer impact containment over root-cause investigation.

### Stage 4: Eradication & Recovery

- Deploy verified bugfix or database recovery.
- Confirm system readiness using `bun packages/cli/src/smoke-test.ts`.

### Stage 5: Post-Mortem Review

- Publish blameless post-mortem report within 48 hours.
- Document timeline, root cause, action items, and prevention measures.
