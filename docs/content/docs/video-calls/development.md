# Video Call Development Guide

Guide for local development, environment configuration, and testing the Stream Video module.

---

## 1. Environment Variables

Ensure the following variables are set in your local `.env`:

```env
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

---

## 2. Local Testing Workflow

1. Start local PostgreSQL and Redis containers:
   ```bash
   docker compose up -d
   ```
2. Run database migrations and generate Prisma Client:
   ```bash
   bun run --filter @lumina/db generate
   ```
3. Run integration tests for the video module:
   ```bash
   bun test tests/integration/video/video.test.ts
   ```
