/**
 * ============================================================================
 *  LANGUAGE
 *  This build is single-language: the whole site is served in SITE_LANG at "/".
 *  English copy lives in content/site.ts.
 * ============================================================================
 */
import * as site from "./site";

export const SITE_LANG = "en" as const;
export const locales = [{ code: "en", label: "English", short: "EN" }] as const;
export type Lang = (typeof locales)[number]["code"];
/** Single-language site: every language link points home. */
export const langHref = (_lang: Lang) => "/";

/** Registration form for the main "Register" buttons. */
const registerForm = site.forms.english;


const { tel, ...english } = site;
export type Content = typeof english;

export function getContent(_lang: Lang = SITE_LANG): Content {
  const c = english;
  return { ...c, hero: { ...c.hero, primaryCta: { ...c.hero.primaryCta, href: registerForm } } };
}

export { tel };
