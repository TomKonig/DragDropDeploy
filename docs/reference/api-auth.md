---
title: API Authentication
---

## Overview

The platform uses stateless JWT bearer tokens for authenticating API requests. Tokens are signed with `HS256` using `JWT_SECRET` and have a configurable lifetime (`JWT_EXPIRES_IN`, default 15m). Refresh tokens are not yet implemented (future roadmap). Re-authenticate after expiry.

## Token Structure

Header:

- alg: HS256
- typ: JWT

Claims (current):

- sub: user id (UUID)
- email: user email
- role: USER | ADMIN | OPERATOR
- iat / exp: issued-at and expiration

Planned future claims: `plan`, `features`, `nonce` (for replay protection enhancements).

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /auth/register | public (if signup open) | Create new user; first user becomes OPERATOR. |
| POST | /auth/login | public | Exchange credentials for access token. |
| GET | /auth/me | bearer | Return current user profile. |
| POST | /auth/logout | bearer (future) | Invalidate server-side session / token revocation list (future). |

## Request / Response Examples

### Register

POST /auth/register

Body:

```json
{ "email": "alice@example.com", "password": "StrongP@ssw0rd" }
```

Response 201:

```json
{ "id": "uuid", "email": "alice@example.com", "role": "USER" }
```

### Login

POST /auth/login

Body:

```json
{ "email": "alice@example.com", "password": "StrongP@ssw0rd" }
```

Response 200:

```json
{ "accessToken": "<jwt>", "tokenType": "Bearer", "expiresIn": "15m" }
```

### Authenticated Example

GET /projects

Header:

```http
Authorization: Bearer <jwt>
```

Response 200 (truncated):

```json
[ { "id": "uuid", "name": "site" } ]
```

## Error Formats

Errors follow NestJS HTTP exception structure:

```json
{ "statusCode": 401, "message": "Unauthorized" }
```

Common cases:

- 400: validation error (invalid email/password format)
- 401: bad credentials / missing token
- 403: insufficient role (protected route)

## Security Considerations

- Keep `JWT_SECRET` high-entropy (32+ chars) and rotate if leaked (forces re-login).
- Short token lifetime reduces exposure; consider implementing refresh tokens with rotation & reuse detection later.
- Store tokens in memory (frontend) rather than localStorage to reduce XSS persistence risk; if using cookies, set HttpOnly + Secure + SameSite=strict.
- Rate limit login attempts (controlled by RATE_LIMIT_AUTH_* env vars) to slow brute force.
- Future: implement audit log events for login success/failure, token invalidation on role downgrade, optional 2FA, and key rotation schedule.

## Roadmap Enhancements

| Feature | Purpose | Notes |
|---------|---------|-------|
| Refresh tokens | Silent renewal | Will require revocation list or rotation strategy. |
| OAuth providers | External auth | Google/GitHub first; map provider id to user. |
| 2FA | Strong auth | TOTP + recovery codes. |
| Session revocation | Force logout | For compromised accounts. |
| RLS integration | DB row security | Tie `sub` claim to PostgreSQL policies. |

## Testing Tips

- Override `JWT_SECRET` and `JWT_EXPIRES_IN` in tests via env to ensure deterministic expiry.
- Use a helper to build tokens with modified claims for role-based guard tests.
- Fuzz invalid tokens (truncated, wrong signature) to ensure 401 paths are consistent and don't leak secret material.
