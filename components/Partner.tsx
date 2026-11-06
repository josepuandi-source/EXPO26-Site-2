"use client";

import { useContent } from "./ContentProvider";
import { Container, Reveal, SectionHeader } from "./ui";

const stripes = {
  backgroundImage: "repeating-linear-gradient(45deg, #007D74 0, #045584 1px, transparent 1px, transparent 14px)",
};

/** Why students and parents choose U&I: six short reasons, each with an emoji badge. */
export default function Partner() {
  const { partner: p } = useContent();
  return (
    <section className="relative overflow-hidden bg-neutral-100 py-20 md:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.04]" style={stripes} />
      <Container className="relative">
        <SectionHeader title={p.title} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {p.items.map((it, i) => (
            <Reveal key={it.text} delay={(i % 3) * 0.06}>
              <div className="flex h-full min-h-[112px] items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-700 hover:shadow-lg">
                <span aria-hidden="true" className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-100 text-[28px] leading-none">
                  {it.emoji}
                </span>
                <p className="font-heading text-[17px] font-medium leading-snug text-navy-900">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
