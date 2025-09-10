// Import directly from shared source; relies on TS path mapping (add if not present)
import { t as coreT, setLocale, availableLocales } from '@dragdropdeploy/shared';

export { setLocale, availableLocales };
export const t = coreT;
