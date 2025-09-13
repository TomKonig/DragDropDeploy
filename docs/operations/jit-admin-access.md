---
title: Just-In-Time (JIT) Admin / Operator Access Procedure
---

Status: Draft (Implements tasklist item: "JIT admin access plan")

## Objective

Provide a controlled, auditable way to grant a temporary elevated (ADMIN or OPERATOR) role for maintenance or incident response and automatically revoke it after a short TTL.

## Principles

- Least privilege: baseline users run with ordinary `USER` role.
- Explicit grant with bounded lifetime (default 15 minutes; configurable).
- Revocation is automatic (scheduled) and can be forced manually.
- Audit trail: every grant & revoke logged.
- No direct manual UPDATE queries in production runbooks; use the provided script.

## Roles

Current roles: `USER`, `ADMIN`, `OPERATOR`.
For now we elevate to `OPERATOR` (superset). Future refinement could use a narrower `MAINTENANCE` role.

## Mechanism Overview

A maintenance script `scripts/jit-elevate-operator.ts`:

1. Accepts target user email and optional TTL minutes.
2. Records previous role.
3. Updates user row: sets `role=OPERATOR`, `isOperator=true`.
4. Inserts a row in a new table `JitElevation` (id, userId, previousRole, expiresAt, createdAt, revokedAt).
5. Schedules (on invocation or via cron/queue) a revocation check.
6. Revocation resets `role` + `isOperator` to previous values and stamps `revokedAt`.

A companion script `scripts/jit-revoke-expired.ts` scans for expired, non-revoked elevations and reverts them idempotently.

## Database Additions

Proposed Prisma model (will be added when implementation proceeds):

```prisma
model JitElevation {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  previousRole UserRole
  expiresAt    DateTime
  createdAt    DateTime @default(now())
  revokedAt    DateTime?
}
```

Index suggestion: `@@index([expiresAt])` for efficient sweeps.

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| JIT_ELEVATE_DEFAULT_MINUTES | 15 | Default TTL if not specified |
| JIT_MAX_MINUTES | 120 | Upper bound to prevent excessively long elevations |

## Usage

Grant (15 min):

```bash
npx ts-node backend/scripts/jit-elevate-operator.ts user@example.com
```

Grant (45 min):

```bash
npx ts-node backend/scripts/jit-elevate-operator.ts user@example.com 45
```

Manual revoke early (script will find active elevation and revert):

```bash
npx ts-node backend/scripts/jit-elevate-operator.ts --revoke user@example.com
```

Sweep (usually via cron every 5 min or queue worker):

```bash
npx ts-node backend/scripts/jit-revoke-expired.ts
```

## Operational Runbook

1. Engineer requests elevation in ticket with reason & duration.
2. On-call reviews and runs elevate script (capture output in ticket).
3. Perform maintenance actions.
4. Allow auto-revoke or manually revoke early.
5. Close ticket referencing elevation id.

## Logging

Each script logs JSON lines including: `event`, `userId`, `email`, `previousRole`, `newRole`, `expiresAt`, `elevationId`.

## Security Considerations

- Scripts must run with DB credentials that allow updating `User` table.
- All elevation attempts validated: cannot overwrite an already active elevation unless using `--force`.
- If user already OPERATOR permanently (isOperator true and no active elevation), script aborts.
- Revocation routine is idempotent: safe to run concurrently.

## Future Enhancements

- API endpoint for operators to request & approve JIT via dashboard (workflow states: requested -> approved -> active -> revoked).
- Notification (email/webhook) on elevation grant & revoke.
- Multi-factor confirmation for elevation action.
- Integration with audit log system.

---

This document fulfills the tasklist item to "JIT admin access plan" by describing design, DB schema addition, operational steps, and security posture.
