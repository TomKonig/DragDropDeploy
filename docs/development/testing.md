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

### Commands

```bash
npm test -w backend              # all
npm test -w backend -- path/to/spec.ts --runInBand  # single
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

Add coverage script:

```bash
npm run test:coverage -w backend
```

Enforce minimum thresholds once stable.

### CI Integration (Planned)

Pipeline stages:

1. Install deps
2. Lint / typecheck
3. Unit tests
4. E2E tests (parallel shard possible)
5. Build images

### Open Questions

- Snapshot testing policy
- Mocking external HTTP (if added) strategy
- Load/perf test inclusion timing
