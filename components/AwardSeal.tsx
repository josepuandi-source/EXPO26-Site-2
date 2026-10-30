"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Official-agent award: the gold "29 Years" seal, with a banner that unrolls out of its right side
 * (per JM's sketch). It opens by itself once the seal has popped in, on hover or tap, and rolls back
 * up as soon as the page is scrolled. Position it with `className` (it is absolutely placed).
 * Self-contained (own icon, explicit colours) so the same file works on every EXPO site.
 */
export default function AwardSeal({
  trust,
  seal,
  className = "absolute right-5 top-3 z-20 sm:right-10 sm:top-5 lg:right-14 lg:top-7",
  titleClassName = "text-[#0D1F3A]",
  iconClassName = "text-[#0D1F3A]",
  sealSrc = "/images/seal.webp",
}: {
  /** [bold first line, second line] */
  trust: string[];
  seal: { number: string; label: string };
  className?: string;
  titleClassName?: string;
  iconClassName?: string;
  sealSrc?: string;
}) {
  const [open, setOpen] = useState(false);
  // Unroll the banner on its own once the seal has popped in.
  useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), 1400);
    return () => window.clearTimeout(t);
  }, []);
  // Roll it back up as soon as the page is scrolled.
  useEffect(() => {
    if (!open) return;
    const start = window.scrollY;
    const onScroll = () => Math.abs(window.scrollY - start) > 8 && setOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.5 }}
    >
      <div className="flex items-center" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        {/* The gold award seal */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="trust-banner"
          aria-label={trust[0]}
          onClick={() => setOpen((o) => !o)}
          className={`relative z-10 grid h-[84px] w-[84px] shrink-0 place-items-center drop-shadow-[0_6px_12px_rgba(120,85,10,.45)] transition-transform duration-300 focus-visible:outline-none lg:h-[112px] lg:w-[112px] ${
            open ? "-rotate-6 scale-105" : ""
          }`}
        >
          <Image src={sealSrc} alt="" fill sizes="112px" className="object-contain" />
          <span className="relative flex flex-col items-center leading-none text-[#6B4A0C] [text-shadow:0_1px_0_rgba(255,255,255,.55)]">
            <span className="font-heading text-[28px] font-extrabold lg:text-[38px]">{seal.number}</span>
            <span className="mt-0.5 text-[14px] font-bold uppercase tracking-wider lg:text-[18px]">{seal.label}</span>
          </span>
        </button>

        {/* Banner tucked behind the seal */}
        <motion.div
          id="trust-banner"
          className="-ml-6 overflow-hidden lg:-ml-8"
          initial={false}
          animate={{ width: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="w-[min(290px,calc(100vw-6rem))] rounded-r-2xl border-y-2 border-r-2 border-[#E0B93A] bg-white/95 py-2.5 pl-8 pr-4 text-left text-[#0D1F3A] shadow-[0_12px_28px_rgba(13,31,58,.28)] lg:w-[340px] lg:py-3.5 lg:pl-11 lg:pr-5">
            <p className={`flex items-start gap-1.5 font-heading text-[13px] font-bold leading-snug lg:text-[16px] ${titleClassName}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`mt-px h-4 w-4 shrink-0 lg:h-[18px] lg:w-[18px] ${iconClassName}`}>
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {trust[0]}
            </p>
            <p className="mt-1 text-[11.5px] leading-snug text-neutral-600 lg:text-[13.5px]">{trust[1]}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
