"use client";

import Image from "next/image";
import { useContent } from "./ContentProvider";
import { Container, Reveal, SectionHeader } from "./ui";

const dots = { backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" };

type Item = { icon: string; iconBg: string; title: string; text: string };

function Items({ items, dark }: { items: Item[]; dark?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li
          key={it.title}
          className={`flex items-start gap-4 p-3 rounded-xl transition-colors ${dark ? "hover:bg-white/5" : "hover:bg-primary-50"}`}
        >
          <div className={`w-12 h-12 rounded-lg ${it.iconBg} flex items-center justify-center shrink-0`}>
            <Image src={it.icon} alt="" width={28} height={28} className="w-7 h-7 object-contain" />
          </div>
          <div>
            <p className={`font-bold leading-tight ${dark ? "text-white" : "text-navy-900"}`}>{it.title}</p>
            <p className={`text-sm leading-snug mt-0.5 ${dark ? "text-white/70" : "text-neutral-600"}`}>{it.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Move() {
  const { move } = useContent();
  const { phase1: a, phase2: b } = move;
  return (
    <section className="py-24 bg-primary-50">
      <Container>
        <SectionHeader title={move.title} subtitle={move.subtitle} className="mb-14" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <Reveal>
            <div className="h-full rounded-2xl bg-white border border-neutral-200 p-7 md:p-8 shadow-sm">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-heading text-xs font-extrabold uppercase tracking-[0.28em] text-primary-700">{a.label}</span>
                <span className="h-px flex-1 bg-neutral-200" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-black text-navy-900 leading-tight mb-2">{a.title}</h3>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">{a.text}</p>
              <Items items={a.items} />
            </div>
          </Reveal>
          <Reveal>
            <div className="h-full rounded-2xl bg-primary-700 text-white p-7 md:p-8 shadow-sm relative overflow-hidden">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]" style={dots} />
              <div className="relative">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-heading text-xs font-extrabold uppercase tracking-[0.28em] text-white/80">{b.label}</span>
                  <span className="h-px flex-1 bg-white/20" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-black leading-tight mb-2">{b.title}</h3>
                <p className="text-sm text-white/85 mb-6 leading-relaxed">{b.text}</p>
                <Items items={b.items} dark />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
