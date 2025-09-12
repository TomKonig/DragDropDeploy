# Maintainers Guide

<!-- Added link to documentation philosophy for clarity on artifact roles -->
See also: [Documentation Philosophy](./DOCUMENTATION_PHILOSOPHY.md)

This file now focuses on governance, release, and maintenance processes. The comprehensive technical & architecture specification has moved to `docs/architecture/spec.md` to avoid duplication.

## Quick Links

- Full Architecture Spec: `docs/architecture/spec.md`
- Roadmap: `docs/roadmap.md`
- Threat Model: `docs/security/threat-model.md`
- Security Baseline: `docs/reference/security-baseline.md`
- Versioning Policy: `docs/reference/versioning.md`
- Rollback Procedures: `docs/reference/rollback.md`
- Configuration Reference: `docs/reference/configuration.md` (expanding)

## Roles & Responsibilities

| Role | Scope | Typical Actions |
|------|-------|-----------------|
| Operator | Self-host deploy owner | Configure env vars, rotate secrets, apply upgrades |
| Maintainer | Core project steward | Review PRs, triage issues, shape roadmap |
| Contributor | External participant | Submit issues/PRs, docs improvements |

First registered user becomes `OPERATOR`. Maintainers may promote additional operators via admin UI (future) or direct DB update (interim).

## Decision Process

1. Open an issue describing problem/feature.
2. Label: `feat`, `bug`, `security`, `docs`, `refactor`.
3. Lightweight design discussion (max a few comments) – deeper RFC only if cross-cutting.
4. PR references issue; small scope preferred. Large changes split into incremental PRs.

## Release Process (Summary)

See detailed checklist in `docs/operations/release-process.md`. Short form:

1. Ensure migrations merged & tested.
2. Update `CHANGELOG.md` and bump version per `VERSIONING.md`.
3. Tag: `vMAJOR.MINOR.PATCH`.
4. Build & publish container image (GitHub Actions forthcoming).
5. Announce notable changes & security notes.

## Security Coordination

- Security issues: mark private initially; disclose responsibly after fix & patch release.
- Run Snyk scans before release (code, SCA, IaC once infra defined).
- Update threat model when adding new externally reachable surface or privilege boundary.

## Backporting Policy

- Only critical security or data-loss fixes are backported.
- Backport branches named `backport/vX.Y` with cherry-picked commits.

## Support & Issue Triage

Triage cadence: weekly.

Priority labels:

- `P0` – security / data loss / build broken
- `P1` – core feature regression
- `P2` – normal feature or bug
- `P3` – docs / chores / low-impact

Stale after 60 days inactivity (bot TBD) unless `keep-active`.

## Coding Standards (Delta)

Refer to CONTRIBUTING doc (`docs/development/contributing.md`). Additional maintainer notes:

- Prefer explicit migrations; avoid drift edits.
- Keep public API endpoints documented in OpenAPI comments.
- Avoid introducing new global singletons outside Nest DI.

## Dependency Management

- Renovate automates updates (`renovate.json`).
- Major upgrades require manual review & test pass.
- Remove unused deps proactively; keep bundle minimal.

## Observability & Operations

- Logging: structured JSON; avoid logging secrets/token material.
- Future metrics/tracing: design doc required before adding vendor SDKs.

## Decommissioning / Removal Policy

- Mark deprecated feature in docs one minor release before removal.
- Provide migration notes or replacement guidance.

## License

MIT. Ensure new files include headers if policy decided later (currently none required).

---
End of maintainer guide.
