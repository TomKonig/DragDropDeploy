---
title: DragDropDeploy Docs
description: Overview and navigation for the DragDropDeploy documentation.
---

## DragDropDeploy Documentation

![Status](https://img.shields.io/badge/status-MVP%20in%20progress-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Docs](https://img.shields.io/badge/docs-MkDocs%20Material-3D9970)
![Security Scans](https://img.shields.io/badge/security-Snyk%20integrated-lightgrey)

Welcome. This site gives operators and users a clear path from first deploy to day‑to‑day operation. Anything not yet shipped is explicitly marked as Planned and lives primarily on the roadmap.

## Current Feature Highlights

| Capability | Status | Notes |
|-----------|--------|-------|
| ZIP upload & validation | ✅ | Size, traversal, compression ratio, entry count guards |
| Automatic build job record | ✅ | BuildJob row created immediately (simulation or real) |
| Project build flags | ✅ | Allow‑listed flags appended safely; secrets redacted |
| Static asset minification | ✅ | HTML/CSS/JS with opt‑out + global override |
| Metrics endpoint | ✅ | Prometheus format `/metrics` with allow‑list option |
| Structured logging | ✅ | Pino with secret redaction patterns |
| Configuration reference | ✅ | Env vs dashboard distinction documented |
| Release & versioning docs | ✅ | Processes and semantic version strategy |
| Architecture spec | ✅ | Unified deep technical reference |
| Internationalization base | ✅ | Locale build script & shared package |
| Documentation structure policy | ✅ | See Documentation Structure & Philosophy pages |

Planned / upcoming items (domains, OAuth, advanced routing, theme overrides, health checks) are tracked on the [Roadmap](roadmap.md) and intentionally excluded from the shipped list above until available.

## Documentation Map

| Area | Audience | Purpose |
|------|----------|---------|
| Getting Started | New users | First deployment path |
| User Guide | Project users | Day‑to‑day usage (upload, flags, performance, metrics) |
| Admin Guide | Operators | Install, operations, release, deployment options |
| Architecture | Contributors / advanced ops | Design & rationale |
| Reference | Operators / power users | Precise config, API auth, rollback, versioning |
| Development | Contributors | Contributing & testing standards |
| Security | Operators & maintainers | Threat model & baseline |
| Roadmap | Community | Status: Now / Next / Later |
| Troubleshooting | Operators | Common issues & diagnostic steps |

## Quick Links

* [Configuration Reference](reference/configuration.md)
* [Versioning Strategy](reference/versioning.md)
* [Rollback Plan](reference/rollback.md)
* [Security Baseline](reference/security-baseline.md)
* [Architecture Spec](architecture/spec.md)
* [Plugins](extensibility/plugins.md)
* [Internationalization](extensibility/i18n.md)
* [Coolify Deployment Guide](operations/coolify.md)
* [Troubleshooting](troubleshooting/index.md)
* [Changelog](reference/changelog.md)

## Conventions

* **Status labels:** Shipped / In Progress / Planned / Experimental
* **Environment vs dashboard:** Environment for bootstrap & secrets; dashboard for tunable runtime settings.
* **Single source:** Configuration lives in one reference page; avoid duplicating tables elsewhere.

## Planned Features

All future functionality (domains, OAuth sign‑in, theme overrides, health checks, RLS, incremental deploys, canary, multi‑region) is listed only on the [Roadmap](roadmap.md) until shipped.

---
If something is missing or unclear, open an issue or PR. Concise, actionable improvements are welcome.
