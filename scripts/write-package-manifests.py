#!/usr/bin/env python3
"""Generate Better Auth-style package.json / tsconfig / tsdown files."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def export_map(entries: list[tuple[str, str]]) -> dict:
    out: dict = {}
    for name, src in entries:
        dist = src.replace("./src/", "./dist/").replace(".ts", "")
        out[name] = {
            "dev-source": src,
            "types": f"{dist}.d.mts",
            "default": f"{dist}.mjs",
        }
    return out


def pkg(
    name: str,
    *,
    description: str,
    entries: list[tuple[str, str]],
    deps: dict | None = None,
    peer: dict | None = None,
    peer_meta: dict | None = None,
    extra_scripts: dict | None = None,
    extra_files: list[str] | None = None,
    extra: dict | None = None,
) -> dict:
    scripts = {
        "build": "tsdown",
        "dev": "tsdown --watch",
        "clean": "rm -rf dist",
        "lint:package": "publint run --strict --pack false",
        "lint:types": "attw --profile esm-only --pack .",
        "typecheck": "tsc --project tsconfig.json",
        "test": "vitest",
        "coverage": "vitest run --coverage",
    }
    if extra_scripts:
        scripts.update(extra_scripts)
    first_src = entries[0][1].replace("./src/", "./dist/").replace(".ts", "")
    data = {
        "name": name,
        "version": "0.0.1",
        "private": True,
        "description": description,
        "type": "module",
        "sideEffects": False,
        "scripts": scripts,
        "files": extra_files or ["dist"],
        "main": f"{first_src}.mjs",
        "module": f"{first_src}.mjs",
        "types": f"{first_src}.d.mts",
        "exports": export_map(entries),
        "devDependencies": {
            "tsdown": "catalog:",
            "typescript": "catalog:",
            "vitest": "catalog:vitest",
        },
    }
    if deps:
        data["dependencies"] = deps
    if peer:
        data["peerDependencies"] = peer
    if peer_meta:
        data["peerDependenciesMeta"] = peer_meta
    if extra:
        data.update(extra)
    return data


def tsconfig(references: list[str] | None = None) -> dict:
    cfg: dict = {
        "extends": "../../tsconfig.base.json",
        "include": ["src", "test", "*.ts"],
        "exclude": ["dist", "node_modules"],
    }
    if references:
        cfg["references"] = [{"path": p} for p in references]
    return cfg


def tsdown(entries: list[str]) -> str:
    quoted = ",\n\t\t".join(json.dumps(e) for e in entries)
    return f"""import {{ defineConfig }} from "tsdown";

export default defineConfig({{
	dts: {{ incremental: true }},
	format: ["esm"],
	entry: [
		{quoted}
	],
	treeshake: true,
	clean: true,
}});
"""


def write_json(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2) + "\n")


def write_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text)


PACKAGES = {
    "core": pkg(
        "@lumina/core",
        description="Shared types, env, errors, constants, and validators for Lumina.",
        entries=[
            (".", "./src/index.ts"),
            ("./env", "./src/env/index.ts"),
            ("./constants", "./src/constants/index.ts"),
            ("./contracts", "./src/contracts/index.ts"),
            ("./validators", "./src/validators/index.ts"),
            ("./error", "./src/error.ts"),
        ],
        extra_files=["dist", "src"],
        deps={"dotenv": "^17.4.2", "zod": "catalog:"},
        extra={"peerDependencies": {"typescript": "catalog:peer"}},
    ),
    "lumina": pkg(
        "lumina",
        description="Primary Lumina TypeScript SDK.",
        entries=[(".", "./src/index.ts"), ("./client", "./src/client.ts")],
        deps={"@lumina/core": "workspace:*"},
        extra={"peerDependencies": {"typescript": "catalog:peer"}},
    ),
    "cli": pkg(
        "@lumina/cli",
        description="Lumina developer CLI (env, seed, OpenAPI checks).",
        entries=[(".", "./src/index.ts")],
        extra_scripts={
            "ensure-env": "node --import tsx src/ensure-env.ts",
            "check-openapi": "node --import tsx src/check-openapi.ts",
            "seed": "node --import tsx src/seed.ts",
            "smoke-test": "node --import tsx src/smoke-test.ts",
        },
        deps={"yaml": "^2.9.0"},
        extra={"devDependencies": {"tsdown": "catalog:", "tsx": "^4.20.5", "typescript": "catalog:", "vitest": "catalog:vitest"}},
    ),
    "auth": pkg(
        "@lumina/auth",
        description="Better Auth integration plugin for Lumina.",
        entries=[(".", "./src/index.ts")],
        deps={"better-auth": "^1.6.25", "resend": "^6.18.1"},
        peer={
            "@lumina/core": "workspace:^",
            "@lumina/db": "workspace:^",
            "typescript": "catalog:peer",
        },
        extra={"devDependencies": {"@lumina/core": "workspace:*", "@lumina/db": "workspace:*", "tsdown": "catalog:", "typescript": "catalog:", "vitest": "catalog:vitest"}},
    ),
    "observability": pkg(
        "@lumina/observability",
        description="Logging, tracing, and metrics plugin.",
        entries=[(".", "./src/index.ts")],
        deps={"@opentelemetry/api": "^1.9.0", "prom-client": "^15.1.3"},
        peer={"@lumina/core": "workspace:^", "typescript": "catalog:peer"},
        extra={"devDependencies": {"@lumina/core": "workspace:*", "@types/express": "^5.0.6", "tsdown": "catalog:", "typescript": "catalog:", "vitest": "catalog:vitest"}},
    ),
    "analytics": pkg(
        "@lumina/analytics",
        description="Product analytics plugin (stub).",
        entries=[(".", "./src/index.ts")],
        peer={"@lumina/core": "workspace:^", "typescript": "catalog:peer"},
        extra={"devDependencies": {"@lumina/core": "workspace:*", "tsdown": "catalog:", "typescript": "catalog:", "vitest": "catalog:vitest"}},
    ),
    "realtime": pkg(
        "@lumina/realtime",
        description="Realtime notifications plugin (stub).",
        entries=[(".", "./src/index.ts")],
        peer={"@lumina/core": "workspace:^", "typescript": "catalog:peer"},
        extra={"devDependencies": {"@lumina/core": "workspace:*", "tsdown": "catalog:", "typescript": "catalog:", "vitest": "catalog:vitest"}},
    ),
    "transactional": pkg(
        "@lumina/transactional",
        description="Email templates and delivery plugin (stub).",
        entries=[(".", "./src/index.ts")],
        peer={"@lumina/core": "workspace:^", "typescript": "catalog:peer"},
        extra={"devDependencies": {"@lumina/core": "workspace:*", "tsdown": "catalog:", "typescript": "catalog:", "vitest": "catalog:vitest"}},
    ),
    "design-system": pkg(
        "@lumina/design-system",
        description="UI primitives for Lumina demos.",
        entries=[(".", "./src/index.ts")],
        peer={"react": "^18.3.1", "react-dom": "^18.3.1", "typescript": "catalog:peer"},
        extra={"devDependencies": {"@types/react": "18.3.18", "@types/react-dom": "18.3.5", "tsdown": "catalog:", "typescript": "catalog:", "vitest": "catalog:vitest"}},
    ),
    "db": pkg(
        "@lumina/db",
        description="Prisma database adapter for Lumina.",
        entries=[(".", "./src/index.ts")],
        extra_scripts={
            "build": "prisma generate && tsdown",
            "generate": "prisma generate",
            "dev": "prisma generate --watch",
            "migrate:dev": "prisma migrate dev",
            "migrate:deploy": "prisma migrate deploy",
            "migrate:status": "prisma migrate status",
        },
        deps={
            "@lumina/core": "workspace:*",
            "@lumina/observability": "workspace:*",
            "@prisma/adapter-pg": "^7.9.1",
            "@prisma/client": "^7.9.1",
            "pg": "^8.22.0",
        },
        extra={
            "devDependencies": {
                "@types/pg": "^8.15.5",
                "prisma": "^7.9.1",
                "tsdown": "catalog:",
                "typescript": "catalog:",
                "vitest": "catalog:vitest",
            }
        },
    ),
    "storage": pkg(
        "@lumina/storage",
        description="S3 object-storage adapter.",
        entries=[(".", "./src/index.ts")],
        deps={
            "@aws-sdk/client-s3": "^3.1101.0",
            "sharp": "^0.35.3",
            "uuid": "^14.0.1",
        },
        peer={"@lumina/core": "workspace:^", "typescript": "catalog:peer"},
        extra={
            "devDependencies": {
                "@lumina/core": "workspace:*",
                "@types/multer": "^2.2.0",
                "multer": "^2.2.0",
                "tsdown": "catalog:",
                "typescript": "catalog:",
                "vitest": "catalog:vitest",
            }
        },
    ),
    "kv": pkg(
        "@lumina/kv",
        description="Key-value / cache adapter (stub).",
        entries=[(".", "./src/index.ts")],
        peer={"@lumina/core": "workspace:^", "typescript": "catalog:peer"},
        extra={"devDependencies": {"@lumina/core": "workspace:*", "tsdown": "catalog:", "typescript": "catalog:", "vitest": "catalog:vitest"}},
    ),
    "test-utils": pkg(
        "@lumina/test-utils",
        description="Shared test helpers for Lumina packages and e2e suites.",
        entries=[(".", "./src/index.ts")],
        extra={"private": True},
        extra_scripts={"lint:package": "echo skip", "lint:types": "echo skip"},
        extra_files=["src"],
    ),
}

REFS = {
    "core": [],
    "lumina": ["../core"],
    "cli": ["../core"],
    "auth": ["../core", "../db"],
    "observability": ["../core"],
    "analytics": ["../core"],
    "realtime": ["../core"],
    "transactional": ["../core"],
    "design-system": [],
    "db": ["../core", "../observability"],
    "storage": ["../core"],
    "kv": ["../core"],
    "test-utils": ["../core", "../auth", "../db"],
}


def main() -> None:
    for folder, manifest in PACKAGES.items():
        base = ROOT / "packages" / folder
        write_json(base / "package.json", manifest)
        write_json(base / "tsconfig.json", tsconfig(REFS.get(folder)))
        src_entries = [v["dev-source"] for v in manifest["exports"].values()]
        write_text(base / "tsdown.config.ts", tsdown(src_entries))
        write_text(
            base / "vitest.config.ts",
            """import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		include: ["src/**/*.test.ts", "test/**/*.test.ts"],
	},
});
""",
        )
        readme = base / "README.md"
        if not readme.exists():
            write_text(readme, f"# {manifest['name']}\n\n{manifest['description']}\n")

    print("wrote package manifests")


if __name__ == "__main__":
    main()
