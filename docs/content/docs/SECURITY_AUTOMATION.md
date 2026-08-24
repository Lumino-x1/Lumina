# Security automation policy

## Required GitHub security controls

Repository administrators must enable these GitHub repository settings:

- **Dependabot alerts** and **Dependabot security updates**.
- **Secret scanning** with push protection, including partner-pattern alerts.
- **Code scanning** and default setup if GitHub Advanced Security is available; this repository also includes a CodeQL
  workflow.
- **Dependency graph** for the repository.

`dependabot.yml` opens weekly Bun and GitHub Actions update pull requests. The pull-request dependency review blocks
newly introduced dependencies with a known high-or-critical severity advisory or disallowed license.

## Container vulnerability policy

CI builds the API production image and runs Trivy against it. Any **CRITICAL** vulnerability with an available fix fails
CI. High vulnerabilities, unfixed critical vulnerabilities, and findings in indirect base-image layers are triaged
within five business days and recorded in the security tracker. Exceptions require a security-owner approval, an expiry
date, and a remediation issue.

## Secret policy

Secret scanning does not replace review: never commit credentials, private keys, connection strings containing
passwords, or copied production configuration. Follow [SECRETS.md](SECRETS.md) for AWS runtime-secret handling and
rotate any exposed credential immediately.
