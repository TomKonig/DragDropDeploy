import { Injectable, OnModuleInit } from '@nestjs/common';
import { collectDefaultMetrics, Registry, Counter, Gauge, Histogram } from 'prom-client';

@Injectable()
export class MetricsService implements OnModuleInit {
  private readonly registry = new Registry();

  // Example app-wide metrics
  readonly httpRequestCounter = new Counter({
    name: 'ddd_http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status'] as const,
    registers: [this.registry],
  });

  readonly buildStartedCounter = new Counter({
    name: 'ddd_build_started_total',
    help: 'Total number of builds started',
    registers: [this.registry],
  });

  readonly buildStartedPerProjectCounter = new Counter({
    name: 'ddd_build_started_project_total',
    help: 'Total number of builds started per project',
    labelNames: ['project_id'] as const,
    registers: [this.registry],
  });

  readonly buildDurationHistogram = new Histogram({
    name: 'ddd_build_duration_seconds',
    help: 'Build duration in seconds',
    buckets: [0.5, 1, 2, 5, 10, 20, 30, 60, 120, 300],
    registers: [this.registry],
  });

  readonly activeBuildsGauge = new Gauge({
    name: 'ddd_active_builds',
    help: 'Current number of active (in-progress) builds',
    registers: [this.registry],
  });

  onModuleInit() {
    collectDefaultMetrics({ register: this.registry, prefix: 'ddd_node_' });
  }

  getRegistry() {
    return this.registry;
  }

  recordProjectBuildStart(projectId: string) {
    this.buildStartedPerProjectCounter.inc({ project_id: projectId });
  }
}
