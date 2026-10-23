"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { useContent } from "./ContentProvider";
import { Button } from "./ui";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (cb: () => void) => {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Full-bleed looping video hero with the U&I ink-to-teal overlay, centred copy and pill buttons. */
export default function Hero() {
  const { hero } = useContent();
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(reducedMotionQuery).matches, () => false);
  return (
    <section id="hero" className="relative grid min-h-[640px] place-items-center overflow-hidden text-center text-white lg:min-h-[calc(100vh-102px)]">
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
        className="relative z-10 flex max-w-[880px] flex-col items-center gap-5 px-5 py-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image src={hero.logo.src} alt={hero.logo.alt} width={320} height={191} priority className="h-auto w-60 md:w-[300px]" />
        <span className="font-heading text-sm font-medium uppercase tracking-[0.22em] text-primary-300">{hero.eyebrow}</span>
        <h1 className="font-heading text-[clamp(38px,6vw,64px)] font-semibold leading-[1.08]">
          {hero.titleLead} <span className="text-primary-300">{hero.titleHighlight}</span>
        </h1>
        <p className="max-w-[680px] font-heading text-[clamp(18px,2.2vw,24px)] font-light leading-snug text-white/90">{hero.intro}</p>
        <p className="text-[13px] uppercase leading-loose tracking-[0.22em] text-white/90">{hero.cities_line}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3.5">
          <Button href={hero.primaryCta.href} size="lg" external>
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} variant="ghost" size="lg">
            {hero.secondaryCta.label}
          </Button>
        </div>

        <div id="register-buttons" className="mt-6 flex flex-wrap justify-center gap-2">
          {hero.languageButtons.map((b) => (
            <a
              key={b.label}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center rounded-full border-[1.5px] border-white/40 bg-white/5 px-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-primary-700"
            >
              {b.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
