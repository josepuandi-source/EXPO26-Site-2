"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useContent, useLang } from "./ContentProvider";
import { langHref, locales } from "@/content/i18n";
import { tel } from "@/content/site";
import { Container } from "./ui";
import { MenuIcon, CloseIcon, PhoneIcon, MailIcon } from "./icons";

/** Official white U&I Global Australia logo for the teal bar. */
function Wordmark({ small = false }: { small?: boolean }) {
  return (
    <Image
      src="/images/logo/uandi-logo-white.png"
      alt="U&I Global Australia"
      width={1508}
      height={330}
      priority
      className={small ? "h-7 w-auto" : "h-9 w-auto md:h-10"}
    />
  );
}

/** Inline language links, as on the U&I site's top strip. */
function Langs({ onDark = true }: { onDark?: boolean }) {
  const { ui } = useContent();
  const lang = useLang();
  return (
    <nav aria-label={ui.language} className="flex flex-wrap gap-0.5">
      {locales.map((l) => (
        <a
          key={l.code}
          href={langHref(l.code)}
          hrefLang={l.code}
          lang={l.code}
          aria-current={l.code === lang ? "true" : undefined}
          className={`rounded-md px-2 py-1 transition-colors ${
            onDark
              ? l.code === lang
                ? "bg-white/15 font-semibold text-white"
                : "text-[#D8D4CC] hover:text-white"
              : l.code === lang
                ? "bg-white/20 font-semibold text-white"
                : "text-white/80 hover:text-white"
          }`}
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}

export default function Header() {
  const { nav, ui, footer } = useContent();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-navy-900 text-[13px] text-[#D8D4CC]">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-1 py-1.5">
            <div className="hidden sm:flex items-center gap-5">
              <a href={tel(footer.contact.phone)} className="flex items-center gap-1.5 hover:text-white">
                <PhoneIcon className="h-3.5 w-3.5" />
                {footer.contact.phone}
              </a>
              <a href={`mailto:${footer.contact.email}`} className="hidden md:flex items-center gap-1.5 hover:text-white">
                <MailIcon className="h-3.5 w-3.5" />
                {footer.contact.email}
              </a>
            </div>
            <Langs />
          </div>
        </Container>
      </div>

      <header className="sticky top-0 z-50 bg-bar shadow-[0_2px_10px_rgba(0,0,0,.12)]">
        <Container>
          <div className="flex min-h-[72px] items-center justify-between gap-5">
            <a href="https://uandiedu.com" className="shrink-0">
              <Wordmark />
            </a>
            <nav className="hidden md:flex items-center gap-1">
              {nav.desktop.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3.5 py-2.5 font-heading text-base font-medium tracking-[0.02em] text-white underline-offset-[6px] decoration-2 hover:underline"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={nav.cta.href}
                className="ml-2.5 inline-flex min-h-9 items-center rounded-full bg-white px-4 font-heading text-sm font-medium tracking-[0.06em] text-primary-700 hover:bg-primary-100"
              >
                {nav.cta.label}
              </a>
            </nav>
            <button
              className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-[10px] border-2 border-white/60 text-white"
              aria-label={ui.openMenu}
              onClick={() => setOpen(true)}
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile drawer */}
      <motion.div
        className="fixed inset-0 z-[55] bg-black/50"
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        style={{ pointerEvents: open ? "auto" : "none" }}
        onClick={() => setOpen(false)}
      />
      <motion.div
        className="fixed right-0 top-0 z-[60] flex h-full w-72 flex-col bg-primary-700 shadow-2xl"
        initial={false}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        <div className="flex items-center justify-between border-b border-white/20 p-4">
          <Wordmark small />
          <button className="p-2 text-white" aria-label={ui.closeMenu} onClick={() => setOpen(false)}>
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          {nav.mobile.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 font-heading text-lg font-medium text-white hover:bg-white/10"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="border-t border-white/20 p-4 text-sm">
          <Langs onDark={false} />
          <a
            href={nav.cta.href}
            onClick={() => setOpen(false)}
            className="mt-4 flex min-h-11 items-center justify-center rounded-full bg-white font-heading font-medium tracking-[0.06em] text-primary-700"
          >
            {nav.cta.label}
          </a>
        </div>
      </motion.div>
    </>
  );
}
