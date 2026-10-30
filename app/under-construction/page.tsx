import type { Metadata } from "next";
import Image from "next/image";
import { ContentProvider } from "@/components/ContentProvider";
import Hero from "@/components/Hero";
import { getContent, SITE_LANG } from "@/content/i18n";

export const metadata: Metadata = {
  title: "Australia Study & Migration EXPO 2026 – Under construction | U&I Global",
  description: "The full English EXPO 2026 website is on its way. Register for free in the meantime.",
  robots: { index: false },
};

/**
 * Stand-in for the main site, reached from the English flag on the Thai (Bangkok) site while the
 * full English site is being finished: a slim bar back to Bangkok, then the hero banner on its own.
 */
export default function UnderConstruction() {
  return (
    <ContentProvider lang={SITE_LANG} content={getContent(SITE_LANG)}>
      <header className="relative z-20 flex h-16 items-center bg-bar">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="https://uandiedu.com">
            <Image src="/images/logo/uandi-logo-white.png" alt="U&I Global Australia" width={1508} height={330} priority className="h-8 w-auto md:h-9" />
          </a>
          <a
            href="https://expo26-bkk.uandiedu.com"
            lang="th"
            className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15"
          >
            ← EXPO กรุงเทพฯ
          </a>
        </div>
      </header>
      <main>
        <Hero underConstruction />
      </main>
    </ContentProvider>
  );
}
