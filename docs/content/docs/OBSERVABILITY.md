# Observability, Request Correlation & Metrics Guide

Lumina provides end-to-end request correlation, OpenTelemetry tracing support, and Prometheus metrics telemetry
implemented in `@lumina/observability`.

---

## 1. Request Correlation & Context Propagation

All incoming HTTP requests and background worker jobs are tracked using correlated identifiers:

- `request_id`: Identifies the client request transaction (passed via `X-Request-ID` or generated as UUID v4).
- `trace_id`: Distributed tracing identifier (passed via `X-Trace-ID` or W3C `traceparent` header).

### End-to-End Propagation Flow

```text
HTTP Client Request (X-Request-ID, X-Trace-ID)
      ↓
API Express Server (httpLoggerMiddleware & AsyncLocalStorage context)
      ↓
BullMQ Job Enqueue (payload includes request_id & trace_id)
      ↓
Background Worker (leetcodeWorker restores correlation context)
      ↓
PostgreSQL DB / Redis / External APIs (Logs & metrics bound to request_id)
```

### Server Headers & Log Output

Express automatically sets correlation response headers:

```http
X-Request-ID: c7a812bf-5e26-4b10-9bc8-21d96071ef28
X-Trace-ID: 0af7651916cd43dd8448eb211c80319c
```

Log entries automatically include correlation context:

```json
{
  "timestamp": "2026-08-14T18:30:00.000Z",
  "level": "info",
  "service": "api",
  "environment": "production",
  "request_id": "c7a812bf-5e26-4b10-9bc8-21d96071ef28",
  "trace_id": "0af7651916cd43dd8448eb211c80319c",
  "message": "GET /api/profile/me 200 - 12ms",
  "metadata": { "statusCode": 200, "durationMs": 12 }
}
```

---

## 2. OpenTelemetry Tracing Foundation

OpenTelemetry tracing helpers are exported from `@lumina/observability`:

```typescript
import { withSpan } from '@lumina/observability'

await withSpan('fetchExternalProfile', async (span) => {
  span.setAttribute('profileId', id)
  // Async operation...
})
```

---

## 3. Application Metrics & Prometheus Endpoint

Lumina exposes a production Prometheus metrics scrape endpoint at:

```http
GET /metrics
```

### Measured Metrics

| Metric Name                               | Type      | Labels                           | Description                         |
| :---------------------------------------- | :-------- | :------------------------------- | :---------------------------------- |
| `lumina_http_requests_total`              | Counter   | `method`, `route`, `status_code` | Total HTTP requests processed       |
| `lumina_http_request_duration_seconds`    | Histogram | `method`, `route`, `status_code` | HTTP request duration in seconds    |
| `lumina_http_errors_total`                | Counter   | `method`, `route`, `status_code` | Total HTTP error responses (>= 400) |
| `lumina_db_query_duration_seconds`        | Histogram | `model`, `action`                | Database query execution duration   |
| `lumina_redis_operation_duration_seconds` | Histogram | `command`                        | Redis operation latency             |
| `lumina_queue_depth_total`                | Gauge     | `queue`                          | Active BullMQ job queue depth       |
| `lumina_background_job_failures_total`    | Counter   | `job_name`                       | Total failed background worker jobs |
| `lumina_process_cpu_seconds_total`        | Counter   | —                                | Total user & system CPU time        |
| `lumina_process_resident_memory_bytes`    | Gauge     | —                                | Resident memory usage (bytes)       |

---

## 4. Scraping & Dashboard Integration

Prometheus scraping configuration (`prometheus.yml`):

```yaml
scrape_configs:
  - job_name: 'lumina-api'
    scrape_interval: 15s
    metrics_path: '/metrics'
    static_configs:
      - targets: ['api:3000']
```
