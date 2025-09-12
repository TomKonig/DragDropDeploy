import type { Server } from "http";

import { INestApplication } from "@nestjs/common";

// Simple registry for e2e Nest application instances so we can ensure all are closed.
// Each test that creates an app should call registerTestApp(app).

const apps = new Set<INestApplication>();

export function registerTestApp(app: INestApplication) {
  apps.add(app);
}

export async function closeAllTestApps(force = false) {
  for (const app of Array.from(apps)) {
    try {
      if (
        typeof (app as unknown as { getHttpServer?: () => unknown })
          .getHttpServer === "function"
      ) {
        const raw = (
          app as unknown as { getHttpServer: () => unknown }
        ).getHttpServer();
        const httpServer = raw as Server & {
          closeAllConnections?: () => void;
          closeIdleConnections?: () => void;
        };
        if (!force) {
          await app.close();
        } else {
          if (typeof httpServer.closeAllConnections === "function") {
            try {
              httpServer.closeAllConnections();
            } catch {
              /* ignore */
            }
          }
          if (typeof httpServer.closeIdleConnections === "function") {
            try {
              httpServer.closeIdleConnections();
            } catch {
              /* ignore */
            }
          }
          try {
            await app.close();
          } catch {
            /* ignore */
          }
          if (httpServer && (httpServer as Server).listening) {
            try {
              httpServer.close();
            } catch {
              /* ignore */
            }
          }
        }
      }
    } catch {
      // swallow errors
    }
    apps.delete(app);
  }
}
