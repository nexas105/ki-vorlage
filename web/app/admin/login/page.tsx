import { redirect } from "next/navigation";
import { Button, Card, Notice, TextField } from "@/components/ui";
import { istAdmin, passwortGesetzt } from "@/lib/admin";
import { anmelden } from "../actions";

export const dynamic = "force-dynamic";

export default async function Login({ searchParams }: { searchParams: Promise<{ fehler?: string }> }) {
  if (await istAdmin()) redirect("/admin");
  const { fehler } = await searchParams;

  return (
    <div className="schmal">
      <Card titel="Adminbereich">
        {!passwortGesetzt() ? (
          <Notice art="warnung">
            Es ist noch kein Passwort gesetzt. Lege die Datei <code>web/.env.local</code> an (Vorlage:{" "}
            <code>web/.env.example</code>) mit <code>ADMIN_PASSWORD=…</code> und starte den Server neu.
          </Notice>
        ) : (
          <form action={anmelden} className="formular">
            {fehler && <Notice art="fehler">Das Passwort stimmt nicht.</Notice>}
            <TextField label="Passwort" name="passwort" type="password" required autoFocus />
            <Button>Anmelden</Button>
          </form>
        )}
      </Card>
      <p className="leise klein">
        Einfacher Passwortschutz für den Prototyp. Für den echten Betrieb muss ein Entwickler einen
        richtigen Login einrichten.
      </p>
    </div>
  );
}
