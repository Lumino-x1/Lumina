/**
 * Lumina public SDK. Re-exports shared contracts plus the HTTP client stub.
 */
export { sdk } from "./client.ts";
export type * from "@lumina/core/contracts";

export const lumina = { name: "lumina" as const };
