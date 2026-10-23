"use client";

import Image from "next/image";
import { useContent } from "./ContentProvider";

/** Two rounded photo marquees running in opposite directions; pauses on hover. */
export default function PhotoStrip() {
  const { photoStrip } = useContent();
  const half = Math.ceil(photoStrip.photos.length / 2);
  const rows = [photoStrip.photos.slice(0, half), photoStrip.photos.slice(half)];
  return (
    <section className="flex flex-col gap-2.5 py-14">
      {rows.map((row, r) => (
        <div key={r} className="group overflow-hidden">
          <div
            className="infinite-scroll flex w-max gap-2.5 group-hover:[animation-play-state:paused]"
            style={{ animationDuration: `${photoStrip.durationSeconds * 2}s`, animationDirection: r === 1 ? "reverse" : "normal" }}
          >
            {[...row, ...row].map((p, i) => (
              <Image
                key={i}
                src={p.src}
                alt={i < row.length ? p.alt : ""}
                width={300}
                height={210}
                className="h-[160px] w-[230px] shrink-0 rounded-xl object-cover md:h-[210px] md:w-[300px]"
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
