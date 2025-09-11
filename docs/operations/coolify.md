---
title: Coolify Deployment Guide
---

## Coolify Deployment Guide

This guide shows how to deploy DragDropDeploy on Coolify using the provided `docker-compose.coolify.yml` (no embedded Traefik – Coolify manages proxy, TLS, and domains).

### 1. Files

Required file: `docker-compose.coolify.yml` (in repo root)
Optional: `.env` (values can instead be set via Coolify UI secrets)

### 2. Services Overview

| Service   | Purpose                          | Exposed Port | Notes |
|-----------|----------------------------------|--------------|-------|
| postgres  | Primary database (PostgreSQL 16) | (none)       | Internal only; reachable by backend container. |
| redis     | Queue / cache / locks            | (none)       | Internal only. |
| backend   | NestJS API                       | 3000         | Coolify will route HTTP(S) to this. |
| frontend  | Vite dev build server (optional) | 5173         | For production bundle via backend; this container optional. |

### 3. Import into Coolify

1. In Coolify: New Resource -> Docker Compose.
2. Select repository (Git) & branch.
3. Provide path: `/docker-compose.coolify.yml` (root).
4. Coolify parses services; choose which to expose publicly:
	- Expose `backend` (port 3000). Optionally map a domain or subdomain.
	- Optionally expose `frontend` (port 5173) if keeping a separate dev UI; for production you will likely serve a static build via backend or nginx.
5. Leave `postgres` and `redis` unexposed (internal only). Do NOT publish their ports.
6. Save & deploy.

### 4. Environment Variables (Core)

Set these in Coolify for the `backend` service (Secrets section):

- `NODE_ENV=production`
- `PORT=3000`
- `DATABASE_URL=postgresql://ddd:change_me@postgres:5432/ddd`
- `REDIS_URL=redis://redis:6379/0`
- `JWT_SECRET=CHANGE_THIS_SECRET` (after auth module added)
- `JWT_EXPIRES_IN=15m` (example)
- `MAX_UPLOAD_MB=25` (example limit for uploads)
- `STORAGE_ROOT=/data/storage` (will be a mounted volume path)

(Optional future): S3 credentials, OAuth client IDs, feature flags.

### 5. Volumes & Persistence

Current compose maps named volumes:

- `pgdata` (PostgreSQL data)
- `redisdata` (Redis AOF data)

Add (recommended) a volume for build artifacts & deployments (update compose later):

- `deploydata:/data/storage`

Then set `STORAGE_ROOT=/data/storage` to have persistent deployment artifacts.

### 6. Networking & Security

- Single `internal` network keeps DB and Redis isolated.
- Only backend & frontend have published ports (Coolify ingress attaches here).
- Ensure no direct public exposure of Postgres or Redis (default compose already safe).
- Use Coolify's built‑in TLS (Let’s Encrypt) when attaching domains; the app assumes HTTPS at the edge.

### 7. Domains & Routing

- Assign a dashboard domain to the `backend` container (e.g. `app.example.com`).
- Future: For user site subdomains, add a wildcard domain (e.g. `*.sites.example.com`) pointing to Coolify's proxy and extend backend routing logic to map hostnames -> project artifacts.
- Until dynamic subdomain hosting is implemented, you can test core API/UI via a single domain.

### 8. Differences vs Local `docker-compose.yml`

| Aspect | Local Dev (Traefik) | Coolify Variant |
|--------|----------------------|-----------------|
| Reverse Proxy | Traefik in stack | Coolify managed |
| TLS Dev Certs | Self-signed fallback | Coolify issues certs |
| Networks | `proxy` + `internal` | Single `internal` |
| Published DB/Redis Ports | Postgres mapped for tooling | Not exposed |
| Frontend | Traefik host rule | Direct port or merged later |

### 9. Production Hardening Checklist

- Change all default passwords & secrets (DB, JWT, OAuth).
- Create least-privilege DB roles (script already in `backend/prisma/db_roles.sql`) and adjust DATABASE_URL to use app role (not superuser) after migrations.
- Add resource limits in compose (future enhancement) for CPU/memory.
- Consider enabling Postgres `pg_hba.conf` host restrictions (custom image) if exposing externally (not needed here).
- Plan backup: schedule `pg_dump` via Coolify cron or external system.

### 10. Deployment Updates

- Coolify auto-redeploys on git push (if configured) or manual trigger.
- Prisma migrations: On image start, run `npx prisma migrate deploy` (add an init script or entrypoint wrapper in future iteration).
- Static frontend: Build in CI and serve from backend (add copy step) to eliminate `frontend` container.

### 11. Zero-Downtime Strategy (Future)

- Introduce versioned artifact directories and a pointer (symlink) for active.
- Preload new version then atomically swap pointer.
- Health endpoint (`/health`) used by Coolify for rolling restart checks.

### 12. Rollback Procedure (Interim)

Until automated rollback implemented:

1. Keep previous deployment artifact directory (manual copy).
2. If new deploy fails, manually restore old directory & restart backend service in Coolify.

### 13. Post-Auth Integration Steps (When Auth Added)

- Add `JWT_SECRET`, `JWT_EXPIRES_IN`.
- If OAuth: add provider envs (e.g. `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `OAUTH_REDIRECT_URL`).
- Enforce HTTPS cookie settings (`SECURE_COOKIES=true`).

### 14. Observability (Future)

- Add minimal logs volume or external log shipping.
- Expose metrics endpoint (e.g. `/metrics`) and integrate with Prometheus stack (optional).

### 15. Quick Validation

After first deploy:

- API: `curl https://app.example.com/health` -> expect `ok`.
- DB connectivity: create a user/project via API (once implemented).
- Verify volumes: inspect `pgdata` size grows after operations.

### 16. Next Compose Enhancements (Planned)

- Add dedicated volume for deployment artifacts.
- Add resource limits & read-only FS for backend.
- Add init container (migration) & separated migrator role.

Minimal first deployment is now reproducible in Coolify. Update this doc as new features (auth, upload, build pipeline, multi-domain routing) land.
