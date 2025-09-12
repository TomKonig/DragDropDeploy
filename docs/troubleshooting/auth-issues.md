---
title: Authentication / Authorization Problems
---

\n## Authentication / Authorization Problems  
**Status:** Shipped (JWT auth) – refresh tokens & OAuth Planned

### Symptoms

| Indicator | Details |
|-----------|---------|
| 401 Unauthorized | Missing / invalid bearer token |
| 403 Forbidden | User lacks required role for endpoint (future role system) |
| Token suddenly invalid | Secret rotated or token expired |

### Diagnosis

1. Confirm login works:

```bash
curl -s -X POST http://localhost:3000/auth/login -d '{"email":"admin@example.com","password":"StrongP@ssw0rd"}' -H 'Content-Type: application/json'
```

1. Decode JWT (header & exp) to ensure not expired:

```bash
jq -R 'split(".") | .[1] | @base64d | fromjson' <<< "$TOKEN"
```

1. Check server logs for guard errors.

### Resolution

| Issue | Fix |
|-------|-----|
| Expired token | Re-login to obtain new token |
| Wrong secret across services | Align `JWT_SECRET` everywhere & restart |
| Clock skew | Sync server time (NTP) |

### Prevention

- Rotate secrets deliberately with overlap window.
- Add refresh token flow (Planned).
- Centralize auth error metrics (Planned).

### Related Docs

- [Security Baseline](../reference/security-baseline.md)
- [Quickstart](../getting-started/quickstart.md)
