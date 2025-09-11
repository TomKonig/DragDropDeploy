---
title: Configuration Reference
---

{% raw %}
{{ include_original('../../CONFIGURATION.md') }}
{% endraw %}

<!-- Temporary: Inline copy until include tooling exists -->

## Configuration Reference

(Source migrated from root `CONFIGURATION.md`)

<!-- Synchronized copy -->

This document classifies all platform settings and indicates where they live.

| Scope | Name / Key | Source | Mutable at Runtime | Secret | Notes |
|-------|------------|--------|--------------------|--------|-------|
| Core | DATABASE_URL | env | restart | yes | Separate MIGRATOR_DATABASE_URL later. |
| Core | REDIS_URL | env | restart | no | Connection string for queue/cache. |
| Core | JWT_SECRET | env | restart (rotation deploy) | yes | Rotate via deployment; triggers token invalidation. |
| Core | ENCRYPTION_KEY | env | restart | yes | For encrypting stored third‑party secrets (future). |
| Core | NODE_ENV | env | restart | no | Standard Node environment. |
| Core | PORT | env | restart | no | Backend listen port. |
| Core | LOG_LEVEL | env | restart | no | Logger level (trace, debug, info, warn, error). |
| Core | PRIMARY_DOMAIN | env | restart (rare) | no | Base root domain for platform; additional domains via dashboard. |
| Core | API_HOST | env | restart | no | Hostname bound to API router. |
| Core | APP_HOST | env | restart | no | Hostname bound to frontend. |
| Core | BUILD_MODE | env | restart | no | One of: local, docker (future isolation). |
| Feature Flag | ENABLE_RLS | env | restart | no | Activates Row Level Security policies. |
| Feature Flag | ENABLE_OAUTH | env | restart | no | Enables OAuth flows if provider creds present. |
| Feature Flag | ENABLE_STRIPE | env | restart | no | Enable billing endpoints. |
| External | S3_ENDPOINT | env | restart | no | Optional object storage. |
| External | S3_BUCKET | env | restart | no | Bucket name. |
| External | S3_ACCESS_KEY | env | restart | yes | Access key. |
| External | S3_SECRET_KEY | env | restart | yes | Secret key. |
| External | SMTP_HOST | env | restart | no | Email delivery (future). |
| External | SMTP_PORT | env | restart | no | Port for SMTP. |
| External | SMTP_USER | env | restart | yes | SMTP auth. |
| External | SMTP_PASS | env | restart | yes | SMTP auth. |
| OAuth | OAUTH_GOOGLE_CLIENT_ID | env | restart | yes | Example provider. |
| OAuth | OAUTH_GOOGLE_CLIENT_SECRET | env | restart | yes |  |
| OAuth | OAUTH_GITHUB_CLIENT_ID | env | restart | yes |  |
| OAuth | OAUTH_GITHUB_CLIENT_SECRET | env | restart | yes |  |
| Stripe | STRIPE_SECRET_KEY | env | restart | yes | If billing enabled. |
| Stripe | STRIPE_WEBHOOK_SECRET | env | restart | yes | Validate webhooks. |
| Security | RATE_LIMIT_LOGIN | db (system_settings) | yes | no | Max attempts per window (future db-managed). |
| Security | RATE_LIMIT_AUTH_CAPACITY | env | restart | no | In-memory auth login attempt capacity (default 5). |
| Security | RATE_LIMIT_AUTH_WINDOW_MS | env | restart | no | In-memory auth rate limit window in ms (default 60000). |
| Security | RATE_LIMIT_BUILD_TRIGGER | db | yes | no | Prevent abuse. |
| Operator | SIGNUP_MODE | db | yes | no | Modes: open, invite, closed. |
| Operator | ALLOWED_BASE_DOMAINS | db | yes | no | JSON array of domains. |
| Operator | GLOBAL_SNIPPET | db | yes | no | HTML injected into `<head>`. |
| Operator | ENABLE_USER_SNIPPETS | db | yes | no | Toggle per-user snippets. |
| Operator | DEFAULT_BUILD_TIMEOUT_SEC | db | yes | no | Execution cap. |
| Operator | MAX_VERSION_RETENTION | db | yes | no | Keep last N versions. |
| Operator | BUILD_CONCURRENCY_GLOBAL | db | yes | no | Global limit. |
| Operator | BUILD_CONCURRENCY_PER_USER | db | yes | no | Per-user limit. |
| Plans | PLAN_MATRIX | db | yes | no | JSON definition of plans. |
| Plans | PLAN_OVERRIDE (per-user) | db | yes | no | Specific user plan override. |
| Project | USER_SNIPPET | db (project_settings) | yes | no | Per-project injection. |
| Project | CUSTOM_DOMAINS | db | yes | no | Verified domains list. |
| Project | SPA_MODE | db | yes | no | Serve index.html fallback. |
| Maintenance | MAINTENANCE_MODE | db | yes | no | Returns 503 for non-admin. |
| Build | QUEUE_CONCURRENCY | db | yes | no | Worker concurrency hint. |
| Build | BUILD_ALLOWED_SSGS | db | yes | no | Enum whitelist. |
| Build | CUSTOM_BUILD_COMMAND_WHITELIST | db | yes | no | Safe commands list. |
| Future Secret | OUTBOUND_WEBHOOK_SECRET | encrypted db | write-only | yes | Store hashed/encrypted. |
| Upload | MAX_UPLOAD_MB | env | restart | no | Max allowed upload archive size (default 25). |
| Upload | ARTIFACTS_DIR | env | restart | no | Directory where extracted deployment artifacts are persisted (default ./artifacts). |

### Discovered Runtime Environment Variables (Audited)

The following variables are currently parsed in code (grep of `process.env`). Those already in the table above are not repeated unless clarifying defaults.

| Name | Location | Default | Purpose | Notes |
|------|----------|---------|---------|-------|
| JWT_EXPIRES_IN | backend auth.service/module | 15m | Access token lifetime | Short lifetimes reduce replay risk. |
| RATE_LIMIT_AUTH_CAPACITY | auth rate-limit middleware/guard | 5 | Max login attempts per window | Increase cautiously. |
| RATE_LIMIT_AUTH_WINDOW_MS | auth rate-limit middleware/guard | 60000 | Rate limit window size (ms) | Pair with capacity. |
| MAX_UPLOAD_MB | deployments.controller | 25 | Max upload size (MB) | Already in main table. |
| ARTIFACTS_DIR | deployments.service | ./artifacts | Artifact persistence root | Ensure volume persistence in Docker. |
| LOG_LEVEL | app.module | info | Pino log level | Lower verbosity in prod. |
| CORS_ORIGINS | main.ts | (empty) | Comma list of allowed origins | Empty = allow none beyond same-origin. |
| PORT | main.ts | 3000 | API listen port | Map via container port if using Docker. |
| OPERATOR_BOOTSTRAP_EMAIL | users.service / seed script | (none) | First user bootstrap email | Provide during initial deploy. |
| OPERATOR_BOOTSTRAP_PASSWORD | seed script | (none) | Initial operator password | Used only if creating first user. |
| APP_VERSION | status.controller | 0.0.1 | Reported version override | Usually auto from package version. |
| RLS_ENABLED | prisma.service | (unset) | Toggle enabling PostgreSQL RLS at runtime | Future security hardening; ensure policies exist. |
| REDIS_URL | build.queue & tests | (unset) | Enables Redis-backed queue | Absence falls back to in-memory/no-queue path. |
| DATABASE_URL | prisma/test env | (none) | DB connection | Must be set in all environments. |
| JWT_SECRET | main.ts / auth | (none) | HMAC secret for JWT | REQUIRED to start server. |
| npm_package_version | main.ts (via env injection) | package.json version | Provided automatically by npm scripts | Do not set manually normally. |
| NO_DOCKER | test (build queue redis e2e) | (unset) | Skip spinning test containers | Internal testing convenience. |

### Missing vs. Proposed Variables

Some variables listed in the primary table aren't yet implemented in code (e.g., ENABLE_RLS vs actual `RLS_ENABLED` usage, ENABLE_OAUTH, billing/OAuth, SMTP). They act as forward-looking markers for planned functionality. Align naming before implementing to avoid drift (preferred: consistent prefixing; e.g., `OAUTH_GOOGLE_CLIENT_ID`).

Action Items:

- Normalize `ENABLE_RLS` (doc) vs `RLS_ENABLED` (code) – pick one (recommend `RLS_ENABLED`).
- Remove or clearly mark unimplemented flags until first usage PR.
- Consider central config service with schema validation (Zod or class-validator) to unify defaults.

### Hierarchy Resolution

1. Environment variables load first for core bootstrap.
2. Database settings (system_settings table) hydrate a cached config service.
3. Per-user / per-project settings overlay where appropriate.
4. Feature flags in env can hard-disable related dashboard toggles.

### Database Schema (Proposed)

...existing content from original file...

