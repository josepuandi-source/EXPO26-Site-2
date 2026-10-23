/**
 * ============================================================================
 *  TRANSLATIONS
 *  English copy lives in content/site.ts. Each other language is a dictionary
 *  in content/translations/<code>.ts that maps the exact English string to its
 *  translation. Any string missing from a dictionary falls back to English,
 *  so after editing site.ts, add the new English text to each dictionary.
 * ============================================================================
 */
import * as site from "./site";
import ko from "./translations/ko";
import th from "./translations/th";
import es from "./translations/es";
import pt from "./translations/pt";
import ja from "./translations/ja";

export const locales = [
  { code: "en", label: "English", short: "EN" },
  { code: "ko", label: "한국어", short: "KO" },
  { code: "th", label: "ไทย", short: "TH" },
  { code: "es", label: "Español", short: "ES" },
  { code: "pt", label: "Português", short: "PT" },
  { code: "ja", label: "日本語", short: "JA" },
] as const;

export type Lang = (typeof locales)[number]["code"];
export const otherLangs = locales.filter((l) => l.code !== "en").map((l) => l.code) as Exclude<Lang, "en">[];
export const isLang = (v: string): v is Lang => locales.some((l) => l.code === v);
export const langHref = (lang: Lang) => (lang === "en" ? "/" : `/${lang}`);

const dictionaries: Record<Exclude<Lang, "en">, Record<string, string>> = { ko, th, es, pt, ja };

/** Registration form to use for the main "Register" button in each language. */
const registerForm: Record<Lang, string> = {
  en: site.forms.english,
  ko: site.forms.korean,
  th: site.forms.thai,
  es: site.forms.spanish,
  pt: site.forms.portuguese,
  ja: site.forms.english,
};

/** Recursively swap every string that has a translation; everything else is kept. */
function localize<T>(value: T, dict: Record<string, string>): T {
  if (typeof value === "string") return (dict[value] ?? value) as T;
  if (Array.isArray(value)) return value.map((v) => localize(v, dict)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, localize(v, dict)])) as T;
  }
  return value;
}

const { tel, ...english } = site;
export type Content = typeof english;

export function getContent(lang: Lang): Content {
  const c = lang === "en" ? english : localize(english, dictionaries[lang]);
  const form = registerForm[lang];
  return { ...c, hero: { ...c.hero, primaryCta: { ...c.hero.primaryCta, href: form } } };
}

export { tel };
