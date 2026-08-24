# Environment management

Lumina uses four environments. Configuration is supplied through environment variables; secrets belong in the deployment
platform's secret store, never in Git.

| Environment   | Purpose                            | Source of configuration                                        |
| ------------- | ---------------------------------- | -------------------------------------------------------------- |
| `local`       | Individual developer workstations  | Untracked `.env` or `.env.local` copied from `.env.example`    |
| `development` | Shared integration environment     | CI/deployment secret store and non-production managed services |
| `staging`     | Production-like release validation | CI/deployment secret store and isolated staging services       |
| `production`  | Live user traffic                  | CI/deployment secret store with production-only credentials    |

## Local setup

Copy `.env.example` to `.env`, fill in local credentials, and do not share the resulting file. `.env`, `.env.local`,
`.env.development`, `.env.staging`, `.env.production`, and all `.env.*` variants are ignored by Git. `.env.example` is
deliberately tracked and must never contain values.

## Promotion rules

- Build once and promote the same reviewed commit from development to staging and production.
- Use separate database, Redis, storage, auth, and Stream credentials for each shared environment.
- Never point a non-production environment at production data or credentials.
- Rotate a secret immediately if it is exposed, then invalidate the old credential and document the incident privately.
- Configuration changes are reviewed as infrastructure changes and require the relevant CODEOWNER.

## Required variables

`.env.example` is the authoritative list of expected variables. Add new variables there with an empty value and document
their consumer package or app in the corresponding pull request.
