/**
 * Root Vitest config. Prefer package-local configs:
 * `pnpm --filter @lumina/core test`
 * or a focused file: `vitest packages/core/test/constants.test.ts -t constants`
 */
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		include: ["packages/**/*.{test,spec}.ts", "test/**/*.test.ts"],
		exclude: ["**/node_modules/**", "**/dist/**", "**/.turbo/**", "e2e/**"],
	},
});
