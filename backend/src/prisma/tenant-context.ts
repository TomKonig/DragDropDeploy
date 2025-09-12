import { AsyncLocalStorage } from "async_hooks";

// TenantStore holds per-request contextual data. Today this is only userId; in the
// future we may extend with tenantId / roles if policy evaluation requires it.
// Keep this minimal and serializable.
export interface TenantStore {
  userId?: string;
}

// Global AsyncLocalStorage instance. The interceptor creates a store per request.
export const tenantStorage = new AsyncLocalStorage<TenantStore>();

// setTenantUser allows late association (e.g. after auth in a guard) if needed.
export function setTenantUser(userId: string | undefined) {
  const store = tenantStorage.getStore();
  if (store) store.userId = userId; // mutate existing store
}

// getTenantUser is used by services / repositories to attribute actions or future
// RLS session variable setting. Do NOT rely on this for security until RLS
// policies + session variable SET LOCAL are implemented.
export function getTenantUser() {
  return tenantStorage.getStore()?.userId;
}
