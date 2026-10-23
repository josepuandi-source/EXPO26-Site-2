"use client";

import { useContent } from "./ContentProvider";
import { Container, Reveal, SectionHeader } from "./ui";

/** Numbered benefit cards on the pale-teal "mist" ground. */
export default function Benefits() {
  const { benefits } = useContent();
  return (
    <section className="bg-primary-50 py-20 md:py-[88px]">
      <Container>
        <SectionHeader title={benefits.title} subtitle={benefits.subtitle} />
        <Reveal>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.items.map((b) => (
              <li
                key={b.no}
                className="flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-primary-500"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-700 font-heading text-lg text-white">
                  {Number(b.no)}
                </span>
                <div className="flex flex-col items-start gap-2">
                  <span className="rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-700">{b.tag}</span>
                  <h3 className="font-heading text-xl font-medium leading-tight text-navy-900">{b.title}</h3>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
