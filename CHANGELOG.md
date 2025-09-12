# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Added

- Project-level build flags (`ProjectSetting.buildFlags`) with allowlist enforcement (`BUILD_FLAGS_ALLOWLIST`), executor integration, and redacted logging.
- Static asset minification service (HTML/CSS/JS) with per-project opt-out (`optOutMinify`) and host override (`FORCE_MINIFY`).
- Deployment archive upload endpoint enhancements since 0.0.2 (artifact processing groundwork for orchestration follow-up).
- Roadmap automation: support `status: done` in `roadmap.yaml` so shipped slugs no longer require interim tracking issues (#113)
- Enforceable monorepo ESLint baseline with typed rules and scoped test/config overrides (#114)
- Artifact cleanup script (`scripts/cleanup-artifacts.cjs`) and root `clean:artifacts` npm script for repository hygiene (#115)

### Changed

- Build executor now appends project build flags after `--` and redacts sensitive values in logs.
- Preparatory refactors for upcoming build job orchestration (internal only).
- Upgrade TypeScript to 5.9.x and @typescript-eslint toolchain to 8.x (removes parser version warning and aligns workspace).
- Enforce CI gate: lint + typecheck now required before tests/build (`ci:all` script & Husky pre-push hook) (#115)
- Strengthen dependency integrity: repaired corrupted installed packages (missing `dist` directories for NestJS ecosystem, bullmq, rxjs, react-router-dom, vitest, yaml) and added manual verification procedure (#115)
- Add explicit UsersService public projection and internal interfaces for clearer typing and fix lint (require-await, role enum) (#none)

### Security

- Expanded log redaction to include `--token=`, `--secret=`, `--key=`, `--password=` patterns.
- Upgraded dev toolchain (vite 7.x, vitest 3.x, @vitest/coverage-v8 3.x, markdownlint-cli 0.45.0) to remediate moderate advisories (esbuild, vitest/vite, smol-toml) – zero known vulnerabilities remaining.

### Fixed

- Normalize bootstrap error logging with safe Error coercion (removes unsafe stack access) and add strong ZIP extraction typing eliminating remaining `any` usages in upload pathway.
- Resolve widespread TypeScript module resolution failures caused by incomplete package installations (restored proper `dist` contents via tarball extraction) (#115)

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
