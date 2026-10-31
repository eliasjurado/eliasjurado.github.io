import Link from "next/link";
import { Icon } from "@/components/icon";
import { L } from "@/components/l";
import type { Entry } from "@/lib/servicios";

/** Tarjeta de catálogo: toda la tarjeta es el enlace a /services/<slug>/ (como un producto en una tienda). */
export function ServicioCard({ e, headingLevel = "h3" }: { e: Entry; headingLevel?: "h2" | "h3" }) {
  return (
    <Link href={`/services/${e.slug}/`} className={`svc-card${e.badge ? " svc-card--featured" : ""}`}>
      <span className="svc-card__top">
        {e.icon && (
          <span className="svc-card__icon" aria-hidden="true">
            <Icon name={e.icon} />
          </span>
        )}
        <L className="svc-card__kicker" en={e.kicker.en}>
          {e.kicker.es}
        </L>
      </span>
      <L as={headingLevel} className="svc-card__name" en={e.name.en}>
        {e.name.es}
      </L>
      {e.sub && (
        <L as="span" className="svc-card__sub" en={e.sub.en}>
          {e.sub.es}
        </L>
      )}
      <L as="span" className="svc-card__resumen" en={e.resumen.en}>
        {e.resumen.es}
      </L>
      <span className="svc-card__foot">
        <L className="svc-card__price" en={e.price.en}>
          {e.price.es}
        </L>
        <L className="svc-card__go" k="services.see_page">
          Ver servicio →
        </L>
      </span>
    </Link>
  );
}
