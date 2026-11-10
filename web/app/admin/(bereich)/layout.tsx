import { AdminNav } from "@/components/layout/AdminNav";
import { adminPflicht } from "@/lib/admin";

// Alle Seiten in app/admin/(bereich)/ sind nur nach Anmeldung erreichbar.
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await adminPflicht();
  return (
    <div className="admin">
      <AdminNav />
      <div className="admin-inhalt">{children}</div>
    </div>
  );
}
