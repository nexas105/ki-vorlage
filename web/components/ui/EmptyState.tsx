/** Anzeige, wenn eine Liste leer ist. */
export function EmptyState({ text, aktion }: { text: string; aktion?: React.ReactNode }) {
  return (
    <div className="leer">
      <p>{text}</p>
      {aktion}
    </div>
  );
}
