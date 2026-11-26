import { en, he } from "./locales";
import { enExtra, heExtra } from "./extra";

/** Base strings + the detail-screen strings. `heAll: typeof enAll` keeps both languages in sync. */
export const enAll = { ...en, ...enExtra };
export const heAll: typeof enAll = { ...he, ...heExtra };
