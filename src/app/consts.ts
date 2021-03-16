// Max amount of time a user can be inactive
export const IDLE_MAX_TIME = 30e3; // (milliseconds)

// Time in between idle checks
export const IDLE_REFRESH = 1e3; // (milliseconds)

//
export const IDLE_CHECK_ENABLED = false;

export const REFRESH_TABLE_INTERVAL_MS = 60e3;

export const LOCALES = {
  es: 'es',
  en: 'en',
  default: 'es',
  storageKey: 'app:locales',
};

export const ALL_LOCALES = ['es', 'en'];

export interface LangMetadata {
  name: string;
  icon: string;
  abrev: string;
}
export const LANG_METADATA = {
  es: {
    name: 'ESP',
    icon: 'es',
    abrev: 'es',
  },
  en: {
    name: 'ENG',
    icon: 'gb',
    abrev: 'en',
  },
};
