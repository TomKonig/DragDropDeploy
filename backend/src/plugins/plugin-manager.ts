import { i18n } from "../i18n/i18n.service";

import { Plugin, PluginContext } from "./types";

export class PluginManager {
  private plugins: Plugin[] = [];
  private initialized = false;

  register(plugin: Plugin) {
    this.plugins.push(plugin);
  }

  async initAll() {
    if (this.initialized) return;
    const ctx: PluginContext = {
      t: (key, params) => i18n.t(key, params),
    };
    for (const p of this.plugins) {
      if (p.init) await p.init(ctx);
    }
    this.initialized = true;
  }

  async emitUserCreated(user: { id: string; email: string }) {
    const ctx: PluginContext = {
      t: (key, params) => i18n.t(key, params),
    };
    for (const p of this.plugins) {
      if (p.onUserCreated) await p.onUserCreated(ctx, user);
    }
  }

  async emitProjectDeployed(payload: { projectId: string; versionId: string }) {
    const ctx: PluginContext = {
      t: (key, params) => i18n.t(key, params),
    };
    for (const p of this.plugins) {
      if (p.onProjectDeployed) await p.onProjectDeployed(ctx, payload);
    }
  }
}

export const pluginManager = new PluginManager();
