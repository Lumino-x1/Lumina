# Docker workflow

Lumina has separate development and production container responsibilities.

## Local development

1. Copy `.env.example` to an untracked `.env` and set local PostgreSQL/Redis credentials.
2. Start infrastructure with `docker compose up -d`.
3. Generate the Prisma client and run applications with Bun: `bun run dev:api`, `bun run dev:web`, and, where needed,
   `bun run worker:leetcode`.
4. Stop infrastructure with `docker compose down`.

The root Compose file intentionally runs only PostgreSQL and Redis. It does not contain fallback passwords, production
services, or application secrets.

## Production images

| Image           | Dockerfile                    | Runtime                            |
| --------------- | ----------------------------- | ---------------------------------- |
| API             | `demo/api/Dockerfile`         | Bun, port 3000, `/ok` health check |
| LeetCode worker | `demo/worker-leetcode/Dockerfile` | Bun worker process                 |
| Web             | `demo/web/Dockerfile`         | unprivileged Nginx, port 8080      |

All production Dockerfiles use a build stage where useful, pinned base-image versions, lockfile-based Bun installation,
`.dockerignore`, and non-root runtime users. Build from the repository root:

```bash
docker build -f demo/api/Dockerfile -t lumina-api:local .
docker build -f demo/worker-leetcode/Dockerfile -t lumina-worker:local .
docker build -f demo/web/Dockerfile -t lumina-web:local .
```

Run images with runtime-injected environment variables or an orchestrator secret reference. Never pass secrets through
Docker build arguments, bake them into images, or commit a production Compose override.

## Release requirements

- CI builds images from a reviewed commit and pushes immutable image digests to the registry.
- Deployments reference an image digest, not a mutable tag.
- ECS injects secrets at runtime according to `docs/SECRETS.md`.
- API/web health checks gate rollout; worker health is monitored through queue activity, logs, and task health.
