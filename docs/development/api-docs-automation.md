# API Docs Automation (Bootstrap)

This document tracks how we will converge existing hand-written reference docs with generated sources (OpenAPI + TypeDoc) to avoid duplication and drift.

## Current State

| Source | Tool | Output Path | Coverage |
|--------|------|-------------|----------|
| REST endpoints | OpenAPI wrapper script (`backend/scripts/generate-openapi-wrapper.cjs`) | `backend/openapi.json` + rendered md | Paths + schemas (stub fallback if bootstrap fails) |
| Backend code | TypeDoc + markdown plugin | `docs/.generated/api/backend` | Services, controllers (public) |
| Shared package | TypeDoc + markdown plugin | `docs/.generated/api/shared` | Shared types & i18n helpers |
| Hand auth docs | Manual | `docs/reference/api-auth.md` | Flows + examples |

## Problem

Manual pages in `docs/reference/` (e.g., authentication, configuration) duplicate descriptive parts that could be sourced from code comments or OpenAPI. We want:

- Single source of truth for shape & signatures (OpenAPI / TypeDoc)
- Lightweight narrative pages that embed or link generated fragments
- No requirement to manually copy method parameter tables

## Target Model (Phased)

### Phase 1 (Now)

- Generate TypeDoc markdown (already done) but do not publish it directly in nav.
- Add docblocks to critical backend services & shared public API.
- Keep existing manual reference pages unchanged (stability for readers).

### Phase 2

- Introduce a small extraction script: reads generated markdown & produces partials (e.g., `{{ include: backend/AuthService#login }}`) for selective embedding.
- Replace parameter sections in manual pages with include tokens.
- Add fail-fast script in `docs:check` ensuring include targets exist.

### Phase 3

- Move repetitive auth/token response structure docs to code docblock `@remarks` and render automatically beneath flow description.
- Begin redacting any sections in manual pages fully covered by generated content.

### Phase 4

- Navigation-level exposure of generated API (optional) if we want a full class index.
- Add search integration (MkDocs plugin) over generated API pages.

## Implementation Notes

### Include Token Format

Proposed token syntax inside md:

```html
<!-- include:typedoc path="backend/AuthService#login" -->
```

A script resolves it using a pre-indexed JSON map built after TypeDoc generation.


### Script Sketch

1. Parse `docs/.generated/api/**/**/*.md`.
2. Build map: `{ "backend/AuthService#login": { markdown: "...table snippet..." } }`.
3. Replace tokens in `docs/reference/*.md` writing to a temp build dir before mkdocs build.
4. Add verification: if token unresolved -> non-zero exit in `docs:api` stage.

### OpenAPI + TypeDoc Bridging

Where DTOs appear both in TypeDoc and OpenAPI schemas:

- Prefer OpenAPI for HTTP shape (status codes, required props).
- Use TypeDoc for behavioral notes, examples, and internal constraints.

### Authoring Guidelines

- Add `@remarks` for narrative context (why, security notes).
- Use `@example` (multiple) for typical + edge case usage.
- Mark internal helpers with `@internal` to keep output clean.

### Pending Cleanup Candidates

- `api-auth.md`: Parameter tables (candidate for replacement with includes Phase 2)
- Any repetition of token response JSON across auth docs.

## Action Items Tracker

- [x] TypeDoc config & generation
- [ ] Extraction / include script (Phase 2)
- [ ] Replace duplicated sections with tokens
- [ ] Add validation gate
- [ ] Expand docblocks coverage

---
This file evolves as we automate; update when a phase completes.
