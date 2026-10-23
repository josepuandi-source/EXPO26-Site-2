"use client";

import { useState } from "react";
import { useContent } from "./ContentProvider";
import type { videos } from "@/content/site";
import { Container, Reveal, SectionHeader } from "./ui";
import { PlayIcon } from "./icons";

function Short({ v }: { v: (typeof videos.items)[number] }) {
  const { ui } = useContent();
  const [playing, setPlaying] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[300px] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-lg">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1&playsinline=1&rel=0`}
            title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            aria-label={`${ui.playVideo} ${v.title}`}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            onClick={() => setPlaying(true)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/70 transition-colors duration-200 group-hover:bg-primary-700">
                <PlayIcon className="h-7 w-7 translate-x-0.5 fill-white" />
              </span>
            </span>
          </button>
        )}
      </div>
      <p className="mt-4 font-heading text-lg font-extrabold uppercase tracking-wider text-navy-900">{v.label}</p>
    </div>
  );
}

export default function Videos() {
  const { videos } = useContent();
  return (
    <section className="py-20 md:py-[88px] bg-primary-50">
      <Container>
        <Reveal>
          <SectionHeader title={videos.title} subtitle={videos.subtitle} className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {videos.items.map((v) => (
              <Short key={v.youtubeId} v={v} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
