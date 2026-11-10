/** Formularfelder mit Beschriftung. Werden in <form action={…}> verwendet. */

type Basis = { label: string; name: string; hinweis?: string };

export function TextField({
  label,
  name,
  hinweis,
  ...rest
}: Basis & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="feld">
      <span className="feld-label">
        {label}
        {rest.required && <span className="pflicht"> *</span>}
      </span>
      <input name={name} {...rest} />
      {hinweis && <small className="leise">{hinweis}</small>}
    </label>
  );
}

export function TextArea({
  label,
  name,
  hinweis,
  ...rest
}: Basis & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="feld">
      <span className="feld-label">
        {label}
        {rest.required && <span className="pflicht"> *</span>}
      </span>
      <textarea name={name} rows={3} {...rest} />
      {hinweis && <small className="leise">{hinweis}</small>}
    </label>
  );
}

export function Select({
  label,
  name,
  optionen,
  hinweis,
  ...rest
}: Basis & { optionen: { wert: string; text: string }[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="feld">
      <span className="feld-label">{label}</span>
      <select name={name} {...rest}>
        {optionen.map((o) => (
          <option key={o.wert} value={o.wert}>
            {o.text}
          </option>
        ))}
      </select>
      {hinweis && <small className="leise">{hinweis}</small>}
    </label>
  );
}

export function Checkbox({ label, name, ...rest }: Basis & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="feld-check">
      <input type="checkbox" name={name} {...rest} /> {label}
    </label>
  );
}
