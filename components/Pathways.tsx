"use client";

import Image from "next/image";
import { useContent } from "./ContentProvider";
import { Container, Reveal, SectionHeader, Button } from "./ui";
import { CheckIcon } from "./icons";

/** Photo cards with a dark fade, the U&I site's "photo-card" pattern. */
export default function Pathways() {
  const { pathways } = useContent();
  return (
    <section id="pathways" className="py-20 md:py-[88px]">
      <Container>
        <SectionHeader title={pathways.title} subtitle={pathways.subtitle} />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {pathways.cards.map((c) => (
            <Reveal key={c.title}>
              <div className="group relative flex min-h-[520px] overflow-hidden rounded-xl text-white">
                <Image src={c.photo} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgba(18,17,15,.94)_0%,rgba(18,17,15,.8)_50%,rgba(18,17,15,.15)_100%)]" />
                <div className="relative z-10 mt-auto flex flex-col items-start gap-3 p-6 md:p-7">
                  <p className="text-[13px] uppercase tracking-[0.14em] text-white/85">{c.sub}</p>
                  <h3 className="font-heading text-[26px] font-medium leading-tight">{c.title}</h3>
                  <ul className="flex flex-col gap-1.5 text-[15px] text-white/90">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-primary-300" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Button href={c.cta.href} variant="white" size="sm" className="mt-2">
                    {c.cta.label}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
