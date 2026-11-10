import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// PROTOTYP-ZUGANG – KEINE ECHTE SICHERHEIT
// Ein einziges Passwort aus web/.env.local (ADMIN_PASSWORD). Kein Benutzerkonto,
// keine Rollen, kein Schutz gegen Durchprobieren. Reicht nur, damit Testpersonen
// nicht versehentlich im Adminbereich landen. Für den Betrieb muss ein Entwickler
// einen richtigen Login einbauen (siehe docs/offene-punkte.md).
// ─────────────────────────────────────────────────────────────────────────────

export const ADMIN_COOKIE = "admin_sitzung";

export function passwortGesetzt(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/** Wert, der im Cookie steht: Prüfsumme des Passworts (nicht das Passwort selbst). */
export function sitzungsWert(): string {
  return createHash("sha256").update(`prototyp:${process.env.ADMIN_PASSWORD ?? ""}`).digest("hex");
}

export async function istAdmin(): Promise<boolean> {
  if (!passwortGesetzt()) return false;
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === sitzungsWert();
}

/** Am Anfang jeder Admin-Seite und jeder Admin-Aktion aufrufen. */
export async function adminPflicht(): Promise<void> {
  if (!(await istAdmin())) redirect("/admin/login");
}
