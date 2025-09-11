---
title: Local Development
---

## Overview

Fast path to clone, run, test, and contribute.

## Prerequisites

- Node.js 20.x (LTS) & npm 10+
- Docker (for Postgres/Redis via compose) OR local Postgres 16 + Redis 7
- Git

## Clone & Install

```bash
git clone https://github.com/TomKonig/DragDropDeploy.git
cd DragDropDeploy
npm install
```

Workspaces install dependencies for: root, backend, frontend, shared.

## Environment Variables (Dev Defaults)

Create `.env` at project root (or use shell exports):

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://ddd:ddd@localhost:5432/ddd
REDIS_URL=redis://localhost:6379/0
JWT_SECRET=dev_change_me
JWT_EXPIRES_IN=15m
MAX_UPLOAD_MB=25
STORAGE_ROOT=.data/storage
```

## Start Infrastructure (Docker)

```bash
docker compose up -d postgres redis
```

(Uses services defined in `docker-compose.yml`).

## Generate Locales

```bash
npm run generate:locales
```

This flattens YAML under `locales/en` into `shared/src/locales/` and types.

## Run Backend (watch)

```bash
npm run dev -w backend
```

## Run Frontend (watch)

```bash
npm run dev -w frontend
```

## Database Migrations

Apply migrations (creates DB schema):

```bash
npm run prisma:migrate:deploy -w backend
```

Create a new migration (schema change):

```bash
# Edit backend/prisma/schema.prisma
npm run prisma:migrate:dev -w backend -- --name add_something
```

## Testing

Single e2e spec:

```bash
npm test -w backend -- deployments/__tests__/deployment.upload.e2e.spec.ts --runInBand
```

All tests:

```bash
npm test -w backend
```

## Lint & Type Check

```bash
npm run lint
npm run typecheck
```

## Build Artifacts (Prod simulation)

```bash
npm run build
```

Outputs:

- Backend dist in `backend/dist`
- Frontend build (when implemented) in its dist folder
- Shared emitted declarations

## Cleaning

```bash
git clean -fdX  # WARNING: removes ignored files
rm -rf .data
```

## Common Issues

| Symptom | Fix |
|---------|-----|
| Prisma cannot reach DB | Ensure postgres container running & DATABASE_URL correct |
| Redis connection refused | Start redis service (`docker compose up -d redis`) |
| Locale key missing error | Re-run `npm run generate:locales` |
| Tests hang on teardown | Ensure no orphan containers; try `docker ps` then remove stale test containers |

## Next Steps

- Read `docs/architecture/spec.md` for deeper internals
- See `docs/extensibility/plugins.md` for hook concepts
- Follow `docs/development/contributing.md` before opening PRs
- Try the Quickstart guide (`getting-started/quickstart.md`) for a minimal deploy + first project
