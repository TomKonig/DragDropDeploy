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
    - Policy (2025-09-12): Use a single generic `roadmap` label plus an issue title prefix `[slug]` (e.g. `[upload-pipeline] Implement resumable chunking`).
    - Legacy per-slug labels `roadmap:<slug>` are deprecated; do not create new ones. Existing ones may be removed opportunistically.
    - Exemptions: trivial typo, tiny test fix, ultra-small bug (<5 lines) — roadmap label optional.
    - If no fitting slug exists, create an issue proposing a new roadmap entry before coding (use placeholder title `[pending-slug] ...`).
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
6. Ensure roadmap sync (label + generated status) before final push.
7. Run full validation gates locally.
8. Open PR with template populated (roadmap slug, changelog section, docs updated = yes/no).
9. Self-review diff for noise / dead code.
10. Request review or auto-merge if policy permits and gates green.

## Labels Reference (Baseline)

- `roadmap` – Marks issue as part of product roadmap (slug from title prefix `[slug]`).
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

| Area | Must Not | Must Always |
|------|----------|-------------|
| Roadmap | Bypass slug for major feature | Prefix meaningful issue titles with `[slug]` + add `roadmap` label |
| Changelog | Merge feature w/out entry | Aggregate entry under Unreleased |
| Docs | Add feature undocumented | Update or add relevant doc page |
| Security | Introduce secret handling divergence | Follow rotation + credential runbooks |
| Build | Inflate image with dev deps | Keep image minimal & flag gated |

 
## Escalation

If conflicting constraints arise (e.g., roadmap mapping ambiguous, security vs performance trade-off), open an issue `decision:<topic>` and block merge pending human input.

---
Generated: initial version. Future updates should append a dated changelog section within this file if governance rules change.
