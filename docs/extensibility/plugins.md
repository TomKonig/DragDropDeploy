---
title: Plugin Architecture
---

## Plugin Architecture

This project is designed to be extensible. While the initial release keeps the core minimal, the plugin system scaffold enables future community-driven extensions without forking core logic.

### Goals

- Allow optional runtime behaviors (analytics hooks, external notifications, webhooks, CI triggers, etc.).
- Keep core lightweight: no plugin required for normal operation.
- Maintain security boundaries (no arbitrary code auto-executed without operator intent).

### Current Scope (MVP)

Implemented hooks:

- `init(ctx)` – called once after all plugins are registered.
- `onUserCreated(ctx, user)` – after a new user is persisted.
- `onProjectDeployed(ctx, payload)` – after a project deployment succeeds.

More hooks can be added as needs emerge (domain verification, build lifecycle, snippet injection, etc.).

### Structure

```text
backend/src/plugins/
    types.ts            # Hook and context type definitions
    plugin-manager.ts   # Registration + dispatch
```

Plugins can be authored locally under `backend/src/plugins/custom/` or loaded dynamically later (future work: directory scan + enable list).

### Writing a Plugin

Create a file like `backend/src/plugins/custom/sample-plugin.ts`:

```ts
import { Plugin } from '../types';

export const samplePlugin: Plugin = {
    name: 'sample-plugin',
    version: '0.0.1',
    async init(ctx) {
        console.log('[sample-plugin] init');
    },
    async onUserCreated(ctx, user) {
        console.log('[sample-plugin] user created', user.id);
    }
};
```

Register it (temporary manual step) in `app.module.ts` or a future `plugin.bootstrap.ts`:

```ts
import { pluginManager } from './plugins/plugin-manager';
import { samplePlugin } from './plugins/custom/sample-plugin';

pluginManager.register(samplePlugin);
await pluginManager.initAll();
```

### i18n Support

Plugins receive a `t(key, params?)` translator from the core i18n system so they can reuse locale keys or define their own under a namespace (e.g. `plugins.sample_plugin.something`). Contributors adding new keys should place them in a dedicated YAML file per locale (future: auto-namespace loading).

### Security & Safety Considerations

- Operators should review plugin code before enabling (no dynamic remote fetch in MVP).
- Future: sandbox or worker isolation for untrusted plugins.
- Avoid exposing sensitive internals; pass only necessary context in `PluginContext`.

### Future Roadmap Ideas

- Build pipeline hooks (preBuild, postBuild, buildFailed)
- Domain events (domainRequested, domainVerified)
- Snippet processing / HTML transforms
- Webhook dispatch framework
- UI extension points (front-end component injection) – would require manifest + build integration
- Dynamic plugin discovery via a `plugins` directory + allow/deny list
- Versioned plugin API contract & compatibility checks

### Contributing

Open an issue or discussion before adding new hook types to avoid churn. Keep plugins small and focused.

This scaffold is intentionally minimal; it establishes a stable seam for later community innovation without blocking core feature delivery.
