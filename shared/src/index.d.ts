export { t, setLocale, availableLocales, type Locale } from './i18n';
export { I18nKey, I18N_KEYS } from './locales/i18n-keys';
export type BrandId<T, B extends string> = T & {
    __brand: B;
};
export interface HealthStatus {
    status: 'ok';
    timestamp: string;
}
