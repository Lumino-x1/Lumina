import { defineConfig } from "tsdown";

export default defineConfig({
	dts: true,
	fixedExtension: true,
	format: ["esm"],
	entry: [
		"./src/index.ts"
	],
	treeshake: true,
	clean: true,
});
