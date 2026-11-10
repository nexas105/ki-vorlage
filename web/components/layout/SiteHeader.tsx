import Link from "next/link";
import { Logo } from "./Logo";

/** Kopfzeile mit Logo und Hauptnavigation. Neue Menüpunkte hier eintragen. */
const MENUE = [
  { href: "/eintraege", text: "Einträge" },
  { href: "/admin", text: "Admin" },
];

export function SiteHeader() {
  return (
    <header className="kopf">
      <Logo />
      <nav className="kopf-nav">
        {MENUE.map((m) => (
          <Link key={m.href} href={m.href}>
            {m.text}
          </Link>
        ))}
      </nav>
    </header>
  );
}
