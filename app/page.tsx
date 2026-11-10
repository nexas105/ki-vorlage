import Link from "next/link";

export default function Start() {
  return (
    <>
      <h1>Willkommen</h1>
      <p className="leise">
        Das ist das Grundgerüst. Die KI baut hier dein Tool auf, nachdem sie dir ein paar Fragen
        gestellt hat.
      </p>
      <div className="kacheln">
        <Link href="/eintraege" className="kachel">
          <strong>Einträge</strong>
          <span>Beispiel: Daten erfassen und in SQLite speichern</span>
        </Link>
        <Link href="/outbox" className="kachel">
          <strong>Mail-Vorschau</strong>
          <span>So sähen Mails aus. Es wird nichts wirklich verschickt.</span>
        </Link>
      </div>
    </>
  );
}
