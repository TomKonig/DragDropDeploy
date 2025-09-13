---
title: API Authentication
---

## Overview

Stateless JWT bearer tokens (HS256) authenticate API requests. Tokens use `JWT_SECRET` and expire after `JWT_EXPIRES_IN` (default 15m). No refresh tokens yet; clients must re-authenticate after expiry.

## Token Structure

Header:

- alg: HS256
- typ: JWT

Claims:

- sub: user id (UUID)
- email: user email
- role: USER | ADMIN | OPERATOR
- iat / exp: issued-at & expiration

Planned: `plan`, `features`, `nonce`.

## Endpoints

| Method | Path           | Auth                    | Description                              |
| ------ | -------------- | ----------------------- | ---------------------------------------- |
| POST   | /auth/register | public (if signup open) | Create user; first user becomes OPERATOR |
| POST   | /auth/login    | public                  | Exchange credentials for access token    |
| GET    | /auth/me       | bearer                  | Current user profile                     |
| POST   | /auth/logout   | bearer (future)         | Invalidate token (future)                |

## Request / Response Examples

### Register

Request:

```http
POST /auth/register
```

Body:

```json
{ "email": "alice@example.com", "password": "StrongP@ssw0rd" }
```

Response 201:

```json
{ "id": "uuid", "email": "alice@example.com", "role": "USER" }
```

### Login

Request:

```http
POST /auth/login
```

Body:

```json
{ "email": "alice@example.com", "password": "StrongP@ssw0rd" }
```

Response 200:

```json
{ "accessToken": "<jwt>", "tokenType": "Bearer", "expiresIn": "15m" }
```

### Authenticated Example

Header:

```http
Authorization: Bearer <jwt>
```

Response 200 (truncated):

```json
[{ "id": "uuid", "name": "site" }]
```

## Error Formats

NestJS HTTP exception shape:

```json
{ "statusCode": 401, "message": "Unauthorized" }
```

Common:

- 400: validation error
- 401: bad credentials / missing token
- 403: insufficient role

## Security Considerations

- Strong, unique `JWT_SECRET` (≥32 chars); rotate if leaked
- Rate limit auth endpoints (`RATE_LIMIT_AUTH_*`)
- Future: audit events for login, token revocation, 2FA, rotation

## Roadmap Enhancements

| Feature            | Purpose         | Notes                            |
| ------------------ | --------------- | -------------------------------- |
| Refresh tokens     | Silent renewal  | Needs revocation list / rotation |
| OAuth providers    | External auth   | Google/GitHub first              |
| 2FA                | Strong auth     | TOTP + recovery codes            |
| Session revocation | Force logout    | Compromised accounts             |
| RLS integration    | DB row security | Map `sub` to RLS policies        |

## Testing Tips

- Override `JWT_SECRET` & `JWT_EXPIRES_IN` for deterministic expiry
- Helper to build modified-claim tokens for guard tests
- Fuzz invalid / tampered tokens to assert uniform 401 responses
