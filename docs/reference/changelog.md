---
title: Changelog
---

## Changelog

Authoritative source: root `CHANGELOG.md` (retained for repository + tooling conventions). This page mirrors its contents for documentation site readers. Do not edit here directly; modify the root file and re-sync.

### Updating Procedure

1. Edit root `CHANGELOG.md` only.
2. Keep new entries under the Unreleased section grouped by: Added / Changed / Fixed / Security / Removed / Deprecated (if needed).
3. Before release, move those sections under a new heading: `## X.Y.Z - YYYY-MM-DD`.
4. Keep an empty Unreleased template ready in the root file (see root CHANGELOG for canonical format).

5. `npm run docs:check` now auto-runs the sync; you can run `npm run docs:changelog:sync` manually to update + verify (or `npm run docs:changelog` to only verify).

### Date Handling

Release date must use UTC date (`YYYY-MM-DD`). Avoid `(date pending)` once released; automation can be added later to enforce.

---

### Mirror Content

All notable changes (mirrored from root) are listed below.

<!-- Mirror starts -->
<!-- markdownlint-disable MD024 -->

## Unreleased

### Added

- Project-level build flags (`ProjectSetting.buildFlags`) with allowlist enforcement (`BUILD_FLAGS_ALLOWLIST`), executor integration, and redacted logging.
- Static asset minification service (HTML/CSS/JS) with per-project opt-out (`optOutMinify`) and host override (`FORCE_MINIFY`).
- Deployment archive upload endpoint enhancements since 0.0.2 (artifact processing groundwork for orchestration follow-up).
- Roadmap automation: support `status: done` in `roadmap.yaml` so shipped slugs no longer require interim tracking issues (#113)
- Enforceable monorepo ESLint baseline with typed rules and scoped test/config overrides (#114)

### Changed

- Build executor now appends project build flags after `--` and redacts sensitive values in logs.
- Preparatory refactors for upcoming build job orchestration (internal only).

### Security

- Expanded log redaction to include `--token=`, `--secret=`, `--key=`, `--password=` patterns.
- Upgraded dev toolchain (vite 7.x, vitest 3.x, @vitest/coverage-v8 3.x, markdownlint-cli 0.45.0) to remediate moderate advisories (esbuild, vitest/vite, smol-toml) – zero known vulnerabilities remaining.

## 0.0.2 - 2025-09-12

### Added

- /auth/me endpoint returning current user profile (excludes passwordHash).
- Public route decorator & guard bypass logic.
- CONFIGURATION.md documenting env vs dashboard-managed settings plus expanded .env.example with all planned variables.
- Health endpoint e2e test coverage (public and internal restrictions).
- Random password generator for tests to eliminate hardcoded secret patterns.
- VERSIONING.md documenting semantic versioning & tagging strategy.
- ROLLBACK.md with standard rollback procedures.
- docker-compose.prod.yml with network segmentation & container hardening options.
- GitHub Actions CI workflow: build/test on pushes & PRs; image publish on version tags.
- Operator bootstrap: first registered user automatically elevated to OPERATOR (with role field persisted) and plugin userCreated hook invoked.
- In-memory auth endpoint rate limiting (configurable via RATE_LIMIT_AUTH_CAPACITY / RATE_LIMIT_AUTH_WINDOW_MS env vars).
- Settings persistence layer: SystemSetting & ProjectSetting tables + SettingType enum + SettingsService with in-memory cache.
- Deployment record creation on upload (now immediate transition to BUILDING with BuildJob creation) and e2e test coverage.
- Security hardening middleware: Helmet + explicit CORS origins loading from CORS_ORIGINS env var.
- Deployment archive upload endpoint (`POST /deployments/upload`):
- In-memory buffer handling & ZIP extraction (path traversal, file count, compression ratio, magic number guards)
- Artifact persisted to `ARTIFACTS_DIR` with recorded `artifactPath`
- Deployment status immediately set to BUILDING; BuildJob row created (PENDING)
- Configurable size via `MAX_UPLOAD_MB` (default 25) and storage root via `ARTIFACTS_DIR`
- E2E tests: happy path, build job creation, oversize rejection, traversal attempt, non-zip rejection

### Partial / In Progress

- Deployment build execution & final status transitions (BUILDING -> ACTIVE/FAILED) not yet implemented.

### Changed

- Implemented global role + JWT guards with Public decorator for unauthenticated endpoints.
- Project (Site) CRUD fully validated & ownership enforced; marked complete in task list.
- Updated tasklist to reflect implemented security/auth tasks.

### Security

- Removed hardcoded test passwords (replaced with random generation).
- Snyk scans executed (no medium/high issues introduced; remaining low findings are dynamic credential usage in tests).
- Production compose adds: internal-only DB/Redis network, dropped capabilities (ALL), no-new-privileges, read-only FS (frontend & traefik), resource limits.
- Added initial auth rate limiting (brute force mitigation) & security headers (Helmet) + stricter CORS configuration.

<!-- Consolidated former Post-0.0.2 sections into standard Unreleased buckets per style guide. -->
