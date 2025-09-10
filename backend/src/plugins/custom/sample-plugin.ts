import { Plugin } from '../types';

export const samplePlugin: Plugin = {
  name: 'sample-plugin',
  version: '0.0.1',
  async init(ctx) {
    console.log('[sample-plugin] init, translated app name:', ctx.t('app.name'));
  },
  async onUserCreated(ctx, user) {
    console.log('[sample-plugin] user created', user.id);
  }
};
