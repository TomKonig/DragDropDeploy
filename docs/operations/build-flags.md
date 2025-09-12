# Project Build Flags  
**Status:** Shipped

Project build flags let you append predefined CLI flags to the build command (`npm run build`). They are stored once per project and automatically applied to all future builds, keeping deployments consistent and avoiding per-deployment reconfiguration.

## Storage

Flags are persisted in `ProjectSetting.buildFlags` (string array). They are updated via the `PATCH /projects/:id` endpoint using the `buildFlags` field.

## Allowlist Enforcement

For safety and predictability, only flags present in the comma‑separated environment variable `BUILD_FLAGS_ALLOWLIST` are accepted. A submitted flag is validated by its leading token (before any `=`). Examples:

- `--modern` checks `--modern`
- `--token=abc123` checks `--token`

If the allowlist is empty (unset), all flags are implicitly allowed (recommended only for development).

## Redaction & Logging

Build logs automatically redact sensitive patterns:

- `--token=...`, `--secret=...`, `--key=...`, `--password=...`
- Env-style `TOKEN=...`, `SECRET=...`, etc.

Only the value is removed; flag names remain for observability.

## Example Workflow

1. Operator sets `BUILD_FLAGS_ALLOWLIST="--modern,--profiling,--token"` in environment.
2. Client updates project:

```http
PATCH /projects/123
{ "buildFlags": ["--modern", "--token=ABCDEF"] }
```

1. Subsequent builds execute:

```bash
npm run build --if-present -- --modern --token=REDACTED
```

(Log output shows redacted token value.)

## Error Cases

- Supplying a flag not in allowlist → `400 Invalid build flags: --foo`.
- Duplicate flags are de‑duplicated client‑side by validation (array uniqueness is enforced at DTO level).

## Operational Notes

- Change the allowlist without restarting if your process manager injects updated env vars (else restart required).
- Keep the allowlist short; each additional flag increases surface for unexpected build variability.
- Prefer feature toggles implemented inside application code over many ad-hoc build flags.

## Future Enhancements (Planned)

- UI surface to edit allowed flags per installation.
- Per-framework smart defaults (e.g., React, Next.js, SvelteKit) resolved to canonical flags.
- Audit log entries when flags mutate.

