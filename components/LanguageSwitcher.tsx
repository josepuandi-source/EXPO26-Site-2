"use client";

import { useEffect, useRef, useState } from "react";
import { locales, langHref } from "@/content/i18n";
import { useContent, useLang } from "./ContentProvider";
import { GlobeIcon } from "./icons";

/** Header dropdown that links to each translated version of the page. */
export default function LanguageSwitcher() {
  const { ui } = useContent();
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = locales.find((l) => l.code === lang)!;

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${ui.language}: ${current.label}`}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-md text-sm font-semibold text-navy-700 hover:text-primary-500 hover:bg-primary-50 transition-colors"
      >
        <GlobeIcon className="w-5 h-5" />
        <span>{current.short}</span>
      </button>
      {open && (
        <ul role="listbox" aria-label={ui.language} className="absolute right-0 mt-2 w-44 py-1.5 bg-white rounded-xl shadow-xl ring-1 ring-black/5 z-50">
          {locales.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <a
                href={langHref(l.code)}
                hrefLang={l.code}
                lang={l.code}
                className={`flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                  l.code === lang ? "text-primary-700 font-semibold bg-primary-50" : "text-navy-700 hover:bg-neutral-100"
                }`}
              >
                {l.label}
                <span className="text-xs text-neutral-400">{l.short}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
