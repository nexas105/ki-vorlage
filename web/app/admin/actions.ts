"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, passwortGesetzt, sitzungsWert } from "@/lib/admin";

export async function anmelden(formData: FormData) {
  const eingabe = String(formData.get("passwort") ?? "");
  if (!passwortGesetzt() || eingabe !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login?fehler=1");
  }
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, sitzungsWert(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 Stunden
  });
  redirect("/admin");
}

export async function abmelden() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
