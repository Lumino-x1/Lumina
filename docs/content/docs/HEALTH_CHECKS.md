# Health Probes & Monitoring Guide

Lumina Express API server provides distinct Liveness (`/health`) and Readiness (`/ready`) endpoints.

---

## 1. Liveness Probe (`GET /health`)

- **Purpose**: Verifies that the Express API process is alive and responsive.
- **Overhead**: Fast, lightweight (< 1ms execution, no database/cache queries).
- **HTTP Status Code**: `200 OK`

### Sample Response:

```json
{
  "status": "ok",
  "service": "api",
  "uptimeSeconds": 3600,
  "timestamp": "2026-08-14T18:40:00.000Z"
}
```

---

## 2. Readiness Probe (`GET /ready`)

- **Purpose**: Verifies that critical backend dependencies (PostgreSQL DB & Redis) are connected and able to serve
  traffic.
- **Checks Executed**:
  1. PostgreSQL Database: `prisma.$queryRaw`SELECT 1``
  2. Redis Cache & Queue Connection: `redis.ping()`
- **HTTP Status Codes**:
  - `200 OK`: Both critical dependencies are healthy.
  - `503 Service Unavailable`: One or more critical dependencies failed.

### Sample Successful Response (`200 OK`):

```json
{
  "status": "ready",
  "service": "api",
  "timestamp": "2026-08-14T18:40:00.000Z",
  "checks": {
    "database": "ok",
    "redis": "ok"
  }
}
```

### Sample Unavailable Response (`503 Service Unavailable`):

```json
{
  "status": "unavailable",
  "service": "api",
  "timestamp": "2026-08-14T18:40:00.000Z",
  "checks": {
    "database": "ok",
    "redis": "error: Connection refused"
  }
}
```

---

## 3. Load Balancer & Orchestrator Configuration

### AWS ALB / ECS Fargate Health Check Settings

- **Path**: `/ready`
- **Interval**: `30s`
- **Timeout**: `5s`
- **Healthy Threshold**: `2`
- **Unhealthy Threshold**: `3`
