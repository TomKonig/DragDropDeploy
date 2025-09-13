---
title: Credential & Secret Rotation Runbook
---

Status: Draft (Implements tasklist item: "Document credential rotation procedure (DB + JWT secret + OAuth credentials)")

## Scope

Procedures to rotate:

- Database user passwords (migrator, app_rw/app_ro login roles)
- JWT signing secret(s)
- OAuth client credentials (planned)
- Redis password (if enabled later)

## Principles

- Minimize downtime: dual-key / staged approach.
- Atomic cutover where possible.
- Log every rotation with operator identity and timestamp.
- Never reuse old secrets; revoke immediately after cutover.

## 1. Database Role Password Rotation

Target roles: `ddd_app_login`, `ddd_report_login` (optional), migrator role (login wrapper if exists).

### Steps

1. Connect as superuser (outside application containers).
1. Generate new strong password (>= 32 chars, high entropy).
1. Set password:

```sql
ALTER ROLE ddd_app_login WITH PASSWORD 'NEW_LONG_RANDOM';
```

1. Update application runtime secret store / `.env` (DATABASE_URL) but DO NOT restart yet.
1. Test new credentials manually:

```bash
psql "$NEW_DATABASE_URL" -c 'select 1'
```

1. Restart API container(s) gracefully.
1. Confirm health & request auth still works.
1. Rotate reporting / migrator roles similarly.
1. Record rotation in ops log.

### Rollback

If failure before container restart, re-issue `ALTER ROLE ... PASSWORD 'OLD'`. After restart, do not roll back; fix config instead.

## 2. JWT Secret Rotation

Add multi-secret verification to allow staged rotation (implementation added in codebase):

### Environment Strategy

- `JWT_SIGNING_SECRET` – used for signing new tokens.
- `JWT_VERIFICATION_SECRETS` – comma-separated list including current signing secret + previous secrets still accepted.

Example:

```env
JWT_SIGNING_SECRET=secret_v3
JWT_VERIFICATION_SECRETS=secret_v3,secret_v2
```

### Rotation Steps

1. Generate new secret (≥ 32 random bytes base64 or hex).
2. Prepend new secret in `JWT_VERIFICATION_SECRETS` and set `JWT_SIGNING_SECRET` to it.
3. Deploy/restart API. Users keep working; old tokens (v2) still valid until expiry.
4. After maximum token lifetime passes (e.g., 24h), remove old secret from `JWT_VERIFICATION_SECRETS`.
5. Deploy again.

### Emergency Compromise

If a secret is compromised, force logout by:

1. Replace both `JWT_SIGNING_SECRET` and `JWT_VERIFICATION_SECRETS` with a brand new single value.
2. Restart API. All existing tokens become invalid; require re-auth.

## 3. OAuth Client Credential Rotation (Planned)

When OAuth added:

1. Create new client secret in provider dashboard.
2. Update `OAUTH_CLIENT_SECRET_NEXT` env variable.
3. Application attempts current then next secret until cutover time.
4. After cutover (scheduled), move NEXT -> current and unset old.

## 4. Redis Password Rotation (Future)

If Redis AUTH configured:

1. Enable `requirepass` with dual-password strategy (Redis 6+ ACL) using new user with on-demand switch.
2. Update app `REDIS_URL` to new user/password.
3. Remove old user.

## 5. Logging & Audit

Log JSON entries:

```json
{"event":"credential.rotate","kind":"jwt","by":"operatorUserId","newId":"hashRef","time":"2025-09-12T12:00:00Z"}
```

No raw secret material in logs.

## 6. Checklist Template

| Item | Done |
|------|------|
| New secret generated & stored securely |  |
| Env updated (staged) |  |
| Health check passed after restart |  |
| Old secret removed (post grace) |  |
| Audit log entry created |  |

## 7. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Forgetting to remove old JWT secret | Calendar reminder + audit script listing aged secrets |
| Using weak secret | Enforce length & randomness in startup validation |
| Accidental secret leak in logs | Redaction layer & never log raw values |

---
This runbook satisfies the credential rotation checklist item.
