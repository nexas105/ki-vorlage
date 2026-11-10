import { ButtonLink, Card } from "@/components/ui";

// Demo-Startseite der Vorlage. Darf im Projekt durch die eigene Startseite ersetzt werden;
// der Abschnitt „Betriebsfertig“ (unten) soll als Hinweis auf den Weg in den Betrieb bleiben.

const SCHRITTE = [
  {
    nr: "01",
    titel: "Fragen",
    text: "Die KI fragt nach Ablauf, Daten und Zielen – in kurzen Runden mit Antworten zum Anklicken.",
  },
  {
    nr: "02",
    titel: "Planen",
    text: "Aus den Antworten entsteht ein Bauplan. Gebaut wird erst, wenn du ihn freigibst.",
  },
  {
    nr: "03",
    titel: "Bauen",
    text: "Schritt für Schritt entsteht ein klickbarer Prototyp im Hüttinger-Look – mit Adminbereich.",
  },
  {
    nr: "04",
    titel: "Betrieb",
    text: "Steht der Prototyp, macht Tobias Ludwig ihn betriebsfertig: Login, Hosting, Datenschutz.",
  },
];

export default function Start() {
  return (
    <>
      <section className="held">
        <div className="held-glut" aria-hidden />
        <div className="held-raster" aria-hidden />
        <div className="held-inhalt">
          <div className="held-marke">Hüttinger · Prototyp-Baukasten</div>
          <h1 className="held-titel">
            Von der Idee <span>zum Prototyp.</span>
          </h1>
          <p className="held-text">
            Beschreibe, was dein Tool können soll. Die KI fragt nach, plant mit dir und baut Schritt
            für Schritt einen Prototyp, den du sofort ausprobieren kannst.
          </p>
          <div className="held-knoepfe">
            <ButtonLink href="/eintraege">Beispiel ansehen</ButtonLink>
            <ButtonLink href="/admin" variante="sekundaer">
              Zum Adminbereich
            </ButtonLink>
          </div>
          <ul className="held-chips">
            <li>Läuft lokal</li>
            <li>Ohne Cloud-Konto</li>
            <li>Mit Adminbereich</li>
            <li>Im Hüttinger-Look</li>
          </ul>
        </div>
      </section>

      <section className="abschnitt">
        <div className="abschnitt-kopf">
          <span className="abschnitt-marke">So entsteht dein Tool</span>
          <h2>In vier Schritten zum Ergebnis</h2>
        </div>
        <ol className="schritte">
          {SCHRITTE.map((s) => (
            <li key={s.nr} className="schritt">
              <span className="schritt-nr">{s.nr}</span>
              <strong>{s.titel}</strong>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="abschnitt">
        <div className="abschnitt-kopf">
          <span className="abschnitt-marke">Ausprobieren</span>
          <h2>Das steckt schon drin</h2>
        </div>
        <div className="raster">
          <Card titel="Einträge erfassen">
            <p className="leise">Beispiel: Daten erfassen und in der eingebauten Datenbank speichern.</p>
            <ButtonLink href="/eintraege">Öffnen</ButtonLink>
          </Card>
          <Card titel="Adminbereich">
            <p className="leise">Verwaltung, Kennzahlen und Mail-Vorschau – geschützt mit einem Passwort.</p>
            <ButtonLink href="/admin" variante="sekundaer">
              Zum Admin
            </ButtonLink>
          </Card>
        </div>
      </section>

      <section className="betrieb">
        <div className="betrieb-glut" aria-hidden />
        <div className="betrieb-inhalt">
          <span className="abschnitt-marke">Betriebsfertig</span>
          <h2>Dein Prototyp steht? Dann geht&apos;s live.</h2>
          <p>
            Login, Hosting, Datenschutz, Backups und echte Anbindungen: Tobias Ludwig macht aus dem
            Prototyp ein Werkzeug für den täglichen Einsatz – ohne bei null anzufangen.
          </p>
          <div className="held-knoepfe">
            <a className="knopf knopf-primaer" href="mailto:info@tobiasjonas-ludwig.de?subject=Prototyp%20betriebsfertig%20machen">
              Anfrage senden
            </a>
            <a className="knopf knopf-hell" href="https://tobiasjonas-ludwig.de" target="_blank" rel="noreferrer">
              tobiasjonas-ludwig.de
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
