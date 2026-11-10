type Art = "info" | "warnung" | "erfolg" | "fehler";

/** Farbiger Hinweiskasten. */
export function Notice({ art = "info", children }: { art?: Art; children: React.ReactNode }) {
  return (
    <div className={`hinweis hinweis-${art}`} role={art === "fehler" ? "alert" : "note"}>
      {children}
    </div>
  );
}
