import type { Metadata } from "next";
import { Kanit, IBM_Plex_Sans_Thai, Yellowtail } from "next/font/google";
import { getContent, SITE_LANG } from "@/content/i18n";
import "./globals.css";

const kanit = Kanit({ subsets: ["latin", "thai"], weight: ["300", "400", "500", "600", "700"], variable: "--font-kanit" });
const plex = IBM_Plex_Sans_Thai({ subsets: ["latin", "thai"], weight: ["400", "500", "600"], variable: "--font-plex" });
const yellowtail = Yellowtail({ subsets: ["latin"], weight: "400", variable: "--font-yellowtail" });

const { seo } = getContent(SITE_LANG);

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  icons: { icon: "/favicon.ico?v=2" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE_LANG}>
      <body className={`${kanit.variable} ${plex.variable} ${yellowtail.variable} antialiased`}>{children}</body>
    </html>
  );
}
