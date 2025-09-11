# Configuration Reference (Moved)

> This file moved to `docs/reference/configuration.md`. Keep editing there; this is a pointer for backward compatibility.

This concise placeholder remains for ecosystem expectations. Full, updated content now lives in `/docs/reference/configuration.md` which is part of the MkDocs scaffold (`mkdocs.yml`).

If you are reading this on GitHub, navigate to: `docs/reference/configuration.md`.

---

Legacy content (will be trimmed in future):

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
| Build | BUILD_EXECUTION_ENABLED | env | restart | no | When 'true', enables real build executor (npm run build) instead of simulated steps. |
| Build | BUILD_LOGS_DIR | env | restart | no | Override build logs directory (default: ./backend/artifacts/build-logs). |
| Future Secret | OUTBOUND_WEBHOOK_SECRET | encrypted db | write-only | yes | Store hashed/encrypted. |
| Upload | MAX_UPLOAD_MB | env | restart | no | Max allowed upload archive size (default 25). |
| Upload | ARTIFACTS_DIR | env | restart | no | Directory where extracted deployment artifacts are persisted (default ./artifacts). |

## Hierarchy Resolution

1. Environment variables load first for core bootstrap.
2. Database settings (system_settings table) hydrate a cached config service.
3. Per-user / per-project settings overlay where appropriate.
4. Feature flags in env can hard-disable related dashboard toggles.

## Database Schema (Proposed)

system_settings

- key (text primary)
- value (text)
- type (enum: string|int|bool|json)
- updated_by (uuid FK user)
- updated_at (timestamp)

plans

- id (uuid)
- name (text)
- limits (jsonb) { maxProjects, storageMb, allowCustomDomain, buildTimeoutSec, retention }
- created_at, updated_at

user_plan_overrides

- user_id (uuid PK/FK user)
- plan_id (uuid FK plans)
- created_at

projects_settings

- project_id (uuid PK)
- user_snippet (text)
- spa_mode (bool)
- retention_override (int, nullable)

custom_domains

- id (uuid)
- project_id (uuid FK)
- hostname (text unique)
- verified (bool)
- verification_token (text)
- created_at, verified_at

audit_log

- id (uuid)
- actor_id (uuid FK user)
- entity (text)
- entity_id (uuid nullable)
- action (text)
- before (jsonb)
- after (jsonb)
- created_at (timestamp)

## Mutation Workflow

- Dashboard POST -> validation layer -> atomic DB update -> audit_log entry -> config cache bust -> in-memory config refreshed.

## Security Notes

- All secrets stay exclusively in env or encrypted fields; never re-render full secret after creation.
- ENCRYPTION_KEY must be rotated with a re-encryption utility (future script).
- PLAN_MATRIX can be modeled either as normalized tables (plans + plan_features) or a single jsonb; initial version uses jsonb for speed.

## Plan Overrides Explained

A plan override assigns a user a different plan than the default associated with their current subscription/tier logic. Example: a user on the "Free" plan gets temporarily upgraded to the limits of "Pro" (higher storage, more projects) without altering global plan definitions.

## Minimal Initial Settings in Dashboard

- ALLOWED_BASE_DOMAINS
- SIGNUP_MODE
- GLOBAL_SNIPPET
- MAX_VERSION_RETENTION
- DEFAULT_BUILD_TIMEOUT_SEC

These give immediate operator control without broad schema expansion.

---
This reference will evolve as features land; keep CHANGELOG in sync when adding/removing configuration keys.

## Row Level Security (RLS) & Tenant Context

RLS is planned but not yet enforced. The environment flag `ENABLE_RLS` is a forward‑looking switch. Current behavior when the flag is set (today):

- No database row policies are applied yet; schema migrations for policies will arrive in a later phase.
- A `TenantInterceptor` establishes a per‑request AsyncLocalStorage store containing the authenticated `userId`.
- Helper `getTenantUser()` returns the current user id inside service / repository layers without threading it through function parameters.
- Future implementation will, when `ENABLE_RLS=true`, execute a `SET LOCAL app.user_id = '<uuid>'` (or similar) early in each request DB transaction so Postgres RLS policies can reference `current_setting('app.user_id')`.

Planned steps (tracked in tasklist):

1. Add RLS policies for multi‑tenant tables (`projects`, `build_jobs`, `deployments`, settings tables) referencing the session variable.
2. Ensure an admin / operator bypass role exists for maintenance tasks (using a distinct DB role with audited usage).
3. Run test suite in both modes (RLS disabled/enabled) to guarantee policy coverage.

Until those policies land, `ENABLE_RLS` is effectively a no‑op and safe to leave unset. Leaving the flag documented early avoids a breaking change in naming later.

## OpenAPI / API Documentation

Swagger UI is served at `/docs` (auto-generated OpenAPI 3 spec). Currently always enabled; consider adding `ENABLE_SWAGGER=false` for hardened production.

Planned hardening:

- Optional env flag (`ENABLE_SWAGGER`)
- Role guard (operator only) or auth requirement
- ETag caching of spec document

Related env keys today:

- `LOG_LEVEL` influences verbosity of request logging around doc access.

Do not expose `/docs` publicly until guarded if threat model requires minimizing attack surface (enumeration of endpoints).
