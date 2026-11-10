import Link from "next/link";
import { abmelden } from "@/app/admin/actions";

/** Seitenleiste im Adminbereich. Neue Admin-Seiten hier eintragen. */
const MENUE = [
  { href: "/admin", text: "Übersicht" },
  { href: "/admin/eintraege", text: "Einträge" },
  { href: "/admin/outbox", text: "Mail-Vorschau" },
];

export function AdminNav() {
  return (
    <aside className="admin-nav">
      <div className="admin-nav-titel">Adminbereich</div>
      <nav>
        {MENUE.map((m) => (
          <Link key={m.href} href={m.href}>
            {m.text}
          </Link>
        ))}
      </nav>
      <form action={abmelden}>
        <button type="submit" className="knopf knopf-leise">Abmelden</button>
      </form>
    </aside>
  );
}
