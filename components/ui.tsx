"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Same max-width wrapper the original site uses on every section. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/** Fade/slide-in on scroll (framer-motion, matching the original's 40px offset). */
export function Reveal({
  children,
  className = "",
  from = "bottom",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "left";
  delay?: number;
}) {
  const initial = from === "left" ? { opacity: 0, x: -40 } : { opacity: 0, y: 40 };
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Title with its last word in teal ("Find Your **Pathway**"), the U&I site's signature heading.
 * Strings without spaces (e.g. Japanese) are left plain; a ReactNode title is rendered as-is.
 */
export function HighlightTitle({ text, dark = false }: { text: ReactNode; dark?: boolean }) {
  if (typeof text !== "string") return <>{text}</>;
  const cut = text.trimEnd().lastIndexOf(" ");
  if (cut <= 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, cut + 1)}
      <span className={dark ? "text-primary-300" : "text-primary-500"}>{text.slice(cut + 1)}</span>
    </>
  );
}

/** Section title + subtitle block. */
export function SectionHeader({
  title,
  subtitle,
  dark = false,
  className = "mb-10 md:mb-12",
  align = "center",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  dark?: boolean;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`flex flex-col gap-3 ${align === "center" ? "items-center text-center" : "items-start text-left"} ${className}`}>
      <h2 className={`font-heading text-[30px] md:text-ds-h2 font-semibold ${dark ? "text-white" : "text-navy-900"}`}>
        <HighlightTitle text={title} dark={dark} />
      </h2>
      {subtitle && (
        <p className={`max-w-[720px] text-[17px] leading-relaxed ${dark ? "text-white/85" : "text-neutral-700"}`}>{subtitle}</p>
      )}
    </div>
  );
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border-2 border-transparent font-heading font-medium tracking-[0.06em] transition-all duration-200";
const variants = {
  accent: "bg-primary-700 text-white shadow-[0_4px_12px_rgba(0,125,116,.25)] hover:bg-primary-900 hover:-translate-y-px",
  primary: "bg-primary-700 text-white shadow-[0_4px_12px_rgba(0,125,116,.25)] hover:bg-primary-900 hover:-translate-y-px",
  white: "bg-white text-primary-700 hover:bg-primary-100 hover:text-primary-900",
  ghost: "border-white text-white bg-transparent hover:bg-white hover:text-primary-700",
  line: "border-primary-700 text-primary-700 bg-transparent hover:bg-primary-100",
};
const sizes = {
  sm: "min-h-9 px-4 py-1.5 text-sm",
  md: "min-h-11 px-6 py-2.5 text-base",
  lg: "min-h-12 px-7 py-3 text-base",
};

export function Button({
  href,
  children,
  variant = "accent",
  size = "md",
  className = "",
  external = false,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/** Renders "**bold**" segments as highlighted spans. */
export function RichText({ text, boldClass }: { text: string; boldClass: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className={boldClass}>
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  );
}
