import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

// Rahmen für alle öffentlichen Seiten (alles in app/(seite)/).
export default function SeitenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="inhalt">{children}</main>
      <SiteFooter />
    </>
  );
}
