import { HttpException } from "@nestjs/common";

import { RateLimitGuard } from "../rate-limit.guard";

function makeContext(req: any) {
  return {
    switchToHttp: () => ({
      getRequest: () => req,
      getResponse: () => ({}),
    }),
  } as any;
}

describe("RateLimitGuard", () => {
  const originalCapacity = process.env.RATE_LIMIT_AUTH_CAPACITY;
  const originalWindow = process.env.RATE_LIMIT_AUTH_WINDOW_MS;
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-01-01T00:00:00Z"));
    process.env.RATE_LIMIT_AUTH_CAPACITY = "2";
    process.env.RATE_LIMIT_AUTH_WINDOW_MS = "1000"; // 1s
  });
  afterEach(() => {
    process.env.RATE_LIMIT_AUTH_CAPACITY = originalCapacity;
    process.env.RATE_LIMIT_AUTH_WINDOW_MS = originalWindow;
    jest.useRealTimers();
  });

  it("allows within capacity and blocks when exceeded, then refills", () => {
    const guard = new RateLimitGuard();
    const req = { headers: {}, ip: "1.1.1.1", body: { email: "a@b.com" } };
    const ctx = makeContext(req);
    expect(guard.canActivate(ctx)).toBe(true);
    expect(guard.canActivate(ctx)).toBe(true);
    expect(() => guard.canActivate(ctx)).toThrow(HttpException);
    // simulate passage of window for refill
    jest.advanceTimersByTime(1100);
    expect(guard.canActivate(ctx)).toBe(true); // refilled
  });
});
