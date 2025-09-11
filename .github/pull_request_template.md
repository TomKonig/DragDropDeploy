# Pull Request

## Summary

Describe the change briefly.

## Type

- [ ] feat
- [ ] fix
- [ ] docs
- [ ] chore
- [ ] refactor
- [ ] security

## Checklist

- [ ] Tests added/updated
- [ ] All tests pass locally (`npm test`)
- [ ] Lint & typecheck clean (`npm run lint`, `npm run typecheck`)
- [ ] Changelog updated (root `CHANGELOG.md`)
- [ ] Relevant docs updated (see below)
- [ ] Security impact considered
- [ ] Roadmap & tasklist synchronized (if a roadmap item advanced, corresponding `tasklist.md` box updated, and vice‑versa)
- [ ] Snyk scans run on changed code (Code + SCA) with no new high severity issues OR rationale provided
- [ ] New / changed environment variables documented in `CONFIGURATION.md` & `.env.example`
- [ ] Rollback plan or confirmation: change is safely reversible (note how)
- [ ] If adding build flags / commands: allow-list & validation updated + tests
- [ ] If serving user-uploaded content: path traversal & content-type checks verified
- [ ] If security-sensitive: threat model delta noted below

## Docs Update Matrix

Tick all that apply if code in those areas changed:

- [ ] Configuration (`docs/reference/configuration.md`)
- [ ] API Auth (`docs/reference/api-auth.md`)
- [ ] Build Pipeline (`docs/architecture/build-pipeline.md`)
- [ ] Database / Prisma models (`docs/architecture/database.md`) – added/removed models documented
- [ ] Roadmap status adjusted (`docs/roadmap.md`)
- [ ] Tasklist updated (`tasklist.md`)
- [ ] Threat model updated (`docs/security/threat-model.md`)
- [ ] Getting Started guides (`docs/getting-started/*.md`)
- [ ] Configuration reference (`CONFIGURATION.md` / `.env.example`)
- [ ] Deployment / Coolify (`COOLIFY.md`)
- [ ] Security baseline (`SECURITY_BASELINE.md`)

If any unchecked items should have been updated, explain why.

## Breaking Changes

List any breaking changes and migration steps.

## Security Considerations

Describe new attack surface, secrets, permissions, or mitigations.

### Snyk Summary

- Code Scan: (attach excerpt or link) – New High/Critical: 0? If not, justify.
- Open Source (SCA): New High/Critical: 0? If not, justify.

### Threat Model Delta

- Entry points changed:
- Data flows changed:
- Privilege / role changes:
- Notable mitigations added:
- Residual risks / follow-ups:

## Screenshots / Output (if UI/API)

Add before/after or example responses.

## Rollback Notes

State what command or revert PR would restore previous behavior; note any irreversible migrations.
