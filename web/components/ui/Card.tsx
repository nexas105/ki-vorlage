/** Weißer Kasten mit Rand. Optional mit Überschrift. */
export function Card({
  titel,
  children,
  className = "",
}: {
  titel?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`karte ${className}`}>
      {titel && <h2 className="karte-titel">{titel}</h2>}
      {children}
    </section>
  );
}
