import HomePage from "@/components/HomePage";

// English version at "/". Translated versions live at /ko, /th, /es, /pt and /ja (app/[lang]/page.tsx).
// Section order is set in components/HomePage.tsx.
export default function Home() {
  return <HomePage lang="en" />;
}
