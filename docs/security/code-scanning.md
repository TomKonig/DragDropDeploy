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
- Build: lightweight TypeScript compilation (`npm run build --workspaces`) without executing app runtime
- Query Pack: default + `security-and-quality`
- SARIF Results: uploaded to the repository Security tab automatically; artifact uploaded as fallback

## Customization

| Aspect        | How to Change                    | Notes                                                  |
| ------------- | -------------------------------- | ------------------------------------------------------ |
| Languages     | Update matrix `language` array   | Only `javascript` needed (covers TS)                   |
| Query Packs   | Append to `queries` in init step | Use `+path/to/local.qls` for custom sets               |
| Schedule      | Modify cron expression           | Keep at low-traffic time                               |
| Build Steps   | Extend the build step            | Avoid running tests with side effects                  |
| Feature Flags | Add env gating in build          | Ensure disabled subsystems aren't analyzed for secrets |

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

Avoid repository-wide query disabling unless rule is systematically noisy.

## Local Reproduction

You can run CodeQL locally (optional):

```bash
# 1. Install CodeQL CLI (or use gh extension):
brew install --cask github/codeql-cli/codeql
# 2. Create database
git checkout develop
codeql database create codeql-db --language=javascript --command='npm ci && npm run build --workspaces'
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
