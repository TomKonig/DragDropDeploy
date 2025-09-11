// Custom hook to dump open handles at the end using why-is-node-running
if (process.env.DETECT_OPEN_HANDLES) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const why = require('why-is-node-running');
  afterAll(() => {
    const t = setTimeout(async () => {
      try {
        const { closeAllTestApps } = await import('./src/test/app-tracker');
        await closeAllTestApps(true);
      } catch {/* ignore */}
      why();
    }, 120);
    if (typeof (t as any).unref === 'function') (t as any).unref();
  });
}
