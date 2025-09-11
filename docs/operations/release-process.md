---
title: Release Process
---

## Release Process

Operational checklist to create a tagged release.

### Preconditions

- All required issues for milestone closed / merged
- `CHANGELOG.md` Unreleased section populated
- Tests green locally (`npm test -w backend`)
- No high/critical dependency vulns (run Snyk if enabled)

### Steps

1. Update CHANGELOG:
   - Move entries from `## Unreleased` to new version heading `## vX.Y.Z - YYYY-MM-DD` with sections (Added/Changed/Fixed/Security/Removed)
   - Leave a fresh `## Unreleased` stub at top
2. Determine version bump per `reference/versioning.md`.
3. Commit: `git commit -am "chore(release): vX.Y.Z"`.
4. Tag: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`.
5. Push: `git push && git push --tags`.
6. CI (future) builds & publishes images (record digests once available).
7. Run DB migrations on target environment: `prisma migrate deploy`.
8. Smoke test: health endpoint, auth flow, upload sample artifact.

### Post-Release

- Open next milestone (if using GitHub milestones)
- Announce (README badge / release notes)
- Create rollback point reference (record image digest, commit SHA)

### Rollback Reference

See `reference/rollback.md`. If code rollback only (schema additive), redeploy previous tag. If destructive migration applied unexpectedly, restore DB from backup first.

### Version Bump Guide (Quick)

| Scenario | Bump | Example |
|----------|------|---------|
| New feature (non-breaking) | MINOR | 1.3.0 -> 1.4.0 |
| Bug/security fix only | PATCH | 1.3.2 -> 1.3.3 |
| Breaking API / removal | MAJOR | 1.3.2 -> 2.0.0 |

### Validation Script (Future)

Automate pre-release checks:

- Lint & type check
- Test suite
- Pending migrations vs schema
- Vulnerability scan
- Changelog non-empty for new version

### Notes

Until automated CI/CD is configured, images must be built manually:

```bash
docker build -t dragdropdeploy/backend:vX.Y.Z backend
# (frontend image when applicable)
```

Push to your registry if desired:

```bash
docker tag dragdropdeploy/backend:vX.Y.Z registry.example.com/dragdropdeploy/backend:vX.Y.Z
docker push registry.example.com/dragdropdeploy/backend:vX.Y.Z
```

Add these steps to CI once pipeline file is introduced.
