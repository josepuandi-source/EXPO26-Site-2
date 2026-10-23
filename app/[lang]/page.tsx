import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/components/HomePage";
import { getContent, isLang, otherLangs } from "@/content/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return otherLangs.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLang(params.lang)) return {};
  const { seo } = getContent(params.lang);
  return { title: seo.title, description: seo.description };
}

export default function LocalizedHome({ params }: { params: { lang: string } }) {
  if (!isLang(params.lang)) notFound();
  return <HomePage lang={params.lang} />;
}
