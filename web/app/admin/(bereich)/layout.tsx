import { AdminNav } from "@/components/layout/AdminNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { adminPflicht } from "@/lib/admin";

// Alle Seiten in app/admin/(bereich)/ sind nur nach Anmeldung erreichbar.
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await adminPflicht();
  return (
    <div className="admin">
      <AdminNav />
      <div className="admin-haupt">
        <div className="admin-leiste">
          <span className="admin-leiste-titel">Adminbereich</span>
          <span className="admin-marke">Prototyp</span>
        </div>
        <main className="admin-inhalt">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
