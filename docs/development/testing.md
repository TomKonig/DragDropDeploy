---
title: Testing Strategy
---

## Testing Strategy

Outlines layers, tooling, and guidelines for adding tests.

### Goals

- Fast feedback (unit) + realistic integration (e2e)
- Deterministic & isolated
- Clear failure diagnostics

### Types

| Type | Location | Tooling | Notes |
|------|----------|---------|-------|
| Unit | `backend/src/**/__tests__` | Jest | Test pure services / utils |
| E2E  | `backend/src/**/__tests__` (naming) | Jest + Testcontainers | Spins up real Postgres/Redis |
| Schema | Future | Prisma validate | Ensure schema invariants |
| Frontend component | `frontend/src/**/*.test.tsx` | Vitest + RTL | JSDOM render tests |

### Commands

```bash
npm test -w backend              # all
npm test -w backend -- path/to/spec.ts --runInBand  # single
npm test -w frontend             # frontend component tests
npm run test:watch -w frontend   # watch mode
```

### Testcontainers Usage

- Containers auto-pulled (Postgres, Redis) for e2e
- Reuse strategy (future) to speed up subsequent runs
- Ensure teardown closes connections to avoid hanging tests

### Patterns

| Pattern | Reason |
|---------|--------|
| Arrange-Act-Assert | Clarity |
| Factory helpers | Reduce duplication |
| Explicit data cleanup | Avoid cross-test leakage |

### Factories (Future)

Introduce lightweight factory utilities in `backend/src/test/factories` to create users, projects, deployments.

### Performance Tips

- Run with `--runInBand` when debugging for sequential clarity
- Use `test.only` sparingly; remove before commit
- Cache Docker images locally (`docker pull`) to avoid first-run delay

### Flakiness Mitigation

| Issue | Mitigation |
|-------|------------|
| Port collisions | Dynamic port allocation via Testcontainers API |
| Slow DB start | Increase Jest test timeout for first suite |
| Hanging handles | Use `--detectOpenHandles` and ensure app.close() in teardown |

### Coverage (Future)

Backend (Jest) and frontend (Vitest) coverage thresholds now enforced in CI.

Current global minimums:

| Layer | Statements | Branches | Functions | Lines |
|-------|------------|----------|-----------|-------|
| Backend | 55% | 45% | 55% | 55% |
| Frontend | 50% | 40% | 50% | 50% |

Commands:

```bash
npm run coverage:backend   # backend coverage (text + lcov)
npm run coverage:frontend  # frontend coverage (Vitest v8 provider)
npm run coverage           # both
```

Thresholds will ratchet upward over time; raise only when typical PRs comfortably exceed current floor to avoid churn.

### CI Integration (Planned)

Pipeline stages:

1. Install deps
2. Lint / typecheck
3. Backend unit + e2e tests
4. Frontend component tests
5. Generate OpenAPI + API docs (consistency gate)
6. Build images

### Open Questions

- Snapshot testing policy
- Mocking external HTTP (if added) strategy
- Load/perf test inclusion timing

### OpenAPI Doc Generation

The OpenAPI spec is generated via `npm run openapi:gen -w backend` (writes `backend/openapi/openapi.json`). Markdown reference updates with `npm run docs:api`. CI runs this inside `docs:check` to keep `docs/reference/api.md` current.
