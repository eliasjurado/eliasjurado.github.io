import type { Metadata } from "next";
import { Fragment } from "react";
import { AnchorRedirect } from "@/components/anchor-redirect";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { L } from "@/components/l";
import { PageShell } from "@/components/page-shell";
import { ServicioCard } from "@/components/servicio-card";
import { Button } from "@/components/ui/button";
import { entries, entriesOf, type Grupo } from "@/lib/servicios";
import { jsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Servicios", path: "/services/" });

const groups: { g: Grupo; id: string; kicker: [string, string]; body: [string, string] }[] = [
  { g: "estrategias", id: "estrategias", kicker: ["services.group_estrategias", "Estrategias"], body: ["services.catalog_estrategias_body", "Un primer paso y tres niveles del Mapa de Madurez. Elige donde estás hoy."] },
  { g: "potenciadores", id: "potenciadores", kicker: ["services.group_potenciadores", "Potenciadores"], body: ["services.catalog_potenciadores_body", "Se suman a cualquier estrategia y se cotizan aparte."] },
  { g: "cuidado", id: "plan-cuidado", kicker: ["services.group_cuidado", "Plan Cuidado"], body: ["services.catalog_cuidado_body", "Hosting, soporte y mejoras continuas, independiente del desarrollo."] },
];

const steps: [string, string, string][] = [
  ["01", "services.method_step1_short", "Conversamos"],
  ["02", "services.method_step2_short", "Propuesta"],
  ["03", "services.method_step3_short", "Construimos"],
  ["04", "services.method_step4_short", "Lanzamos y cuidamos"],
];

export default function ServicesPage() {
  return (
    <PageShell
      prefix="services"
      kicker="Mapa de Madurez Digital"
      title="Servicios"
      subtitle="Un paso para cada momento de tu negocio. Empieza donde estés y avanza cuando el retorno lo justifique."
      pageClass="page-services"
    >
      <JsonLd data={jsonLd("WebPage", "Servicios", "/services/")} />
      <AnchorRedirect slugs={entries.map((e) => e.slug)} />

      <section className="strategies-intro">
        <L as="p" k="services.intro_body">
          Toda pyme recorre el mismo camino digital; solo cambia el punto de partida. Aquí están los tres niveles del Mapa de Madurez y un primer paso para ordenar tu WhatsApp antes de invertir en lo grande.
        </L>
      </section>

      {groups.map(({ g, id, kicker, body }) => (
        <section className="svc-group" id={id} key={g} aria-labelledby={`${id}-h`}>
          <header className="svc-group__header">
            <L as="h2" id={`${id}-h`} k={kicker[0]}>
              {kicker[1]}
            </L>
            <L as="p" k={body[0]}>
              {body[1]}
            </L>
          </header>
          <div className="svc-grid">
            {entriesOf(g).map((e) => (
              <ServicioCard e={e} key={e.slug} />
            ))}
          </div>
        </section>
      ))}

      <aside className="summary-metodo" aria-label="Nuestro método de trabajo">
        <header className="summary-metodo__header">
          <L as="p" className="kicker" k="services.method_strip_kicker">
            Nuestro método
          </L>
          <L as="p" className="caption" k="services.method_strip_caption">
            4 pasos. Cada uno con un entregable tangible que validas antes de continuar.
          </L>
        </header>
        <ol className="metodo-steps">
          {steps.map(([n, key, es], i) => (
            <Fragment key={n}>
              {i > 0 && (
                <li className="metodo-step__arrow" aria-hidden="true">
                  <Icon name="arrow" className="metodo-step__arrow-svg" />
                </li>
              )}
              <li className="metodo-step">
                <span className="metodo-step__num">{n}</span>
                <L className="metodo-step__label" k={key}>
                  {es}
                </L>
              </li>
            </Fragment>
          ))}
        </ol>
        <L as="a" link className="metodo-ver-detalle" href="/services/proceso/" k="services.method_see_detail">
          Ver el proceso completo →
        </L>
      </aside>

      <section className="strategies-cta-final">
        <L as="h2" k="services.final_title">
          ¿No sabes por dónde empezar?
        </L>
        <L as="p" k="services.final_body">
          Conversemos 30 minutos. Te ayudo a ubicar tu negocio en el mapa y te muestro qué retorno concreto esperar de cada paso.
        </L>
        <Button asChild size="lg">
          <L as="a" link href="/contact/" k="services.final_cta">
            Agendar conversación
          </L>
        </Button>
      </section>
    </PageShell>
  );
}
