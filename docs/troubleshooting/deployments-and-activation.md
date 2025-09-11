---
title: Deployment Activation Issues
---

## Deployment Activation Issues

### Symptoms

| Indicator | Details |
|-----------|---------|
| Latest deployment not served | Symlink not updated to new artifact directory |
| 404 after activation | Artifact extracted incorrectly or missing index.html |
| Rollback fails silently | Symlink path permission or stale process caching old path |

### Diagnosis

1. List deployment records for project (recent first) and note statuses.
2. Inspect activation symlink:

```bash
ls -l artifacts/active/<projectId>
```

3. Compare target path with expected deployment artifact directory.
4. Verify directory contains expected static assets.

### Resolution

| Issue | Fix |
|-------|-----|
| Symlink missing | Re-run activation endpoint or manually repoint (then investigate cause) |
| Wrong target | Remove and recreate symlink atomically `ln -sfn <deployDir> artifacts/active/<projectId>` |
| Missing assets | Rebuild & redeploy; ensure upload ZIP root contains site files directly |

### Prevention

- Keep activation atomic via `ln -sfn` semantics.
- Add post-activation smoke test (planned).
- Monitor logs for activation start/complete events.

### Related Docs

- [Rollback Plan](../reference/rollback.md)
- [Failed or Stuck Builds](failed-builds.md)
