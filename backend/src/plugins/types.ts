export interface PluginContext<
  TranslationParams extends object = Record<string, unknown>,
> {
  // Add services or utilities here later (db, logger, config)
  t: (key: string, params?: TranslationParams) => string;
}

export interface PluginLifecycleHooks<
  TranslationParams extends object = Record<string, unknown>,
> {
  name: string;
  version?: string;
  init?(ctx: PluginContext<TranslationParams>): Promise<void> | void;
  onUserCreated?(
    ctx: PluginContext<TranslationParams>,
    user: { id: string; email: string },
  ): Promise<void> | void;
  onProjectDeployed?(
    ctx: PluginContext<TranslationParams>,
    payload: { projectId: string; versionId: string },
  ): Promise<void> | void;
  // Future: add build pipeline hooks, domain verification hooks, etc.
}
export type Plugin<TranslationParams extends object = Record<string, unknown>> =
  PluginLifecycleHooks<TranslationParams>;
