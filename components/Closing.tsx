"use client";

import Image from "next/image";
import { useContent } from "./ContentProvider";
import { tel } from "@/content/site";
import { Container, Reveal, SectionHeader, Button, HighlightTitle } from "./ui";
import { PhoneIcon, MailIcon, PinIcon, ArrowUpIcon } from "./icons";

/** Photo band with a teal overlay, the U&I site's contact CTA. */
export function FinalCta() {
  const { finalCta, photoStrip } = useContent();
  const bg = photoStrip.photos[7]?.src ?? photoStrip.photos[0].src;
  return (
    <section className="relative overflow-hidden text-center text-white">
      <Image src={bg} alt="" fill sizes="100vw" className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-primary-700/80" />
      <Container className="relative z-10">
        <Reveal>
          <div className="flex flex-col items-center gap-3 py-24">
            <h2 className="font-heading text-[clamp(30px,4vw,42px)] font-semibold">
              <HighlightTitle text={finalCta.title} dark />
            </h2>
            <p className="text-[17px] text-white/90">{finalCta.subtitle}</p>
            <Button href={finalCta.cta.href} variant="white" size="lg" className="mt-3">
              {finalCta.cta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function Offices() {
  const { offices } = useContent();
  return (
    <section className="py-20 md:py-[88px]">
      <Container>
        <SectionHeader title={offices.title} subtitle={offices.subtitle} />
        <Reveal>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
            {offices.items.map((o) => (
              <div key={o.name} className="rounded-[14px] border border-neutral-200 bg-white p-5 transition-colors hover:border-primary-500">
                <h3 className="mb-2.5 font-heading text-lg font-medium text-primary-700">{o.name}</h3>
                <div className="flex flex-col gap-1.5 text-sm text-neutral-700">
                  {o.phone && (
                    <a href={tel(o.phone)} className="flex items-center gap-2.5 hover:text-primary-700">
                      <PhoneIcon className="h-4 w-4 shrink-0 text-primary-500" />
                      {o.phone}
                    </a>
                  )}
                  {o.email && (
                    <a href={`mailto:${o.email}`} className="flex items-center gap-2.5 hover:text-primary-700">
                      <MailIcon className="h-4 w-4 shrink-0 text-primary-500" />
                      {o.email}
                    </a>
                  )}
                  <p className="flex items-start gap-2.5">
                    <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                    {o.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function Footer() {
  const { footer, ui, nav } = useContent();
  return (
    <>
      <footer className="bg-bar pb-7 pt-14 text-[15px] text-[#E6F6F4]">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-[1.3fr_1fr_1.4fr]">
            <div>
              <Image src="/images/logo/uandi-logo-sq-white.png" alt="U&I Global Australia" width={479} height={479} className="mb-3.5 h-20 w-20 rounded-sm shadow-md" />
              <p className="mb-2">{footer.tagline}</p>
              <p className="text-sm text-[#CFEDEA]">{footer.trust}</p>
            </div>
            <div>
              <h4 className="mb-2.5 font-heading text-base font-medium tracking-[0.04em] text-white">{ui.quickLinks}</h4>
              <nav className="flex flex-col gap-1.5">
                {footer.links.map((l) => (
                  <a key={l.label} href={l.href} className="hover:text-white hover:underline">
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="mb-2.5 font-heading text-base font-medium tracking-[0.04em] text-white">{ui.contact}</h4>
              <div className="flex flex-col gap-2">
                <a href={`mailto:${footer.contact.email}`} className="flex items-center gap-2.5 hover:text-white hover:underline">
                  <MailIcon className="h-4 w-4 shrink-0" />
                  {footer.contact.email}
                </a>
                <a href={tel(footer.contact.phone)} className="flex items-center gap-2.5 hover:text-white hover:underline">
                  <PhoneIcon className="h-4 w-4 shrink-0" />
                  {footer.contact.phone}
                </a>
                <p className="flex items-start gap-2.5">
                  <PinIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  {footer.contact.address}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-9 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/25 pt-[18px] text-[13px] text-[#CFEDEA]">
            <p>{footer.copyright}</p>
            <div className="flex items-center gap-6">
              <a href={footer.privacyHref} className="hover:text-white hover:underline">
                {ui.privacy}
              </a>
              <button
                className="flex items-center gap-1 hover:text-white"
                aria-label={ui.backToTop}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                {ui.backToTop}
                <ArrowUpIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Container>
      </footer>

      {/* Mobile sticky register bar, as on the U&I site */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 bg-white px-3.5 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-6px_18px_rgba(18,17,15,.1)] md:hidden">
        <Button href={nav.cta.href} className="flex-1">
          {nav.cta.label}
        </Button>
      </div>
      <div aria-hidden="true" className="h-[70px] md:hidden" />
    </>
  );
}
