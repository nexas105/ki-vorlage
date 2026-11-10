import Link from "next/link";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { Icon } from "./Icon";

/** Kopfzeile der öffentlichen Seiten. Neue Menüpunkte hier in MENUE eintragen. */
const MENUE = [
  { href: "/", text: "Start", exakt: true },
  { href: "/eintraege", text: "Einträge" },
];

export function SiteHeader() {
  return (
    <header className="kopf">
      <div className="kopf-innen">
        <Logo />
        <nav className="kopf-nav" aria-label="Hauptmenü">
          {MENUE.map((m) => (
            <NavLink key={m.href} href={m.href} exakt={m.exakt} className="kopf-link">
              {m.text}
            </NavLink>
          ))}
        </nav>
        <Link href="/admin" className="kopf-admin">
          <Icon name="schloss" groesse={15} />
          <span>Admin</span>
        </Link>
      </div>
    </header>
  );
}
