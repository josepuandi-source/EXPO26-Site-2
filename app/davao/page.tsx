import type { Metadata } from "next";
import Image from "next/image";
import AwardSeal from "@/components/AwardSeal";

export const metadata: Metadata = {
  title: "Australia Study & Migration EXPO 2026 · Davao City – Coming soon | U&I Global",
  description: "The U&I Global EXPO comes to Davao City on 5 December 2026. Full details and free registration are coming soon.",
};

const ART = "/images/davao";

// Official-agent award, as on the Davao site's hero
const TRUST = ["Australia State Government Official Agent", "Since 1997 · 29 Years Experience & Trust"];
const SEAL = { number: "29", label: "Years" };

// The Davao poster's blue sky, laid over the top of the Sydney photo (as on the Davao site's hero).
const skyFade = "linear-gradient(180deg, #6CA9DF 0%, rgba(150,194,234,.8) 22%, rgba(255,236,196,.3) 52%, rgba(255,241,207,0) 72%)";

/**
 * Davao "coming soon" page, reached from the Philippines flag in the header while the Davao site is
 * still being finalised. Styled like the Davao poster: blue sky into a golden Sydney harbour.
 */
export default function DavaoComingSoon() {
  return (
    <main lang="en" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#FFF1CF] text-[#0D1F3A]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image src={`${ART}/sydney.webp`} alt="" fill priority sizes="100vw" className="object-cover object-[50%_70%] lg:object-[50%_55%]" />
        <div className="absolute inset-0" style={{ backgroundImage: skyFade }} />
        {/* Warm glow behind the text so it stays readable over the photo */}
        <div className="absolute left-1/2 top-[30%] h-[30rem] w-[52rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,246,221,.6),transparent)] lg:left-[-6%] lg:translate-x-0" />
      </div>

      <header className="relative z-10 bg-[linear-gradient(90deg,#033D60,#045584)] shadow-[0_6px_18px_rgba(3,61,96,.25)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="https://uandiedu.com" className="flex shrink-0 flex-col items-center">
            <Image src="/images/logo/uandi-logo-white.png" alt="U&I Global Australia" width={1508} height={330} priority className="h-9 w-auto md:h-10" />
            {/* Left padding equals the letter-spacing so the spaced text sits truly centred */}
            <span className="pl-[0.32em] font-heading text-[10px] font-semibold uppercase leading-none tracking-[0.32em] text-white/90 md:text-[11px]">Since 1997</span>
          </a>
          <a href="/" className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15">
            ← EXPO 2026
          </a>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-end gap-2 px-4 pt-28 sm:px-6 md:pt-10 lg:grid-cols-[1.15fr_1fr] lg:px-8">
        <AwardSeal
          trust={TRUST}
          seal={SEAL}
          titleClassName="text-[#033D60]"
          iconClassName="text-[#045584]"
          className="absolute right-4 top-4 z-20 sm:right-6 lg:right-8 lg:top-6"
        />
        <div className="flex flex-col items-center pb-10 text-center lg:items-start lg:self-center lg:pb-16 lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F7C548] px-4 py-1.5 font-heading text-sm font-bold uppercase tracking-[0.18em] text-[#0D1F3A] shadow-[0_6px_16px_rgba(120,85,10,.25)]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#045584]" />
            Coming soon
          </span>

          {/* EXPO logo in the Davao navy, with the strapline as text */}
          <div role="img" aria-label="Australia Study • Migration EXPO" className="relative mt-5 w-[min(100%,420px)] md:w-[460px]" style={{ aspectRatio: "1920 / 1150", containerType: "inline-size" }}>
            <Image src={`${ART}/expo-logo.webp`} alt="" fill priority sizes="(min-width: 768px) 460px, 90vw" className="object-contain" />
            <span className="absolute inset-x-0 whitespace-nowrap text-center font-heading leading-none text-[#16181C]" style={{ top: "42%", fontSize: "6.3cqw", letterSpacing: "0.02em" }}>
              STUDY • MIGRATION
            </span>
          </div>
          <p className="-mt-1 font-heading text-[clamp(34px,5.4vw,54px)] font-extrabold leading-none tracking-tight text-[#7A8B9C] lg:pl-[11%]">Davao City</p>

          <p className="mt-6 font-heading text-2xl font-extrabold text-[#045584] md:text-3xl">5 DEC 2026</p>
          <p className="mt-1 font-heading text-lg font-bold md:text-xl">The Royal Mandaya Hotel, Davao City</p>
          <p className="mt-4 max-w-[28rem] text-[15px] leading-relaxed text-[#23374F] md:text-base">
            The U&amp;I Global EXPO is coming to Davao. Full event details and free registration open soon.
          </p>

          <a
            href="/"
            className="mt-7 inline-flex min-h-12 items-center rounded-2xl bg-[#045584] px-7 font-heading text-lg font-bold text-white shadow-[0_8px_20px_rgba(4,85,132,.3)] transition-transform hover:-translate-y-0.5 hover:bg-[#033D60]"
          >
            See all EXPO 2026 events
          </a>
        </div>

        {/* Student, standing in front of the harbour as on the poster */}
        <div className="relative mx-auto w-[min(70%,300px)] sm:w-[330px] lg:mx-0 lg:ml-auto lg:w-[min(100%,440px)]">
          <Image src={`${ART}/student-davao.webp`} alt="" width={977} height={1525} priority sizes="(min-width: 1024px) 440px, 330px" className="h-auto w-full" />
        </div>
      </div>
    </main>
  );
}
