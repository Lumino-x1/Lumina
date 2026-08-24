# Lumina — Makefile
# Convenience wrapper around common pnpm/turbo commands.
# Usage: make <target>   e.g.  make dev   make test   make db-seed

.PHONY: help dev build test lint format typecheck clean \
        db-push db-migrate db-seed db-studio db-generate \
        docker-up docker-down docker-logs setup

help:
	@echo "Lumina make targets: dev, build, lint, typecheck, test, docker-up, setup"

dev:
	pnpm dev:api

build:
	pnpm build

clean:
	pnpm clean

lint:
	pnpm lint

format:
	pnpm format

typecheck:
	pnpm typecheck

test:
	pnpm --filter @lumina/core test

coverage:
	pnpm coverage

docker-up:
	docker compose up -d

docker-down:
	docker compose down

docker-logs:
	docker compose logs -f

setup:
	@echo "Setting up Lumina development environment..."
	@command -v pnpm >/dev/null 2>&1 || { echo "pnpm not found. Enable corepack: corepack enable"; exit 1; }
	pnpm install
	pnpm dev:setup
	@echo "Next: make docker-up && pnpm --filter @lumina/db migrate:dev && pnpm dev:api"
