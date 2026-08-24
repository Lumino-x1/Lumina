# API contract

The executable contract is [openapi.yaml](api/openapi.yaml). Update it in the same pull request as any externally
observable API change.

- Authentication uses Better Auth session cookies. JSON uses `application/json`; post media uses `multipart/form-data`.
- Errors are JSON with at least a `message`. New endpoints should adopt
  `{ "error": { "code", "message", "requestId?" } }`.
- Use standard statuses: `200`, `201`, `202`, `400`, `401`, `403`, `404`, `409`, `429`, and `5xx`.
- Collections use one-based `page` and capped `limit`; the leaderboard cap is 100. Manual LeetCode sync has a
  five-minute cooldown and returns `429` with `retryAfterSeconds`.

All API routes are mounted under `/api`. Breaking changes require documented migration notes.
