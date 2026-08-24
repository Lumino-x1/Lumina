# Database migration workflow

Prisma schema changes are deployed through reviewed migration files in `packages/db/prisma/migrations`.

```text
Schema change → create migration → test locally → pull request → CI → staging → production
```

## Development

1. Update `packages/db/prisma/schema.prisma`.
2. Set `DATABASE_URL` to local PostgreSQL.
3. Create a named migration: `bunx prisma migrate dev --schema packages/db/prisma/schema.prisma --name <name>`.
4. Review generated SQL, regenerate Prisma, and run affected tests.
5. Include the migration, test evidence, and rollout plan in the PR.

`prisma migrate dev` is development-only. Staging and production must run:

```bash
bunx prisma migrate deploy --schema packages/db/prisma/schema.prisma
```

## Safety, failure, and production

- Use expand/migrate/contract changes: introduce backward-compatible structures, deploy compatible code, backfill, and
  remove old structures later.
- Test migrations against a fresh database and representative sanitized data before staging. Confirm backups before
  destructive work.
- Never edit or delete an already-applied shared-environment migration. If it fails, pause deployment, inspect
  `prisma migrate status`, restore compatible application code if necessary, and issue a new corrective migration.
- A production deployment role applies `migrate deploy` once after CI, review, backup, and rollback-plan approval.
  Verify migration status, health checks, and database metrics during a staffed rollout.
