"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { useContent } from "./ContentProvider";
import { Button } from "./ui";
import ExpoLogo from "./ExpoLogo";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (cb: () => void) => {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Full-bleed looping video hero with the U&I ink-to-teal overlay, centred copy and pill buttons.
 * `underConstruction` shows it on its own (the /under-construction page): a notice badge on top,
 * and no "Learn More", since the sections it scrolls to aren't on that page.
 * The registration buttons (Claim Your Free Ticket and the language Register buttons) are off for now.
 */
export default function Hero({ underConstruction = false }: { underConstruction?: boolean }) {
  const { hero, ui } = useContent();
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(reducedMotionQuery).matches, () => false);
  return (
    <section id="hero" className={`relative grid min-h-[640px] place-items-center overflow-hidden text-center text-white ${underConstruction ? "min-h-[calc(100svh-64px)]" : "lg:min-h-[calc(100vh-102px)]"}`}>
      <Image src={hero.background} alt="" fill priority sizes="100vw" className="object-cover" />
      {!reduceMotion && (
        <video
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          src={hero.video}
          poster={hero.background}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(315deg,rgba(18,17,15,.72)_40%,rgba(0,125,116,.68)_100%)]" />

      <motion.div
        className={`relative z-10 flex max-w-[880px] flex-col items-center gap-5 px-5 ${underConstruction ? "py-16" : "py-24"}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {underConstruction && (
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F7C548] px-4 py-1.5 font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#12110F] shadow-[0_6px_16px_rgba(0,0,0,.25)]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#12110F]" />
            {ui.underConstruction}
          </span>
        )}
        <ExpoLogo
          alt={hero.logo.alt}
          strap="STUDY • MIGRATION"
          strapClass="font-light uppercase"
          strapStyle={{ top: "41.6%", fontSize: "8.4cqw", letterSpacing: "0.03em" }}
          className="w-60 md:w-[300px]"
        />
        <span className="font-heading text-sm font-medium uppercase tracking-[0.22em] text-primary-300">{hero.eyebrow}</span>
        <h1 className="font-heading text-[clamp(38px,6vw,64px)] font-semibold leading-[1.08]">
          {hero.titleLead} <span className="text-primary-300">{hero.titleHighlight}</span>
        </h1>
        <p className="max-w-[680px] font-heading text-[clamp(18px,2.2vw,24px)] font-light leading-snug text-white/90">{hero.intro}</p>
        <p className="text-[13px] uppercase leading-loose tracking-[0.22em] text-white/90">{hero.cities_line}</p>
        {underConstruction && <p className="max-w-[560px] text-[15px] leading-relaxed text-white/85">{ui.underConstructionNote}</p>}
        {/* Registration buttons are hidden for now; "Learn More" stays on the full site */}
        {!underConstruction && (
          <div className="mt-2 flex flex-wrap justify-center gap-3.5">
            <Button href={hero.secondaryCta.href} variant="ghost" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
        )}
      </motion.div>
    </section>
  );
}
