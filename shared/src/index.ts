// Shared placeholder types
export type BrandId<T, B extends string> = T & { __brand: B };

export interface HealthStatus {
  status: 'ok';
  timestamp: string;
}
