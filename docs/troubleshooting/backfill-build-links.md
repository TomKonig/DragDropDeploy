---
title: Missing Build ↔ Deployment Links
---

\n## Missing Build ↔ Deployment Links  
**Status:** Shipped (backfill script) – UI surfacing Planned

Historical deployments created before the `buildJobId` column existed may not be linked to their originating build jobs.

### Symptoms

| Indicator | Details |
|-----------|---------|
| API JSON | `deployment.buildJobId` is `null` for older rows |
| Backfill Dry Run | Script reports candidate matches but none applied (without `--execute`) |
| Analytics Gaps | Build success/latency metrics exclude earlier deployments |

### Diagnosis

1. List a few historical deployments:

```bash
psql "$DATABASE_URL" -c "SELECT id, projectId, createdAt, buildJobId FROM Deployment ORDER BY createdAt ASC LIMIT 10;"
```

1. If `buildJobId` is null for early records only, backfill is applicable.
2. (Optional) Inspect matching build jobs for a given time window.

### Resolution

Dry run (safe):

```bash
cd backend
npm run backfill:deploy-build
```

Execute (persist links):

```bash
cd backend
npm run backfill:deploy-build -- --execute
```

Handle ambiguous matches (rare):

```bash
npm run backfill:deploy-build -- --execute --forceAmbiguous
```

The script scoring logic:

| Factor | Score |
|--------|-------|
| Artifact path exact match | +20 |
| Successful build status | +5 |
| Time proximity (<15s) | +5 |
| Time proximity (<60s) | +3 |
| Time proximity (<120s) | +1 |

No existing non-null value is overwritten.

### Prevention

- Merge schema + migration simultaneously.
- Monitor CI drift job.
- Avoid manual DB edits.

### Rollback Considerations

Backfill is additive (only sets previously null FKs). Re-running is idempotent.

### Related Docs

- [Schema Drift](schema-drift.md)
- [Database & Migrations](../architecture/database.md)
