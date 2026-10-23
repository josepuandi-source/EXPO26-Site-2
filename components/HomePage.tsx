import type { Lang } from "@/content/i18n";
import { getContent } from "@/content/i18n";
import { ContentProvider } from "./ContentProvider";
import Header from "./Header";
import Hero from "./Hero";
import Dates from "./Dates";
import WhyAttend from "./WhyAttend";
import Pathways from "./Pathways";
import ExpoExclusive from "./ExpoExclusive";
import Benefits from "./Benefits";
import Videos from "./Videos";
import About from "./About";
import Partner from "./Partner";
import Move from "./Move";
import Testimonials from "./Testimonials";
import PhotoStrip from "./PhotoStrip";
import { FinalCta, Offices, Footer } from "./Closing";

// Section order — rearrange or comment out lines to change the page.
export default function HomePage({ lang }: { lang: Lang }) {
  return (
    <ContentProvider lang={lang} content={getContent(lang)}>
      <Header />
      <main>
        <Hero />
        <Dates />
        <WhyAttend />
        <Pathways />
        <ExpoExclusive />
        <Benefits />
        <Videos />
        <About />
        <Partner />
        <Move />
        <Testimonials />
        <PhotoStrip />
        <FinalCta />
        <Offices />
      </main>
      <Footer />
    </ContentProvider>
  );
}
