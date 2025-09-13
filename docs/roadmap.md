---
title: Project Roadmap
---

This page shows users what's available now, what's coming next, and what we’re exploring. For detailed engineering subtasks see the repository task list and issues (converted from `tasklist.md`).

Legend: ✅ shipped · 🟡 in progress · 🔜 planned · 🧪 experimental · ❓ under evaluation

## How This Roadmap Works

The roadmap is user-facing. Engineering-level breakdowns, acceptance criteria, and granular progress live in the repository task list and issues. Completed roadmap items must correspond to checked items in `tasklist.md`; CI will flag divergence once that check is enabled.

Priorities can shift based on community feedback and operational learning. Open a discussion or issue if a feature here matters to you—especially items in the Later section.

Self-host note: All shipped features include configuration docs so you can run them privately with minimal overhead.

<!-- AUTO-ROADMAP:START -->

| Slug                         | Issues | Phase | Type     | Scope                        | Status |
| ---------------------------- | ------ | ----- | -------- | ---------------------------- | ------ |
| multipart-upload-endpoint    | #12    | 3     | feature  | backend                      | ✅     |
| build-job-orchestration      | #16    | 3     | feature  | backend                      | 🔜     |
| static-asset-minification    | #106   | 3     | feature  | backend                      | ✅     |
| project-build-flags          | #55    | 4     | feature  | backend                      | ✅     |
| versioned-rollbacks          | #44    | 3     | feature  | backend                      | 🔜     |
| domain-routing               | #41    | 3     | feature  | backend                      | 🔜     |
| oauth-sign-in                | #20    | 3     | feature  | backend                      | 🔜     |
| atomic-publish               | #19    | 3     | feature  | backend                      | 🔜     |
| container-isolated-builds    | #43    | 3     | feature  | backend                      | 🔜     |
| incremental-deploys          | #107   | 3     | feature  | backend                      | 🔜     |
| rls-enforcement              | #46    | 4     | security | backend                      | 🟡     |
| build-sandbox                | #38    | 3     | feature  | backend                      | 🔜     |
| test-factory-helpers         | #21    | 3     | chore    | backend                      | 🔜     |
| roadmap-automation           | #117   | 4     | docs     | docs                         | 🔜     |
| lint-hardening               | #116   |       | refactor | backend,frontend             | 🟡     |
| repo-hygiene                 | #115   |       | chore    | backend,frontend,docs,shared | 🔜     |
| dev-tooling                  | #114   |       | chore    | shared                       | 🔜     |
| billing-payments             | #123   |       | feature  | backend                      | 🔜     |
| themes-and-plugins           | #126   |       | feature  | backend,frontend             | 🔜     |
| i18n-baseline                | #130   |       | feature  | backend,frontend             | 🔜     |
| security-hardening           | #129   |       | security | backend                      | 🔜     |
| auth-session-hardening       | #128   |       | security | backend                      | 🔜     |
| ui-foundation                | #125   |       | feature  | frontend                     | 🔜     |
| frontend-extensible-skeleton | #124   |       | feature  | frontend                     | 🔜     |
| project-creation-flow        | #122   |       | feature  | frontend                     | 🔜     |
| auth-ui                      | #127   |       | feature  | frontend                     | 🔜     |

<!-- AUTO-ROADMAP:END -->
