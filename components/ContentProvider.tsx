"use client";

import { createContext, useContext, useEffect } from "react";
import type { Content, Lang } from "@/content/i18n";

const Ctx = createContext<{ lang: Lang; content: Content } | null>(null);

/** Supplies the current language's copy to every section on the page. */
export function ContentProvider({ lang, content, children }: { lang: Lang; content: Content; children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return <Ctx.Provider value={{ lang, content }}>{children}</Ctx.Provider>;
}

function useCtx() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useContent must be used inside <ContentProvider>");
  return ctx;
}

export const useContent = () => useCtx().content;
export const useLang = () => useCtx().lang;
