import Image from "next/image";
import Link from "next/link";
import { abmelden } from "@/app/admin/actions";
import { NavLink } from "./NavLink";
import { Icon } from "./Icon";

/** Seitenleiste im Adminbereich. Neue Admin-Seiten hier in MENUE eintragen (Icon: siehe Icon.tsx). */
const MENUE = [
  { href: "/admin", text: "Übersicht", icon: "uebersicht", exakt: true },
  { href: "/admin/eintraege", text: "Einträge", icon: "liste" },
  { href: "/admin/outbox", text: "Mail-Vorschau", icon: "mail" },
];

export function AdminNav() {
  return (
    <aside className="admin-nav">
      <Link href="/admin" className="admin-nav-logo" aria-label="Zur Admin-Übersicht">
        <Image src="/logo-weiss.svg" alt="Hüttinger Direktwerbung" width={132} height={38} priority />
      </Link>
      <div className="admin-nav-titel">Verwaltung</div>
      <nav className="admin-nav-liste" aria-label="Adminbereich">
        {MENUE.map((m) => (
          <NavLink key={m.href} href={m.href} exakt={m.exakt} className="admin-nav-link">
            <Icon name={m.icon} />
            <span>{m.text}</span>
          </NavLink>
        ))}
      </nav>
      <div className="admin-nav-fuss">
        <Link href="/" className="admin-nav-link">
          <Icon name="website" />
          <span>Zur Website</span>
        </Link>
        <form action={abmelden}>
          <button type="submit" className="admin-nav-link admin-nav-abmelden">
            <Icon name="abmelden" />
            <span>Abmelden</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
