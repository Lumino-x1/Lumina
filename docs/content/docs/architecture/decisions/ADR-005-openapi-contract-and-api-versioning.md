# ADR-005: OpenAPI Specification Contract and API Versioning Strategy

## Context

Lumina exposes backend REST endpoints consumed by web applications, mobile interfaces, and external clients.

## Problem

Undocumented, unversioned API changes cause client-server mismatches, broken frontend integrations, unclear
authentication requirements, and inconsistent error payloads across different teams and applications.

## Options Considered

- Informal ad-hoc endpoint documentation in markdown files without schema specifications.
- GraphQL-only interface for all client communications.
- OpenAPI 3.1.0 specification with strict schema definitions, standard RFC 7807 error formats, rate limiting, and
  `/api/v1` public route versioning.

## Decision

Establish `docs/api/openapi.yaml` as the authoritative OpenAPI 3.1.0 contract for all Lumina endpoints. Standardize
public endpoints under `/api/v1/...`, enforce Better-Auth session cookie/Bearer token authentication schemas, uniform
RFC 7807 structured JSON error responses, and pagination parameters.

## Reasoning

1. Authoritative OpenAPI contracts enable frontend and backend teams to develop independently against mockable,
   strongly-typed interface definitions.
2. Explicit `/api/v1/...` version prefixing guarantees backward compatibility and prevents breaking changes on public
   APIs.
3. Standardized error structures (`{ "error": { "code", "message", "details" } }`) simplify client-side error handling
   and diagnostic logging.
4. Documenting rate limits and HTTP status codes establishes explicit operational contracts for client developers.

## Consequences

- Any pull request modifying external API behavior must update `docs/api/openapi.yaml` in the same PR.
- Breaking API changes require incrementing the API version prefix (e.g. `/api/v2/`), documenting a deprecation
  timeline, and publishing migration notes.

## Alternatives Rejected

- **Unversioned API routes**: Rejected due to high risk of breaking active client applications upon backend updates.
- **Ad-hoc code comments without central OpenAPI schema**: Rejected due to lack of toolchain interoperability and test
  contract generation.
