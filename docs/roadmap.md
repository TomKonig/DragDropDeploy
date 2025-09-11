---
title: Project Roadmap
---

## Project Roadmap

Status legend: ✅ done · 🟡 in progress · 🔜 planned · 🧪 experimental · ❓ under evaluation

### Near-Term (0–2 Releases)

| Item | Status | Notes |
|------|--------|-------|
| Deployment artifact upload & validation | ✅ | Implemented: size, traversal, ratio, entry count, artifact persistence |
| Build job creation on upload | ✅ | Deployment status immediately BUILDING + BuildJob PENDING |
| Docs restructuring (/docs) | ✅ | Architecture spec migrated; maintainers trimmed |
| Docker Compose & manual install guides | ✅ | Added operations docs |
| Roadmap & contributing docs | ✅ | Contributing + roadmap published |
| Expanded configuration reference | ✅ | Env matrix & audited vars added |
| API auth reference | ✅ | JWT structure, endpoints, examples |
| Documentation validation CI | ✅ | Doc quality gates (env vars, changelog consistency) |
| Release process automation (scripts) | ✅ | Manual dispatch workflow + automated bump/tag/release implemented |
| Lean dashboard baseline (minimal UI, only essential components) | 🔜 | Strip to core deploy/build/rollback views before styling pass |
| Static asset minification & optional user disable toggle | 🔜 | HTML/CSS/JS minify at serve/build; per-project setting + host override |
| Custom per-deployment build flags | 🔜 | Allow user-defined extra args (validated allow-list) appended to SSG command |
| Theming-ready CSS architecture | 🔜 | Tokenized variables + utility classes to enable future theme packs |
| Password protection for sites (optional + host enforce) | 🔜 | Basic HTTP auth / token gate for staging & prod toggled per project |
| Coolify + Traefik deployment validation | 🔜 | Run end-to-end deploy behind Traefik on Coolify template |

### Mid-Term (3–6 Releases)

| Item | Status | Notes |
|------|--------|-------|
| Build worker implementation | 🟡 | Basic worker, file-based logs & feature-flagged real execution (`BUILD_EXECUTION_ENABLED`) added; extended SSG detection & sandbox pending |
| Redeploy / versioned artifacts | 🔜 | Keep N versions + rollback pointer |
| Domain & wildcard routing | 🔜 | Map hostnames to deployments |
| OAuth provider integration | 🔜 | GitHub / Google minimal scopes |
| Rate limiting middleware | ✅ | Auth login rate limiting implemented; upload path pending if needed |
| DB role separation & least privilege | 🔜 | Apply roles script; adjust runtime URL |
| Structured logging + redaction | ✅ | Pino integrated; redaction plan documented |
| Metrics endpoint (Prometheus) | 🔜 | Basic counters (requests, builds) |
| Test coverage reporting | 🔜 | Add coverage thresholds |
| External SSL strategy matrix (Cloudflare / ACME / self-cert) | 🔜 | Configurable provider + host-level enforcement policy |
| Theme override upload mechanism | 🔜 | Zip partials / CSS bundle overriding default theme assets |
| Automatic page health checks registry | 🔜 | Crawl built pages, record status & latency for dashboard |

### Long-Term (6+ Releases)

| Item | Status | Notes |
|------|--------|-------|
| Multi-tenant isolation (containerized builds) | ❓ | Evaluate cost/complexity |
| Plugin sandboxing / permissions model | ❓ | Policy-driven execution |
| Incremental diff deploys | ❓ | Hash-based partial updates |
| Build cache (shared / remote) | ❓ | Speed up repeat builds |
| Multi-region deployment replication | ❓ | CDN / edge caching strategy |
| UI extension points (frontend plugins) | ❓ | Component injection registry |
| Automated canary + rollback | ❓ | Metrics-driven deploy decisions |

### Security & Compliance

| Initiative | Status | Notes |
|-----------|--------|-------|
| Threat model doc | ✅ | Assets, threats, mitigations documented |
| SAST & SCA in CI | 🔜 | Enable Snyk with org token |
| RLS policies | 🔜 | After multi-tenant model solidifies |

### Developer Experience

| Initiative | Status | Notes |
|-----------|--------|-------|
| Factory helpers for tests | 🔜 | Speed up test authoring |
| Drift detection for schema | 🔜 | Fails CI if Prisma diff exists |
| Pre-push git hook (lint/test subset) | ❓ | Optional convenience |

### Documentation Enhancements

| Item | Status | Notes |
|------|--------|-------|
| Threat model | ✅ | Security section link present |
| API quickstart | ✅ | Quickstart & first deployment guides added |
| Configuration matrix | ✅ | Documented in configuration reference |

### Tracking & Updates

This roadmap is aspirational; priorities may shift. Update status indicators during each release cut.

Sync Note: High-level status must match granular progress in `tasklist.md`. A CI check ensures no completed roadmap item remains unchecked in the task list (and vice versa). Update both when completing a feature.
