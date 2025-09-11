---
title: Build Pipeline Internals
---

## Build Pipeline Internals

Describes artifact upload, validation, storage, and job lifecycle.

### Flow Overview

1. Client uploads ZIP to deployment endpoint
2. Backend validates archive (size, magic number, entry count, compression ratio, traversal paths)
3. Extracts into `ARTIFACTS_DIR/<deploymentId>/source` (or similar layout)
4. Creates `BuildJob` record (status PENDING) & sets Deployment status BUILDING
5. Worker (future) processes build job (transforms, bundling, domain config)
6. On success: deployment marked ACTIVE (planned state), job logs stored
7. On failure: deployment may revert or remain in FAILED_BUILD state (planned)

### Validation Steps

| Check | Purpose | Implementation Sketch |
|-------|---------|-----------------------|
| Size limit | Prevent large memory/disk abuse | Compare raw bytes against `MAX_UPLOAD_MB` env |
| Magic number | Ensure ZIP signature | Check first 4 bytes == PK\x03\x04 |
| Entry count | Avoid zip bombs | Cap file entries (configurable future) |
| Compression ratio | Mitigate zip bomb | Ratio compressed vs uncompressed threshold |
| Path traversal | Prevent escape | Normalize paths; reject `..` segments or absolute |

### Storage Layout

Suggested layout (current or planned):

```text
ARTIFACTS_DIR/
  <deploymentId>/
    source/        # raw extracted files
    build/         # processed build output (future)
    logs/          # build logs (future)
```

### Database Entities (Simplified)

- Deployment: id, projectId, status (PENDING -> BUILDING -> ACTIVE/FAILED), artifactPath
- BuildJob: id, deploymentId, status (PENDING -> RUNNING -> SUCCEEDED/FAILED), createdAt, finishedAt

### Status Transitions (Target Model)

| Deployment | BuildJob | Trigger |
|------------|----------|---------|
| PENDING -> BUILDING | (create PENDING) | Upload accepted |
| BUILDING -> ACTIVE | RUNNING -> SUCCEEDED | Build completes ok |
| BUILDING -> FAILED | RUNNING -> FAILED | Build error |
| ACTIVE -> BUILDING | New PENDING created | Redeploy (future) |

### Future Enhancements

- Queue isolation / concurrency controls
- Per-project build limits
- Incremental deploys (diff-based)
- Artifact checksum + integrity verification
- Build caching (shared) / remote cache store

### Logs

Planned log capture:
- stdout/stderr of build worker into `logs/build-<timestamp>.log`
- Summaries persisted in DB for quick UI access

### Security Considerations

- Reject nested archives or symlinks outside root
- Consider scanning extracted files for disallowed types if executing build scripts
- Timeouts & resource limits in worker process

### Redeploy Strategy (Planned)

1. User triggers new upload
2. New directory `<deploymentId>-<seq>` or maintain versioned subfolders
3. Switch active pointer (symlink) after successful build
4. Retain last N versions for rollback

### Open Questions

- Multi-tenant isolation boundary for builds
- Build plugin hooks (preBuild/postBuild)
- Domain routing integration timing
