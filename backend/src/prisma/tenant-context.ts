import { AsyncLocalStorage } from 'async_hooks';

interface TenantStore {
  userId?: string;
}

export const tenantStorage = new AsyncLocalStorage<TenantStore>();

export function setTenantUser(userId: string | undefined) {
  const store = tenantStorage.getStore();
  if (store) store.userId = userId; // mutate existing store
}

export function getTenantUser() {
  return tenantStorage.getStore()?.userId;
}
