import { lumina } from "../src/index.ts";
import { describe, expect, it } from "vitest";

describe("lumina sdk", () => {
	it("exports the package name", () => {
		expect(lumina.name).toBe("lumina");
	});
});
