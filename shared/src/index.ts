/**
 * Runtime translation helper bound to the currently active locale.
 *
 * @remarks These functions are thin re-exports so consumer packages only need the shared bundle.
 */
export { t, setLocale, availableLocales, type Locale } from './i18n';

/** Symbolic keys for strongly-typed i18n usage. */
export { I18nKey, I18N_KEYS } from './locales/i18n-keys';

/**
 * Add a nominal brand to a primitive/base type to avoid accidental mixing of logically distinct values.
 *
 * @example
 * ```ts
 * type UserId = BrandId<string, 'UserId'>;
 * function loadUser(id: UserId) {
 *   // implementation
 * }
 * ```
 */
export type BrandId<T, B extends string> = T & { __brand: B };

/**
 * Minimal standardized health endpoint payload shared by backend and consumers.
 */
export interface HealthStatus {
  /** Literal ok to simplify client status checks */
  status: 'ok';
  /** ISO timestamp (UTC) when the health snapshot was generated */
  timestamp: string;
}
