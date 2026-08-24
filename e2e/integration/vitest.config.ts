import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const repoRoot = fileURLToPath(new URL("../..", import.meta.url));

export default defineConfig({
	root: repoRoot,
	envDir: repoRoot,
	resolve: {
		alias: [
			{ find: "@auth/index", replacement: path.resolve(repoRoot, "packages/auth/src/index.ts") },
			{ find: "@auth", replacement: path.resolve(repoRoot, "packages/auth/src") },
			{
				find: "@profile",
				replacement: path.resolve(repoRoot, "demo/api/modules/profile"),
			},
			{
				find: "@db/client",
				replacement: path.resolve(repoRoot, "packages/db/src/client.ts"),
			},
			{ find: "@db", replacement: path.resolve(repoRoot, "packages/db/src") },
			{ find: "@test", replacement: path.resolve(repoRoot, "packages/test-utils/src") },
		],
	},
	test: {
		environment: "node",
		include: ["e2e/integration/src/**/*.{test,spec}.{ts,tsx}"],
		exclude: ["**/node_modules/**", "**/dist/**", "**/.turbo/**"],
		setupFiles: ["e2e/integration/setup.ts"],
		testTimeout: 15000,
		hookTimeout: 30000,
		pool: "threads",
		poolOptions: {
			threads: {
				singleThread: false,
			},
		},
	},
});
