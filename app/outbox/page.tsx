import { alleMails } from "@/lib/outbox";

export const dynamic = "force-dynamic";

export default function Outbox() {
  const mails = alleMails();

  return (
    <>
      <h1>Mail-Vorschau</h1>
      <p className="hinweis">
        Im Prototyp werden keine Mails verschickt. Hier siehst du, welche Mails das Tool senden
        würde. Echter Versand wird später von einem Entwickler eingerichtet.
      </p>

      {mails.length === 0 ? (
        <p className="leise">Noch keine Mails vorgemerkt.</p>
      ) : (
        <ul className="liste">
          {mails.map((m) => (
            <li key={m.id} className="karte mail">
              <div className="leise">
                An: {m.an} · {m.erstellt_am}
              </div>
              <strong>{m.betreff}</strong>
              <pre>{m.text}</pre>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
