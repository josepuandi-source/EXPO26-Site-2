"use client";

import { useContent } from "./ContentProvider";
import { Container, Reveal, SectionHeader } from "./ui";
import { UsersIcon, ShieldCheckIcon, DollarIcon, ClipboardIcon } from "./icons";

const ICONS = { users: UsersIcon, shield: ShieldCheckIcon, dollar: DollarIcon, clipboard: ClipboardIcon };

/** Pale-teal quick tiles, as on the U&I site. */
export default function WhyAttend() {
  const { whyAttend } = useContent();
  return (
    <section id="why-attend" className="py-20 md:py-[88px]">
      <Container>
        <SectionHeader title={whyAttend.title} subtitle={whyAttend.text} />
        <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          {whyAttend.items.map((it) => {
            const Icon = ICONS[it.icon];
            return (
              <Reveal key={it.title}>
                <div className="flex h-full flex-col items-center gap-3 rounded-[14px] bg-primary-100 px-4 pb-5 pt-7 text-center transition-all duration-200 hover:-translate-y-[3px] hover:bg-[#D3EDEA]">
                  <Icon className="h-11 w-11 text-primary-500" />
                  <div>
                    <h3 className="font-heading text-[17px] font-medium text-primary-700">{it.title}</h3>
                    <p className="text-sm text-neutral-700">{it.sub}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
