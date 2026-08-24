import { defineConfig } from "tsdown";

export default defineConfig({
	dts: true,
	fixedExtension: true,
	format: ["esm"],
	entry: [
		"./src/index.ts",
		"./src/env/index.ts",
		"./src/constants/index.ts",
		"./src/contracts/index.ts",
		"./src/validators/index.ts",
		"./src/error.ts"
	],
	treeshake: true,
	clean: true,
});
