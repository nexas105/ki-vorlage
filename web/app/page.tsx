import { ButtonLink, Card, PageHeader } from "@/components/ui";

export default function Start() {
  return (
    <>
      <PageHeader
        titel="Willkommen"
        beschreibung="Das ist das Grundgerüst. Die KI baut hier dein Tool auf, nachdem sie dir ein paar Fragen gestellt hat."
      />
      <div className="raster">
        <Card titel="Einträge">
          <p className="leise">Beispiel: Daten erfassen und in SQLite speichern.</p>
          <ButtonLink href="/eintraege">Öffnen</ButtonLink>
        </Card>
        <Card titel="Adminbereich">
          <p className="leise">Verwaltung und Mail-Vorschau, geschützt mit einem einfachen Passwort.</p>
          <ButtonLink href="/admin" variante="sekundaer">
            Zum Admin
          </ButtonLink>
        </Card>
      </div>
    </>
  );
}
