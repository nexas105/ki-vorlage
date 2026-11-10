import { PageHeader, StatCard } from "@/components/ui";
import { db } from "@/lib/db";

export default function AdminUebersicht() {
  const anzahl = (tabelle: string) =>
    (db().prepare(`SELECT COUNT(*) AS n FROM ${tabelle}`).get() as { n: number }).n;

  return (
    <>
      <PageHeader titel="Übersicht" beschreibung="Kennzahlen des Prototyps auf einen Blick." />
      <div className="kennzahlen">
        <StatCard wert={anzahl("eintraege")} label="Einträge" href="/admin/eintraege" />
        <StatCard wert={anzahl("outbox")} label="Vorgemerkte Mails" href="/admin/outbox" />
      </div>
    </>
  );
}
