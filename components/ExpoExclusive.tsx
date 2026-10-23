"use client";

import { useContent } from "./ContentProvider";
import { Button, Container, Reveal } from "./ui";
import { CheckIcon } from "./icons";

/** Full-width teal bar for the headline expo offer, shown just above the benefits. */
export default function ExpoExclusive() {
  const { expoExclusive: x, hero } = useContent();
  if (!x) return null;
  return (
    <section id="expo-exclusive" className="relative overflow-hidden bg-bar py-20 md:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-navy-900/20 blur-3xl" />
      <Container>
        <Reveal>
          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div className="text-center text-white lg:text-left">
              <span className="inline-block rounded-full bg-coral-500 px-5 py-1.5 font-heading text-sm font-medium uppercase tracking-[0.2em] text-white shadow-lg shadow-black/10">
                {x.kicker}
              </span>
              <p className="mt-5 font-heading text-[clamp(3.5rem,21vw,5.5rem)] font-semibold leading-[0.95] tracking-tight tabular-nums sm:text-[7rem] md:text-[8.5rem] lg:text-[9.5rem]">
                {x.amount}
              </p>
              <p className="mt-3 font-heading text-3xl font-medium uppercase tracking-[0.04em] md:text-[42px]">{x.label}</p>
            </div>

            <div className="rounded-[18px] bg-white p-7 text-navy-900 shadow-[0_10px_30px_rgba(18,17,15,.18)] md:p-9">
              <ul className="flex flex-col gap-4">
                {x.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-4 font-heading text-xl font-medium md:text-2xl">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                      <CheckIcon className="h-6 w-6" />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="my-6 h-px bg-neutral-200" />
              <Button href={hero.primaryCta.href} size="lg" external className="w-full text-lg">
                {x.cta}
              </Button>
              <p className="mt-3 text-center text-[13px] text-navy-300">{x.note}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
