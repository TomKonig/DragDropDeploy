# API & Reference Documentation Strategy

This document describes how we will migrate from manually maintained reference markdown under `docs/reference/` to partially or fully generated docs sourced from code (docstrings + OpenAPI + config introspection) while avoiding duplication.

## Goals

- Single source of truth for:
  - HTTP endpoints (OpenAPI spec)
  - Public service/class semantics (TypeDoc from TSDoc comments)
  - Configuration keys (central CONFIGURATION.md + extraction script)
- Minimize manual drift between code and docs.
- Keep contributor workflow lightweight (no huge doc review burden for small code changes).

## Current State

| Aspect | Source | Publication |
|--------|--------|-------------|
| Endpoints | SwaggerModule (runtime) | Stub `api.md` page (planned injection) |
| Auth flows | Manual (`api-auth.md`) | Manual page |
| Config vars | Manual (`CONFIGURATION.md`) mirrored into `reference/configuration.md` | Manual sync script |
| Changelog | `CHANGELOG.md` | Copied into docs/reference/changelog.md |
| Services/classes | Not documented | N/A |

## Migration Phases

### Phase 1 (Now – Bootstrap)

- Introduce TypeDoc for `shared` and `backend` (done).
- Add exemplar docstrings for representative services (`AuthService`, `UsersService`).
- Generate markdown to `docs/.generated/api/{backend,shared}` (ignored by nav for now).
- Keep existing manual `reference/` pages unchanged.

### Phase 2

- Add script to merge generated OpenAPI into `reference/api.md` between markers.
- Add curated extraction script: pick selected TypeDoc pages (e.g., key services, DTOs) and inject summaries into a new `reference/internal-apis.md` or sections within existing pages.
- Mark manual sections that are superseded with an HTML comment banner (e.g., `<!-- AUTO-SOURCE:AuthService START -->`).

### Phase 3

- Replace large tables (like configuration) with generated content from a schema or annotated source file.
- Add doc coverage CI check: new exported class without docblock => warning (not failure initially).

### Phase 4 (Post-MVP)

- Consider splitting endpoint docs by tag (auth, projects, deployments) with pagination.
- Introduce versioned API docs if breaking HTTP changes start occurring.

## Duplication Avoidance Plan

| Legacy Page | Future Source | Action |
|-------------|---------------|--------|
| `api.md` | OpenAPI JSON -> markdown generator | Replace inner section only |
| `api-auth.md` | Mix of manual + OpenAPI auth tag description | Merge: keep conceptual intro, auto-inject endpoint table |
| `configuration.md` | Code/Schema extraction | Transition when schema service exists |
| `security-baseline.md` | Manual (conceptual) | Keep manual (non-generated) |
| `versioning.md` | Manual policy | Keep manual |
| `changelog.md` | CHANGELOG.md | Already mirrored (retain) |

## Conventions

- Docblocks: Use TSDoc style, include `@remarks` for non-obvious behavior, `@example` for typical usage, `@internal` for items excluded from public docs later.
- Folder: Generated docs live under `docs/.generated`. Nothing in there is hand-edited.
- Scripts: `npm run docs:typedoc` for code structure docs; `npm run docs:api` for HTTP docs.

## Open Questions

- Do we want to surface full service method docs or just high-level conceptual pages? (Leaning: curated subset.)
- How to document plugin hook contracts? (Likely a dedicated page referencing TypeDoc anchor links.)

## Next Steps

1. Implement OpenAPI -> markdown injection script (replace stub markers in `api.md`).
2. Add generation summary to CI output (counts of endpoints, documented classes).
3. Add ESLint rule or custom script to warn on undocumented exported classes in `src/` (later).

---
Iterate on this strategy as the surface area grows.
