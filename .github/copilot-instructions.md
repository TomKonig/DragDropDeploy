DragDropDeploy — Copilot Operational Guidelines

Audience: Autonomous AI coding agents operating on this repository.
Authority: These rules are mandatory. If a rule cannot be followed, open a blocking decision:<topic> issue explaining why and request human input.

⸻

0. Mission

Build and maintain a lightweight, secure-by-default, modular, self-hosted alternative to Pages-style hosting. Core UX: drag-and-drop a ZIP → build → deploy on subdomain. Architecture: Node.js + TypeScript, NestJS, Prisma, PostgreSQL, optional Redis (queues), reverse proxy via Traefik (Coolify-friendly). Everything non-essential is gated behind feature flags to minimize footprint. Documentation is MkDocs (Material) and must stay in lock-step with the code.

⸻

1. Canonical Principles
   1. Security First / Zero Trust
      • Least privilege, deny by default, explicit allow-lists, no ambient authority.
      • JIT elevation for operator actions (time-bound, auditable).
      • Strict secret handling; never commit secrets; prefer env + managed stores.
   2. Minimal Footprint
      • Build only what is enabled. Do not ship dormant code unless behind a hard flag.
      • Keep images lean; exclude dev deps, examples, and test fixtures from runtime.
   3. Modularity & Gates
      • Every optional subsystem (billing, queues, plugins, themes, SSGs, i18n, marketplace) is flag-gated.
      • Provide a sensible default profile enabling common features; operators can trim.
   4. Idempotence & Safety
      • Migrations, scripts, and jobs must be re-runnable safely.
   5. Docs as Source of Truth
      • MkDocs (Material) is authoritative for ops + user docs. Generate, lint, and sync.
   6. GitHub-First Operations
      • Use GitHub for roadmap, sub-issues, PR templates, labels, and automation.
   7. Roadmap Discipline
      • Exactly one parent [slug] <summary> issue with roadmap label per feature.
      • All work lives as sub-issues under the parent; no roadmap label on sub-issues.
      • roadmap.yaml is canonical; docs table is generated.
   8. Changelog Enforcement
      • Every non-trivial change updates CHANGELOG.md under ## [Unreleased] (Added/Changed/Fixed/Security/Removed/Docs).
      • Aggregate multiple commits into one bullet at merge time.

⸻

2. Repository Alignment
   • Always reacquire context before work:
   • Pull latest default branch.
   • Read diff of files related to the target issue.
   • Enumerate impacted modules (backend, frontend, shared, infra, docs, scripts).
   • Treat prior model knowledge as stale; prefer in-repo sources.

⸻

3. Planning → Approval → Execution (Single-Gate)

Before editing code: 1. Discovery & Risk Scan
• Objective, acceptance criteria, constraints, security implications, migration/rollback note.
• Impacted files + modules; runtime flags touched; external integrations (Traefik, Coolify, Stripe, ACME, Redis). 2. Design
• API/DB changes (Prisma schema + migration strategy).
• Flag strategy (names, defaults, operator/global overrides).
• Build/runtime behavior; UX changes. 3. Implementation Plan
• Ordered steps, small commits, test plan (happy + edge/failure). 4. Validation Plan
• Build, type-check, lint, tests, smoke (startup + key endpoint 200 OK). 5. Docs Plan
• Pages to add/update (MkDocs), links from index pages, examples/snippets with fenced language tags. 6. Roadmap/Changelog Plan
• Parent/children issues, labels, changelog section.

Await a single explicit approval (“Proceed” / label) per issue. After approval, execute end-to-end without pausing, unless ambiguity or failing gates require a decision.

⸻

4. Security Baseline
   • Auth & Sessions: JWT (rotatable, multi-secret verification if applicable). Secure cookies when used. Short TTLs for elevated scopes.
   • Uploads & Serving: ZIP validation, extension allow-lists, path traversal protection, size limits (MAX_UPLOAD_MB), virus/heuristic hooks if enabled.
   • Network & TLS: Designed for reverse proxies; support ACME/Let’s Encrypt, self-cert, or proxy-terminated TLS. Do not hardcode ports beyond envs.
   • RBAC & Tenancy: Strict tenant scoping in queries; never leak cross-tenant identifiers.
   • Logging/Privacy: Structured logs (pino); avoid PII in logs; redact secrets; correlation IDs.
   • Dependency Hygiene: Pin versions, audit on change; document size/security impact in PR body when adding dependencies.
   • Secrets: DATABASE_URL, JWT_SECRET, etc. via env; no secrets in repo. Respect Coolify env management.

⸻

5. Feature Flags (Examples)
   • ENABLE_REDIS_QUEUE (default: false)
   • ENABLE_STRIPE (false)
   • ENABLE_THEMES (true)
   • ENABLE_PLUGINS (true)
   • ENABLE_I18N (true)
   • ENABLE_SSG_HUGO (true)
   • ENABLE_SSG_JEKYLL (true)
   • ENABLE_SSG_REACT (true)
   • ENABLE_DOCS (NONE|USER|FULL, default: USER)
   • ENABLE_MINIFICATION (project-level with operator override)
   • PRIMARY_DOMAIN=localhost/domain
   • ENABLE_OAUTH=false
   • ENABLE_RLS=false
   • BUILD_MODE=local|containerized (default: local)
   • CUSTOM_BUILD_COMMAND_WHITELIST=build,export,hugo... (comma-separated list)
   • BUILD_ALLOWED_SSGS=HUGO,NODE,STATIC (comma-separated list)
   • SIGNUP_MODE=open|invite|closed (default: open)

# Database

# For local host access (Prisma CLI, admin tools) docker-compose.override.yml maps postgres -> localhost:5433

# Inside containers use host 'postgres'; from host tools use 'localhost:5433'

DATABASE_URL=postgres://ddd:change_me@postgres:5432/ddd

# MIGRATOR_DATABASE_URL=postgres://migrator:change_me@postgres:5432/ddd # future dedicated role

# Redis

REDIS_URL=redis://redis:6379

# Traefik / Domains

PRIMARY_DOMAIN=localhost
API_HOST=api.localhost
APP_HOST=app.localhost

# Feature Flags

ENABLE_RLS=false
ENABLE_STRIPE=false
ENABLE_OAUTH=false
BUILD_MODE=local

# Optional Object Storage (S3 compatible)

S3_ENDPOINT=
S3_BUCKET=
S3_ACCESS_KEY=
S3_SECRET_KEY=

# SMTP / Email (future)

SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# OAuth Providers (enable with ENABLE_OAUTH=true)

OAUTH_GOOGLE_CLIENT_ID=
OAUTH_GOOGLE_CLIENT_SECRET=
OAUTH_GITHUB_CLIENT_ID=
OAUTH_GITHUB_CLIENT_SECRET=

# Stripe (enable with ENABLE_STRIPE=true)

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Rate Limits (defaults if blank handled in code)

RATE_LIMIT_LOGIN=10
RATE_LIMIT_BUILD_TRIGGER=20

# Operator Defaults

SIGNUP_MODE=open # open|invite|closed
DEFAULT_BUILD_TIMEOUT_SEC=600
MAX_VERSION_RETENTION=10
BUILD_CONCURRENCY_GLOBAL=4
BUILD_CONCURRENCY_PER_USER=2

# Build Restrictions

BUILD_ALLOWED_SSGS=HUGO,NODE,STATIC
CUSTOM_BUILD_COMMAND_WHITELIST=build,export

Rules:
• Flags must be read once at startup and exposed via a typed config service.
• All new code paths behind flags; disabled means no side effects.
• Document each flag (purpose, default, operator override).

⸻

6. Framework & Integration Handling
   • Traefik / Coolify / Reverse Proxies: Refresh docs before touching configs; never hardcode proxy assumptions; surface necessary headers/envs.
   • ACME / TLS: Keep termination flexible: proxy-terminated, app-terminated, or self-cert. Provide operator toggles.
   • Stripe Hooks: Stubbed behind ENABLE_STRIPE; no live calls without envs + test keys; plan quotas/tiers but ship off by default.
   • SSGs & Builders: Provide day-zero support as plugins or modules with build commands (Hugo, Jekyll, React). Each must:
   • Validate project type safely.
   • Run within resource limits.
   • Emit logs with redaction.
   • Respect per-project build flags (allow-listed).

Before modifying any integration, re-read upstream docs; capture a short inline summary and links in the PR body.

⸻

7. Documentation Discipline (MkDocs Material)
   • Update docs with every meaningful change: env var, endpoint, CLI, migration, operator flow, UI change.
   • Fence Enforcement: Every code block must specify language (use text fallback).
   • Lint Focus: Enforce MD012, MD022, MD040, MD007/MD005, MD009, MD010, MD024, MD032. MD003 + MD026 relaxed temporarily.
   • Split long pages; maintain indexes (e.g., operations landing linking new runbooks).
   • Docs Bundle Flag (ENABLE_DOCS_BUNDLE):
   • NONE – ship no docs with app.
   • USER – ship in-app user docs only.
   • FULL – ship user + operator docs.
   • Generators must emit language tags; fix generators, do not suppress MD040.

⸻

8. Roadmap & Issues
   • One parent per slug: Title [slug] <summary>, label roadmap.
   • Sub-issues: Use GitHub “Add sub-issue”; omit [slug] in titles; normal labels allowed (type:_, scope:_, priority:\*), but never roadmap.
   • Source of Truth: roadmap.yaml → generated docs/roadmap.md. Never hand-edit generated sections.
   • On close: Ensure roadmap.yaml reflects final status; update acceptance in parent; convert/punt leftovers via follow-up or next.

Labels:
• roadmap
• priority:critical|high|normal|low
• type:feature|bug|refactor|security|docs|chore
• scope:backend|frontend|shared|infra|docs
• next, tbd, follow-up, no-changelog

⸻

9. Changelog Rules
   • Update CHANGELOG.md under ## [Unreleased] for all non-trivial merges.
   • Style: imperative, present tense.
   • Examples:
   • Added: Multi-secret JWT verification support (#123)
   • Fixed: Duplicate build creation under concurrent uploads (#131)
   • Security: Harden upload path traversal checks (#140)
   • Mirror file (if any) is generated; do not edit.

⸻

10. Testing & Quality Gates
    • Tests: Add/extend unit tests for logic changes; at least one edge/failure case. Integration tests for upload/build/serve if touching those paths.
    • Gates (must PASS locally before PR):
    • Build, type-check, lint, tests, basic smoke (startup + /health + one key endpoint 200).
    • Coverage: Do not reduce aggregate coverage without explicit justification in PR.

⸻

11. Observability
    • Logging: Structured (pino), minimal but sufficient. Include request IDs. Redact secrets.
    • Metrics: Expose Prometheus endpoint if enabled; instrument impactful features.
    • Tracing: Prepare hooks for tracing IDs; optional integration behind flags.

⸻

12. Mandatory Workflow (Checklist)
    1.  Sync branch; enumerate impacted modules.
    2.  Read related code + tests; identify gaps.
    3.  Draft phase plan + acceptance + rollback; await single approval.
    4.  Implement in small, isolated commits (TDD if appropriate).
    5.  Maintain CHANGELOG.md (Unreleased) for the issue scope.
    6.  Roadmap sync: parent slug issue exists; sub-issues linked; roadmap.yaml updated if scope shifts.
    7.  Run full validation gates locally.
    8.  Open PR using template (include roadmap slug, docs updated = yes/no).
    9.  Self-review diff (remove noise/dead code).
    10. Request review or auto-merge if policy permits and gates are green.

⸻

13. Communication Style
    • Plans: crisp bullets; include acceptance criteria + rollback.
    • PRs: summarize intent, risks, integration changes, docs updates, security notes, external references consulted.
    • Summaries: what changed, why, how validated, any follow-ups created.

⸻

14. Guardrails Matrix

Area Must Not Must Always
Roadmap Open multiple parent [slug] issues Keep one parent; use sub-issues without slug prefix
Changelog Merge feature without entry Aggregate under Unreleased
Docs Ship features undocumented Update/add MkDocs pages; maintain indexes; enforce fenced language tags
Security Diverge on secrets handling Follow rotation runbooks; redact in logs; least-privilege everywhere
Build Inflate runtime image Exclude dev deps/fixtures; ship only gated code

⸻

15. Escalation

If constraints conflict (e.g., roadmap ambiguity, security vs performance), open decision:<topic> and block merge pending human input.

⸻

16. Templates

16.1 Phase Plan (paste in issue comment)

## Objective

<one-liner>

## Acceptance Criteria

- [ ] <criterion 1>
- [ ] <criterion 2>

## Impacted Areas

- Modules: <backend|frontend|shared|infra|docs>
- Files: <paths>
- Flags: <names + defaults>
- External: <Traefik|Coolify|Stripe|ACME|Redis>

## Design (summary)

<API/DB changes, schemas, migrations, UX>

## Implementation Steps

1. ...
2. ...

## Validation

- Build/type/lint/tests
- Smoke: <endpoints>
- Security checks: <items>

## Rollback

<strategy>

## Roadmap/Changelog

- Parent: #[id], Subs: #[ids]
- CHANGELOG: <section>

  16.2 Deferral Issue Snippet

### Context

Portion deferred from #<origin>.

### Reason

(Performance risk / scope guard / timebox)

### Proposed Follow-Up

(Outline minimal next step.)

⸻

17. Current Lint Addenda (Docs)
    1.  All fenced code in docs/ must specify a language (text fallback OK).
    2.  docs:check includes docs:lint:fences and fails on unlabeled fences.
    3.  Do not suppress MD040; fix the fence.
    4.  MD003 and MD026 disabled temporarily; all others enforced as listed above.

⸻

Generated: v2025-09-13. Future governance changes must append a dated changelog section within this file.
