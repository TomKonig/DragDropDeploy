import { INestApplication } from '@nestjs/common';

// Simple registry for e2e Nest application instances so we can ensure all are closed.
// Each test that creates an app should call registerTestApp(app).

const apps = new Set<INestApplication>();

export function registerTestApp(app: INestApplication) {
  apps.add(app);
}

export async function closeAllTestApps(force = false) {
  for (const app of Array.from(apps)) {
    try {
      if ((app as any).getHttpServer) {
        const httpServer: any = app.getHttpServer();
        if (!force) {
          await app.close();
        } else {
          // Forcefully destroy all open connections then close
            if (httpServer?.closeAllConnections) {
              try { httpServer.closeAllConnections(); } catch {/* ignore */}
            }
            if (httpServer?.closeIdleConnections) {
              try { httpServer.closeIdleConnections(); } catch {/* ignore */}
            }
            try { await app.close(); } catch {/* ignore */}
            // As a last resort, destroy the underlying server
            if (httpServer?.listening) {
              try { httpServer.close(); } catch {/* ignore */}
            }
        }
      }
    } catch {
      // swallow errors
    }
    apps.delete(app);
  }
}
