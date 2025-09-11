# DragDropDeploy – End-to-End Task List (MVP Execution)

Every actionable bullet is a checkbox. Check only when the deliverable truly meets the described acceptance. Narrative context retained where useful. Phases flow in build order; optional / stretch items are marked (Optional).

Sync Note: When marking an item complete that corresponds to a high-level roadmap row in `docs/roadmap.md`, update that roadmap status in the same PR. CI will (future enhancement) flag divergence between checked items here and non-✅ roadmap rows.

---

## Phase 1: Architecture & Environment Setup

- [x] Choose final stack (NestJS + TypeScript, React (Vite), PostgreSQL, Redis, Traefik, Docker Compose) and document rationale in README (rationale added).
- [x] Initialize monorepo (root + `/backend` + `/frontend` + `/shared`).
- [x] Scaffold NestJS project (`backend`).
- [x] Scaffold React (Vite, TS) project (`frontend`).
- [x] Add shared TypeScript types package (if needed) or path aliases.
- [x] Author `docker-compose.yml` with services: api, frontend, postgres, redis, traefik.
- [x] Configure Traefik base (ports 80/443, Docker provider, mounted socket read‑only).
- [x] Configure Traefik ACME (Let’s Encrypt) resolver (staging + prod) with HTTP challenge.
- [x] Add fallback self-signed cert for local dev.
- [x] Define Docker networks (e.g. `proxy`, `internal`).
- [x] PostgreSQL service with volume, strong password env, healthcheck.
- [x] Plan & document Row-Level Security strategy (RLS) (enable later phase).
- [x] Redis service (alpine) with persistence (AOF or snapshot) & healthcheck.
- [x] Add Nest ConfigModule for environment & secret management.
- [x] CI/CD pipeline skeleton (GitHub Actions): lint, type-check, test, Docker build.
- [x] Semantic version tagging strategy documented.
- [x] Rollback plan (tag-based or previous image reference) documented.
- [x] Coolify compatibility note: ensure service labels & environment variables align with Coolify (document one-click import steps).
- [x] Network segmentation: ensure Postgres & Redis only on internal network (not attached to Traefik / public network). (Production compose variant added.)
- [x] Container security baseline: drop unnecessary Linux capabilities, no privileged containers, read-only root FS where feasible. (Implemented in docker-compose.prod.yml)
- [x] Configuration reference (CONFIGURATION.md) & expanded .env.example documenting env vs dashboard-managed settings.
- [x] Structured logging integrated (nestjs-pino) with LOG_LEVEL env + README & CONFIGURATION.md updates.
- [x] Provide initial seccomp/apparmor profile reference (document optional use).
- [x] Dependency automation: Renovate config + weekly dependency audit workflow (outdated report & policy gate in CI)

## Phase 2: Core Backend Development

- [x] Select ORM (Prisma or TypeORM) and initialize.
- [x] Define DB schema: Users (roles), Sites (Projects), Deployments (Builds) (Domains, Plans, Snippets, Stripe entities later).
- [x] Implement UUID PKs across tables.
- [x] Add multi-tenancy columns (tenant/user ownership) for RLS (ownerId / projectId relations present; RLS policies pending).
- [x] Implement authentication (JWT + Passport) (Register/Login endpoints verified)
- [x] Implement role guard & protect subsequent endpoints (sites, deployments) (initial: JWT + RolesGuard global, Public decorator added)
- [x] OpenAPI (Swagger) documentation exposed at /docs with bearer auth scheme.
- [x] Auth login rate limiting (token bucket) with Retry-After header & e2e test.
  - (Improved) Added stale bucket cleanup to prevent unbounded Map growth (memory leak mitigation).
- [x] Add middleware/interceptor design for eventual RLS session variable (SET LOCAL app.tenant_id = userId). (Completed 2025-09-11: AsyncLocalStorage interceptor + documented ENABLE_RLS flag; future step will SET LOCAL app.user_id once policies added.)
  - [x] Tenant context skeleton interceptor (AsyncLocalStorage) & RLS_ENABLED (documented as ENABLE_RLS) flag placeholder.
- [x] Site (Project) CRUD endpoints (create/list/update/delete) with validation (ownership enforced, e2e tested)
- [x] Settings persistence schema (SystemSetting, ProjectSetting, SettingType) & SettingsService cache layer.
- [x] Domain format validation + uniqueness constraints.
- [x] Bootstrap operator seed script (first operator) implemented.
- [x] Implement build queue integration (BullMQ preferred) setup. (Feature-flag via REDIS_URL; includes worker, queue, events, graceful shutdown lifecycle.)
- [x] Add concurrency gate: return existing build if another active build for same site/user.
- [x] Build job data model (status, logs pointer, artifact path, version index/hash) (initial enum + fields; cascade delete added).
- [x] Build worker logic placeholder (in-memory simulated lifecycle PENDING→RUNNING→SUCCESS when no queue configured).
- [x] Build job creation on upload (roadmap evidence): uploading deployment now creates BuildJob and sets status to BUILDING.
- [x] API: enqueue build (POST /builds/:projectId) and status retrieval (GET /builds/:id).
- [x] Deployment version record creation (simple incremental version) & retrieval via status/history endpoints.
- [x] Initial deployment record creation on file upload (status PENDING) with e2e test.
- [x] Random staging subdomain generation logic (store). (Utility `generateStagingSubdomain()` added; DB persistence pending integration with deployments.)
- [ ] Log capture structure (stdout/stderr -> file + DB summary fields).
- [x] Database roles design: create roles (migrator, app_rw, app_ro) script added (`backend/prisma/db_roles.sql`).
- [ ] JIT admin access plan: script or doc to create ephemeral elevated role with TTL for maintenance (out-of-band).
- [ ] Document credential rotation procedure (DB + JWT secret + OAuth credentials).

## Phase 3: Build Process & Artifacts

Immediate Next Focus (shortlist before starting full artifact pipeline):

1. (Done) Build status retrieval endpoint(s) (GET /builds/:id and project history) – UI polling.
2. (Done) Enforce single active build per project (return existing active build) – concurrency safety.
3. (Done) Introduce BullMQ (Redis) integration behind feature flag (if REDIS_URL present) – replaces in-memory simulation when enabled. Redis e2e test (`build.queue.redis.e2e.spec.ts`) validates SUCCESS transition; timers unref + lifecycle hooks prevent Jest open handle hang.
4. (Done) Basic build history listing (project scoped) – dashboard build timeline.
5. (Done) Persist simple version counter on build creation – deployment linkage.

### Core Drag & Drop Deploy Flow (Primary Value Proposition)

- [ ] Backend: multipart upload endpoint `/deployments/upload` (accept .zip or raw directory upload) with:
  - Size limit (configurable, reject > MAX_UPLOAD_MB)
  - Content-type & extension validation
  - Path traversal protection (no `..` segments, strip leading slashes)
  - File count & compressed/uncompressed ratio guard (zip bomb mitigation)
  - (Partial 2025-09-11) Implemented initial ZIP path: size limit env (`MAX_UPLOAD_MB`), traversal & ratio guard, Deployment row creation (PENDING). Pending: content-type validation, raw directory path, actual artifact persistence/publish.
- [ ] Extraction pipeline: unzip to temp workspace, normalize line endings, sanitize filenames.
  - (Skeleton controller `DeploymentsController` returns 501 for `/deployments/upload` placeholder.)
- [ ] Static site default: if no build config detected, treat root as ready-to-serve artifact (copy directly -> version folder).
- [ ] Deployment record creation (status: UPLOADING -> PROCESSING -> BUILDING -> ACTIVE/FAILED) persisted.
- [ ] Status polling endpoint (lightweight JSON) for dashboard progress.
- [x] Logs endpoint (tail + full) with redaction hook placeholder (basic file-based, redaction TBD).
- [ ] Atomic publish step (symlink or pointer swap) to avoid partial deploy state.
- [ ] Immediate staging URL returned in initial response (even if build pending) for eventual live check.
- [ ] Tests: upload happy path, oversize rejection, zip bomb heuristic, path traversal rejection.
- [ ] Security: ensure uploaded archive never executable; set restrictive permissions on extracted files.

- [ ] Implement repository clone (public HTTPS) with shallow depth & size/time limits.
- [ ] Implement ZIP upload path (extract to temp build context).
- [ ] Auto-detect SSG heuristics (Hugo config, package.json build script, Jekyll _config.yml, etc.).
- [ ] Map heuristics to allowed SSG enum or “other/custom”.
- [ ] Implement per-SSG build commands (Hugo binary, npm install + build). Jekyll placeholder (Optional early).
- [ ] Sandbox build: run in ephemeral temp directory (no host escape) with resource/time limit.
- [ ] Artifact collection (determine output dir based on SSG or config) into version folder.
- [ ] Store artifact path & mark deployment success/failure.
- [ ] Generate staging URL mapping (subdomain -> version) & persist.
- [ ] Capture failure logs & expose via API.
- [ ] Retention policy: keep last N builds (config), delete oldest asynchronously.
- [ ] Rollback operation: update live pointer (DB or symlink) + update routing cache.
- [ ] Maintain all older versions accessible via their staging URLs until pruned.

## Phase 4: Extended Backend Features & Testing Prep

- [ ] RLS: create policies for each multi-tenant table (SELECT/INSERT/UPDATE/DELETE isolation).
- [ ] Implement session-level tenant variable (SET LOCAL) for each request.
- [ ] Admin bypass role policies documented & implemented.
- [ ] Stripe integration (Optional for MVP): checkout session endpoint, webhook handler, subscription mapping, idempotency enforcement.
- [ ] Domain registration API: register custom domain, generate verification token.
- [ ] ACME automation for custom domains via Traefik (labels or dynamic config) (Optional early; doc fallback).
- [ ] Concurrency load test for build queue; adjust BullMQ concurrency and rate limits.
- [ ] Redis locking fairness (per-site) verification tests.
- [ ] Security hardening: parameterized queries, sanitize shell exec inputs, Helmet, CORS config.
- [x] Rate limiting middleware implemented (login endpoint token bucket + guard) (roadmap evidence).
- [x] Structured logging integrated and redaction plan documented (roadmap evidence).
- [ ] Build command deny/allow list & environment variable pass-through rules.
- [ ] Add automated unit tests (Jest) for services & controllers.
- [ ] Add integration tests (Supertest) for critical endpoints (site create, build trigger, rollback, domain verify placeholder).
- [ ] Add migration workflow (Prisma Migrate or TypeORM migrations) & doc.
- [ ] OAuth bootstrap safeguard: only first successful login can become operator; subsequent admin grants manual.
- [ ] OAuth implementation: enforce state + nonce (OIDC) & minimal scopes (email/profile only).
- [ ] OAuth security: rate limit auth initiation & callback endpoints.
- [ ] OAuth safe storage: encrypt / hash (where applicable) any refresh tokens; avoid storing access tokens long-term unless needed.
- [ ] Optional email domain allowlist / denylist configuration.
- [ ] Secure session cookies (HttpOnly, Secure, SameSite=Lax) or short-lived JWT + refresh rotation strategy documented.
- [ ] Add documented fallback to disable local auth OR disable OAuth independently via env flags.

## Phase 5: Frontend (React) Development

- [ ] Initialize Vite React TS app with routing & basic state management.
- [ ] Auth pages (login/register) integrated with backend JWT.
- [ ] Dashboard: list sites with current deployment & status.
- [ ] Create Site wizard: name, repo URL or upload, SSG selection (list), domain selection.
- [ ] Build trigger button & live status polling.
- [ ] Site details page: build history, logs preview, rollback action, snippet editor.
- [ ] Billing page (Stripe optional) with plan display & upgrade link/portal.
- [ ] Staging version links list (random subdomains).
- [ ] Deletion & retention info display.
- [ ] Error/loading states with consistent UX.
- [ ] Minimal yet polished UI styling (Tailwind / component lib) with accessible components.
- [ ] Admin view toggles (if user is admin/operator) for site/user management panels.
- [ ] Localization placeholder (English default only).

## Phase 6: Integration & Deployment

- [ ] Backend Dockerfile optimized (multi-stage, prod config, non-root).
- [ ] Frontend Dockerfile builds static assets & serves via nginx or lightweight server.
- [ ] Compose updates: add labels for Traefik routers/services.
- [ ] Traefik labels: api and app routing (Host rules), TLS cert resolver referencing ACME config.
- [ ] Validate HTTPS for dashboard domains.
- [ ] Document DNS wildcard + staging domain configuration.
- [ ] Test full deployment on clean VM (docker-compose up).
- [ ] Simulate build & rollback end-to-end with real artifact change.
- [ ] Operator documentation: installation, env vars, secrets, optional Stripe, optional S3.
- [ ] Staging vs production domain configuration (ENV flags) implemented.
- [ ] Frontend Rollback UI triggers API & reflects updated active version without page reload.
- [x] CI pipeline builds & pushes images on tag. (GitHub Actions workflow added.)
- [x] Release process automation: manual dispatch workflow creates version bump, tag, release.
- [ ] Final security scan (Snyk) on source & images.
- [ ] Add non-root user & least-privilege in images verified.
- [ ] Coolify deployment template / instructions validated (one-click run with Traefik & env setup).
- [ ] Security hardening guide added (defense-in-depth: Traefik, Coolify, DB least privilege, OAuth safeguards).

### Post-MVP / Future Extensibility

- [ ] Pluggable auth & data backend option (Experimental): Admin UI toggle to switch from local PostgreSQL (Prisma) to Convex or Supabase.
  - Validate provided Convex/Supabase credentials & target project readiness.
  - Provide one-way export (initial): snapshot relational data -> target schema with migration script.
  - (Stretch) Bi-directional sync: change capture (logical decoding or triggers) -> queue -> apply to remote; remote -> local polling or webhooks.
  - Conflict resolution policy (last-write-wins baseline; optional vector clock or timestamp guard).
  - Rollback path: re-import remote snapshot to PostgreSQL and disable external backend.
  - Security doc: token scopes, least privilege RLS/row policies, data residency implications.
  - Feature flag: `EXPERIMENTAL_PLUGGABLE_BACKEND=true` gating all UI/actions.
  - Clear disclaimer: Not required for MVP; high complexity & potential consistency trade-offs.
- [x] Eliminate need for `--forceExit` in test:ci by identifying and closing lingering Testcontainers/Docker stream handle so Jest exits cleanly without force exit. (Achieved 2025-09-11: teardown refinements allow natural Jest exit; script updated.) Acceptance: `npm test` finishes with no open handle warning and without `--forceExit` flag.

## References (Informational – Not Checkboxes)

> NestJS & BullMQ, PostgreSQL RLS, Traefik ACME automation, React ecosystem selection, official Postgres Docker image.

## Complexity Breakdown (Informational)

What’s Simple:

- [ ] Static upload -> serve on subdomain (core path).
- [ ] CRUD for users/projects/roles.
- [ ] Basic React dashboards (unstyled initially).
- [ ] Basic BullMQ queue (single worker) & per-project mutex.
- [ ] Local filesystem storage with retention.

Medium Complexity:

- [ ] Versioning + rollback pointer + permanent staging URLs.
- [ ] GitHub (public) import with shallow clone.
- [ ] Universal snippet injection (head-safe parser, idempotent).
- [ ] Optional S3-compatible backend.
- [ ] Stripe hosted checkout & webhooks.

High Complexity / Risk Areas:

- [ ] Build isolation (Docker vs local) with timeouts & resource caps.
- [ ] Wildcard subdomains + DNS-01 TLS issuance.
- [ ] Concurrency fairness & Redis locking robustness.
- [ ] Proper RLS (policies + admin bypass auditing).
- [ ] Dynamic Traefik routing strategy (single service host mapping).
- [ ] Large uploads & quotas (size caps, potential virus scan future).

## Scope Control (Acceptance Markers)

- [ ] Explicit SSG selection; heuristic hints only.
- [ ] Single runtime image (Hugo binary + Node). Jekyll only in isolated build job.
- [ ] Serve artifacts from app for MVP (CDN optional later).
- [ ] Stripe minimal: hosted checkout + plan mapping only.

## Hidden Work (Checklist to Avoid Surprises)

- [ ] Cleanup of temp dirs after builds.
- [ ] GC old versions beyond retention.
- [ ] GC expired staging links (if policy defined).
- [ ] Log retention & redaction (no secrets in logs).
- [ ] Timezone consistency (UTC in DB, UI localize).
- [ ] Distinguish retried vs new builds in history.
- [ ] Handling of Windows line endings in uploaded zips.
- [ ] Reject overly large node_modules in uploads (size guard).

## Risk Mitigation Sequencing (Ordered Subset)

- [ ] 1: Core serving loop (upload -> serve) done before complex builds.
- [ ] 2: Add queue + dummy build then real Node/Hugo builds (in-process).
- [ ] 3: Introduce containerized build isolation (feature flag) after stable local.
- [ ] 4: Versioning & rollback pointer stabilization.
- [ ] 5: Traefik + ACME DNS-01 after basic HTTP-01 works.
- [ ] 6: Stripe integration (flag-gated) after core flows stable.
- [ ] 7: S3 backend after local retention proven.
- [ ] 8: Enable RLS as final hardening step (test suite green first).

## Definition of “Done” for Complex Areas

Build Isolation:

- [ ] DinD or alternative sandbox with user-ns remap (Optional early; doc fallback).
- [ ] Resource caps (CPU/mem/time) + forced kill on timeout.
- [ ] Deny dangerous docker run flags.

Wildcard TLS:

- [ ] DNS provider creds stored & validated (or documented manual path).
- [ ] Wildcard cert for *.staging.example.com issued & auto-renewing.
- [ ] Fallback per-subdomain cert issuance documented.

Concurrency:

- [ ] Redis lock build:{projectId} prevents parallel same-project builds.
- [ ] BullMQ concurrency >1 for different projects.
- [ ] Metrics for queue depth & active jobs exposed.

Stripe:

- [ ] Webhook signature verified.
- [ ] Idempotent subscription updates (event log table).
- [ ] Admin override for plan assignment.

RLS:

- [ ] Policies for all CRUD operations referencing tenant column.
- [ ] Admin bypass via separate DB role logged.
- [ ] Test suite executed with RLS on.
- [ ] Runtime uses app_rw role only; migrator role used exclusively in migration job.
- [ ] JIT admin elevation procedure tested & documented.

Traefik Routing:

- [ ] Host -> project/version mapping internal cache.
- [ ] No container-per-version explosion (single runtime service).

## De-Risking Quick Wins

- [ ] Implement minimal build (no SSG) early.
- [ ] Add staging subdomain generation before Traefik wildcard DNS.
- [ ] Add feature flag for BUILD_MODE=local|docker.
- [ ] Provide manual cert instructions before automating DNS-01.
- [ ] Delay RLS enforcement until after integration tests exist.

## Final Go-Live Gates

- [ ] All high severity Snyk issues resolved or accepted with rationale.
- [ ] All mandatory boxes in Phases 1–6 checked.
- [ ] Core user path (register -> create site -> upload -> deploy -> view -> redeploy -> rollback) passes scripted test.
- [ ] Admin path (promote user, view domain list, enforce plan limit) validated.
- [ ] Security review checklist completed (auth headers, HTTPS, no secret leakage, non-root images).
- [ ] Defense-in-depth checklist completed (Traefik integration, Coolify deploy, DB least privilege & JIT, OAuth safe config, rate limits, container hardening).
- [ ] Tagged release (v0.1.0) pushed & images published.
- [ ] Deployment runbook documented.

---
Short answer: Core is simple; isolation, domains/SSL, billing, concurrency, and RLS are the real engineering weight. This checklist converts the narrative plan into verifiable steps—when the last required box is checked, the MVP is deployable.
