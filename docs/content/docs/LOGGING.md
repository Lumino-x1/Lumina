# Structured Logging Policy

Lumina uses a centralized structured application logging engine implemented in `@lumina/observability`.

## Log Schema

Every log entry outputs JSON in production environments (`NODE_ENV=production`) and formatted context in development
environments:

```json
{
  "timestamp": "2026-08-14T01:05:00.000Z",
  "level": "info",
  "service": "api",
  "environment": "production",
  "request_id": "c7a812bf-5e26-4b10-9bc8-21d96071ef28",
  "trace_id": "0af7651916cd43dd8448eb211c80319c",
  "message": "GET /api/profile/me 200 - 12ms",
  "metadata": {
    "method": "GET",
    "path": "/api/profile/me",
    "statusCode": 200,
    "durationMs": 12,
    "userAgent": "Mozilla/5.0",
    "ip": "127.0.0.1"
  }
}
```

## Field Definitions

- `timestamp`: ISO 8601 UTC timestamp string.
- `level`: Log severity level (`debug`, `info`, `warn`, `error`).
- `service`: Microservice or application component name (e.g. `api`, `web`, `worker-leetcode`).
- `environment`: Runtime environment (`production`, `staging`, `development`).
- `request_id`: Correlation request identifier (passed via `x-request-id` header or generated UUID v4).
- `trace_id`: Distributed tracing context identifier (passed via `x-trace-id` header).
- `message`: Human-readable summary description.
- `metadata`: Sanitized contextual payload dictionary.

## Automatic Redaction & Data Protection

The logging pipeline automatically redacts sensitive fields across all metadata objects and payloads. The following
fields are masked as `"[REDACTED]"`:

- Passwords & hashes (`password`, `pass`)
- Authentication tokens & secrets (`token`, `access_token`, `refresh_token`, `secret`, `better_auth_secret`)
- Authorization & session headers (`authorization`, `cookie`)
- API keys (`api_key`, `apiKey`, `resend_api_key`)
- Sensitive financial or personal identification (`creditCard`, `ssn`)

## Usage Example

```typescript
import { httpLoggerMiddleware, logger } from '@lumina/observability'

// Express HTTP request logging middleware
app.use(httpLoggerMiddleware('api'))

// Application code logging
logger.info('User session established', {
  request_id: req.requestId,
  metadata: { userId: user.id },
})

logger.error('Failed to sync LeetCode statistics', {
  metadata: { error: err.message, username: 'dev_user' },
})
```
