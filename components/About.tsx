"use client";

import Image from "next/image";
import { useContent } from "./ContentProvider";
import { Container, Reveal, RichText } from "./ui";

// Resting tilt + lift for each polaroid (cards straighten on hover).
const TILT = ["-rotate-6 translate-y-2.5", "rotate-[4deg]", "-rotate-3 translate-y-3.5", "rotate-[5deg] -translate-y-1", "-rotate-[5deg] translate-y-2", "rotate-3"];

/** Text block with a row of tilted polaroids, as on the U&I site. */
export default function About() {
  const { about, photoStrip } = useContent();
  const photos = photoStrip.photos.slice(0, 6);
  return (
    <section className="overflow-hidden py-20 md:py-[88px]">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-[30px] font-semibold text-navy-900 md:text-ds-h2">
              <RichText text={about.title} boldClass="text-primary-500" />
            </h2>
            <p className="mt-3 font-heading text-xl font-light text-primary-700">{about.subtitle}</p>
            <div className="mt-6 flex flex-col gap-4 text-[17px] leading-relaxed text-neutral-700">
              {about.paragraphs.map((p, i) => (
                <p key={i}>
                  <RichText text={p} boldClass="font-semibold text-navy-900" />
                </p>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-4 pb-2.5 pt-10 lg:flex-nowrap lg:gap-0">
          {photos.map((p, i) => (
            <figure
              key={p.src}
              className={`relative m-0 w-[42%] rounded-xl bg-white p-2 shadow-[0_10px_24px_rgba(18,17,15,.18)] transition-transform duration-300 hover:z-10 hover:-translate-y-2 hover:rotate-0 hover:scale-[1.04] sm:w-[30%] lg:-mx-3.5 lg:w-[190px] ${TILT[i % TILT.length]}`}
            >
              <Image src={p.src} alt={p.alt} width={360} height={360} className="aspect-square w-full rounded-md object-cover" />
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
