import { samplePlugin } from "./custom/sample-plugin";
import { pluginManager } from "./plugin-manager";

// Register built-in or sample plugins here. This keeps main.ts clean.
pluginManager.register(samplePlugin);
