export default async () => {
  const ctx = (global as any).__TESTCONTAINERS__;
  if (ctx?.container) {
    await ctx.container.stop();
  }
};
