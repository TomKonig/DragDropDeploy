# Branching Strategy

This repository now uses a safer branching workflow to protect `main` while enabling rapid iteration.

## Branch Roles

- `main`: Always green. Only receives merges via tested PRs from `develop` (or hotfix branches in emergencies). Tagged releases are cut from `main`.
- `develop`: Integration branch for the next unreleased work. Feature branches branch off here and PR back here. CI must pass before merging.
- `feature/*`: Short‑lived branches for discrete units of work (feature, refactor, docs). Named like `feature/build-flags-redaction`.
- `fix/*`: Non-critical bug fixes targeting the current development cycle. Merge into `develop`.
- `hotfix/*`: Critical production issues. Branch from `main`, PR back into `main` and also merge forward into `develop` to keep history consistent.
- `chore/*`: Tooling, dependency bumps, infra, or docs-only bulk changes.

## Typical Flow

1. Sync local branches:

```bash
git checkout develop
git pull origin develop
```

1. Create a feature branch:

```bash
git checkout -b feature/<slug>
```

1. Commit early & often; rebase against latest `develop` before opening PR:

```bash
git fetch origin
git rebase origin/develop
```

1. Open PR -> base = `develop`. Ensure:
   - All tests & docs checks pass
   - Changelog updated if user-visible
   - Env vars documented if introduced
2. Merge via squash (preferred) or rebase merge to keep history linear.
3. Release: When `develop` is ready, open a PR `develop` -> `main`, run full checks, then tag version after merge.

## Hotfix Procedure

1. Branch from `main`:

```bash
git checkout main
git pull origin main
git checkout -b hotfix/<issue>
```
2. Implement fix, update changelog, raise PR to `main`.
3. After merge & tag, merge `main` back into `develop` (or rebase `develop`) to propagate the fix.

## Changelog & Docs Requirements

- Every user-visible change: update `CHANGELOG.md` (Unreleased section) and mirror into `docs/reference/changelog.md`.
- New configuration: document in `docs/reference/configuration.md` and reference in PR.
- New endpoints: regenerate OpenAPI (wrapper script) so docs gate stays green.

## Keeping a Clean History

- Prefer rebasing feature branches instead of merging `develop` into them repeatedly.
- Avoid force pushes on `develop` & `main` (only force push personal feature branches when safe).

## Automated Protections (to add)

Planned GitHub branch protection settings:

- Require status checks (tests, docs gates) on `develop` and `main`.
- Require PR reviews (>=1) for merges into `develop`; possibly >=2 for `main`.
- Disallow direct pushes to `main` (already culturally enforced; will codify).

## Future Enhancements

- Add `release/*` branches if parallel release lines become necessary.
- Auto-version & changelog validation GitHub Action.
- Enforce conventional commits or commit linting.

---
If anything becomes friction, iterate on this document—treat it as living guidance.
