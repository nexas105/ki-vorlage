import { Card, EmptyState, Notice, PageHeader } from "@/components/ui";
import { alleMails } from "@/lib/outbox";

export default function Outbox() {
  const mails = alleMails();

  return (
    <>
      <PageHeader titel="Mail-Vorschau" />
      <Notice>
        Im Prototyp werden keine Mails verschickt. Hier siehst du, welche Mails das Tool senden würde.
        Echter Versand wird später von einem Entwickler eingerichtet.
      </Notice>

      {mails.length === 0 ? (
        <EmptyState text="Noch keine Mails vorgemerkt." />
      ) : (
        <div className="stapel">
          {mails.map((m) => (
            <Card key={m.id}>
              <div className="leise klein">
                An: {m.an} · {m.erstellt_am}
              </div>
              <strong>{m.betreff}</strong>
              <pre className="mailtext">{m.text}</pre>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
