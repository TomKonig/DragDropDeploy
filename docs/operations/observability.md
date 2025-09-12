---
title: Observability & Metrics
---

\n## Metrics Endpoint  
**Status:** Shipped (core counters) – additional metrics Planned

A Prometheus-compatible metrics endpoint is exposed at `/metrics` (no auth) providing default Node.js process metrics and application counters.

### Metric Names

Prefix: `ddd_`

Core metrics:

- `ddd_http_requests_total{method,route,status}` – Total HTTP requests processed.
- `ddd_build_started_total` – Count of build jobs started.
- `ddd_build_duration_seconds` (histogram) – Duration of completed builds.
- `ddd_active_builds` – Gauge of currently in-progress builds.
- `ddd_build_started_project_total{project_id}` – Per-project build starts (cardinality bounded by number of projects).
- Default process metrics are exported with prefix `ddd_node_` (CPU, memory, event loop lag, etc.).

### Scraping Configuration (Prometheus)

Example scrape config:

```yaml
scrape_configs:
  - job_name: dragdropdeploy
    metrics_path: /metrics
    static_configs:
      - targets: ['api:3000']
```

### Adding New Metrics

Add counters/gauges/histograms to `MetricsService` and inject it where events occur. Keep bucket counts minimal and prefer counters + summaries for high-cardinality events.

### Security Considerations

The endpoint is intentionally unauthenticated for easy integration. If deployed publicly, restrict by network ACL / reverse proxy allow-list.

Optional environment variable `METRICS_IP_ALLOWLIST` (comma-separated IPs) can be set to enforce access control directly in the service. Example:

```bash
METRICS_IP_ALLOWLIST=10.0.0.5,10.0.0.6
```

If set and the requester IP is not present, a 403 is returned.

### Roadmap (Planned Metrics)

Planned additions may include deployment success/failure ratios.
Build duration currently measured around real build execution. Simulation mode increments started counters but duration values may be near-zero until worker is active.

### HTTP Request Metrics

A global interceptor records `ddd_http_requests_total{method,route,status}` for every request. Route label uses the Nest route path when available; otherwise falls back to the raw URL. Consider relabeling or dropping high-cardinality query components at the Prometheus server via relabel_config if needed.
