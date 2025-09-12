---
title: Docker Compose Deployment
---

\n## Docker Compose Deployment  
**Status:** Shipped (baseline) – resource limits & automated rollback Planned

Standard self-host deployment using the provided `docker-compose.yml` (includes Traefik reverse proxy, Postgres, Redis, backend, optional frontend).

### Overview

| Component | Role | Exposed | Notes |
|-----------|------|---------|-------|
| traefik | Reverse proxy / ACME | 80/443 | Terminates TLS, routes by host rules |
| postgres | Database | Internal | No public port by default (unless override) |
| redis | Cache / queues | Internal | Internal-only |
| backend | API + artifact serving | :3000 (internal) | Routed externally via Traefik host rule |
| frontend | (Optional) Dev UI / static | :5173 (internal) | You may later bake into backend image |

### Prerequisites

- Domain pointing to host (A/AAAA record)
- Docker & docker compose plugin
- Email for ACME (Let's Encrypt)

### Initial Setup

```bash
git clone https://github.com/TomKonig/DragDropDeploy.git
cd DragDropDeploy
cp .env.example .env  # create if you want overrides (provide if not present)
```

### Environment Variables

Key variables (see also `reference/configuration.md`):

| Variable | Purpose | Example | Required |
|----------|---------|---------|----------|
| NODE_ENV | Runtime mode | production | yes |
| DATABASE_URL | Postgres connection (internal service name) | postgresql://ddd:change@postgres:5432/ddd | yes |
| REDIS_URL | Redis connection | redis://redis:6379/0 | yes |
| JWT_SECRET | Auth token signing | (long random) | yes (if auth enabled) |
| MAX_UPLOAD_MB | Max ZIP upload size | 25 | yes |
| STORAGE_ROOT | Artifact storage path | /data/storage | yes |

### Traefik Host Rules

In `docker-compose.yml`, define labels on backend service:

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.ddd.rule=Host(`app.example.com`)"
  - "traefik.http.routers.ddd.entrypoints=websecure"
  - "traefik.http.routers.ddd.tls.certresolver=letsencrypt"
```

Modify `app.example.com` to your domain.

### Start Stack

```bash
docker compose up -d
```

Check status:

```bash
docker compose ps
```

### Verify

```bash
curl -k https://app.example.com/health
```
Expect JSON or simple OK depending on implementation.

### Persistent Data

Named volumes (from compose):

- `pgdata` (Postgres data)
- `redisdata` (Redis persistence if AOF enabled)
- `artifacts` (add if not yet present for STORAGE_ROOT)

Add to compose (if missing):

```yaml
volumes:
  artifacts:
services:
  backend:
    volumes:
      - artifacts:/data/storage
```

### Upgrades

1. Pull latest code or switch to tagged release.
1. Rebuild / pull images (once CI publishes images; interim: `docker compose build backend frontend`).
1. Run migrations:

  ```bash
  docker compose exec backend npx prisma migrate deploy
  ```

1. Restart stack (if not using recreate on pull):

  ```bash
  docker compose up -d
  ```

1. Validate health endpoint.

### Rollback (Interim – Planned automated rollback later)

1. Stop stack: `docker compose down` (leave volumes).
2. Checkout previous git tag / commit.
3. Rebuild images: `docker compose build backend frontend`.
4. Start: `docker compose up -d`.
5. (If incompatible migration applied) restore DB from backup (see `rollback` doc).

### Backups

Postgres logical backup:

```bash
docker compose exec postgres pg_dump -U ddd ddd > backup-$(date +%F).sql
```

Automate via cron on host.

### Logs

Tail backend:

```bash
docker compose logs -f backend
```

Traefik access logs (if enabled):

```bash
docker compose logs -f traefik
```

### Security Hardening

- Ensure strong `JWT_SECRET` & DB password
- Restrict Traefik dashboard (if enabled) behind auth or disable
- Add resource limits: `deploy.resources.limits` (future)
- Optional: enable rate limiting middleware for auth endpoints

### Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| 404 at domain | Host rule mismatch | Update traefik rule label |
| TLS fails | ACME challenge blocked | Open ports 80/443, remove firewall block |
| DB auth error | Wrong password in `DATABASE_URL` | Align with Postgres env vars |
| Upload rejected | Size/compression/path violation | Check backend logs for validation reason |

### Next

- Configure Coolify? See `operations/coolify.md`.
- Manual install? See `operations/manual-install.md` (after adding).
- Learn build pipeline: `architecture/build-pipeline.md` (after adding).
