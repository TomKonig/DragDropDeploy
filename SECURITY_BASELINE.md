# Security Baseline (Initial Scaffold)

This document will evolve. Current baseline principles applied or planned:

## Defense in Depth

- Run behind Traefik with separate `internal` and `proxy` networks; Postgres & Redis only on `internal`.
- No privileged containers; future hardening: read-only FS for frontend / minimal perms.
- ACME automation for TLS (staging now, production later) + fallback self-signed for offline dev.

## Least Privilege / DB

- Future: dedicated roles (migrator, app_rw, app_ro). Runtime will *not* use superuser.
- RLS to be enabled after schema stabilization; tenant scoping via session variable.
- Document JIT elevated role procedure for maintenance.
- Roles script added at `backend/prisma/db_roles.sql`; production to run via isolated migration job, not app container.
- Separate DATABASE_URLs: one for migrations (migrator), one for runtime (app_rw), optional reporting (app_ro).

## Secrets & Config

- All secrets via environment variables; encourage Docker secrets for production.
- JWT secret placeholder requires change before production (highlight in README).

## OAuth (Planned)

- Enforce state + nonce (OIDC) and minimal scopes.
- First successful OAuth login becomes operator only if no operator exists.
- Rate-limit auth initiation & callback endpoints.

## Build Isolation (Planned)

- Start with local process builds; feature flag to enable containerized isolation later.
- Resource caps & timeouts on build jobs before enabling multi-tenant mode.

## Logging & Privacy

- Build logs stored without secrets; redaction layer to be added for env values.

## Supply Chain

- CI includes (commented) Snyk steps; to activate once SNYK_TOKEN secret provided.
- Pin base images (node:20-alpine, nginx:1.27-alpine, postgres:16-alpine, redis:7-alpine, traefik:v3.0).

## Next Steps (Security)

- Implement DB role creation migration scripts.
- Add rate limiting middleware (login/build trigger) before public release.
- Add Helmet & stricter CORS config when API domain finalized.
- Add automated dependency audit gating high severity vulnerabilities.
- Re-enable docker internal network isolation for Postgres/Redis; provide host access via ephemeral migration sidecar.
- Replace plaintext role passwords with secrets manager or Docker/K8s secrets.
