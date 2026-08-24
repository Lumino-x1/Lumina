import { MSG_OK } from "../src/constants/index.ts";
import { describe, expect, it } from "vitest";

describe("constants", () => {
	it("exports the health-check OK message", () => {
		expect(MSG_OK).toBe("OK");
	});
});
