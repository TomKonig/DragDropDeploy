import { I18nKey } from './locales/i18n-keys';
export type Locale = string;
export declare function setLocale(loc: Locale): void;
export declare function t(key: I18nKey, params?: Record<string, any>, locale?: Locale): string;
export declare function availableLocales(): string[];
export type { I18nKey };
