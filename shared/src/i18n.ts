import IntlMessageFormat from "intl-messageformat"; // eslint-disable-line import/no-named-as-default
const MessageFormatter = IntlMessageFormat;

import { allLocales } from "./locales";
import { I18nKey } from "./locales/i18n-keys";

export type Locale = string;
let currentLocale: Locale = "en";
const cache: Record<string, IntlMessageFormat> = {};

function cacheKey(locale: string, key: string) {
  return `${locale}::${key}`;
}

export function setLocale(loc: Locale) {
  if (allLocales[loc]) currentLocale = loc;
}

export function t(
  key: I18nKey,
  params?: Record<string, unknown>,
  locale?: Locale,
): string {
  const loc = locale && allLocales[locale] ? locale : currentLocale;
  const message = allLocales[loc]?.[key];
  if (typeof message !== "string") return key;
  const ck = cacheKey(loc, key);
  let fmt = cache[ck];
  if (!fmt) {
    try {
      fmt = new MessageFormatter(message, loc);
      cache[ck] = fmt;
    } catch {
      return message; // fallback raw
    }
  }
  try {
    return fmt.format(params || {}) as string;
  } catch {
    return message;
  }
}

export function availableLocales(): string[] {
  return Object.keys(allLocales);
}

export type { I18nKey };
