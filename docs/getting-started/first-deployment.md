---
title: First Deployment Deep Dive
---

## Objective

Understand what happens internally during an upload-driven deployment.

## Sequence

1. Authenticated user sends multipart POST `/deployments/upload` with `projectId` + ZIP file.
2. Controller enforces size limit (`MAX_UPLOAD_MB`) before buffering.
3. ZIP validation: magic number, traversal prevention, entry count cap, compression ratio guard.
4. Deployment row created with status `BUILDING` immediately.
5. Artifact extracted to `ARTIFACTS_DIR` in project/deployment scoped directory.
6. BuildJob row created (status `PENDING`) – future worker will process.
7. Response returns deployment & job metadata.

## Validation Guards

| Guard | Purpose | Failure Response |
|-------|---------|------------------|
| Size limit | Prevent oversized uploads | 400 (payload too large) |
| Magic number | Reject non-zip masquerade | 400 invalid archive |
| Traversal check | Block `../` path escapes | 400 invalid entry |
| Entry count cap | Avoid zip bombs w/ many files | 400 too many entries |
| Compression ratio | Detect deflation bombs | 400 suspicious archive |

## Artifact Layout

```text
ARTIFACTS_DIR/
  <projectId>/
    <deploymentId>/
      index.html
      assets/...
```

## Planned Build Phase

Future worker (BullMQ) will:

- Install dependencies (if SSG detected)
- Run build command
- Copy build output to artifact directory (or stage + atomic swap)
- Update deployment status ACTIVE or FAILED
- Persist build logs for display

## Rollback (Future)

Rollback will flip a pointer in DB to a previous deployment and optionally restore a symlink for active artifact path.

## Observability Ideas

- Emit structured log events at each major step
- Track timing metrics (upload parse, extraction, validation)
- Future: expose minimal `/deployments/:id/log` endpoint

## Where To Learn More

- `architecture/build-pipeline.md` for overall flow
- `reference/rollback.md` for recovery strategy
- `reference/configuration.md` for tuning limits
