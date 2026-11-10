"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { adminPflicht } from "@/lib/admin";
import { mailVormerken } from "@/lib/outbox";

export async function eintragAnlegen(formData: FormData) {
  const titel = String(formData.get("titel") ?? "").trim();
  const notiz = String(formData.get("notiz") ?? "").trim();
  if (!titel) return;

  db().prepare("INSERT INTO eintraege (titel, notiz) VALUES (?, ?)").run(titel, notiz || null);

  // Beispiel: Benachrichtigung „versenden“ (landet nur in /admin/outbox)
  if (formData.get("benachrichtigen") === "on") {
    mailVormerken(
      "buero@example.com",
      `Neuer Eintrag: ${titel}`,
      `Es wurde ein neuer Eintrag angelegt.\n\nTitel: ${titel}\nNotiz: ${notiz || "–"}`,
    );
  }

  revalidatePath("/eintraege");
  revalidatePath("/admin", "layout");
}

// Nur für den Adminbereich: prüft zuerst die Anmeldung.
export async function eintragLoeschen(formData: FormData) {
  await adminPflicht();
  const id = Number(formData.get("id"));
  db().prepare("DELETE FROM eintraege WHERE id = ?").run(id);
  revalidatePath("/eintraege");
  revalidatePath("/admin", "layout");
}
