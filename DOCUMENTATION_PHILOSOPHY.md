# Documentation Philosophy

This repository intentionally separates user‑facing marketing content from deep technical and operational detail. This file guides future contributors (human or AI) on where new information belongs so the project stays approachable for self‑hosters while remaining powerful for builders.

## Goals

1. Keep the landing README friendly, concise, and focused on value (benefits, features, quickstart).
2. Avoid overwhelming new users with internal architecture or operational edge cases up front.
3. Provide a clear path from high‑level overview → detailed documentation → contribution guidelines.
4. Encourage configuration through the UI/dashboard where possible; environment variables serve as a stable override / bootstrap layer.

## Artefact Roles

| Artefact | Audience | Purpose | What Belongs / Examples | What Does NOT Belong |
|----------|----------|---------|--------------------------|-----------------------|
| `README.md` | Evaluators, self‑hosters | Marketing overview, core feature list, simple quickstart, extensibility highlights, license | Badges, value props, short install snippet, roadmap link | Deep architecture, exhaustive env var table, internal troubleshooting logs |
| `docs/roadmap.md` | Users & community | User‑oriented Now / Next / Later view of features | Plain language feature statements | Low‑level implementation tasks, migration DDL |
| `tasklist.md` (later: issues) | Maintainers & contributors | Granular engineering tasks, acceptance criteria | Checkboxes, technical sub‑tasks, edge cases | Marketing phrasing |
| `CHANGELOG.md` | Operators, maintainers | Versioned technical change history | Added/Changed/Fixed/Security entries | Forward roadmap promises |
| `MAINTAINERS.md` | Core maintainers | Governance, release, triage policies | Release steps, security coordination | Marketing content |
| `docs/architecture/*` | Contributors | System internals & rationale | Diagrams, data flows, module boundaries | Feature marketing copy |
| `docs/reference/*` | Operators | Detailed configuration & operations | Env vars, CLI flags, migration notes | Sales / positioning language |
| `docs/development/*` | Contributors | Local dev, coding standards, contributing | Setup scripts, style guides | Product value statements |

## When Adding Content

1. Ask: Who is the primary reader? (user, operator, maintainer, contributor)
2. Place the content in the appropriate artefact above.
3. Cross‑link sparingly (avoid circular references). Prefer one canonical source per topic.
4. Keep README changes minimal unless they materially affect first impressions.
5. If a README section grows beyond ~120–150 lines, move detail to a doc page and link.

## Language Guidelines

| Context | Style |
|---------|-------|
| README / roadmap | Benefit‑driven, minimal jargon, short sentences |
| Architecture / reference | Precise, neutral, include constraints & trade‑offs |
| Changelog | Past‑tense, actionable, grouped (Added / Changed / Security) |
| Tasks / issues | Imperative, acceptance criteria clear and testable |

## Environment vs Dashboard

Principle: Prefer dashboard-managed settings for anything operators may tune at runtime (limits, feature toggles, branding, theming). Environment variables remain for secrets, bootstrap connectivity (DB, Redis, JWT secret), and host-level enforcement toggles.

If you introduce a new setting ask:

- Will most users want to adjust this after first boot? → Dashboard.
- Is it security sensitive (secrets, credentials)? → Environment only.
- Does it affect startup composition (service presence)? → Environment.

## Extensibility Surface

Features (themes, plugins, locales, build flags) should expose stable extension points documented under `docs/architecture/` or `docs/reference/` rather than expanding the README.

## Updating This Philosophy

If the documentation structure evolves, update this file first, then adjust affected artefacts in the same PR.

---
Last updated: 2025-09-12
