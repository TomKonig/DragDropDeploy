# Documentation Structure & Future Split

This page explains how the documentation is organized today and how it will evolve when we introduce a split between end‑user docs and admin/hosting docs.

## Current High-Level Groups

| Section | Audience | Purpose |
|---------|----------|---------|
| Getting Started | All new users | Fast path to first deployment |
| User Guide | Site owners / project users | Day‑to‑day actions (upload, build flags, performance, metrics) |
| Admin Guide | Self‑host operators | Install, deploy, release, infrastructure integration |
| Architecture | Contributors & advanced operators | Internal design & rationale |
| Reference | Operators & power users | Exact config, API auth, versioning, rollback, generated API reference |
| Development | Contributors | Contributing, testing standards |
| Security | Operators, maintainers | Threat model, security baseline |
| Roadmap | Community | What’s shipping next / later |
| Troubleshooting | Operators | Common issues & resolutions |

## Future Split (Planned)

We plan to optionally serve documentation from the deployed instance under `/docs` with two selectable modes:

1. Full Docs (default) – All current sections (minus purely maintainer-internal notes).
2. User Docs Only – Getting Started + User Guide + limited Reference subset (configuration items relevant to project-level usage only). Admin/infra pages omitted.

An environment flag (e.g. `DOCS_MODE=user|full`) will allow operators to choose which bundle to mount; build tooling will generate two nav manifests.

## Principles

- Single canonical source (`/docs` in repo). Build scripts derive variants; no divergence.
- Future-only features must be labeled (Planned) or (Future) — never implied as shipped.
- README stays marketing-focused; deep detail lives here.
- Each reference topic has one primary page (avoid duplication in multiple sections).

## Relationship to `DOCUMENTATION_PHILOSOPHY.md`

The philosophy file defines artifact roles across the repository (README, roadmap, changelog, task list). This page scopes specifically to the MkDocs site information architecture.

## Adding New Pages

1. Decide audience first (User vs Admin vs Contributor).
2. Place file in matching folder or create a focused subfolder if grouping >3 related pages.
3. Add to `mkdocs.yml` (or future split manifest generator) exactly once.
4. If feature is not yet shipped, add a badge like: `**Status:** Planned` at top.
5. Cross-link only where it helps user flow (e.g., build flags page linking to configuration reference).

## Badges (Conventions)

Use simple bold status markers instead of color images for clarity in dark/light modes:

- **Status:** Shipped
- **Status:** In Progress
- **Status:** Planned
- **Status:** Experimental

## De-duplication Checklist

Before adding a new section verify it isn’t already covered by:

- Configuration reference
- Architecture spec
- Operations (Admin Guide)

If overlap exists, prefer extending existing page with an anchored subsection.

---
Last updated: 2025-09-12
