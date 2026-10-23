"use client";

import { useContent } from "./ContentProvider";
import { Container, Reveal, SectionHeader } from "./ui";
import { PartnerIcons } from "./icons";

const stripes = {
  backgroundImage: "repeating-linear-gradient(45deg, #007D74 0, #007D74 1px, transparent 1px, transparent 14px)",
};
const dots = { backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" };

export default function Partner() {
  const { partner: p } = useContent();
  const f = p.flagship;
  return (
    <section className="relative overflow-hidden py-24 bg-neutral-100">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.04]" style={stripes} />
      <Container>
        <div className="relative">
          <SectionHeader title={p.title} subtitle={p.subtitle} />
          <Reveal>
            <div className="relative mb-5 md:mb-6 overflow-hidden rounded-2xl bg-bar text-white shadow-xl">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]" style={dots} />
              <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" aria-hidden="true" />
              <div className="relative grid md:grid-cols-12 gap-8 p-8 md:p-12">
                <div className="md:col-span-7">
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.3em] text-white/85 mb-5">{f.kicker}</span>
                  <h3 className="font-heading text-3xl md:text-5xl font-black leading-[1.02] tracking-tight">
                    {f.titleLines.map((l) => (
                      <span key={l}>
                        {l}
                        <br />
                      </span>
                    ))}
                    <span className="text-navy-900">{f.titleHighlight}</span>
                  </h3>
                  <div className="mt-6 h-px w-16 bg-white/60" />
                  <p className="mt-5 text-white/85 text-sm md:text-base max-w-lg leading-relaxed">{f.text}</p>
                </div>
                <div className="md:col-span-5 flex items-center justify-center md:justify-end">
                  <div className="relative w-48 h-48 md:w-60 md:h-60 -rotate-6">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/40" />
                    <div className="absolute inset-3 rounded-full border border-white/60" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                      <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-white">{f.seal.top}</span>
                      <span className="font-heading text-5xl md:text-6xl font-black text-white tabular-nums leading-none my-1.5">{f.seal.year}</span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-white">{f.seal.bottom}</span>
                      <div className="mt-3 h-px w-10 bg-white/50" />
                      <span className="mt-2 text-[8px] font-bold uppercase tracking-[0.28em] text-white/80">{f.seal.foot}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {p.items.map((it) => {
              const Icon = PartnerIcons[it.icon];
              return (
                <Reveal key={it.no}>
                  <div className="group relative h-full bg-white border border-neutral-200 rounded-2xl p-6 hover:border-primary-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between mb-6">
                      <span className="font-heading text-5xl font-black tabular-nums leading-none text-navy-900/10 group-hover:text-primary-700/30 transition-colors">
                        {it.no}
                      </span>
                      <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <h3 className="font-heading text-lg md:text-xl font-black text-navy-900 leading-tight">{it.title}</h3>
                    <div className="mt-3 h-px w-8 bg-accent-500" />
                    <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{it.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
