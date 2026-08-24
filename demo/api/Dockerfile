# syntax=docker/dockerfile:1
FROM node:22-alpine AS dependencies
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @lumina/db generate
RUN pnpm build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV SERVER_PORT=3000
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate
COPY --from=dependencies /app /app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/ok').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
CMD ["pnpm", "--filter", "@lumina/demo-api", "dev"]
