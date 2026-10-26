"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useContent, useLang } from "./ContentProvider";
import type { dates } from "@/content/site";
import { Container, Reveal, SectionHeader, HighlightTitle } from "./ui";
import { CalendarIcon, ImageIcon, PinIcon } from "./icons";
import { PosterViewer, useOpenPoster } from "./PosterViewer";

type Recap = (typeof dates.recaps)[number];
type Event = (typeof dates.events)[number];

/** Tear-off calendar page: month on a coloured strip, big day number below. No date → blank calendar. */
function CalendarBadge({ when, onTeal = false, muted = false }: { when?: string; onTeal?: boolean; muted?: boolean }) {
  const lang = useLang();
  const { ui } = useContent();
  const strip = muted ? "bg-neutral-400 text-white" : onTeal ? "bg-navy-900 text-white" : "bg-primary-700 text-white";
  const frame = `w-16 shrink-0 overflow-hidden rounded-[10px] bg-white text-center font-heading leading-none ${onTeal ? "shadow-[0_6px_16px_rgba(18,17,15,.25)]" : muted ? "border border-neutral-200" : "border border-primary-100"}`;
  if (!when) {
    return (
      <div className={frame} role="img" aria-label={ui.comingSoon}>
        <div className={`h-[22px] ${strip}`} />
        <div className="grid h-[42px] place-items-center text-primary-500">
          <CalendarIcon className="h-6 w-6" />
        </div>
      </div>
    );
  }
  // Fixed UTC so the server and every visitor's browser show the same day.
  const d = new Date(`${when}T00:00:00Z`);
  const month = new Intl.DateTimeFormat(lang, { month: "short", timeZone: "UTC" }).format(d);
  return (
    <div className={frame} aria-hidden="true">
      <div className={`py-1 text-[11px] font-medium uppercase tracking-[0.08em] ${strip}`}>{month}</div>
      <div className={`py-1.5 text-[26px] font-semibold ${muted ? "text-neutral-400" : "text-primary-700"}`}>{d.getUTCDate()}</div>
    </div>
  );
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (cb: () => void) => {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Photos glide continuously from left to right; pauses on hover, can still be dragged. */
function PhotoCarousel({ photos, alt }: { photos: string[]; alt: string }) {
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(reducedMotionQuery).matches, () => false);
  const [emblaRef] = useEmblaCarousel(
    { align: "start", loop: true, dragFree: true },
    reduceMotion ? [] : [AutoScroll({ speed: 0.8, direction: "backward", startDelay: 0, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
  return (
    <div className="relative w-full" role="region" aria-roledescription="carousel">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-2.5">
          {photos.map((src) => (
            <div key={src} role="group" aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 pl-2.5 basis-1/2 sm:basis-1/3 md:basis-1/4">
              <div className="aspect-square overflow-hidden rounded-xl">
                <Image src={src} alt={alt} width={640} height={640} className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecapCard({ recap }: { recap: Recap }) {
  return (
    <Reveal>
      <div className="mb-5 rounded-2xl bg-white p-6 shadow-[0_6px_22px_rgba(18,17,15,.07)] md:p-8">
        <div className="mb-5">
          <h3 className="font-heading text-2xl font-semibold text-navy-900 md:text-[28px]">
            <HighlightTitle text={recap.title} />
          </h3>
          <p className="mt-1 max-w-xl text-[15px] text-neutral-700">{recap.text.join(" ")}</p>
        </div>
        <PhotoCarousel photos={recap.photos} alt={recap.photoAlt} />
      </div>
    </Reveal>
  );
}

/** Big teal card for the next event, with its poster shown like a pinned photo. */
function FeaturedEvent({ e }: { e: Event }) {
  const { ui } = useContent();
  const openPoster = useOpenPoster();
  const show = () => e.poster && openPoster({ src: e.poster, alt: `${e.city} ${ui.posterAlt}` });
  return (
    <div className="relative flex min-h-[360px] overflow-hidden rounded-2xl bg-bar text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
      <div className="relative grid w-full grid-cols-1 items-center gap-6 p-7 sm:grid-cols-[1fr_auto] md:p-8">
        <div className="flex flex-col items-start gap-3">
          <CalendarBadge when={e.when} onTeal />
          <h3 className="font-heading text-4xl font-semibold md:text-5xl">{e.city}</h3>
          <p className="font-heading text-xl font-light">{e.date}</p>
          <p className="flex items-center gap-1.5 text-[15px] text-white/85">
            <PinIcon className="h-4 w-4" />
            {e.location}
          </p>
          {e.poster && (
            <button
              type="button"
              onClick={show}
              className="mt-2 inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-5 font-heading text-sm font-medium tracking-[0.06em] text-primary-700 hover:bg-primary-100"
            >
              <ImageIcon className="h-4 w-4" />
              {ui.viewPoster}
            </button>
          )}
        </div>
        {e.poster && (
          <button
            type="button"
            onClick={show}
            aria-label={`${ui.viewPoster}: ${e.city}`}
            className="mx-auto block w-44 rotate-3 rounded-xl bg-white p-2 shadow-[0_10px_24px_rgba(18,17,15,.25)] transition-transform duration-300 hover:rotate-0 hover:scale-[1.03] md:w-52"
          >
            <Image src={e.poster} alt={`${e.city} ${ui.posterAlt}`} width={400} height={566} className="h-auto w-full rounded-md" />
          </button>
        )}
      </div>
    </div>
  );
}

/** Compact row with a calendar badge, like the U&I site's event list. Past events are greyed out and inert. */
function EventRow({ e }: { e: Event }) {
  const { ui } = useContent();
  const openPoster = useOpenPoster();
  if (e.past) {
    return (
      <div
        aria-disabled="true"
        className="grid cursor-default select-none grid-cols-[64px_1fr] items-center gap-4 rounded-[14px] border border-neutral-200 bg-neutral-100 px-4 py-3.5 opacity-70 grayscale"
      >
        <CalendarBadge when={e.when} muted />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-heading text-[17px] font-medium text-neutral-600">{e.city}</h4>
            <span className="rounded-full bg-neutral-200 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-neutral-600">
              {ui.completed}
            </span>
          </div>
          <p className="text-sm text-neutral-400">
            {e.date} · {e.location}
          </p>
        </div>
      </div>
    );
  }
  const body = (
    <>
      <CalendarBadge when={e.when} />
      <div className="min-w-0">
        <h4 className="font-heading text-[17px] font-medium text-navy-900">{e.city}</h4>
        <p className="text-sm text-navy-300">
          {e.date} · {e.location}
        </p>
      </div>
    </>
  );
  const cls =
    "grid grid-cols-[64px_1fr] items-center gap-4 rounded-[14px] border border-neutral-200 bg-white px-4 py-3.5 text-navy-900 transition-colors";
  return e.poster ? (
    <button
      type="button"
      onClick={() => openPoster({ src: e.poster!, alt: `${e.city} ${ui.posterAlt}` })}
      className={`${cls} w-full text-left hover:border-primary-500`}
    >
      {body}
    </button>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export default function Dates() {
  const { dates } = useContent();
  // Next upcoming event is featured; the other upcoming ones follow, then completed events.
  const upcoming = dates.events.filter((e) => !e.past);
  const done = dates.events.filter((e) => e.past);
  const [featured, ...rest] = upcoming;
  const rows = [...rest, ...done];
  return (
    <section id="dates" className="bg-[linear-gradient(0deg,rgba(0,156,145,.05)_0%,#FFFDFA_100%)] py-20 md:py-[88px]">
      <PosterViewer>
        <Container>
          <Reveal>
            <SectionHeader title={dates.title} subtitle={dates.subtitle} align="left" />
          </Reveal>
          <Reveal>
            <div className="mb-14 grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
              {featured && <FeaturedEvent e={featured} />}
              <div className="flex flex-col gap-3">
                {rows.map((e) => (
                  <EventRow key={e.city} e={e} />
                ))}
              </div>
            </div>
          </Reveal>
          {dates.recaps.map((r) => (
            <RecapCard key={r.title} recap={r} />
          ))}
        </Container>
      </PosterViewer>
    </section>
  );
}
