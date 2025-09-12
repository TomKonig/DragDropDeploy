import { PluginManager } from '../plugin-manager';

describe('PluginManager', () => {
  it('initializes plugins once and emits events', async () => {
    const manager = new PluginManager();
    const calls: string[] = [];
    manager.register({
      name: 'p1',
      init: async () => { calls.push('init'); },
      onUserCreated: async (_ctx, user) => { calls.push('user:' + user.id); }
    });
    manager.register({
      name: 'p2',
      onProjectDeployed: async (_ctx, payload) => { calls.push('deploy:' + payload.projectId); }
    });
    await manager.initAll();
    await manager.initAll(); // idempotent
    await manager.emitUserCreated({ id: 'u1', email: 'x@y.com' });
    await manager.emitProjectDeployed({ projectId: 'p1', versionId: 'v1' });
    expect(calls).toEqual(['init', 'user:u1', 'deploy:p1']);
  });
});
