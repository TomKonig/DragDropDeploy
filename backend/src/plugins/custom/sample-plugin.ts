import { Plugin } from "../types";

export const samplePlugin: Plugin = {
  name: "sample-plugin",
  version: "0.0.1",
  init(ctx) {
    // Example: access translation function
    void ctx.t("app.name");
  },
  onUserCreated() {
    // Implement custom logic for new user (placeholder)
  },
};
