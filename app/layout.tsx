import type { Metadata } from "next";
import { Kanit, IBM_Plex_Sans_Thai, Yellowtail } from "next/font/google";
import { seo } from "@/content/site";
import { locales, langHref } from "@/content/i18n";
import "./globals.css";

const kanit = Kanit({ subsets: ["latin", "thai"], weight: ["300", "400", "500", "600", "700"], variable: "--font-kanit" });
const plex = IBM_Plex_Sans_Thai({ subsets: ["latin", "thai"], weight: ["400", "500", "600"], variable: "--font-plex" });
const yellowtail = Yellowtail({ subsets: ["latin"], weight: "400", variable: "--font-yellowtail" });

export const metadata: Metadata = {
  metadataBase: new URL("https://expo26.uandiedu.com"),
  title: seo.title,
  description: seo.description,
  alternates: { languages: Object.fromEntries(locales.map((l) => [l.code, langHref(l.code)])) },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${kanit.variable} ${plex.variable} ${yellowtail.variable} antialiased`}>{children}</body>
    </html>
  );
}
