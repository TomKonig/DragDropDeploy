---
title: Versioning Strategy
---

\n## Versioning Strategy  
**Status:** Shipped

We use Semantic Versioning (SemVer) for all tagged releases: `vMAJOR.MINOR.PATCH`.

Summary:

- MAJOR: Backwards incompatible API / schema changes or platform behavior changes that require operator action beyond normal upgrade (e.g. manual data migration step, breaking auth token format, removing endpoints).
- MINOR: Backwards compatible feature additions, new endpoints, new build capabilities, non‑breaking schema additions (additive columns / tables), performance improvements.
- PATCH: Backwards compatible bug fixes, security patches, documentation-only changes paired with a container rebuild, dependency bumps without functional change, minor internal refactors.

### Branch & Tag Workflow

- `main` always reflects the latest merged, potentially unreleased state.
- Release preparation occurs directly from `main` once required checkboxes for the target milestone (task list) are complete.
- A release commit updates CHANGELOG moving the Unreleased section contents under a new version heading and resets Unreleased.
- Immediately after the release commit is merged (or performed) we create an annotated git tag: `git tag -a vX.Y.Z -m "Release vX.Y.Z"` then push with `git push --tags`.
- CI (future) watches for tags matching `v*` to build & push images.

### Docker Image Tagging

Each release produces at least these tags (once CI pipeline is added):

- `dragdropdeploy:<major>.<minor>.<patch>` exact immutable image.
- `dragdropdeploy:<major>.<minor>` floating pointer to latest patch of that minor.
- `dragdropdeploy:<major>` floating pointer to latest minor of that major.
- `dragdropdeploy:latest` floats to most recent release (never a pre-release).

Pre-release (optional future):

- Use suffixes: `v1.2.0-rc.1`, `v1.2.0-beta.2`. Only exact tag -> image; never update floating tags from pre-releases.

### Database Migrations & Versioning

- Schema changes are applied via Prisma migrations committed to the repo.
- A release MUST include all migration files required to bring a previous release directly to the new version with `prisma migrate deploy`.
- Breaking (MAJOR) changes require a documented pre-upgrade backup step in `ROLLBACK.md` and CHANGELOG callout.

### Deciding Version Bumps

| Change Type | Version Bump |
|-------------|--------------|
| Add endpoint / feature (non-breaking) | MINOR |
| Add optional DB column / table | MINOR |
| Dependency security patch | PATCH |
| Internal refactor (no outward change) | PATCH |
| Fix bug in existing endpoint | PATCH |
| Remove / rename endpoint | MAJOR |
| Incompatible DB change (drop column used by clients) | MAJOR |

### Post-Release Steps

1. Tag pushed.
2. CI builds & publishes images (future pipeline).
3. Update deployment environment pulling the new exact tag (`<major>.<minor>.<patch>`).
4. Monitor health & error logs.
5. If issues arise, follow rollback procedure (`ROLLBACK.md`).

### Unreleased Changes Tracking

All changes land under `## Unreleased` in `CHANGELOG.md` with subsections Added / Changed / Fixed / Security / Removed. During release: move content under new version heading and start a fresh empty Unreleased section.

### Version Guardrails

- Never reuse or move a tag (immutability).
- Never publish a `latest` pointing to a vulnerable superseded patch when a fixed patch exists.
- Prefer many small PATCH releases over batching urgent fixes.

This strategy keeps upgrades predictable and provides clear operator expectations for risk level per version increment.
