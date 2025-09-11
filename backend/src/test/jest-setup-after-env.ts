// Global afterEach/afterAll hooks for Jest to ensure all Nest apps and timers are cleaned up.
import { closeAllTestApps } from './app-tracker';

afterAll(async () => {
  // Attempt graceful close of any registered test applications.
  await closeAllTestApps();
});
