import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { L } from "@/components/l";
import { ServicioCard } from "@/components/servicio-card";
import { ServicioCta } from "@/components/servicio-cta";
import { Button } from "@/components/ui/button";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { entries, entryBySlug, fullName, grupoLabel, neighbors, related } from "@/lib/servicios";

export const dynamicParams = false;

export function generateStaticParams() {
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = entryBySlug((await params).slug);
  if (!e) return {};
  return pageMetadata({
    title: fullName(e).es,
    path: `/services/${e.slug}/`,
    description: `${e.resumen.es} ${e.price.es}${e.plazo ? ` · ${e.plazo.es}` : ""}.`,
  });
}

export default async function ServicioPage({ params }: { params: Promise<{ slug: string }> }) {
  const e = entryBySlug((await params).slug);
  if (!e) notFound();
  const grupo = grupoLabel[e.grupo];
  const { prev, next } = neighbors(e);
  const path = `/services/${e.slug}/`;
  const title = fullName(e).es;

  return (
    <article className="section svc-detail-page">
      <JsonLd data={jsonLd("WebPage", title, path, e.resumen.es)} />
      <div className="container svc-detail">
        <nav className="svc-crumbs" aria-label="Ruta de navegación">
          <L link as="a" href="/services/" k="services.crumb_services">
            Servicios
          </L>
          <span aria-hidden="true">›</span>
          <L link as="a" href={`/services/#${e.grupo === "cuidado" ? "plan-cuidado" : e.grupo}`} k={grupo.key}>
            {grupo.es}
          </L>
          <span aria-hidden="true">›</span>
          <L en={e.name.en} aria-current="page">
            {e.name.es}
          </L>
        </nav>

        <header className="svc-head">
          {e.icon && (
            <div className="svc-head__icon" aria-hidden="true">
              <Icon name={e.icon} />
            </div>
          )}
          <div>
            {e.badge && (
              <L as="p" className="svc-head__badge" en={e.badge.en}>
                {e.badge.es}
              </L>
            )}
            <L as="p" className="svc-head__kicker" en={e.kicker.en}>
              {e.kicker.es}
            </L>
            <L as="h1" className="svc-head__title" en={e.name.en}>
              {e.name.es}
            </L>
            {e.sub && (
              <L as="p" className="svc-head__sub" en={e.sub.en}>
                {e.sub.es}
              </L>
            )}
          </div>
        </header>

        <div className="svc-buy">
          <div className="svc-buy__price">
            <L className="precio-final" en={e.price.en}>
              {e.price.es}
            </L>
            <L className="precio-pen" en={e.priceAlt.en}>
              {e.priceAlt.es}
            </L>
            {e.plazo && (
              <L className="precio-plazo" en={e.plazo.en}>
                {e.plazo.es}
              </L>
            )}
            {e.referencial && (
              <L className="precio-nota" k="services.price_note_long">
                *Precio referencial. La cotización final se ajusta según alcance.
              </L>
            )}
          </div>
          <div className="svc-buy__actions">
            <ServicioCta e={e} size="lg" />
            <Button asChild size="lg" variant="outline">
              <L as="a" link href="/services/" k="services.see_others">
                Ver otros servicios
              </L>
            </Button>
          </div>
        </div>

        <section className="svc-section" aria-labelledby="svc-que-es">
          <L as="h2" id="svc-que-es" k="services.detail_heading">
            Qué es
          </L>
          {e.beneficio && (
            <L as="p" className="svc-lead" en={e.beneficio.en}>
              {e.beneficio.es}
            </L>
          )}
          <L as="p" en={(e.detalle ?? e.resumen).en}>
            {(e.detalle ?? e.resumen).es}
          </L>
          {e.focus && (
            <p className="svc-meta">
              <L as="strong" k="services.focus_label">
                Enfoque
              </L>
              : <L en={e.focus.en}>{e.focus.es}</L>
            </p>
          )}
          {e.aplicaA && e.aplicaA.length > 0 && (
            <p className="svc-meta">
              <L as="strong" k="services.applies_to">
                Se suma a
              </L>
              :{" "}
              {e.aplicaA.map((n, i) => (
                <span key={n.es}>
                  {i > 0 && ", "}
                  <L en={n.en}>{n.es}</L>
                </span>
              ))}
            </p>
          )}
        </section>

        {e.incluye && (
          <section className="svc-section" aria-labelledby="svc-incluye">
            <L as="h2" id="svc-incluye" k="services.whats_included">
              Qué incluye
            </L>
            <ul className="svc-list">
              {e.incluye.map((item) => (
                <L as="li" key={item.es} en={item.en}>
                  {item.es}
                </L>
              ))}
            </ul>
            {e.referencia && (
              <p className="precio-ref">
                <L k="services.market_ref_long">Referencia mercado</L>: USD {e.referencia}
              </p>
            )}
          </section>
        )}

        <section className="svc-section" aria-labelledby="svc-related">
          <L as="h2" id="svc-related" k="services.related_title">
            También te puede interesar
          </L>
          <div className="svc-grid">
            {related(e).map((r) => (
              <ServicioCard e={r} key={r.slug} />
            ))}
          </div>
        </section>

        {(prev || next) && (
          <nav className="svc-pager" aria-label={grupo.es}>
            {prev ? (
              <Link href={`/services/${prev.slug}/`} rel="prev" className="svc-pager__link">
                <L className="svc-pager__dir" k="services.prev_in_group">
                  ← Anterior
                </L>
                <L className="svc-pager__name" en={prev.name.en}>
                  {prev.name.es}
                </L>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/services/${next.slug}/`} rel="next" className="svc-pager__link svc-pager__link--next">
                <L className="svc-pager__dir" k="services.next_in_group">
                  Siguiente →
                </L>
                <L className="svc-pager__name" en={next.name.en}>
                  {next.name.es}
                </L>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>

      <div className="svc-bar">
        <div className="svc-bar__inner container">
          <L className="svc-bar__price" en={e.price.en}>
            {e.price.es}
          </L>
          <ServicioCta e={e} className="svc-bar__cta" />
        </div>
      </div>
    </article>
  );
}
