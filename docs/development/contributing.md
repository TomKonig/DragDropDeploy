---
title: Contributing Guide
---

## Contributing Guide

Guidelines for proposing changes and submitting pull requests.

### Code of Conduct

(Add link if adopting a separate CODE_OF_CONDUCT.md)

### Development Flow

1. Fork & clone (or branch if collaborator)
2. Create feature branch `feat/<short-description>` or `fix/<issue-id>`
3. Write code + tests
4. Run lint, typecheck, tests
5. Update docs & changelog (Unreleased section)
6. Open PR with clear description & checklist

### Commit Messages

Recommend Conventional Commits subset:

`feat: add zip traversal guard`
`fix: correct mime detection`
`docs: add manual install guide`
`chore: bump dependency X`

### Pull Request Checklist

- [ ] Tests added/updated
- [ ] All tests passing locally
- [ ] Lint & typecheck clean
- [ ] Docs updated (if user-facing change)
- [ ] Changelog updated (Unreleased)
- [ ] Security impact considered

### Style

- TypeScript strictness: prefer explicit return types on exported functions
- Avoid large multi-purpose PRs; aim for < 400 LOC diff when practical
- Keep functions small & purposeful

### Testing Expectations

| Change Type | Minimum Tests |
|-------------|---------------|
| Bug fix | Repro + assertion fix |
| New feature endpoint | Happy path + at least 1 failure case |
| Refactor (no behavior change) | Existing tests must pass |

### Performance & Security

Call out any perf-sensitive paths or new attack surfaces in PR description.

### Dependency Adds

- Justify necessity (why existing libs insufficient?)
- Prefer small, well-maintained packages
- Run security scan if enabled (Snyk) after add

### Changelog

Add entry under appropriate section. Group similar changes when squashing before release.

### Review Process

- At least one maintainer approval (see `MAINTAINERS.md`)
- Address review comments with follow-up commits (avoid force-push unless rebasing before merge)

### Releasing (Maintainers)

Follow `operations/release-process.md`.

### Secrets & Config

Never commit secrets. Use clearly marked example values (do not use real credentials).

### Roadmap Alignment

Consult `docs/roadmap.md` for strategic direction; propose updates if scope changes.

### Thank You

Every contribution – even typo fixes – helps improve the project.
