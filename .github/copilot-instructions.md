# DragDropDeploy Agent Operational Guidelines

> Purpose: Define mandatory behaviors for automated AI agents acting within this repository (issue triage, implementation, documentation, release prep). These rules are authoritative. If a rule cannot be followed, the agent must open an issue explaining why and request human input.

## Core Principles

1. Codebase Alignment First
   - Always reacquire current repository context before starting work (pull latest default branch + read changed files related to the issue).
   - Treat prior model knowledge as stale; prefer in-repo source over assumptions.
   - Enumerate impacted packages (`backend`, `frontend`, `shared`, infra) before implementation.
2. External Knowledge Freshness
   - Assume bundled framework/library knowledge may be outdated.
   - Use sanctioned web / MCP tools (e.g. dependency docs, security advisories) when:
     - Adding or upgrading libraries
     - Touching integration points (NestJS, Prisma, BullMQ, Traefik, Vite, Redis, PostgreSQL)
   - Summarize external references inline (do not paste large dumps).
3. Roadmap & Issue Discipline
   - Policy (2025-09-13 supersedes 2025-09-12): Each roadmap slug has ONE canonical parent issue titled `[slug] <short scope summary>` with the `roadmap` label.
   - All execution / task / bug / enhancement work for that scope MUST be created as GitHub sub-issues (child issues) of the canonical slug issue WITHOUT repeating the slug in their titles (no `[slug]` prefix for sub-issues).
   - The parent slug issue acts as an umbrella tracker (status updates, summary, acceptance). Sub-issues drive granular implementation and may have normal labels (type, scope, priority) but MUST NOT add another `roadmap` label.
   - Creating a new slug: open a single parent issue with `[pending-slug]` prefix if slug naming unsettled; once finalized rename to `[slug] ...` then attach sub-issues.
   - Do NOT open multiple `[slug]` parent issues. If overlap discovered, consolidate by linking and closing duplicates.
   - Exemptions: trivial typo, tiny test fix, ultra-small bug (<5 lines) — may live as standalone issue (no sub-issue) unless clearly tied to an active slug (then make it a sub-issue).
   - Migration note: Existing multiple `[slug]` issues should be collapsed: choose oldest or most descriptive as parent; convert others into sub-issues or close with reference.
4. Prioritization
   - Default queue: Open issues in the active Release / Project board (e.g. `MVP`) ordered by priority labels or pipeline column.
   - May preempt only for: confirmed vulnerability, blocking regression, data-loss risk, explicit user direction.
5. Phased Planning Requirement
   - Before editing code, produce a concise plan with phases: Discovery → Design → Implementation → Validation → Documentation → Cleanup.
   - Await a single human approval signal ("Proceed" / label) once per issue; do not pause after every phase.
6. Autonomous Execution
   - After approval, carry work end-to-end: code, tests, docs, changelog, roadmap status, cleanup.
   - Avoid unnecessary confirmation prompts; only stop on ambiguity, conflicting requirements, or failing gates that need strategic choice.
7. Changelog Enforcement
   - Every non-trivial merged change must add an entry under `## [Unreleased]` in `CHANGELOG.md` (section: Added / Changed / Fixed / Security / Removed / Docs).
   - If multiple commits for one issue, aggregate into one final changelog bullet (edit earlier if needed).
   - Mirror file (`docs/reference/changelog.md`) is generated—never edit it directly.
8. Deferrals & Follow-Ups
   - When punting scope (tech debt, optimization, edge case), immediately open a new issue with labels: `follow-up`, `tbd` or `next` + optional roadmap slug.
   - Reference original issue via `Related-To: #<num>` in description.
9. Roadmap Synchronization
   - On closing an issue tied to a roadmap slug (detected via title prefix): ensure corresponding roadmap item status (✅ / 🟡 / 🔜) reflects reality; update `roadmap.yaml` if scope changed.
   - Never manually edit generated roadmap sections; adjust source data instead (`roadmap.yaml`).
10. GitHub-First Operations
    - Prefer GitHub MCP tooling for: creating issues, labeling, project column moves, PR creation, reviews, and merges.
    - Local tasks (tests, builds) must run before pushing.
11. Build & Image Minimization
    - Keep runtime images lean: exclude dev dependencies, examples, test fixtures.
    - Guard unused subsystems behind environment feature flags (e.g., `ENABLE_RLS`, Redis queue, metrics internals) so dormant code paths are inert.
    - Never add a dependency without documenting why (link to issue) and evaluating size/security impact.
12. Security & Compliance
    - Check for: secret usage alignment, JWT secret rotation compliance, adherence to credential rotation runbook.
    - Run security or lint scripts if the touched area is sensitive (auth, crypto, uploads, build pipeline).
13. Documentation Integrity
    - Update or create docs when adding: env var, endpoint, CLI, migration, operator flow.
    - Cross-reference new docs from existing index pages (e.g., add operational runbooks to `docs/operations/index.md` if present).
14. Testing Expectations
    - Add / update tests covering the change (happy path + at least one edge or failure case).
    - Do not reduce aggregate coverage; if unavoidable, justify in PR body.
15. Output Quality Gates
    - Before PR: PASS build, type-check, lint, tests, basic smoke run (startup + key endpoint 200 OK).
    - Reject own PR if failing gates; iterate locally before requesting review.
16. Communication Style
    - All generated plans: crisp bullet hierarchy, include acceptance criteria + rollback note.
    - Changelogs: imperative mood, present tense (e.g., "Add build artifact pruning").
17. Idempotency & Safety
    - Scripts or migrations must be re-runnable without corrupting state.
18. Logging & Observability
    - New features should include minimal structured logs (pino) and optional metric if impactful.

## Mandatory Workflow (Checklist)

1. Acquire context: sync branch, enumerate impacted modules.
2. Read related code + tests; note gaps.
3. Draft phase plan & acceptance criteria; wait for single approval.
4. Implement in small, logically isolated commits (tests may come first TDD style if suitable).
5. Maintain/update `CHANGELOG.md` (Unreleased) once per issue.
6. Ensure roadmap sync: for new scope, parent slug issue created / updated; sub-issues linked under the parent; update `roadmap.yaml` status if scope materially advances.
7. Run full validation gates locally.
8. Open PR with template populated (roadmap slug, changelog section, docs updated = yes/no).
9. Self-review diff for noise / dead code.
10. Request review or auto-merge if policy permits and gates green.

## Labels Reference (Baseline)

- `roadmap` – Marks the single parent issue representing a roadmap slug (only parent issues carry this label; sub-issues omit it).
- `priority:critical|high|normal|low`
- `type:feature|bug|refactor|security|docs|chore`
- `scope:backend|frontend|shared|infra|docs`
- `next` – Near-term follow-up.
- `tbd` – Unscheduled / backlog holding.
- `follow-up` – Created due to deferral from another issue.
- `no-changelog` – Explicit exemption (docs-only or internal non-user-facing maintenance).

## Roadmap Slug Conventions

- Lowercase kebab-case.
- Stable once published (renames require sweeping label migration).
- Derive from user-facing capability (e.g., `upload-pipeline`, `rls-enforcement`, `jwt-rotation`).

## Changelog Entry Style Guide

Format: `- Added: Short imperative description (#issue)`
Examples:

- Added: Multi-secret JWT verification support (#123)
- Fixed: Duplicate build creation under rapid concurrent uploads (#131)
- Security: Hardened upload path traversal validation (#140)

## Deferral Issue Template Snippet

```markdown
### Context

Portion deferred from #<origin>.

### Reason

(Performance risk / scope guard / timebox)

### Proposed Follow-Up

(Outline minimal next step.)
```

## Guardrails Summary

| Area      | Must Not                             | Must Always                                                            |
| --------- | ------------------------------------ | ---------------------------------------------------------------------- |
| Roadmap   | Open multiple parent slug issues     | Maintain one `[slug]` parent issue; use sub-issues without slug prefix |
| Changelog | Merge feature w/out entry            | Aggregate entry under Unreleased                                       |
| Docs      | Add feature undocumented             | Update or add relevant doc page                                        |
| Security  | Introduce secret handling divergence | Follow rotation + credential runbooks                                  |
| Build     | Inflate image with dev deps          | Keep image minimal & flag gated                                        |

## Escalation

If conflicting constraints arise (e.g., roadmap mapping ambiguous, security vs performance trade-off), open an issue `decision:<topic>` and block merge pending human input.

---

Generated: initial version. Future updates should append a dated changelog section within this file if governance rules change.

## 2025-09-13 Addendum: Markdown Fence Enforcement

1. All fenced code blocks in `docs/` must specify a language identifier (MD040). Acceptable generic fallbacks: `text` or a more specific language (`json`, `http`, `yaml`, `ts`, `sh`).
2. The `docs:check` pipeline now includes `docs:lint:fences` which fails if any unlabeled fence (a line exactly equal to ``` with no language) is present.
3. When adding or generating docs, ensure generators emit language tags; update post-processing scripts rather than committing unlabeled fences.
4. Shell usage note: when searching for triple backticks, wrap pattern in single quotes to avoid zsh command substitution hangs, e.g. `grep -n '```' file.md` (DO NOT use double quotes).
5. If a script must auto-detect languages, prefer heuristics: JSON if first non-blank char is `{` or `[`, HTTP if starts with an HTTP verb, SH if lines begin with `$` prompts or shebang.
6. Do not suppress MD040 via markdownlint disable comments; fix the fence instead.

## 2025-09-13 Addendum: Markdown Lint Rule Adjustments

1. Disabled MD003 (heading style) to avoid large-scale churn; mixed heading styles permitted short term. A future single-sweep normalization may re-enable it.
2. Disabled MD026 (no trailing punctuation in headings) allowing selective use of `?` or `:` where it clarifies meaning.
3. Continued enforcement focus: MD012 (no multiple blank lines), MD022 (blank lines around headings), MD040 (fenced code language), MD007/MD005 (list indentation consistency), MD009 (no trailing spaces), MD010 (no hard tabs), MD024 (no duplicate headings), MD032 (blank lines around lists).
4. Rationale: Prioritize rules that prevent structural or rendering issues over purely stylistic constraints to accelerate remediation and reduce noise in diffs.
5. Re-enabling any relaxed rule requires a dedicated issue, plan for automated or single-pass migration, and one consolidated commit to avoid piecemeal churn.

## 2025-09-13 Addendum: Roadmap Sub-Issue Model

1. Canonical slug representation: exactly one parent issue titled `[slug] <summary>` labeled `roadmap`.
2. Child work units: created as GitHub sub-issues (GitHub "Add sub-issue" feature) under the parent. Titles omit the slug prefix.
3. Labeling: sub-issues use standard `type:*`, `scope:*`, `priority:*` labels; they MUST NOT carry `roadmap`.
4. Status tracking: Progress / decisions summarized in parent description or comment thread; parent remains open until all required sub-issues closed and acceptance criteria met.
5. Closing flow: When parent closes, ensure `roadmap.yaml` marks slug `done` (or appropriate status). All open sub-issues must be resolved, deferred (converted to new follow-up parent?), or explicitly closed with rationale.
6. Migration guidance: Identify multiple existing `[slug]` issues → choose authoritative parent → convert others into sub-issues or close referencing parent (`Superseded by #[parent]`).
7. Automation expectations: Validation scripts will evolve to assert exactly one open/closed parent per active/done slug and zero parent duplicates; sub-issues excluded from slug duplication checks.
8. Rationale: Reduces label/slug duplication noise, creates a clear hierarchy, and simplifies roadmap gating logic.
