import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, Notice, TextField } from "@/components/ui";
import { Icon } from "@/components/layout/Icon";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { istAdmin, passwortGesetzt } from "@/lib/admin";
import { anmelden } from "../actions";

export const dynamic = "force-dynamic";

export default async function Login({ searchParams }: { searchParams: Promise<{ fehler?: string }> }) {
  if (await istAdmin()) redirect("/admin");
  const { fehler } = await searchParams;

  return (
    <div className="login">
      <div className="login-glut" aria-hidden />
      <div className="login-karte">
        <Image src="/logo-weiss.svg" alt="Hüttinger Direktwerbung" width={170} height={49} priority />
        <div className="login-kopf">
          <Icon name="schloss" groesse={20} />
          <h1>Adminbereich</h1>
        </div>
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
        <p className="login-hinweis">
          Einfacher Passwortschutz für den Prototyp. Für den echten Betrieb richtet ein Entwickler einen
          richtigen Login ein.
        </p>
        <Link href="/" className="login-zurueck">
          ← Zur Website
        </Link>
      </div>
      <div className="login-fuss">
        <SiteFooter />
      </div>
    </div>
  );
}
