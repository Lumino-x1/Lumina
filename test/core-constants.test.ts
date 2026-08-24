import { MSG_OK } from "@lumina/core/constants";
import { describe, expect, it } from "vitest";

describe("core constants (shared test workspace)", () => {
	it("exposes MSG_OK", () => {
		expect(MSG_OK).toBe("OK");
	});
});
