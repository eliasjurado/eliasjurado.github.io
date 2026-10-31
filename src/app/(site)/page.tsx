import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { L } from "@/components/l";
import { MaturityMap } from "@/components/maturity-map";
import { ProyectoCaptura } from "@/components/proyecto-captura";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clientes, niveles, proyectos, quickWin } from "@/lib/data";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { site, waLink } from "@/lib/site";

const description =
  "Webs, tiendas en línea y sistemas de seguimiento para pymes que quieren vender más, con un Plan Cuidado mensual que mantiene todo funcionando.";

export const metadata: Metadata = pageMetadata({
  title: "Inicio",
  path: "/",
  description,
  ogTitle: "¿Te escriben mucho y cierras poco? · Elías Jurado",
  ogDescription: "Conecto tu web, tu tienda y tu WhatsApp para que ninguna venta se quede sin respuesta.",
});

const heroSubtitle =
  "Ayudo a las pymes a vender más con tecnología. Conecto tu web, tu tienda en línea y tu WhatsApp para que cada consulta tenga respuesta y cada cotización tenga seguimiento.";

export default function HomePage() {
  const destacados = proyectos
    .filter((p) => p.destacado)
    .sort((a, b) => (a.orden_home ?? 0) - (b.orden_home ?? 0))
    .slice(0, 2);

  return (
    <>
      <JsonLd data={jsonLd("WebSite", "Inicio", "/", description)} />

      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__content">
            <L as="h1" k="hero.title_short" className="hero__title">
              {site.tagline}
            </L>
            <L as="p" k="hero.subtitle" className="hero__tagline">
              {heroSubtitle}
            </L>
            <div className="hero__actions">
              <WhatsAppCta />
              <Button asChild size="lg" variant="ghost">
                <L as="a" link href="/services/" k="hero.cta_secondary">
                  Ver servicios y precios
                </L>
              </Button>
            </div>
          </div>
          <div className="hero__avatar hero__avatar--jaguar">
            {/* Logo en tamaño grande = la mascota jaguar sobre placa carbón (01-identidad/mascota-jaguar). */}
            <img src="/assets/images/mascota/jaguar-hero.jpg" width={800} height={800} alt={`Jaguar, mascota de ${site.title}`} />
          </div>
        </div>
      </section>

      {clientes.length > 0 && (
        <section className="section trusted-strip" aria-label="Empresas que confiaron en mi trabajo">
          <div className="container">
            <L as="p" en="Trusted in this work" className="page-header__kicker trusted-strip__kicker">
              Confiaron en este trabajo
            </L>
            <div className="clientes-wordmarks">
              {clientes.map((c) => {
                const inner = (
                  <>
                    <span className="cliente-wordmark__name">{c.nombre}</span>
                    <L className="cliente-wordmark__industria" en={c.industria.en}>
                      {c.industria.es}
                    </L>
                  </>
                );
                return c.url ? (
                  <a key={c.nombre} href={c.url} target="_blank" rel="noopener" className="cliente-wordmark" title={`Visitar sitio de ${c.nombre}`}>
                    {inner}
                  </a>
                ) : (
                  <span key={c.nombre} className="cliente-wordmark">
                    {inner}
                  </span>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <MaturityMap entry={quickWin} levels={niveles} />

      {destacados.length > 0 && (
        <section className="section section--soft">
          <div className="container">
            <div className="home-featured__header">
              <L as="p" en="Portfolio" className="page-header__kicker">
                Portafolio
              </L>
              <L as="h2" en="Already running">
                Ya está funcionando
              </L>
            </div>
            <div className="grid grid--2">
              {destacados.map((p) => (
                <Card key={p.slug} className="card card--captura block gap-0 py-6 shadow-none">
                  <ProyectoCaptura p={p} size="card" />
                  <L as="h3" className="card__title" en={p.title_en}>
                    {p.title}
                  </L>
                  {(p.cliente || p.industria) && (
                    <p className="text-sm home-featured__meta">
                      {p.cliente}
                      {p.industria && (
                        <>
                          {" · "}
                          <L en={p.industria_en ?? p.industria}>{p.industria}</L>
                        </>
                      )}
                    </p>
                  )}
                  <L as="p" className="card__body" en={p.resumen_en}>
                    {p.resumen}
                  </L>
                  <p className="home-featured__actions">
                    <L as="a" link href={`/portfolio/${p.slug}/`} className="home-featured__link" en="See case →">
                      Ver caso →
                    </L>
                    {p.url_vivo && (
                      <L as="a" href={p.url_vivo} target="_blank" rel="noopener" className="home-featured__link home-featured__link--alt" en="See live site ↗">
                        Ver sitio en vivo ↗
                      </L>
                    )}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container container-narrow text-center">
          <L as="h2" k="home.closing_title">
            ¿Te escriben mucho y cierras poco?
          </L>
          <L as="p" k="home.closing_body" className="text-muted home-closing__body">
            Cuéntame cómo te llegan hoy los clientes y te digo por dónde empezar. Te respondo en menos de 24 horas en días hábiles.
          </L>
          <Button asChild size="lg" variant="accent">
            <L as="a" href={waLink(site.contact.whatsapp, site.whatsappMessages.hero)} target="_blank" rel="noopener" k="home.closing_cta">
              Escribir por WhatsApp
            </L>
          </Button>
        </div>
      </section>
    </>
  );
}

