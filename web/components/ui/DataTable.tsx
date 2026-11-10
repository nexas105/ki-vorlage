/**
 * Einfache Tabelle für Listen.
 *
 * <DataTable
 *   zeilen={eintraege}
 *   schluessel={(e) => e.id}
 *   spalten={[
 *     { titel: "Titel", zelle: (e) => e.titel },
 *     { titel: "", zelle: (e) => <LoeschenKnopf id={e.id} />, rechts: true },
 *   ]}
 * />
 */
export type Spalte<T> = {
  titel: string;
  zelle: (zeile: T) => React.ReactNode;
  rechts?: boolean;
};

export function DataTable<T>({
  zeilen,
  spalten,
  schluessel,
}: {
  zeilen: T[];
  spalten: Spalte<T>[];
  schluessel: (zeile: T) => string | number;
}) {
  return (
    <div className="tabelle-rahmen">
      <table className="tabelle">
        <thead>
          <tr>
            {spalten.map((s, i) => (
              <th key={i} className={s.rechts ? "rechts" : undefined}>
                {s.titel}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {zeilen.map((z) => (
            <tr key={schluessel(z)}>
              {spalten.map((s, i) => (
                <td key={i} className={s.rechts ? "rechts" : undefined}>
                  {s.zelle(z)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
