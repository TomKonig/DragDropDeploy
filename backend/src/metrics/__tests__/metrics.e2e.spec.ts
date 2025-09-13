import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "../../app.module";

describe("Metrics Endpoint (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns Prometheus format text", async () => {
    const res = await request(app.getHttpServer()).get("/metrics");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("text/plain");
    expect(res.text).toContain("# HELP"); // crude check
    expect(res.text).toContain("ddd_http_requests_total");
  });

  it("enforces allow-list when set", async () => {
    process.env.METRICS_IP_ALLOWLIST = "127.0.0.1";
    const res = await request(app.getHttpServer()).get("/metrics");
    expect(res.status).toBe(200);
    process.env.METRICS_IP_ALLOWLIST = "10.0.0.1";
    const forbidden = await request(app.getHttpServer()).get("/metrics");
    expect(forbidden.status).toBe(403);
    delete process.env.METRICS_IP_ALLOWLIST;
  });

  it("increments http request counter for a sample route", async () => {
    // Call health endpoint
    await request(app.getHttpServer()).get("/health").expect(200);
    const metrics = await request(app.getHttpServer()).get("/metrics");
    expect(metrics.text).toMatch(
      /ddd_http_requests_total{.*route="\/health".*} 1|2|3/,
    );
  });
});
