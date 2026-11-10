import Link from "next/link";

type Variante = "primaer" | "sekundaer" | "gefahr" | "leise";

const klassen = (v: Variante) => `knopf knopf-${v}`;

/** Knopf für Formulare. Standard: type="submit". */
export function Button({
  variante = "primaer",
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante }) {
  return (
    <button type="submit" {...rest} className={`${klassen(variante)} ${rest.className ?? ""}`}>
      {children}
    </button>
  );
}

/** Sieht aus wie ein Knopf, ist aber ein Link. */
export function ButtonLink({
  href,
  variante = "primaer",
  children,
}: {
  href: string;
  variante?: Variante;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={klassen(variante)}>
      {children}
    </Link>
  );
}
