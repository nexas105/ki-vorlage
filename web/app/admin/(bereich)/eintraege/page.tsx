import { Button, DataTable, EmptyState, PageHeader } from "@/components/ui";
import { db } from "@/lib/db";
import { eintragLoeschen } from "@/app/eintraege/actions";

type Eintrag = { id: number; titel: string; notiz: string | null; erstellt_am: string };

export default function AdminEintraege() {
  const eintraege = db().prepare("SELECT * FROM eintraege ORDER BY id DESC").all() as Eintrag[];

  return (
    <>
      <PageHeader titel="Einträge verwalten" beschreibung={`${eintraege.length} Einträge`} />
      {eintraege.length === 0 ? (
        <EmptyState text="Noch keine Einträge." />
      ) : (
        <DataTable
          zeilen={eintraege}
          schluessel={(e) => e.id}
          spalten={[
            { titel: "Titel", zelle: (e) => <strong>{e.titel}</strong> },
            { titel: "Notiz", zelle: (e) => e.notiz ?? "–" },
            { titel: "Erstellt", zelle: (e) => e.erstellt_am },
            {
              titel: "",
              rechts: true,
              zelle: (e) => (
                <form action={eintragLoeschen}>
                  <input type="hidden" name="id" value={e.id} />
                  <Button variante="gefahr">Löschen</Button>
                </form>
              ),
            },
          ]}
        />
      )}
    </>
  );
}
