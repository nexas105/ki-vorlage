/** Seitenüberschrift mit optionaler Beschreibung und Knöpfen rechts. */
export function PageHeader({
  titel,
  beschreibung,
  aktionen,
}: {
  titel: string;
  beschreibung?: string;
  aktionen?: React.ReactNode;
}) {
  return (
    <div className="seitenkopf">
      <div>
        <h1>{titel}</h1>
        {beschreibung && <p className="leise">{beschreibung}</p>}
      </div>
      {aktionen && <div className="seitenkopf-aktionen">{aktionen}</div>}
    </div>
  );
}
