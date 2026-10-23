"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useContent } from "./ContentProvider";
import { ArrowLeftIcon, CloseIcon } from "./icons";

type Poster = { src: string; alt: string };
const Ctx = createContext<(p: Poster) => void>(() => {});

/** Opens a poster over the page. */
export const useOpenPoster = () => useContext(Ctx);

/**
 * Full-screen poster preview. Back button, Esc, a click outside the poster and the
 * browser/phone back gesture all close it, leaving the page exactly where it was.
 */
export function PosterViewer({ children }: { children: ReactNode }) {
  const { ui } = useContent();
  const [poster, setPoster] = useState<Poster | null>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const closing = useRef(false);

  const open = useCallback((p: Poster) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    // An extra history entry lets the phone's back gesture close the poster instead of leaving the site.
    window.history.pushState({ poster: true }, "");
    closing.current = false;
    setPoster(p);
  }, []);

  // Close by stepping back over our own history entry, but only once: a double tap or a
  // second Esc must never step back further and leave the page.
  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    if (window.history.state?.poster) window.history.back();
    else setPoster(null);
  }, []);

  useEffect(() => {
    const onPop = () => setPoster(null);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (!poster) {
      returnFocus.current?.focus({ preventScroll: true });
      return;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    backRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [poster, close]);

  return (
    <Ctx.Provider value={open}>
      {children}
      {poster && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={poster.alt}
          className="fixed inset-0 z-[80] flex flex-col bg-navy-900/90 backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <button
              ref={backRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white pl-3.5 pr-5 font-heading text-base font-medium tracking-[0.04em] text-primary-700 shadow-lg hover:bg-primary-100"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              {ui.back}
            </button>
            <button
              type="button"
              aria-label={ui.back}
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="grid h-11 w-11 place-items-center rounded-full border-2 border-white/60 text-white hover:bg-white/10"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-6">
            <Image
              src={poster.src}
              alt={poster.alt}
              width={1415}
              height={2000}
              sizes="(min-width: 768px) 640px, 100vw"
              onClick={(e) => e.stopPropagation()}
              className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
