"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// The logo is split into transparent layers, each the full 1920×1150 canvas,
// so they stack back into the exact artwork and can be animated separately.
// Australia, EXP and the globe are high-res WebP; the STUDY • MIGRATION artwork is the older PNG.
const SRC = "/images/expo-logo";
const W = 1920;
const H = 1150;
const SIZES = "(min-width: 768px) 460px, 90vw";
// Globe bounding box inside the canvas (px) — used for its spin origin and the shine.
const GLOBE = { x: 1320, y: 647, w: 448, h: 448 };
const pct = (v: number, of: number) => `${(v / of) * 100}%`;
const globeOrigin = `${pct(GLOBE.x + GLOBE.w / 2, W)} ${pct(GLOBE.y + GLOBE.h / 2, H)}`;

const ease = [0.65, 0, 0.35, 1] as const;

function Layer({ name }: { name: string }) {
  return <Image src={`${SRC}/${name}.${name === "study" ? "png" : "webp"}`} alt="" width={W} height={H} sizes={SIZES} priority className="absolute inset-0 h-full w-full" />;
}

/**
 * "Australia · Study · Migration · EXPO" logo with its entrance:
 * the script writes itself on, the strapline spreads out, EXP rises,
 * then the globe rolls in to become the O. A soft shine sweeps the globe afterwards.
 */
export default function ExpoLogo({
  alt,
  className = "",
  strap,
  strapClass = "font-normal",
  strapStyle,
}: {
  alt: string;
  className?: string;
  strap?: string;
  strapClass?: string;
  strapStyle?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();

  // Text strapline drawn in place of the low-res "STUDY • MIGRATION" artwork, so it stays crisp.
  const strapText = strap && (
    <span
      className={`absolute inset-x-0 text-center font-heading leading-none text-white whitespace-nowrap ${strapClass}`}
      style={{ top: "41.5%", fontSize: "7.2cqw", ...strapStyle }}
    >
      {strap}
    </span>
  );

  if (reduce) {
    if (!strap) return <Image src={`${SRC}/full.webp`} alt={alt} width={W} height={H} sizes={SIZES} priority className={`h-auto ${className}`} />;
    return (
      <div role="img" aria-label={alt} className={`relative ${className}`} style={{ aspectRatio: `${W} / ${H}`, containerType: "inline-size" }}>
        {["australia", "exp", "globe"].map((n) => (
          <Layer key={n} name={n} />
        ))}
        {strapText}
      </div>
    );
  }

  return (
    <div role="img" aria-label={alt} className={`relative ${className}`} style={{ aspectRatio: `${W} / ${H}`, containerType: "inline-size" }}>
      {/* 1. "Australia" brush script writes on left to right */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.2, ease, delay: 0.25 }}
      >
        <Layer name="australia" />
      </motion.div>

      {/* 2. STUDY • MIGRATION spreads out from the centre */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scaleX: 0.55 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 1.05 }}
        style={{ transformOrigin: "45% 49%" }}
      >
        {strap ? strapText : <Layer name="study" />}
      </motion.div>

      {/* 3. EXP rises into place */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, y: "18%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ type: "spring", stiffness: 180, damping: 18, delay: 1.35 }}
      >
        <Layer name="exp" />
      </motion.div>

      {/* 4. The globe rolls in from the right and lands as the O */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, x: "45%", rotate: 300 }}
        animate={{ opacity: 1, x: "0%", rotate: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 11, mass: 0.9, delay: 1.55 }}
        style={{ transformOrigin: globeOrigin }}
      >
        <Layer name="globe" />
      </motion.div>

      {/* Soft shine across the globe, repeating after it lands */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute overflow-hidden rounded-full"
        style={{ left: pct(GLOBE.x, W), top: pct(GLOBE.y, H), width: pct(GLOBE.w, W), height: pct(GLOBE.h, H) }}
      >
        <motion.div
          className="absolute inset-y-0 -left-full w-full bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,.55)_50%,transparent_70%)]"
          initial={{ x: "0%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 1.1, ease: "easeInOut", delay: 3, repeat: Infinity, repeatDelay: 3.5 }}
        />
      </div>
    </div>
  );
}
