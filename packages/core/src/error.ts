/** Application error with a stable machine-readable code. */
export class LuminaError extends Error {
	readonly code: string;

	constructor(code: string, message: string) {
		super(message);
		this.name = "LuminaError";
		this.code = code;
	}
}
