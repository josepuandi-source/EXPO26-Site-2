"use client";

import { useContent } from "./ContentProvider";
import { Container, Reveal, SectionHeader } from "./ui";

/** Centred quote cards with an initials avatar, as on the U&I site. */
export default function Testimonials() {
  const { testimonials } = useContent();
  return (
    <section className="py-20 md:py-[88px]">
      <Container>
        <SectionHeader title={testimonials.title} subtitle={testimonials.subtitle} />
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {testimonials.items.map((t) => (
            <Reveal key={t.name}>
              <figure className="m-0 flex h-full flex-col items-center gap-3.5 rounded-2xl bg-white px-6 py-7 text-center shadow-[0_6px_22px_rgba(18,17,15,.07)]">
                <div className="grid h-[52px] w-[52px] place-items-center rounded-full bg-primary-100 font-heading text-xl text-primary-700">{t.initials}</div>
                <blockquote className="m-0 flex-1 text-[15px] leading-relaxed text-neutral-700">“{t.quote}”</blockquote>
                <figcaption className="font-heading text-sm uppercase tracking-[0.06em] text-primary-500">
                  {t.name}
                  <span className="block font-sans text-[13px] normal-case tracking-normal text-navy-300">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
