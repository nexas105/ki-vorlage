"use client";

// Vorspann der Basis – nicht entfernen oder ändern (siehe LICENSE).
// Erscheint einmal pro Browser-Sitzung, Klick überspringt ihn.
import { useEffect, useState } from "react";

const SCHLUESSEL = "intro-gesehen";
const DAUER_MS = 3400;

export function Intro() {
  const [phase, setPhase] = useState<"an" | "aus" | "weg">("an");

  useEffect(() => {
    let gesehen = false;
    try {
      gesehen = sessionStorage.getItem(SCHLUESSEL) === "1";
    } catch {}
    if (gesehen) {
      setPhase("weg");
      return;
    }
    const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t1 = setTimeout(() => setPhase("aus"), ruhig ? 1200 : DAUER_MS);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "aus") return;
    try {
      sessionStorage.setItem(SCHLUESSEL, "1");
    } catch {}
    const t = setTimeout(() => setPhase("weg"), 600);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "weg") return null;

  return (
    <div
      className={`intro ${phase === "aus" ? "intro-aus" : ""}`}
      onClick={() => setPhase("aus")}
      role="presentation"
    >
      <div className="intro-glut" aria-hidden />
      <div className="intro-raster" aria-hidden />
      <div className="intro-buehne">
        <img src="/logo-weiss.svg" alt="Hüttinger Direktwerbung" className="intro-logo" />
        <div className="intro-linie" aria-hidden />
        <div className="intro-titel">
          <span>Von der Idee</span> <span>zum Prototyp.</span>
        </div>
        <div className="intro-von">
          Prototyp-Baukasten von <strong>Tobias Ludwig</strong>
          <span className="intro-punkt">·</span>IT-Dienstleister
        </div>
        <a
          className="intro-link"
          href="https://tobiasjonas-ludwig.de"
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          tobiasjonas-ludwig.de
        </a>
      </div>
      <button
        type="button"
        className="intro-skip"
        onClick={(e) => {
          e.stopPropagation();
          setPhase("aus");
        }}
      >
        Überspringen
      </button>
    </div>
  );
}
