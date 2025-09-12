---
title: Rollback Plan
---

\n## Rollback Plan  
**Status:** Shipped (manual) – automated rollback & canary Planned

Reliable reversibility is required for any production upgrade. This document defines the standard rollback playbook.

### Core Principles

1. Fast: Rollback must complete in minutes.
2. Safe: No data loss beyond what the previous version already supported.
3. Observable: Post-rollback health checks & logs confirm success.
4. Immutable Artifacts: Rollback always targets a previously published immutable image tag (`vX.Y.Z`).

### Prerequisites

- All releases are tagged using SemVer (`vMAJOR.MINOR.PATCH`).
- Each release build stores container images in registry with immutable digest.
- Database schema migrations are additive when possible (forward-compatible) to allow rolling back app code without immediate schema reversal.

### High-Level Rollback Types

| Scenario | Action |
|----------|--------|
| Non-breaking bug introduced (logic/regression) | Re-deploy previous patch version image |
| Performance regression | Re-deploy previous image & open perf investigation |
| Failed migration (partial) | Restore pre-upgrade DB backup, then re-deploy previous image |
| Security hotfix faulty | Revert to last secure patch; assess exposure |

### Release Preflight Checklist (Before Upgrading)

1. Record current running image tag & git commit.
2. Take database backup (e.g. `pg_dump` or snapshot). Store path + checksum.
3. Verify migrations about to apply are non-destructive OR have down migrations available.
4. Confirm free disk space for temp artifacts.
5. Confirm health endpoint (baseline) returns OK.

### Standard Upgrade Procedure (Reference)

1. Pull new version image: `docker compose pull` (or platform equivalent).
2. Run migrations: `prisma migrate deploy` against DB.
3. Deploy containers with new tag.
4. Run smoke tests (auth, project create, health internal).
5. Monitor logs for 2–5 minutes.

If any step irreparably fails proceed to rollback.

### Rollback Procedure (App Logic Issue)

1. Identify last known good version (LKG) tag (recorded in preflight step).
2. Update deployment to use LKG image tag for affected services (backend + frontend).
3. Do NOT revert DB if migrations were additive & app is backward-compatible with new schema. (Prefer forward-only design.)
4. Restart services.
5. Run smoke tests against LKG version.
6. Create incident note in CHANGELOG (Security or Fixed section of next release) if user impact occurred.

### Rollback Procedure (Migration Failure / Incompatible Schema)

1. Stop application services (to prevent writes) – leave DB running.
2. Restore DB from backup taken during preflight.
3. Verify restoration by checking migration table state & row counts of critical tables.
4. Re-deploy last known good image tag.
5. Run smoke tests.
6. Capture root cause & update migration guidelines.

### Artifacts & Retention

- Retain last N (default 5) release images locally or guarantee registry retention.
- Keep DB backups for at least 7 days or per operator policy.
- Store backup metadata (timestamp, version, checksum) in an operator log file (`ops/backups.log`).

### Smoke Test Suite (Minimal)

Run immediately after rollback:

- `GET /health` (public) returns 200.
- `GET /health/internal` (with operator token) returns 200 & expected structure.
- Auth flow: register -> login -> /auth/me.
- Project CRUD: create project, list projects, delete project.

Automate when CI/CD integration is added.

### Communication & Logging

- Log a single structured line on rollback start: `{event: 'rollback_start', from: 'vX.Y.Z', to: 'vA.B.C'}`.
- Log completion with success flag.
- Annotate CHANGELOG under Unreleased -> Changed or Security if user-facing impact.

### Future Enhancements (Planned / Optional)

- Automated canary deployment & auto-revert on error rate spike.
- Continuous backups (WAL archiving) enabling point-in-time recovery.
- Automated differential schema drift detection pre-upgrade.
- Slack / webhook notification on rollback events.

A disciplined rollback process turns deployment risk into a reversible experiment. Follow this document verbatim for every production rollback.
