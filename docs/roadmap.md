---
title: Project Roadmap
---

This page shows users what's available now, what's coming next, and what we’re exploring. For detailed engineering subtasks see the repository task list and issues (converted from `tasklist.md`).

Legend: ✅ shipped · 🟡 in progress · 🔜 planned · 🧪 experimental · ❓ under evaluation

## Now (Available or Shipping Soon)

| Feature | Status | What it means for you |
|---------|--------|-----------------------|
| Upload & validate your site archive | ✅ | Upload ZIPs with size, path traversal, compression ratio and entry count protections. Artifacts stored for builds. |
| Automatic build job creation | ✅ | Each upload immediately creates a build record and begins processing. |
| Configuration & install docs | ✅ | Clear Docker Compose + manual install instructions. |
| Auth & API basics | ✅ | JWT auth with documented endpoints. |
| Release automation | ✅ | Consistent tagged releases and published images. |
| Static asset minification (toggle) | ✅ | HTML/CSS/JS minified by default; project opt-out and global override. |
| Project build flags | ✅ | Safe allow‑listed flags appended to build; secrets redacted in logs. |
| Metrics endpoint | ✅ | Prometheus metrics for health & build insight. |
| Structured logs with redaction | ✅ | Pino logs with secret filtering. |
| Build worker (foundations) | ✅ | BullMQ queue + worker behind feature flag (REDIS_URL) with graceful lifecycle; remaining sandbox & SSG detection tracked separately. |
| Password protection (site gating) | 🔜 | Enable basic auth/token gate for staging & production. |
| Minimal dashboard (core views) | 🔜 | Focused deploy, history, and rollback screens before broader UI polish. |
| Theme-ready styling system | 🔜 | Tokenized styles to allow future theme packs. |
| Coolify + Traefik validation | 🔜 | Verified one‑click self-host flow. |

## Next (Upcoming Focus)

| Initiative | Status | Value |
|-----------|--------|-------|
| Versioned deploys & rollback | 🔜 | Keep prior versions and instantly revert if needed. |
| Domain & wildcard routing | 🔜 | Map custom and staging domains to deployments. |
| OAuth sign-in (GitHub/Google) | 🔜 | Faster onboarding & reduced password surface. |
| Artifact publish atomically | 🔜 | Prevent partial or broken live deploys. |
| Health checks & page monitoring | 🔜 | Detect broken pages post-deploy. |
| Tier-based retention | 🔜 | Automatic cleanup of old builds based on plan limits. |
| Theme overrides upload | 🔜 | Drop-in partials / CSS to customize look & feel. |
| External SSL strategy matrix | 🔜 | Choose Cloudflare, ACME or self-managed cert flows. |
| Schema drift detection | 🔜 | CI fails if DB schema & migrations diverge. |
| Test factory helpers | 🔜 | Faster contribution onboarding via simple data builders. |

## Later (Exploration & Long-Term)

| Idea | Status | Why it matters |
|------|--------|---------------|
| Container-isolated builds | ❓ | Stronger multi-tenant security at higher resource cost. |
| Plugin sandbox & permissions | ❓ | Extensibility without compromising core security. |
| Incremental / diff deploys | ❓ | Faster updates by shipping only changed assets. |
| Remote/shared build cache | ❓ | Speed up repeated builds across projects. |
| Multi-region replication | ❓ | Lower latency & resilience for global audiences. |
| UI extension injection points | ❓ | Community add-ons and custom panels. |
| Automated canary + rollback | ❓ | Safer progressive rollouts based on metrics. |
| Alternative backends (Convex/Supabase) | 🧪 | Optional external data provider experiments. |

## Security & Reliability

| Area | Status | Note |
|------|--------|------|
| Threat model | ✅ | Public document of assets, threats & mitigations. |
| SAST & dependency scanning | 🔜 | Snyk integration; will block high severity before release. |
| Row-Level Security policies | � | Session context groundwork done (AsyncLocalStorage); actual SQL policies pending. |
| DB role least privilege | 🔜 | Separate runtime vs migration credentials. |

## Developer & Contributor Experience

| Improvement | Status | Impact |
|------------|--------|--------|
| Structured logging & metrics | ✅ | Easier debugging & ops visibility. |
| Coverage thresholds in CI | ✅ | Baseline code health guardrails. |
| Pre-push local hook (lint/test) | ❓ | Optional workflow speed-up. |
| Faster test data factories | 🔜 | Lower barrier for new contributors. |

## How This Roadmap Works

The roadmap is user-facing. Engineering-level breakdowns, acceptance criteria, and granular progress live in the repository task list and issues. Completed roadmap items must correspond to checked items in `tasklist.md`; CI will flag divergence once that check is enabled.

Priorities can shift based on community feedback and operational learning. Open a discussion or issue if a feature here matters to you—especially items in the Later section.

Self-host note: All shipped features include configuration docs so you can run them privately with minimal overhead.
