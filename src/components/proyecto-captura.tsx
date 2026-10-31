import type { Proyecto } from "@/lib/data";

// Captura móvil real del sitio en vivo, en marco sobrio.
export function ProyectoCaptura({ p, size = "card" }: { p: Pick<Proyecto, "captura" | "captura_alt">; size?: "card" | "hero" }) {
  if (!p.captura) return null;
  return (
    <figure className={`phone-frame phone-frame--${size}`}>
      <img src={p.captura} width={780} height={1688} loading="lazy" decoding="async" alt={p.captura_alt} />
    </figure>
  );
}
