import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { L } from "@/components/l";
import { PageShell } from "@/components/page-shell";
import { ProyectoCaptura } from "@/components/proyecto-captura";
import { Card } from "@/components/ui/card";
import { proyectos } from "@/lib/data";
import { jsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Portafolio", path: "/portfolio/" });

export default function PortfolioPage() {
  return (
    <PageShell
      prefix="portfolio"
      kicker="Casos"
      title="Portafolio"
      subtitle="Selección de proyectos en los que trabajo o trabajé. Más casos próximamente."
      pageClass="page-portfolio"
    >
      <JsonLd data={jsonLd("WebPage", "Portafolio", "/portfolio/")} />
      {proyectos.length > 0 ? (
        <div className="grid grid--2">
          {proyectos.map((p) => (
            <Card key={p.slug} className="card card--captura block gap-0 py-6 shadow-none">
              <ProyectoCaptura p={p} size="card" />
              <L as="h2" className="card__title" en={p.title_en}>
                {p.title}
              </L>
              {p.cliente && (
                <p className="text-sm portfolio-card__meta">
                  {p.cliente} · <L en={p.industria_en ?? p.industria}>{p.industria}</L>
                </p>
              )}
              <L as="p" className="card__body" en={p.resumen_en}>
                {p.resumen}
              </L>
              <p className="portfolio-card__actions">
                <L as="a" link href={`/portfolio/${p.slug}/`} className="portfolio-card__link" en="See case →">
                  Ver caso →
                </L>
                {p.url_vivo && (
                  <L as="a" href={p.url_vivo} target="_blank" rel="noopener" className="portfolio-card__link portfolio-card__link--alt" en="See live site ↗">
                    Ver sitio en vivo ↗
                  </L>
                )}
              </p>
            </Card>
          ))}
        </div>
      ) : (
        <L as="p" className="text-muted" en="Coming soon. I'm preparing the first cases to share.">
          Próximamente. Estoy preparando los primeros casos para mostrar.
        </L>
      )}

      <hr />

      <L
        as="p"
        enHtml="Need specific references from your industry? <a href='/contact/'>Tell me what you're looking for</a> and I'll share the closest cases."
      >
        ¿Necesitas referencias específicas de tu industria? <a href="/contact/">Cuéntame qué buscas</a> y te paso los casos más cercanos a lo que necesitas.
      </L>
    </PageShell>
  );
}
