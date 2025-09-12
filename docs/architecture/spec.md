---
title: Architecture & Full Spec
---

\n## Architecture & Full Specification  
**Status:** Living Spec (Shipped core + Planned extensions clearly labeled)

This document consolidates the full technical specification and architecture overview. Governance / process specifics now live in `MAINTAINERS.md` (trimmed) while this file is the canonical deep technical reference.

---

## Project Specification (Full)

Spec Sheet: Ultra‑Simple Self‑Hosted Static Pages Platform

## Overview and Goals

### Status Snapshot (MVP Progress)

Implemented (Current):

* Local auth (email/password) with first-user operator bootstrap
* Role guard + protected status/health endpoints
* Project CRUD
* Upload endpoint with validation scaffolding (artifact extraction & job row creation; worker pending)
* Minification pipeline (HTML/CSS/JS) with per-project opt-out and global override
* Build flags allowlist appended safely to build command (persistence in settings pending)
* Plugin scaffold with userCreated hook wired
* i18n subsystem (YAML + ICU) shared across backend & plugins
* In-memory auth rate limiting, Helmet, configurable CORS
* Structured JSON logging (pino + redaction)
* Metrics endpoint (Prometheus) exposing basic counters
* Auto-generated OpenAPI spec with Swagger UI at /docs

Planned / Not Yet Implemented (Roadmap):

* Build worker execution (queue + active/failed transitions)
* Multi-SSG detection & adapters
* Deployment version history UI & rollback operation
* Snippets injection (global + per project)
* Custom domains & multi-domain routing
* OAuth providers, invite codes, signup mode policies
* Expanded rate limiting (beyond auth)
* Persistent system & project settings tables (currently env-only for many settings)
* Domain verification workflow
* Build/job logs capture & display
* HTML head injection management UI
* Audit logging & advanced security (RLS, DB roles)
* CI image publish & automated Snyk scans (pipeline integration)

Contributors: please treat Planned items as future roadmap—PRs welcome but align first via an issue.

This project is an ultra-simple, lightweight static site hosting platform designed as a self-hosted alternative to services like Tiiny.host, Cloudflare Pages, and GitHub Pages. Its core purpose is to enable users to quickly deploy static websites (HTML, CSS, JS, images) with minimal configuration and friction. By focusing only on static content, the system remains serverless on the end-user side – no dynamic server code runs for the hosted sites. Any interactive functionality (forms, etc.) is achieved by posting to external services (e.g. webhooks like Web3Forms) rather than running backend code.

## Key Objectives

* Ease of Use: Provide an intuitive, password-protected web dashboard for users to deploy sites in just a few clicks. The goal is a five-minute setup from sign-up to a live site, similar to Tiiny.host’s quick deployment experience.
* Self-Hosting & FOSS: Open-source (MIT) and easily self-hostable via Docker or a simple install script. Designed for maintainability and contributions (KISS principles).
* Minimal Configuration: Require only essential operator setup (base domain + a few env vars) so users deploy without deep technical steps.
* Security by Default: Secure defaults (HTTPS, isolated user accounts, encrypted/hashed credentials); secrets via environment variables only.
* Extensibility: Modular design to extend with additional SSGs, storage backends, or integrations.

## Technology Stack and Architecture

Language & Frameworks: The project uses mainstream technologies. Backend: Node.js (TypeScript) with NestJS. Frontend: React (Vite) for user/admin dashboards. Shared TypeScript types across layers.

### High-Level Architecture

* Backend API Server: NestJS managing users, projects, builds, deployments, auth, and (future) static routing backed by PostgreSQL + file/object storage.
* User Dashboard (Frontend): React SPA for end-users (project CRUD, uploads, deployments, domains, snippets, version history).
* Admin Dashboard / privileged views: React for operator tasks: users, plans, limits, domains, global snippets.
* Static File Server: Will serve built artifacts per host header (subdomain/custom domain) with optional SPA fallback.

### Containerization & Deployment

* Single Docker image (future multi-stage) bundling backend + built frontends.
* Optional install script (deferred) for bare-metal.
* Configuration via environment variables only (12-factor alignment).

### State Management

PostgreSQL for core state: users, auth, projects, deployments, settings, future plans and domains. Prisma ORM for schema + migrations + type-safe client.

## Core Functionality (Spec vs Current)

### Project Creation & Deployment

Current: Project records can be created; file upload accepted and validated (size, structure) with artifact extraction; build worker not yet processing transformations.

Planned Flow:

1. User creates project (name → subdomain slug) selecting a base domain.
2. User uploads static ZIP or imports Git repo.
3. System detects SSG or uses manual build command.
4. Build runs (isolated dir / queue) producing output.
5. Artifact stored (local FS or S3) and activated.
6. Dashboard reflects status + logs.

### Managing Deployments / Versioning (Planned)

Version history & rollback (retention cap) planned. Rollback will rewire project’s active pointer to prior artifact.

### Snippets Injection (Planned)

Global (operator) and per-project `<head>` HTML injection at build time to support analytics or custom meta.

### Multi-Domain Support (Planned)

Multiple base domains; user picks one. Custom domain attachment with DNS verification + ACME (Traefik or Cloudflare). Host header routing to project artifact.

### Static Serving (Planned Enhancements)

High-perf static middleware with proper cache headers; SPA fallback toggle; future CDN layer optional.

### Multi-Tenancy & Roles

Roles: OPERATOR, ADMIN, USER. First user becomes operator. Future: invite / closed registration & OAuth mapping.

## Build Pipeline Specification (Current + Planned)

Build strategies per SSG:

* Pure static: Direct deploy.
* Hugo: Managed binary version (env override).
* Jekyll: Optional Ruby layer (may be feature-flagged to limit image size).
* Node SSGs: npm/yarn install + build with resource caps.
* Extensible adapters (future plugin interface).

Isolation via queued workers (BullMQ) (Planned) with concurrency + timeout enforcement. Future containerized ephemeral builders for stronger isolation.

## Storage & Artifacts

Local FS baseline (current). S3-compatible pluggable (Planned). Directory pattern: `/data/projects/<projectId>/deployments/<deploymentId>/`. Version retention by count (Planned). Metadata in DB includes current deployment pointer + artifact path (pointer logic for ACTIVE status pending worker).

## Security

Implemented: bcrypt hashing, JWT auth bootstrap, basic rate limiting, Helmet, CORS, i18n key safety, log redaction.
Planned: 2FA, password reset flows, RLS exploration, granular audit log, stricter CSP, optional signed URL access for artifacts in object storage mode.

## Extensibility Roadmap

Hooks & plugins for: additional SSGs, object storage, form handling proxy, analytics exporter, CI integrations, custom build steps.

## Deployment & DevOps

Docker Compose for dev + small prod. Future: documented scaling path (external Postgres/Redis, multiple API replicas, CDN). Observability: structured logs; metrics endpoint (current); future trace hooks.

## API Documentation

Swagger UI at `/docs` (OpenAPI 3). Potential future flag to disable or protect in prod.

## Logging

`nestjs-pino` with redaction; level via `LOG_LEVEL`. Pretty logging in dev only.

## Continuous Integration (Planned)

Workflow: lint, type-check, test, build, Snyk scans, image publish on tag. Version tagging aligns with versioning strategy.

## Testing Notes

Jest used with Testcontainers for Postgres. Goal: clean shutdown without `--forceExit`. Open handle detection optional with `DETECT_OPEN_HANDLES=1`.

## Stack Rationale (Summary)

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Backend | NestJS | Structured modular design, DI, guards. |
| Language | TypeScript | Shared types; refactor safety. |
| ORM | Prisma | Schema clarity + DX. |
| DB | PostgreSQL | Reliability + advanced features. |
| Queue | BullMQ (Redis) | Concurrency, retries, delayed jobs. |
| Frontend | React + Vite | Ubiquity + fast builds. |
| Proxy | Traefik | Dynamic config + ACME ease. |
| Storage (MVP) | Local FS | Simplicity early on. |
| Future Storage | S3-compatible | Scalability path. |

Refer to other reference docs for deep dives: `reference/security-baseline.md`, `architecture/build-pipeline.md`, `architecture/database.md`, `security/threat-model.md`, `reference/rollback.md`, `reference/versioning.md`.

---
End of architecture specification.
