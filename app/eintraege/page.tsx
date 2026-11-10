import { db } from "@/lib/db";
import { eintragAnlegen, eintragLoeschen } from "./actions";

export const dynamic = "force-dynamic";

type Eintrag = { id: number; titel: string; notiz: string | null; erstellt_am: string };

export default function Eintraege() {
  const eintraege = db()
    .prepare("SELECT * FROM eintraege ORDER BY id DESC")
    .all() as Eintrag[];

  return (
    <>
      <h1>Einträge</h1>

      <form action={eintragAnlegen} className="karte formular">
        <label>
          Titel
          <input name="titel" required placeholder="z. B. Stopp Musterstraße 1" />
        </label>
        <label>
          Notiz
          <textarea name="notiz" rows={3} placeholder="optional" />
        </label>
        <label className="check">
          <input type="checkbox" name="benachrichtigen" /> Büro per Mail benachrichtigen (nur Vorschau)
        </label>
        <button type="submit">Speichern</button>
      </form>

      {eintraege.length === 0 ? (
        <p className="leise">Noch keine Einträge.</p>
      ) : (
        <ul className="liste">
          {eintraege.map((e) => (
            <li key={e.id} className="karte">
              <div>
                <strong>{e.titel}</strong>
                {e.notiz && <p>{e.notiz}</p>}
                <small className="leise">{e.erstellt_am}</small>
              </div>
              <form action={eintragLoeschen}>
                <input type="hidden" name="id" value={e.id} />
                <button type="submit" className="leise-knopf">Löschen</button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
