import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { PrototypBanner } from "@/components/PrototypBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prototyp",
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
        <header className="kopf">
          <Link href="/" className="logo">Prototyp</Link>
          <nav>
            <Link href="/eintraege">Einträge</Link>
            <Link href="/outbox">Mail-Vorschau</Link>
          </nav>
        </header>
        <main className="inhalt">{children}</main>
      </body>
    </html>
  );
}
