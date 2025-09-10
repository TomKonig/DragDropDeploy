import { pluginManager } from './plugin-manager';
import { samplePlugin } from './custom/sample-plugin';

// Register built-in or sample plugins here. This keeps main.ts clean.
pluginManager.register(samplePlugin);
