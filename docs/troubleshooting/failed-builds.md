---
title: Failed or Stuck Builds
---

## Failed or Stuck Builds

### Symptoms

| Indicator | Details |
|-----------|---------|
| Build status remains PENDING | Queue worker not running or Redis unreachable |
| Status toggles BUILDING → FAILED rapidly | Validation or extraction error (zip invalid) |
| Builds succeed but artifact missing | Filesystem permissions or artifact path misconfiguration |

### Diagnosis

1. Check queue configuration:

```bash
printenv REDIS_URL
```

2. If unset, in-memory fallback is used (serial execution). If set, verify connectivity:

```bash
redis-cli -u "$REDIS_URL" ping
```

3. Inspect backend logs for build errors.
4. Verify artifact extraction directory exists (`ARTIFACTS_DIR`, default `./artifacts`).

### Resolution

| Issue | Fix |
|-------|-----|
| Redis URL wrong | Correct `REDIS_URL` and restart worker/backend |
| Invalid ZIP | Recreate archive ensuring no nested root folder mismatch |
| Permission denied | Adjust directory ownership/permissions (match container UID) |
| Memory limits | Increase container memory or reduce artifact size |

### Prevention

- Add build size limit & pre-validation (planned).
- Monitor queue latency metric (future instrumentation).
- Keep artifacts on fast local volume.

### Related Docs

- [Architecture Spec](../architecture/spec.md)
- [Deployment Activation Issues](deployments-and-activation.md)
