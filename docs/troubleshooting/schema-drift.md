---
title: Schema Drift Detected
---

## Schema Drift Detected

> The Prisma schema defines models/fields not present in applied migrations (or vice‑versa).

### Symptoms

| Indicator | Details |
|-----------|---------|
| CI Failure | `Schema Drift Check` workflow fails with message `Drift detected between schema.prisma and migrations` |
| Local Generate Error | `npx prisma generate` works, but deploy environment lacks columns at runtime (e.g. `P2022 Column does not exist`) |
| Runtime 500 | API endpoints referencing missing field throw 500 with Prisma error code |

### Diagnosis

1. Run diff locally:

```bash
cd backend
npx prisma migrate diff \
  --from-migrations ./prisma/migrations \
  --to-schema-datamodel ./prisma/schema.prisma \
  --shadow-database-url "file:./tmp-shadow.db" --script | sed -n '1,120p'
```

1. Inspect output for `CREATE/ALTER/DROP` statements.
2. Confirm latest commit contains a migration folder matching the change (timestamped directory).

### Resolution

| Scenario | Action |
|----------|--------|
| Field added in schema but no migration | Create new migration: `npx prisma migrate dev --name add_<field>` and commit folder. |
| Field removed in schema prematurely | Revert schema deletion, plan removal for future version with data migration. |
| Renamed field (accidental) | Revert rename; perform add-copy-backfill-remove sequence in controlled release. |

### Prevention

- Do not edit `schema.prisma` and forget to run `migrate dev` locally.
- Keep changes small; one conceptual change per migration.
- Rely on CI drift check before merging.
- Document non-trivial migrations in PR description (rollback implications).

### Related Docs

- [Database & Migrations](../architecture/database.md)
- [Rollback Plan](../reference/rollback.md)
