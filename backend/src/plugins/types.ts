export interface PluginContext {
  // Add services or utilities here later (db, logger, config)
  t: (key: string, params?: Record<string, any>) => string;
}

export interface PluginLifecycleHooks {
  name: string;
  version?: string;
  init?(ctx: PluginContext): Promise<void> | void;
  onUserCreated?(ctx: PluginContext, user: { id: string; email: string }): Promise<void> | void;
  onProjectDeployed?(ctx: PluginContext, payload: { projectId: string; versionId: string }): Promise<void> | void;
  // Future: add build pipeline hooks, domain verification hooks, etc.
}

export type Plugin = PluginLifecycleHooks;
