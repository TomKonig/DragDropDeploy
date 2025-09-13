# Local CI Parity & Pre-Push Hook

Ensures pushes that pass locally do not fail in GitHub Actions.

## What Runs on Pre-Push

The Husky `pre-push` hook executes:

1. Environment bootstrap: loads `.env` (exports variables) and validates `GH_TOKEN` presence.
2. Service bring-up: `scripts/ci/ensure-services.sh` launches `postgres` & `redis` via docker compose (waits for health) unless `SKIP_SERVICES=1`.
3. `npm run ci:full:strict` which chains:
   - Lint (`eslint`) over the monorepo
   - TypeScript project references build (`tsc -b`)
   - Prisma client generation (backend)
   - Documentation + API + roadmap checks (`docs:check`)
   - Backend tests (serial) & frontend tests
   - Coverage collection (backend + frontend)
   - Builds (backend, shared, frontend)
   - Clean tree verification (`scripts/ci/verify-clean-tree.cjs`)

If any step fails, the push is blocked.

## Clean Tree Verification

After generation/build steps, we require a clean git working tree. Uncommitted changes indicate a missing generated artifact in source control or a non-deterministic generator.

To update artifacts:

1. Run `npm run docs:regen-core` (if API or roadmap drift) or appropriate generation command.
2. Commit resulting changes.

## Bypass (Rare / Emergency)

Use only when coordinated: `SKIP_HOOKS=1 git push`. This skips _all_ hooks. A follow-up fix PR must be opened immediately if CI fails. To skip only service startup (e.g. you already have local Postgres/Redis): `SKIP_SERVICES=1 git push`.

## Adding New Deterministic Steps

When introducing generators (e.g., new Typedoc transforms):

1. Integrate into `docs:check` or extend `ci:full`.
2. Ensure idempotency: running twice without edits must produce zero diff.
3. Update this doc and `CHANGELOG.md` under Unreleased > Changed.

## Troubleshooting

| Symptom                       | Likely Cause                               | Resolution                                                                                 |
| ----------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Pre-push fails at docs:check  | Missing GH_TOKEN or roadmap mismatch       | Export a valid GH token; run `node scripts/docs/check-roadmap-sync.js` manually for detail |
| Clean tree verification fails | Generated file not committed               | Commit the file(s) or adjust ignore list if intentional                                    |
| Local passes, CI fails        | Environment difference (e.g., env var, OS) | Inspect CI logs; replicate container environment locally (Node 20)                         |

## Future Enhancements

- Optional caching layer for Typedoc / OpenAPI to reduce pre-push latency.
- Fast-fail mode for fence lint (stop after first violation).
- Parallel test execution with shard-aware coverage merge.
