# syntax=docker/dockerfile:1
FROM node:22-alpine AS build
WORKDIR /app
ENV DATABASE_URL="postgresql://lumina_user:lumina_password@localhost:5432/lumina_dev"
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @lumina/db generate
RUN pnpm --filter @lumina/demo-web build

FROM nginxinc/nginx-unprivileged:1.29-alpine AS runtime
COPY demo/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/demo/web/dist /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1
