"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Link, der sich selbst als aktiv markiert (Klasse „aktiv“), wenn man auf der Seite ist. */
export function NavLink({
  href,
  exakt = false,
  className = "",
  children,
}: {
  href: string;
  /** true: nur genau diese Adresse ist aktiv (z. B. „/admin“, nicht „/admin/eintraege“) */
  exakt?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const pfad = usePathname();
  const aktiv = exakt ? pfad === href : pfad === href || pfad.startsWith(href + "/");
  return (
    <Link href={href} className={`${className} ${aktiv ? "aktiv" : ""}`} aria-current={aktiv ? "page" : undefined}>
      {children}
    </Link>
  );
}
