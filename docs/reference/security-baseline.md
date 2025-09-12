---
title: Security Baseline
---

## Security Baseline

This document will evolve. Current baseline principles applied or planned:

Related: See `../security/threat-model.md` for assets, threats, and mitigations mapping.

### Defense in Depth

- Run behind Traefik with separate `internal` and `proxy` networks; Postgres & Redis only on `internal`.
- No privileged containers; future hardening: read-only FS for frontend / minimal perms.
- ACME automation for TLS (staging now, production later) + fallback self-signed for offline dev.

### Least Privilege / DB

- Future: dedicated roles (migrator, app_rw, app_ro). Runtime will *not* use superuser.
- RLS to be enabled after schema stabilization; tenant scoping via session variable.
- Document JIT elevated role procedure for maintenance.
    - See: ../operations/jit-admin-access.md (JIT elevation design & runbook)
- Roles script added at `backend/prisma/db_roles.sql`; production to run via isolated migration job, not app container.
- Separate DATABASE_URLs: one for migrations (migrator), one for runtime (app_rw), optional reporting (app_ro).

### Secrets & Config

- All secrets via environment variables; encourage Docker secrets for production.
- JWT secret must be replaced with a strong unique value before production (highlight in README).

### OAuth (Planned)

- Enforce state + nonce (OIDC) and minimal scopes.
- First successful OAuth login becomes operator only if no operator exists.
- Rate-limit auth initiation & callback endpoints.

### Build Isolation (Planned)

- Start with local process builds; feature flag to enable containerized isolation later.
- Resource caps & timeouts on build jobs before enabling multi-tenant mode.

### Logging & Privacy

- Build logs stored without secrets; future redaction layer will scrub any accidental sensitive output.

### Supply Chain

- CI includes (commented) Snyk steps; to activate once SNYK_TOKEN secret provided.
- Pin base images (node:20-alpine, nginx:1.27-alpine, postgres:16-alpine, redis:7-alpine, traefik:v3.0).

### Next Steps (Security)

- Implement DB role creation migration scripts.
- Add rate limiting middleware (login/build trigger) before public release.
- Add Helmet & stricter CORS config when API domain finalized.
- Add automated dependency audit gating high severity vulnerabilities.
- Re-enable docker internal network isolation for Postgres/Redis; provide host access via ephemeral migration sidecar.
- Replace plaintext role passwords with secrets manager or Docker/K8s secrets.

### Container Runtime Hardening: Seccomp & AppArmor (Reference)

Baseline Docker defaults already apply a seccomp profile that blocks dangerous syscalls. For production we recommend:

1. Keep default (docker/default) unless a specific required syscall is blocked.
2. Introduce a restricted custom profile for statically served frontend & build workers once syscall set observed.

#### Seccomp Example

```json
{
    "defaultAction": "SCMP_ACT_ERRNO",
    "archMap": [{ "architecture": "SCMP_ARCH_X86_64", "subArchitectures": ["SCMP_ARCH_X86", "SCMP_ARCH_X32"] }],
    "syscalls": [
        { "names": ["read", "write", "exit", "futex", "clone", "execve", "openat", "close", "statx"], "action": "SCMP_ACT_ALLOW" },
        { "names": ["ptrace"], "action": "SCMP_ACT_ERRNO" }
    ]
}
```

Compose usage (optional override):

```yaml
services:
    api:
        security_opt:
            - seccomp:./hardening/seccomp-api.json
    frontend:
        security_opt:
            - seccomp:unconfined # only temporarily during troubleshooting
```

#### AppArmor Example

On hosts with AppArmor (Ubuntu): create a profile `dragdropdeploy-api` limiting file paths and network:

```text
profile dragdropdeploy-api flags=(attach_disconnected) {
    network,
    capability net_bind_service,
    file,
    umount,
    deny ptrace (trace),
}
```

Compose reference:

```yaml
services:
    api:
        security_opt:
            - apparmor:dragdropdeploy-api
```

### Operational Notes

- Start with monitoring mode: run container with profile and watch denials (`journalctl -k | grep DENIED`).
- Maintain separate profiles for: api, frontend (static), worker (broader build commands). Worker profile will loosen exec/bind mounts when build isolation enabled.
- Document how to temporarily relax: set `seccomp:unconfined` or remove AppArmor opt, then revert and tighten profile after adding missing safe syscalls/files.

These references satisfy the checklist item to provide an initial seccomp/AppArmor baseline without over-constraining early development.
