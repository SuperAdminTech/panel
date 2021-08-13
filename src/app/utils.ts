import { LOCALES } from './consts';

export function getLocale(navigator: { languages: readonly string[] }) {
  const validLocales = ['es', 'en'];

  return validLocales.includes(navigator.languages[0])
    ? navigator.languages[0]
    : LOCALES.default;
}


