import HomePage from "@/components/HomePage";
import { SITE_LANG } from "@/content/i18n";

// Single-language site served at "/". Section order is set in components/HomePage.tsx.
export default function Home() {
  return <HomePage lang={SITE_LANG} />;
}
