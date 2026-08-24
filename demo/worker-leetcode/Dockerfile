# syntax=docker/dockerfile:1
FROM node:22-alpine AS dependencies
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate
COPY . .
RUN pnpm install --frozen-lockfile

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate
COPY --from=dependencies /app /app
CMD ["pnpm", "--filter", "@lumina/demo-worker-leetcode", "start"]
