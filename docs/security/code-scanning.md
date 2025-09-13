---
title: Code Scanning (CodeQL)
---

## Overview

CodeQL static analysis runs automatically via `codeql.yml` on push (main & develop), pull requests, and a weekly scheduled scan (Monday 04:00 UTC). It surfaces security and quality issues (queries: `security-and-quality`) across the monorepo TypeScript / JavaScript code.

## Workflow Location

`/.github/workflows/codeql.yml`

Key characteristics:

- Triggers: push, pull_request, schedule (weekly), manual dispatch
- Permissions: `contents: read`, `security-events: write` (principle of least privilege)
- Build Mode: `none` (JS/TS extractor parses sources; dependencies installed for type resolution)
- Config File: centralized config at `/.github/codeql/codeql-config.yml`
- Query Pack: default + `security-and-quality` (implicitly enabled; extend via config file)
- SARIF Results: uploaded to the repository Security tab automatically; artifact uploaded as fallback

## Central Configuration

All CodeQL tuning (ignore paths & future custom query packs) lives in:

```text
/.github/codeql/codeql-config.yml
```

Current contents (abridged):

```yaml
name: dragdropdeploy-monorepo
paths-ignore:
   - '**/*.sarif'                 # Prevent self-analysis of previously downloaded reports
   - 'coverage/**'                # Test coverage output
   - 'docs/reference/api.md'      # Generated TypeDoc bundle
   - 'docs/reference/changelog.md'# Generated CHANGELOG mirror (if present)
   - 'docs/.generated/**'         # Other generated doc assets
   - 'tmp-*/**'                   # Ephemeral tmp output (builders / test fixtures)
```

Rationale:

- Avoid churn & false positives from purely generated artifacts.
- Keep scans focused on author-maintained source.
- Future ignores MUST document justification inline (one comment per entry).

Extending queries:

1. Create a local query pack or reference an official one.
2. Add a `queries:` stanza to the config (preferred) OR reintroduce `queries:` in the workflow `init` step if a one-off experiment.
3. Keep additions minimal; document reasoning in the PR body.

Example (adding a custom pack):

```yaml
queries:
  - uses: security-and-quality
  - uses: ./codeql/custom-pack.qls
```

Do NOT disable rules globally without a written risk acceptance note (see Suppression Guidance).

## Customization

| Aspect        | How to Change                                                           | Notes                                                  |
| ------------- | ----------------------------------------------------------------------- | ------------------------------------------------------ |
| Languages     | Update matrix `language` array                                          | Only `javascript` needed (covers TS)                   |
| Query Packs   | Add `queries:` block to `.github/codeql/codeql-config.yml`              | Prefer config over workflow inline edits               |
| Schedule      | Modify cron expression                                                  | Keep at low-traffic time                               |
| Build Steps   | (None by default) add optional `npm run build` prior to analyze         | Only if future queries require emitted JS              |
| Feature Flags | Add env gating in build                                                 | Ensure disabled subsystems aren't analyzed for secrets |
| Ignores       | Edit `paths-ignore` in config (with justification comments per pattern) | Keep list minimal & reviewed                           |

## Triage Process

1. Review new alerts in GitHub Security tab (filter by `tool:CodeQL`).
2. Classify severity & validity:
   - True Positive (fix now / schedule)
   - False Positive (suppress with inline `// codeql[<rule-id>]` comment minimally, or config)
   - Accept (document rationale if risk accepted)
3. Link fixes to `security-hardening` roadmap slug issues (parent) with sub-issues for grouped remediation.
4. Update `CHANGELOG.md` under `Security` after merging meaningful fixes.

## Suppression Guidance

Prefer code fixes. Only suppress when:

- Pattern is intentional & safe
- Refactor would materially harm clarity or performance

Use minimal scope suppression (single line) and cite rationale:

```ts
// codeql[js/some-rule]: rationale (safe usage due to validated input)
```

Avoid repository-wide query disabling unless rule is systematically noisy. Repository-wide ignores belong in the config file with a justification comment.

## Local Reproduction

You can run CodeQL locally (optional):

```bash
# 1. Install CodeQL CLI (or use gh extension):
brew install --cask github/codeql-cli/codeql
# 2. Create database (no explicit build needed for JS/TS)
git checkout develop
codeql database create codeql-db --language=javascript --command='npm ci'
# 3. Analyze
git clone https://github.com/github/codeql.git codeql-repo || true
codeql database analyze codeql-db codeql-repo/javascript/ql/src/codeql-suites/javascript-code-scanning.qls --format sarifv2.1.0 --output results.sarif
```

## Recent Remediations (Examples)

| Category            | Change                                                             |
| ------------------- | ------------------------------------------------------------------ |
| Path Validation     | Enforced temp-root & ID pattern before artifact copy               |
| Prototype Pollution | Skipped `__proto__`, `constructor`, `prototype` keys in deep merge |
| Sensitive Logging   | Removed plaintext bootstrap password emission                      |
| Regex Quality       | Rewrote multi-line marker regex to avoid useless escapes           |
| Command Escaping    | Escaped backslashes then quotes in generated shell commands        |

## Roadmap Integration

Significant CodeQL-driven hardening items must:

- Reference the parent security roadmap slug (`security-hardening` or similar)
- Add a sub-issue per logical cluster of findings
- Be summarized in `CHANGELOG.md` under `Security`

## Metrics & Continuous Improvement (Planned)

Planned enhancements:

- Query performance monitoring (duration, result count)
- Automatic diff filtering to surface only new alerts on PRs
- Coverage mapping (files analyzed vs total) export

## Policy Alignment

Aligns with repository principles:

- Security First: early detection of vulnerable patterns
- Minimal Footprint: targeted query pack (no superfluous languages)
- Docs as Source of Truth: this page updated with any workflow modifications
