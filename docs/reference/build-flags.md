---
title: Project Build Flags
---

This page describes how project-level build flags work and how they are controlled.

## Overview

Projects can define an ordered list of additional flags appended to the build command. These are stored in `ProjectSetting.buildFlags` and are injected by the build executor after a `--` separator to avoid interfering with the base command.

## Allowlist Enforcement

Environment variable: `BUILD_FLAGS_ALLOWLIST`

- Comma‑separated list of allowed flag *keys* (prefix before `=` if present), e.g. `--modern,--profiling,--analyze`.
- If unset or empty, all flags are permitted (subject to future tightening).
- Any submitted flag whose key is not present is rejected with a 400 validation error.

Example: if allowlist is `--modern,--profiling` then `--modern` and `--profiling=true` pass but `--evilFlag` is rejected.

## Sensitive Value Redaction

Flags containing tokens/secrets (`--token=`, `--secret=`, `--key=`, `--password=`) are redacted in logs. The executor replaces the value portion to prevent leakage in build logs and metrics.

## API Usage

PATCH `/projects/:id` body example:

```json
{ "buildFlags": ["--modern", "--profiling"] }
```

Response will include updated settings object with `buildFlags`.

## Error Modes

- 400: Invalid flag (not in allowlist) -> message lists offending flags.
- 413: (indirect) If overall upload or payload too large (standard platform limit).
- 500: Unexpected persistence error (should be rare; logged with redaction).

## Operational Notes

- Keep allowlist short to reduce attack surface.
- Consider environment-specific allowlists (different value for staging vs prod) if needed; currently single global list is read at request time.
- Changing allowlist impacts subsequent updates only; existing stored flags remain until modified.

## Future Enhancements (Planned)

- Per-project denylist overlay.
- Flag provenance tracking for audit logs.
- UI surface for editing flags.
