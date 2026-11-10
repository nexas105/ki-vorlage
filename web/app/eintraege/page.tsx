import { Button, Card, Checkbox, EmptyState, PageHeader, TextArea, TextField } from "@/components/ui";
import { db } from "@/lib/db";
import { eintragAnlegen } from "./actions";

export const dynamic = "force-dynamic";

type Eintrag = { id: number; titel: string; notiz: string | null; erstellt_am: string };

export default function Eintraege() {
  const eintraege = db().prepare("SELECT * FROM eintraege ORDER BY id DESC LIMIT 20").all() as Eintrag[];

  return (
    <>
      <PageHeader titel="Einträge" beschreibung="Beispiel: Daten erfassen und in SQLite speichern." />

      <Card titel="Neuer Eintrag">
        <form action={eintragAnlegen} className="formular">
          <TextField label="Titel" name="titel" required placeholder="z. B. Stopp Musterstraße 1" />
          <TextArea label="Notiz" name="notiz" placeholder="optional" />
          <Checkbox label="Büro per Mail benachrichtigen (nur Vorschau)" name="benachrichtigen" />
          <Button>Speichern</Button>
        </form>
      </Card>

      <h2>Zuletzt erfasst</h2>
      {eintraege.length === 0 ? (
        <EmptyState text="Noch keine Einträge." />
      ) : (
        <div className="stapel">
          {eintraege.map((e) => (
            <Card key={e.id}>
              <strong>{e.titel}</strong>
              {e.notiz && <p>{e.notiz}</p>}
              <small className="leise">{e.erstellt_am}</small>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
