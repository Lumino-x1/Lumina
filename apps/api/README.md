# API

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run
```

## Scheduled publishing

Run the API and publishing worker as separate processes. The worker consumes
the `lumina-publishing` BullMQ queue, dispatches transactional outbox events,
and reconciles overdue scheduled posts every `PUBLISHING_RECOVERY_INTERVAL_MS`
(60 seconds by default).

```bash
bun run worker:publishing
```

Both processes require `DATABASE_URL`/`DATABASE_URL_DEV` and `REDIS_URL`.
Apply database changes with `bun run --filter @lumina/db migrate:deploy` before
starting either process.

This project was created using `bun init` in bun v1.3.0. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
