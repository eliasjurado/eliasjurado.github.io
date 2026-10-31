import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { L } from "@/components/l";
import { MetodoStrip } from "@/components/metodo-strip";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { jsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cómo trabajo",
  path: "/services/proceso/",
  description: "Cuatro pasos, cada uno con un entregable que validas antes de continuar: conversamos, propuesta, construimos, lanzamos y cuidamos.",
});

const steps: [string, string][] = [
  ["Conversamos sin compromiso.", "Una llamada de 30 minutos para entender qué problema quieres resolver. Te muestro demos en vivo de proyectos funcionando."],
  ["Te paso una propuesta clara.", "Alcance, hitos, tiempos y costo en un solo documento. Si te encaja, firmamos. Si no, tan amigos."],
  ["Construimos juntos.", "Cada semana hay una entrega tangible que puedes revisar y aprobar. Staging durante todo el desarrollo; producción al pago del último hito."],
  ["Lanzamos y cuidamos.", "Una vez en vivo, el Plan Cuidado mantiene el sistema funcionando, con soporte directo conmigo."],
];

export default function ProcesoPage() {
  return (
    <PageShell
      keys={{ kicker: "services.process_page_kicker", title: "services.process_page_title", subtitle: "services.process_page_subtitle" }}
      kicker="Mi método"
      title="Cómo trabajo"
      subtitle="Cuatro pasos, cada uno con un entregable que validas antes de continuar."
      pageClass="page-services"
    >
      <JsonLd data={jsonLd("WebPage", "Cómo trabajo", "/services/proceso/")} />
      <nav className="svc-crumbs" aria-label="Ruta de navegación">
        <L link as="a" href="/services/" k="services.crumb_services">
          Servicios
        </L>
        <span aria-hidden="true">›</span>
        <L k="services.process_page_title" aria-current="page">
          Cómo trabajo
        </L>
      </nav>
      <MetodoStrip detail={false} />
      <section className="strategies-proceso">
        <L as="h2" k="services.process_title">
          ¿Cómo trabajamos juntos?
        </L>
        <ol>
          {steps.map(([title, body], i) => (
            <li key={title}>
              <L as="strong" k={`services.process_step${i + 1}`}>
                {title}
              </L>{" "}
              <L k={`services.process_step${i + 1}_body`}>{body}</L>
            </li>
          ))}
        </ol>
      </section>
      <div className="svc-actions">
        <Button asChild size="lg">
          <L as="a" link href="/contact/" k="services.final_cta">
            Agendar conversación
          </L>
        </Button>
        <Button asChild size="lg" variant="outline">
          <L as="a" link href="/services/" k="services.see_others">
            Ver otros servicios
          </L>
        </Button>
      </div>
    </PageShell>
  );
}
