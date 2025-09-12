# Pull Request

## Summary

Briefly describe the change and its primary user-facing impact.

## Metadata

- Issue(s) Closed: # (list)
- Roadmap Slug: `roadmap:<slug>` (omit only if trivial bug/typo)
- Changelog Section: Added | Changed | Fixed | Security | Removed | Docs
- Docs Updated: Yes / N.A.
- Breaking Change: Yes / No (if Yes, fill section below)

## Type

- [ ] feature
- [ ] fix
- [ ] docs
- [ ] refactor
- [ ] chore
- [ ] security

## Checklist

- [ ] Phase plan executed (Discovery → Design → Implementation → Validation → Docs)
- [ ] Tests added/updated (happy path + edge)
- [ ] All tests pass locally (`npm test` / relevant workspaces)
- [ ] Lint & typecheck clean
- [ ] `CHANGELOG.md` Unreleased updated (single aggregated entry)
- [ ] Roadmap label applied (and roadmap status will auto-sync / source data updated if needed)
- [ ] No direct edits to generated mirrors (e.g., `docs/reference/changelog.md`)
- [ ] New / changed env vars documented (`docs/reference/configuration.md` + `.env.example`)
- [ ] Security impact assessed (auth, secrets, uploads, build pipeline, RBAC)
- [ ] Rollback path documented (simple revert or mitigation steps)
- [ ] Image / bundle size impact considered (removed dead code where possible)
- [ ] Feature flags applied for optional / latent functionality
- [ ] Follow-up issues opened for any deferrals (labeled `follow-up` / `next` / `tbd`)
- [ ] Snyk / security scans (if touching dependencies or security areas) – no new High/Critical OR justified

## Documentation Touchpoints

Select all that were updated (remove lines not applicable):

- Configuration (`docs/reference/configuration.md`)
- API Auth / Endpoints (OpenAPI regeneration + reference pages)
- Build Pipeline (`docs/architecture/build-pipeline.md`)
- Database / Prisma models (`docs/architecture/database.md`)
- Roadmap source (`roadmap.yaml`) or status (auto-generated)
- Threat Model (`docs/security/threat-model.md`)
- Operations Runbooks (`docs/operations/*.md`)
- Getting Started (`docs/getting-started/*.md`)
- Security Baseline (`docs/reference/security-baseline.md`)

## Breaking Changes

Describe required migrations / user actions. Provide reversible steps.

## Security Considerations

Summarize new attack surface, mitigations, secret handling, auth/rbac changes.

## Validation Evidence

Outline manual / automated verification: key commands, endpoints hit, sample logs.

## Rollback Plan

How to revert safely (git revert, config toggle, data migration rollback). Note irreversible effects.

## Additional Notes

Implementation nuances, trade-offs, or rationale not obvious from diff.
