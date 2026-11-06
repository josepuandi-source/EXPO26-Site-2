"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useContent } from "./ContentProvider";
import { Container, Reveal, SectionHeader } from "./ui";
import { CloseIcon } from "./icons";

function Stars() {
  return (
    <span aria-label="5/5" className="flex gap-0.5 text-[15px] leading-none text-[#F5B301] drop-shadow-[0_1px_0_rgba(13,31,58,.15)]">
      {"★★★★★"}
    </span>
  );
}

type Review = ReturnType<typeof useContent>["testimonials"]["items"][number];

const FIRST = 8; // cards shown before "See more reviews"

/** Label/value lines under the name: course and school, or service and consultant. */
function Facts({ t, compact = false }: { t: Review; compact?: boolean }) {
  const { labels } = useContent().testimonials;
  const rows = [
    [labels.from, t.from],
    [labels.course, t.course],
    [labels.school, t.school],
    [labels.service, t.service],
    [labels.consultant, t.consultant],
  ].filter((r): r is [string, string] => Boolean(r[1]));
  return (
    <dl className={`mt-2 space-y-0.5 text-navy-700 ${compact ? "text-[12.5px] leading-snug sm:text-[15px]" : "text-[15px]"}`}>
      {rows.map(([k, v]) => (
        <div key={k} className={compact ? "line-clamp-2" : undefined}>
          <dt className="inline font-medium">{k}: </dt>
          <dd className="inline">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Avatar({ t, sizes }: { t: Review; sizes: string }) {
  if (t.photo) return <Image src={t.photo} alt={t.name} fill sizes={sizes} className="object-cover" />;
  return (
    <div className="grid h-full w-full place-items-center bg-[linear-gradient(135deg,#009C91,#00665F)] font-heading text-7xl font-semibold text-white" aria-hidden="true">
      {t.name.charAt(0)}
    </div>
  );
}

/** Full review over the page: photo and text. */
function ReviewDialog({ t, onClose }: { t: Review; onClose: () => void }) {
  const { labels } = useContent().testimonials;
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" aria-label={`${labels.source}: ${t.name}`} className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-900/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row">
        <button
          ref={closeRef}
          type="button"
          aria-label={labels.close}
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy-900 shadow hover:bg-primary-100"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
        <div className="relative aspect-[4/3] w-full shrink-0 md:aspect-auto md:w-[42%]">
          <Avatar t={t} sizes="(min-width: 768px) 320px, 100vw" />
        </div>
        <div className="overflow-y-auto p-6 md:p-8">
          <Stars />
          <h3 className="mt-1.5 font-heading text-2xl font-semibold text-navy-900">{t.name}</h3>
          <Facts t={t} />
          <p className="mt-4 whitespace-pre-line text-[15.5px] leading-relaxed text-navy-700">“{t.quote}”</p>
        </div>
      </div>
    </div>
  );
}

function ReviewCards() {
  const { testimonials } = useContent();
  const { labels } = testimonials;
  const [open, setOpen] = useState<Review | null>(null);
  const [all, setAll] = useState(false);
  const close = useCallback(() => setOpen(null), []);
  // Reviews with a photo come first; otherwise the content order is kept.
  const items = [...testimonials.items.filter((t) => t.photo), ...testimonials.items.filter((t) => !t.photo)];
  const shown = all ? items : items.slice(0, FIRST);
  return (
    <>
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-6 lg:grid-cols-4">
        {shown.map((t, i) => (
          <Reveal key={`${t.name}-${i}`} delay={(i % 4) * 0.06}>
            <article className="flex h-full flex-col">
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-[0_10px_24px_rgba(13,31,58,.14)]">
                <Avatar t={t} sizes="(min-width: 1024px) 280px, 45vw" />
              </div>
              <div className="flex flex-1 flex-col px-0.5 pt-3 sm:px-1 sm:pt-4">
                <Stars />
                <h3 className="mt-1 font-heading text-base font-semibold leading-tight text-navy-900 sm:mt-1.5 sm:text-xl">{t.name}</h3>
                <Facts t={t} compact />
                <p className="mb-4 mt-2 line-clamp-2 text-[13px] leading-relaxed text-navy-700/80 sm:mb-5 sm:mt-3 sm:line-clamp-3 sm:text-[15px]">“{t.quote}”</p>
                <button
                  type="button"
                  onClick={() => setOpen(t)}
                  className="mx-auto mt-auto inline-flex min-h-10 items-center rounded-full border-2 border-primary-700 px-4 font-heading text-sm font-medium text-primary-700 transition-colors hover:bg-primary-700 hover:text-white sm:min-h-11 sm:px-7 sm:text-base"
                >
                  {labels.readMore}
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      {items.length > FIRST && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setAll((v) => !v)}
            className="inline-flex min-h-12 items-center rounded-2xl bg-primary-700 px-8 font-heading text-lg font-medium text-white shadow-[0_8px_18px_rgba(0,125,116,.25)] transition-transform hover:-translate-y-0.5"
          >
            {all ? labels.showLess : `${labels.showMore} (${items.length - FIRST})`}
          </button>
        </div>
      )}
      {open && <ReviewDialog t={open} onClose={close} />}
    </>
  );
}

/** Student reviews from the Bangkok and Davao EXPO sites: photo cards, each opening the full review. */
export default function Testimonials() {
  const { testimonials } = useContent();
  return (
    <section id="reviews" className="overflow-hidden py-20 md:py-[88px]">
      <Container>
        <SectionHeader title={testimonials.title} subtitle={testimonials.subtitle} />
        <ReviewCards />
      </Container>
    </section>
  );
}
