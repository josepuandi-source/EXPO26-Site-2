"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { useContent } from "./ContentProvider";
import { Button } from "./ui";
import ExpoLogo from "./ExpoLogo";
import AwardSeal from "./AwardSeal";
import { FlagTH, FlagPH } from "./icons";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (cb: () => void) => {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Full-bleed looping video hero with the U&I ink-to-teal overlay, centred copy and pill buttons.
 * `underConstruction` shows it on its own (the /under-construction page) with a notice badge on top
 * and the 29-year award seal in the corner.
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

      {underConstruction && <AwardSeal trust={hero.trust} seal={hero.trustSeal} titleClassName="text-primary-900" iconClassName="text-primary-700" />}

      <motion.div
        className={`relative z-10 flex max-w-[880px] flex-col items-center gap-5 px-5 ${underConstruction ? "pb-16 pt-32" : "py-24"}`}
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
        {/* Registration buttons are hidden for now; these point to the city EXPO websites */}
        <div className="mt-3 flex flex-col items-center gap-3">
          <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-white/85">{hero.nextExpos.label}</p>
          <div className="flex flex-wrap justify-center gap-3.5">
            {hero.nextExpos.sites.map((s) => {
              const Flag = s.flag === "th" ? FlagTH : FlagPH;
              return (
                <Button key={s.href} href={s.href} variant="ghost" size="lg" className="gap-3">
                  <Flag className="h-4 w-auto rounded-[2px] shadow-[0_0_0_1px_rgba(255,255,255,.35)]" />
                  <span>
                    {s.city} <span className="font-light opacity-80">· {s.date}</span>
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
