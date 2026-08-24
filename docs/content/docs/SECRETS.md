# Production secret management

Lumina uses **AWS Secrets Manager** for credentials, tokens, and API keys. It is the preferred AWS service because it
supports managed rotation, fine-grained access, audit trails, and cross-account patterns. Use **AWS Systems Manager
Parameter Store** only for non-secret configuration (for example, public service endpoints and feature flags); use
`SecureString` only when a low-cost encrypted value does not need Secrets Manager lifecycle features.

## Secret inventory and naming

Create separate secrets for each environment under this convention:

```text
lumina/<environment>/<service>/<name>
lumina/production/api/database-url
lumina/production/api/better-auth
lumina/production/api/resend
lumina/production/api/storage
lumina/production/api/stream
```

Use a customer-managed KMS key per environment. Store one credential or tightly related JSON object per secret; tag
every secret with `application=lumina`, `environment`, `owner`, and `rotation`.

## Creation and access

| Actor                  | Access pattern                                                                                                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Platform administrator | Creates and tags secrets with IaC or the AWS console; the secret value is supplied outside Git and Terraform state.                                                          |
| Developer              | Uses local, untracked `.env` values or an approved development-secret access role. Developers do not receive staging or production secrets by default.                       |
| CI                     | Uses GitHub Actions OIDC to assume a short-lived deployment role. It may read only the environment-specific secrets needed for deployment, never echo secret values in logs. |
| Production workload    | ECS task execution role reads only referenced Secrets Manager ARNs and KMS decrypt permission. ECS injects them at container start via the task definition `secrets` field.  |

Application code, Dockerfiles, Compose files, GitHub workflows, and repository configuration must contain variable names
and secret ARNs only—never values. Images are built without secrets. In ECS, secret changes do not update an
already-running container; redeploy/restart tasks after rotation.

## Rotation

- Database credentials: use a Secrets Manager rotation Lambda and test failover before enabling automatic rotation.
- Third-party tokens and application secrets: rotate at least every 90 days, or immediately after suspected exposure or
  personnel/access changes.
- Rotation owner creates a new version, updates dependent provider credentials, validates a newly started staging task,
  then deploys production tasks using the new version.
- Retain the previous version only for the documented rollback window; revoke it afterward.
- Record rotations and access exceptions in the security change log without recording secret values.

## Incident response

If a secret is exposed, revoke or rotate it immediately, invalidate active sessions if appropriate, redeploy affected
workloads, and privately record scope and remediation. Do not place exposed values in an issue, pull request, or
incident document.

## AWS reference implementation

For ECS, map each environment variable to a precise Secrets Manager ARN (or specific JSON key) in
`containerDefinitions[].secrets`, and grant the task execution role `secretsmanager:GetSecretValue` only for those ARNs
plus `kms:Decrypt` for their key. AWS documents this runtime injection model and notes that new tasks are required to
receive rotated values.
[ECS secret injection](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/secrets-envvar-secrets-manager.html)
and
[AWS guidance on choosing Secrets Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-policies.html)
provide the underlying service guidance.
