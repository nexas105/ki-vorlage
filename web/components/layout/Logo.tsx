import Image from "next/image";
import Link from "next/link";

/** Hüttinger-Logo. variante="weiss" für dunkle Hintergründe. Dateien: public/logo*.svg */
export function Logo({ variante = "farbig", hoehe = 36 }: { variante?: "farbig" | "weiss"; hoehe?: number }) {
  const datei = variante === "weiss" ? "/logo-weiss.svg" : "/logo.svg";
  const breite = Math.round((hoehe * 243.8) / 70.9);
  return (
    <Link href="/" className="logo" aria-label="Zur Startseite">
      <Image src={datei} alt="Hüttinger Direktwerbung" width={breite} height={hoehe} priority />
    </Link>
  );
}
