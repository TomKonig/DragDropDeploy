# DragDropDeploy (WIP)

Deploy static sites in minutes. Self‑hosted. Open Source.

Drag & drop a ZIP → get a live site (workflow in progress). This project is early; expect fast change.

## Current Capabilities

* Email/password auth (first user becomes operator)
* Project creation + secure ZIP upload (deployment enters BUILDING)
* Artifact persistence (`ARTIFACTS_DIR`)
* Build jobs with simulated or real execution (feature-flagged)
* Deployment activation (symlink) & static file serving endpoint
* Rollback to previous deployment (most recent inactive or explicit ID)
* Settings + config validation
* i18n foundation (shared YAML locales)
* OpenAPI docs at `/docs`

Full technical spec & roadmap: see `MAINTAINERS.md`.

## Roadmap (Short List)

* Build execution + status transitions
* Version history & rollback
* Custom and wildcard domains
* Snippet injection (global & per project)
* OAuth + invite codes
* Plans / quotas / usage metrics

## Quick Start (Experimental)

```bash
git clone https://github.com/TomKonig/DragDropDeploy.git
cd DragDropDeploy
cp .env.example .env   # edit DATABASE_URL + JWT_SECRET
docker compose up -d
```

Open <http://localhost:3000> and register; first account becomes operator.

### Minimal Environment Variables

| Key | Purpose |
|-----|---------|
| DATABASE_URL | Postgres connection string |
| JWT_SECRET | 16+ char signing secret |
| MAX_UPLOAD_MB | (optional) Upload size limit (default 25) |
| ARTIFACTS_DIR | (optional) Where deployment artifacts persist |

See `CONFIGURATION.md` for the full list.

### Build System & Logs

Builds are queued per project. Without Redis, an in-memory simulation runs. With `REDIS_URL` set, BullMQ processes jobs. Build execution defaults to simulated steps unless you set:

```bash
export BUILD_EXECUTION_ENABLED=true
```

When enabled, the executor runs `npm run build --if-present` at the repo root, capturing stdout/stderr to a file under `backend/artifacts/build-logs/<buildId>.log`. Logs are retrievable via:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/builds/<buildId>/logs
```

Optional query `?tail=200` returns the last N lines. Basic redaction masks bearer tokens and obvious secret patterns. Future work: sandboxing & SSG detection.

### Deployment & Rollback (MVP)

1. Upload a deployment artifact ZIP: `POST /deployments/upload` (multipart fields: `projectId`, `file`)
2. (If build executor enabled) wait for build success; else manually activate with `POST /deployments/{deploymentId}/activate`.
3. Serve site root: `GET /deployments/project/{projectId}/site/` (serves `index.html` of active artifact). Append a path segment to fetch a file.
4. New deployment activation auto-inactivates the previous active deployment.
5. Rollback: `POST /deployments/project/{projectId}/rollback` (body optional: `{ "targetDeploymentId": "..." }`).

Security notes:

* Path traversal blocked during extraction & serving (realpath + prefix checks).
* Directory listing disabled; only files or implicit `index.html` are served.
* Deployment endpoints require authentication (JWT bearer). Future enhancement: role-based restrictions & per-project scopes.

## Contributing

PRs welcome. Keep this README short—put deep architectural details in `MAINTAINERS.md`.

## Philosophy

* Start incredibly simple; scale only if necessary
* Favor transparency over magic
* Secure defaults; explicit extension points

## Related Docs

* Technical / Architecture: `MAINTAINERS.md`
* Configuration Reference: `CONFIGURATION.md`
* Security Baseline: `SECURITY_BASELINE.md`
* Versioning: `VERSIONING.md`
* Rollback Playbook: `ROLLBACK.md`
* Changelog: `CHANGELOG.md`

## Versioning & Releases

All packages share a single version (monorepo style). Use:

```bash
npm run release:patch
npm run release:minor
npm run release:major
```

Append :tag to auto create commit + tag, or :push to also push:

```bash
npm run release:patch:tag
npm run release:minor:push
```

This updates all `package.json` versions and inserts a new heading under `## Unreleased` in `CHANGELOG.md`. If you did not use :tag or :push, manually commit and tag:

```bash
git add .
git commit -m "chore(release): vX.Y.Z"
git tag vX.Y.Z
git push origin main --tags
```

Clean working tree is required (script aborts) unless you pass `--allow-dirty` (not recommended). Using :tag or :push stamps the version heading with the current date (ISO yyyy-mm-dd). Manual bumps leave 'TBD' until you commit/tag.

## License

MIT. See `LICENSE`.

---
Early stage software: APIs & schema may change without notice.
