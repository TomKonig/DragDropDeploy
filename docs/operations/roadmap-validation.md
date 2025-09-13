# Roadmap Validation

The roadmap is canonical in `roadmap.yaml`. Each tracked issue must:

1. Have the `roadmap` label
2. Begin its title with `[slug]` where `slug` is defined in `roadmap.yaml`
3. Be unique (only one open issue per canonical slug unless deliberately duplicated for phases with a suffix like `-phase-2` which should NOT carry the bare slug)

## CI Gate

The workflow `.github/workflows/roadmap-validate.yml` runs on pushes and PRs touching roadmap-related files. It fails if:

- Any canonical slug has no corresponding `[slug]` prefixed issue title
- Any `[slug]` prefix appears that is not defined in `roadmap.yaml` (orphan)
- Any canonical slug is assigned to more than one issue (duplicate)

## Fixing Failures

1. Missing: Create or retitle an existing issue with `[slug]` and apply the `roadmap` label.
2. Orphan: Either strip the prefix (run `node scripts/cleanup-roadmap-orphans.cjs --apply`) or add the slug to `roadmap.yaml` if it should be canonical.
3. Duplicate: Decide the single authoritative issue; retitle the others removing the prefix or adding a suffix (`[slug-phase-2]`).

## Local Tools

Dry run orphan cleanup:

```bash
node scripts/cleanup-roadmap-orphans.cjs
```

Apply and drop the roadmap label from orphans:

```bash
node scripts/cleanup-roadmap-orphans.cjs --apply --drop-label
```

Manual validation without CI:

```bash
node scripts/validate-roadmap.cjs
```

## Transitional Mapping

Historical verbose prefixes can be normalized with:

```bash
node scripts/normalize-roadmap-prefixes.cjs --apply --map scripts/roadmap-slug-map.json
```

Keep the mapping file minimal; remove entries once all issues use canonical slugs.
