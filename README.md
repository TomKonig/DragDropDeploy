# DragDropDeploy

Spec Sheet: Ultra‑Simple Self‑Hosted Static Pages Platform

Overview and Goals

Status Snapshot (MVP Progress)

Implemented (as of current branch):

- Local auth (email/password) with first-user operator bootstrap
- Basic role guard + protected status/health endpoints
- Project CRUD (no build pipeline yet)
- Upload endpoint stub (accepts file, no build/deploy processing)
- Plugin scaffold with userCreated hook wired
- i18n subsystem (YAML + ICU) shared across backend & plugins
- In-memory auth rate limiting, Helmet, configurable CORS

Planned / Not Yet Implemented (described below):

- Build pipeline & multi-SSG detection
- Deployment artifact storage & version history / rollback UI
- Snippets injection (global + per project)
- Custom domains & multi-domain routing
- OAuth providers, invite codes, signup modes enforcement
- Plans/quotas, rate limiting beyond auth endpoints
- System & project settings tables (configuration persistence)
- Domain verification workflow
- Deployment logs & build queue (BullMQ)
- Snippet HTML head injection & global snippet management
- Audit logging & advanced security hardening (RLS, DB roles)
- CI publishing & automated Snyk scans (pipeline placeholders only)

Contributors: please treat Planned items as future roadmap—PRs welcome but align first via an issue.

This project is an ultra-simple, lightweight static site hosting platform designed as a self-hosted alternative to services like Tiiny.host, Cloudflare Pages, and GitHub Pages. Its core purpose is to enable users to quickly deploy static websites (HTML, CSS, JS, images) with minimal configuration and friction. By focusing only on static content, the system remains serverless on the end-user side – no dynamic server code runs for the hosted sites. Any interactive functionality (forms, etc.) is achieved by posting to external services (e.g. webhooks like Web3Forms) rather than running backend code.

Key Objectives:

- Ease of Use: Provide an intuitive, password-protected web dashboard for users to deploy sites in just a few clicks. The goal is a five-minute setup from sign-up to a live site, similar to Tiiny.host’s quick deployment experience.
- Self-Hosting & FOSS: Open-source (MIT) and easily self-hostable via Docker or a simple install script. Designed for maintainability and contributions (KISS principles).
- Minimal Configuration: Require only essential operator setup (base domain + a few env vars) so users deploy without deep technical steps.
- Security by Default: Secure defaults (HTTPS, isolated user accounts, encrypted/hashed credentials); secrets via environment variables only.
- Extensibility: Modular design to extend with additional SSGs, storage backends, or integrations.

Technology Stack and Architecture

Language & Frameworks: The project will use widely-adopted, well-documented technologies to maximize community support. On the backend, a Node.js platform (TypeScript) with a framework like Express (minimal, flexible) or NestJS (structured, scalable) will handle the core server logic. Node.js is chosen because many static site build tools (e.g. for React, Gatsby, etc.) are Node-based, and it has a rich ecosystem and community. The frontend will be split into two single-page applications (SPAs) built with a popular framework such as React (or Vue.js) for its large community and library support – avoiding less common choices like Svelte to ensure familiarity and extensive documentation.

High-Level Architecture:

- Backend API Server: Node.js/TypeScript (NestJS) managing users, projects, builds, deployments, auth, and static file routing backed by PostgreSQL + file/object storage.
- User Dashboard (Frontend): React SPA for end-users (project CRUD, uploads, deployments, domains, snippets, version history).
- Admin Dashboard (Frontend): Separate React SPA (or privileged area) for operator/admin settings: users, plans, limits, domains, global snippets.
- Static File Server: Serves built artifacts per host header (subdomain/custom domain) with optional SPA fallback.

Containerization and Deployment: The entire application will be packaged for easy deployment:

- Docker image: Includes backend server + production builds of dashboards. Suitable for one-click deploy (e.g. Coolify).
- Install script (optional): Curl-able script for bare server install (installs dependencies, systemd units, app runtime).
- Configuration via environment variables only (database URL, OAuth keys, etc.) following 12-factor principles (keeps secrets out of code and enables per-env changes).

State Management: The platform will use PostgreSQL as the primary database to store state – this includes user accounts, OAuth integrations, project metadata, deployment records, and settings. PostgreSQL is chosen for reliability and familiarity (and it’s open-source). The app will use an ORM or query builder (like Prisma or TypeORM for Node) for maintainability. All sensitive data in the DB (password hashes, API keys) will be properly encrypted or hashed.

Core Functionality for Users (Spec vs Current)

Project Creation & Deployment

Current: Project records can be created; file upload is accepted and ownership validated but no build occurs.

Planned Spec:

After logging into the user dashboard, a user can create a new “Project” which represents one static website. Creating a project involves giving it a name and optional settings:

- Project Name & Subdomain: The name forms the default subdomain (e.g. “MySite” → mysite.myplatform.com). User can choose from operator-provided base domains (see Multi-Domain Support).
- Source Upload or Import: Two main options:
	- Upload Files: Upload a folder or archive (ZIP) containing source or pre-built static files (drag-and-drop supported).
	- Import from Git: Provide a public Git repository URL (future: OAuth for private repos).
- Build Settings: User may specify generator or build command. Platform auto-detects common SSGs if unspecified, e.g.:
	- package.json with build script → Node-based SSG (Next.js, Gatsby, Eleventy)
	- config.toml / config.yaml → Hugo
	- _config.yml → Jekyll
		If detected, appropriate pipeline chosen; otherwise user selects from supported SSGs or enters custom command.
- Trigger Build (Build & Deploy button): Backend performs:

1. Store uploaded source (temp build dir) or clone repo.
2. Run build process:
	- Pure static upload: directly prepare files.
	- Known SSG: run appropriate build (e.g. hugo; npm install && npm run build).
	- Auto-download needed dependencies (e.g. Hugo binary per HUGO_VERSION env or latest).
3. Capture build output (e.g. public/ directory).
4. Deploy to hosting:
	- Save files locally (e.g. /data/projects/<project_id>/current/), or
	- Upload to S3-compatible storage (if configured).
5. Live Site: Accessible at project URL (mysite.{base-domain} or custom domain) with routing auto-configured.

Throughout this process, the dashboard will show the build status (in progress, success, or errors if build failed), so the user gets feedback. The design will strive to make this process as one-click as possible after the initial setup, hiding complexity of the build.

Managing Deployments (Updates & Versions)

Current: Deployment model exists in schema but is not yet integrated; version history & rollback are not implemented.

Planned Spec:

After the initial deployment, users can manage their static site easily:

- New Deployments (Updates): Upload new version or re-import from Git; on success replaces current version.
- Version History (optional): If enabled, archives previous versions (rolling retention with configurable max N per project).
- Rollbacks: One-click restore of a prior version (if versioning enabled).
- Delete Project: Remove project and optionally its files/history (potential soft-delete safeguard configurable).

The focus is on simplicity: no complex Git integrations or CI pipelines are required (though in future, integration with Git webhooks for automatic rebuild on commit could be added). The user simply uploads new content when they want to update their site. This simplicity mirrors Tiiny.host’s approach where uploading files gives an instant site ￼.

Snippets Injection (Custom HTML in `<head>`)

Current: Not implemented (no schema columns or injection code).

Planned Spec:

To give users and operators flexibility in adding small dynamic touches or analytics, the platform supports “universal snippets.” This feature injects custom HTML/script into the `<head>` of each hosted page:

- User Snippets: User-defined snippet (e.g. analytics script or CSS) stored per project; injected before closing `</head>` during deployment.
- Operator Snippets: Global snippet applied to all sites (toggleable) for platform-wide meta tags, scripts, banners.
- Storage & Injection: Snippets stored in DB; injection happens at build/deploy time to avoid runtime overhead and preserve compatibility with CDN/static serving.

Multi-Domain Support

Current: Not implemented (no domain tables/routing logic yet).

Planned Spec:

The application will support multiple base domains for serving sites:

- Operator can configure multiple FQDNs (e.g. example.com, example.org) as host domains (env var or admin setting).
- Users choose a base domain for the project subdomain (projectName.example.com or projectName.example.org).
- Server routing maps each projectName.domain pair to its content.
	- Custom Domains (user-provided):
		- User adds domain in project settings; instructions shown (CNAME to projectName.base-domain or A record to server IP).
		- Requires wildcard/per-domain SSL via ACME (Traefik, Caddy, or Cloudflare edge certs).
		- Ownership verified via DNS record before activation.
		- Once verified, requests for custom domain serve project files.
- Wildcard Subdomain Setup: Operator configures *.example.com DNS + wildcard cert so new subdomains work instantly.
- Traefik: Wildcard Host rule (HostRegexp `{subdomain:.+}.example.com`) with automatic ACME; documented labels for routing + TLS.
- Cloudflare Tunnel: Tunnel handles wildcard routing & edge TLS; app can serve HTTP internally.
- Admin dashboard: Domain management (add/remove base domains, list & verify custom domains).

Static Site Serving

Current: Static artifact serving not yet implemented; only API endpoints active.

Planned Spec:

Once a site is deployed, serving it efficiently is critical:

- Static file delivery: Backend serves static files (high-performance middleware + caching); assets cacheable with proper headers.
- HTTPS by default for all dashboards and sites (proxy ACME or built-in); automatic certificates.
- External storage option: If S3 used, app may still proxy files initially; future optimization with CDN possible.
- Paths & routing: Each project served at domain root; optional SPA mode to serve index.html for client-routed paths.
- Isolation: Separate directories/buckets per project; hostname-based routing prevents cross-access.

Multi-Tenancy and User Management

Current: Roles exist (USER, ADMIN, OPERATOR); only operator bootstrap & role guard on status endpoint are active.

Planned Spec:

While the platform can be run for a single user (the operator), it also supports multi-user mode:

						- Roles:
							- Operator: Full control; first created/first OAuth login promoted automatically.
							- Admin: Manages users/projects; limited access to critical operator-only settings.
							- User: Manages only own projects.
						- Authentication modes:
							- Local auth (email/password) with bcrypt/argon2 hashing.
							- OAuth providers (Google, GitHub, etc.) configurable via env; first OAuth login becomes operator if none exists.
							- Multiple providers supported; can disable OAuth via env.

- Registration policies: closed, open, or invite-only (invite codes managed by operator).
- First-run hardening: Force admin password change; recovery/reset mechanism via env/CLI.

User Dashboard Features:

- Project list with status (deployed, last updated).
- Deploy new versions, view version history, manage custom domains, add snippet code.
- Usage metrics (build count, bandwidth, storage) if plan-enforced.

Admin Dashboard Features:

- Global settings: Toggle sign-ups, email verification, enable SSG support, manage base domains, configure SMTP.
- User management: Promote/demote admins, set custom limits/plan, lock/ban users, manage invite codes.
- Project management: Takedown/unpublish, adjust quotas, delete projects (with optional account removal).
- Plan configuration: Define plans (limits: projects, storage, bandwidth, build frequency/duration, custom domain, password protection, etc.).
- Assign plans to users; manual overrides for special cases.
- Monitoring: Basic system metrics (disk usage, site counts, build queue stats) with room for future expansion.

Build Pipeline Implementation

Current: Not implemented; placeholder upload endpoint only.

Planned Spec:

Supporting various static site generators (SSGs) is a key requirement. The build service (inline or worker) handles compilation:

- Templates/presets: Hugo, Jekyll, Next.js export, Gatsby, Eleventy, Vue/Nuxt static, others (Pelican, Zola) extensible.
- Hugo: Bundled binary (override via HUGO_VERSION env) for fast builds.
- Jekyll: Either bundled Ruby+Bundler or future containerized build (configurable enable/disable).
- Node SSGs: Node + npm/yarn with safeguards (size/time limits) to prevent abuse.
- Extensibility: Additional pipelines added via small scripts/config.
- Isolation: Builds run in isolated dirs; queued with limited concurrency (future BullMQ) to protect resources.
- Future hardening: Optional containerized ephemeral builders for stronger isolation.
- Configurable env: Operator-supplied env vars (registry, proxy, versions) passed into build.
- Logging: Capture build logs + status for UI display.

Storage and Data Management

Current: Database models for User, Project, Deployment. No artifact storage or version retention directories yet.

Planned Spec:

Static File Storage:

- Default: Local filesystem (Docker volume or host path).
- S3-compatible option: Upload artifacts to bucket (per-project prefixes) using provided credentials.
- Serving strategies: Initially app serves (proxy/caching) even if S3 used; future direct CDN integration possible.
- Versioning: Store prior versions as separate folders or compressed archives (local/S3) with retention policy.
- Metadata: PostgreSQL stores project records and current deployment paths/keys; site files remain outside DB.
- Safety: Parameterized ORM queries; credentials via env variables only.

Backups (operator responsibility):

- Database: Regular pg_dump or managed snapshots.
- Local storage: Use external tools (restic, Duplicati, etc.); optional admin UI export (future) for project ZIP.
- S3: Rely on provider durability; still back up database.

Security Considerations

Currently Implemented:
- bcrypt password hashing
- JWT auth with operator bootstrap
- Basic auth rate limiting
- Helmet + CORS configuration
- i18n key safety

Planned:

Security (multi-tenant focus):

- Password hashing: bcrypt/argon2; no reversible storage.
- Session/token protection: Rate-limited auth endpoints; future 2FA option.
- HTTPS enforcement & secure cookies (proxy-aware configuration).
- Authorization: Per-request checks isolate user resources; admin-only endpoints guarded.
- Secrets management: All sensitive config via env vars; encourage Docker secrets or vault usage.
- Recovery: Admin password reset via env/CLI trigger (RESET_ADMIN flow).
- Upgrades: Documented process; encourage dependency patch cadence.

Additional Features and Extensibility

Extensibility roadmap:

- Analytics via snippets initially; potential built-in lightweight metrics later.
- Starter templates for rapid project creation.
- Plugin system for optional integrations (forms, CDN deployment, payments).
- Public API for programmatic deployments (webhooks, CI hooks).
- CLI tool for scripted uploads/deploys.

Deployment and DevOps Considerations

Current: Local dev + Coolify compose; CI spec described but not fully active (no automated image publishing on tag yet in this branch).

Planned Spec:

Deployment (self-host focus):

- Docker image bundles backend + built frontends + build toolchain.
- Exposes single HTTP port (e.g. 3000) for proxy (Traefik/nginx/Caddy) or tunnels.
- Build runtime: Node + selected SSG binaries; optional Ruby/Python as needed vs image size.
- Resource profile: ~1 CPU / 1–2 GB RAM sufficient for small workloads.
- Coolify template / Docker Compose for quick adoption.
- Scalability: Stateless API (DB + storage externalized) enables horizontal scaling; future CDN for static assets.
- Logging: Structured app + access logs; health endpoints for orchestrators.

Conclusion

This spec outlines a complete solution for a self-hosted static page hosting platform that emphasizes simplicity, security, and extensibility. By using mainstream technologies (Node.js, React, Postgres) and focusing on a minimal feature set for static site deployment, it ensures that even small teams or individual developers can deploy and maintain it. The result will be a FOSS application where a user can log into a clean dashboard, drag-and-drop a site, and have it live on a custom URL within minutes ￼ ￼ – all under the operator’s control and branding.

By keeping the scope to static content and offloading any dynamic needs to external services (webhooks, third-party APIs), we avoid the complexity of server-side computing for user sites. This yields a secure-by-default, low-maintenance hosting solution. Operators can enable multi-tenancy and even offer it as a service (with custom tiers and limits), or just use it privately for their own projects. In either case, the system is designed to require minimal intervention once set up – it automates domain management, builds, and deployments as much as possible.

Finally, being open-source MIT, we welcome community contributions. Developers can easily get involved thanks to the choice of popular frameworks and a straightforward codebase. The project aims to have clear documentation and a modern, simple UI/UX so that onboarding new users (and new contributors) is frictionless. This spec covers the foundational features; future community-driven enhancements can further expand its capabilities while adhering to the core philosophy of simplicity.

## Operations & Release Docs

Key operational documents:

- VERSIONING.md – Semantic Versioning & image tagging policy.
- ROLLBACK.md – Standard rollback playbook (app logic vs migration failure paths).
- SECURITY_BASELINE.md – Current and planned hardening measures.
- CONFIGURATION.md – Comprehensive list of environment vs dashboard-managed settings.

## Stack Rationale

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Backend Framework | NestJS (TypeScript) | Opinionated structure (modules, DI) accelerates maintainable feature growth; strong ecosystem (guards, interceptors) for auth & multi-tenancy. |
| Language | TypeScript | Type safety across backend, frontend, and shared models reduces runtime errors and eases refactors. |
| ORM | Prisma | Clear schema DSL, safe migrations, type-safe client, good developer velocity; easier evolving schema (plans, settings) vs raw SQL. |
| Database | PostgreSQL | Reliable relational core, strong JSON support, advanced features (RLS, indexing) needed for multi-tenant security & analytics flexibility. |
| Cache / Queue Backend | Redis | Fast in‑memory storage for rate limiting, build queue (BullMQ), locks for concurrency gates, ephemeral counters. |
| Frontend Toolchain | React + Vite | React ubiquity for hiring & ecosystem; Vite offers fast dev server + optimized builds with minimal config overhead. |
| Reverse Proxy / Edge | Traefik | Dynamic config via Docker labels, integrated ACME (Let’s Encrypt) automation, simpler multi-service routing & TLS than nginx for this use case. |
| Container Orchestration (MVP) | Docker Compose | Lightweight, quick local + single-node prod deployment; forms a bridge to future Swarm/Kubernetes without early complexity. |
| Build Queue Library | BullMQ (planned) | Redis-backed, robust job control, concurrency & rate limits built-in, familiar patterns for background processing. |
| Artifact Storage (MVP) | Local FS | Simplest path for early deploy iterations; defers complexity of S3-compatible object storage until scale demands. |
| Future Object Storage | S3-compatible (MinIO / AWS S3) | Standard interface, enables horizontal scaling & CDN fronting later. |
| Auth Tokens | JWT | Stateless scaling, easy integration with guards and future API consumers; short-lived access with potential refresh strategy later. |
| Configuration Strategy | Env bootstrap + DB runtime settings | Secrets remain in environment; adjustable limits & flags live-editable via admin dashboard with audit trail. |

This rationale closes the previously “rationale doc pending” task in Phase 1.

Refer to these before tagging a release or performing production upgrades.

## Continuous Integration (CI)

GitHub Actions workflow (`.github/workflows/ci.yml`):

- Triggers: pushes to `main`, feature branches (`feature/**`), PRs to `main`, version tags (`v*`).
- Jobs:
						- Build/Test: Start Postgres + Redis, install deps, Prisma generate, run backend Jest tests, build backend & frontends.
						- Docker images (tag builds): Build & push backend/frontend images to GHCR (`<tag>` + `latest`).
- Optional (commented): Enable Snyk scans by adding `SNYK_TOKEN` and uncommenting steps.

Tagging a release (`vX.Y.Z`) will automatically publish new images consistent with `VERSIONING.md`.

Sources:

- CrazyEgg, Tiiny Host Review – noted the quick setup and ease of uploading static files, plus custom domain support influencing focus on intuitive dashboard & domain features.

- Dev.to – on using environment variables for configuration and keeping secrets out of code, aligning with our security practices.
