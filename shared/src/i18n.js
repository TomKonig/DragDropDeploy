"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLocale = setLocale;
exports.t = t;
exports.availableLocales = availableLocales;
const locales_1 = require("./locales");
const intl_messageformat_1 = __importDefault(require("intl-messageformat"));
let currentLocale = 'en';
const cache = {};
function cacheKey(locale, key) {
    return `${locale}::${key}`;
}
function setLocale(loc) {
    if (locales_1.allLocales[loc])
        currentLocale = loc;
}
function t(key, params, locale) {
    const loc = locale && locales_1.allLocales[locale] ? locale : currentLocale;
    const message = locales_1.allLocales[loc]?.[key];
    if (typeof message !== 'string')
        return key;
    const ck = cacheKey(loc, key);
    let fmt = cache[ck];
    if (!fmt) {
        try {
            fmt = new intl_messageformat_1.default(message, loc);
            cache[ck] = fmt;
        }
        catch {
            return message; // fallback raw
        }
    }
    try {
        return fmt.format(params || {});
    }
    catch {
        return message;
    }
}
function availableLocales() {
    return Object.keys(locales_1.allLocales);
}
//# sourceMappingURL=i18n.js.map