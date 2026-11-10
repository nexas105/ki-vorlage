import Link from "next/link";

/** Kennzahl-Kachel, z. B. „12 Einträge“. Mit href wird sie klickbar. */
export function StatCard({ wert, label, href }: { wert: number | string; label: string; href?: string }) {
  const inhalt = (
    <>
      <span className="kennzahl-wert">{wert}</span>
      <span className="kennzahl-label">{label}</span>
    </>
  );
  return href ? (
    <Link href={href} className="kennzahl kennzahl-link">
      {inhalt}
    </Link>
  ) : (
    <div className="kennzahl">{inhalt}</div>
  );
}
