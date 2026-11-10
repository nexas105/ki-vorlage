import type { Metadata, Viewport } from "next";
import { PrototypBanner } from "@/components/layout/PrototypBanner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hüttinger · Prototyp",
  description: "Prototyp, erstellt mit der KI-Vorlage",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <PrototypBanner />
        <SiteHeader />
        <main className="inhalt">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
