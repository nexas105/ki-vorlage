import type { Metadata, Viewport } from "next";
import { PrototypBanner } from "@/components/layout/PrototypBanner";
import { Intro } from "@/components/layout/Intro";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hüttinger · Prototyp",
  description: "Prototyp, erstellt mit der KI-Vorlage",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Äußerster Rahmen: Vorspann + Prototyp-Banner.
// Öffentliche Seiten: app/(seite)/layout.tsx · Adminbereich: app/admin/(bereich)/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        {/* Vorspann nur einmal pro Sitzung: schon gesehen → sofort ausblenden, ohne Aufblitzen */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('intro-gesehen')==='1')document.documentElement.classList.add('ohne-intro')}catch(e){}",
          }}
        />
        <Intro />
        <PrototypBanner />
        {children}
      </body>
    </html>
  );
}
