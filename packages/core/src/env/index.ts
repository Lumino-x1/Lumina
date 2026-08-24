import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const packageDir = import.meta.dirname ?? dirname(fileURLToPath(import.meta.url));

function findMonorepoRoot(startDir: string): string {
	let dir = startDir;

	while (true) {
		if (existsSync(join(dir, "turbo.json"))) {
			return dir;
		}

		const parent = dirname(dir);
		if (parent === dir) {
			return startDir;
		}

		dir = parent;
	}
}

/** Repository root (directory that contains `turbo.json`). */
export const monorepoRoot = findMonorepoRoot(packageDir);

for (const file of [".env", ".env.local"] as const) {
	const path = join(monorepoRoot, file);
	if (existsSync(path)) {
		config({ path, override: file === ".env.local" });
	}
}
