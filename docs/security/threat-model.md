---
title: Threat Model
---

## Threat Model

High-level assessment of assets, actors, attack surfaces, and mitigations. Complements `reference/security-baseline.md`.

### Assets

| Asset | Description | Sensitivity |
|-------|-------------|-------------|
| User Accounts | Credentials / auth tokens | High |
| Deployment Artifacts | Uploaded ZIP contents | Medium |
| Build Infrastructure | Worker processes & logs | High |
| Database Data | Projects, users, deployments | High |
| Secrets / Config | Environment variables (JWT, DB) | Critical |
| Logs | May contain metadata | Medium |

### Actors

| Actor | Capability | Motivation |
|-------|------------|-----------|
| Legitimate User | Upload artifacts, manage projects | Use platform |
| Malicious User | Attempt traversal, resource abuse | Data exfiltration, DoS |
| External Attacker | Network probing | Exploit vulnerabilities |
| Insider (Compromised Maintainer) | Code changes | Supply chain attack |

### Entry Points

| Surface | Risks | Current / Planned Mitigations |
|---------|-------|------------------------------|
| ZIP Upload Endpoint | Zip bombs, traversal, large files | Size cap, traversal check, compression ratio, magic number; add rate limiting |
| Auth (future) | Brute force, token theft | JWT secret rotation, nonce/state for OAuth, rate limiting |
| API Endpoints | Injection, broken access control | Parameter validation, role guards, input sanitation (planned) |
| Build Process | RCE via scripts (future) | No untrusted execution yet; future container isolation |
| Dependencies | Supply chain compromise | Pin versions, Snyk scanning (enable) |

### Trust Boundaries

- External User -> API (network boundary)
- API -> Build Worker (process boundary future)
- API -> Database (role-based credentials)
- API -> Artifact Storage (filesystem boundary)

### Key Threats & Mitigations

| Threat | Impact | Mitigation |
|--------|--------|------------|
| Path Traversal in ZIP | Overwrite host files | Normalize & reject; test coverage |
| Zip Bomb | DoS (CPU/disk) | Compression ratio + entry count caps |
| Credential Leakage | Account takeover | Strong JWT secret; future rotation; secure cookie flags |
| Privilege Escalation | Unauthorized access | Role guard middleware; future RLS |
| Dependency Vulnerability | RCE / data leak | Snyk SCA/SAST scans; patch promptly |
| Build Sandbox Escape (future) | Host compromise | Container isolation + seccomp/AppArmor profiles |
| Data Exfiltration via Logs | Sensitive leak | Redaction layer (planned) |

### Risk Rating (Qualitative)

| Threat | Likelihood | Severity | Priority |
|--------|------------|----------|----------|
| Path Traversal | Medium | High | High |
| Zip Bomb | Medium | Medium | Medium |
| Credential Leakage | Low | Critical | High |
| Dependency RCE | Medium | High | High |
| Build Escape | Low (current) | Critical | Medium |
| Log Leakage | Medium | Medium | Medium |

### Roadmap Links

- See `security-baseline` for ongoing hardening tasks
- Roadmap security section enumerates future items (RLS, sandboxing)

### Assumptions

- Single-tenant initial deployments
- No untrusted plugins auto-loaded
- No arbitrary build scripts executed yet

### Future Work

- Formal STRIDE categorization
- Automated threat validation tests
- Periodic review at each major release
