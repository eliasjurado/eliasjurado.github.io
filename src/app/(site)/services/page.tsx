import type { Metadata } from "next";
import { Fragment } from "react";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { L } from "@/components/l";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { addons, niveles, pick, planCuidado, quickWin, type Servicio } from "@/lib/data";
import { jsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Servicios", path: "/services/" });

const desde = (s: { precio_pen: string }) => `Desde S/ ${s.precio_pen}`;
const from = (s: { precio_usd: string }) => `From USD ${s.precio_usd}`;

function Incluye({ s }: { s: Servicio }) {
  return (
    <div className="strategy-card__incluye">
      <L as="h3" k="services.whats_included">
        Qué incluye
      </L>
      <ul>
        {s.incluye.map((item) => (
          <L as="li" key={item.es} en={item.en}>
            {item.es}
          </L>
        ))}
      </ul>
    </div>
  );
}

function Footer({ s, full }: { s: Servicio; full?: boolean }) {
  return (
    <div className="strategy-card__footer">
      <div className="strategy-card__precio">
        <span className="precio-ref">
          <L k={full ? "services.market_ref_long" : "services.market_ref"}>{full ? "Referencia mercado" : "Mercado"}</L>: USD {s.precio_referencia_usd}
        </span>
        <L className="precio-final" en={from(s)}>
          {desde(s)}
        </L>
        <L className="precio-pen" en={`≈ PEN ${s.precio_pen}`}>
          {`≈ USD ${s.precio_usd}`}
        </L>
        <L className="precio-plazo" en={s.plazo.en}>
          {s.plazo.es}
        </L>
        <L className="precio-nota" k="services.price_note_long">
          *Precio referencial. La cotización final se ajusta según alcance.
        </L>
      </div>
      <Button asChild variant={full ? "default" : "outline"}>
        <L as="a" link href={`/contact/?strategy=${s.cta_key}`} en={s.cta_label.en}>
          {s.cta_label.es}
        </L>
      </Button>
    </div>
  );
}

function Back() {
  return (
    <L as="a" className="strategy-card__back" href="#top" k="services.back_to_summary">
      ↑ Volver al resumen
    </L>
  );
}

export default function ServicesPage() {
  const qw = quickWin;
  return (
    <PageShell
      prefix="services"
      kicker="Mapa de Madurez Digital"
      title="Servicios"
      subtitle="Un paso para cada momento de tu negocio. Empieza donde estés y avanza cuando el retorno lo justifique."
      pageClass="page-services"
    >
      <JsonLd data={jsonLd("WebPage", "Servicios", "/services/")} />

      {/* ═══ RESUMEN COMPARATIVO (4 columnas) ═══ */}
      <section className="summary" aria-label="Resumen de servicios">
        <div className="summary-grid summary-grid--four">
          {/* Columna 0: Quick Win (capa de entrada) */}
          <article className="summary-col summary-col--quickwin" data-slug={qw.slug}>
            <L className="summary-col__badge" as="div" en={qw.badge!.en}>
              {qw.badge!.es}
            </L>
            <div className="summary-col__numero">00</div>
            <div className="summary-col__icon" aria-hidden="true">
              <Icon name={qw.icon} />
            </div>
            <p className="summary-col__kicker">
              <L k="services.entry_level">Nivel de entrada</L> · <L en={qw.factor_humano.en}>{qw.factor_humano.es}</L>
            </p>
            <L as="h2" className="summary-col__titulo" en={qw.nombre_corto.en}>
              {qw.nombre_corto.es}
            </L>
            <L as="p" className="summary-col__servicio" en={qw.titulo.en}>
              {qw.titulo.es}
            </L>
            <L as="p" className="summary-col__beneficio" en={qw.beneficio.en}>
              {qw.beneficio.es}
            </L>
            <L as="p" className="summary-col__resumen" en={qw.resumen.en}>
              {qw.resumen.es}
            </L>
            <div className="summary-col__precio">
              <L className="precio-final" en={from(qw)}>
                {desde(qw)}
              </L>
              <L className="precio-plazo" en={qw.plazo.en}>
                {qw.plazo.es}
              </L>
              <L className="precio-nota" k="services.price_note_short">
                *Precio referencial
              </L>
            </div>
            <L as="a" className="summary-col__cta summary-col__cta--inverted" href={`#${qw.slug}`} k="services.see_more">
              Ver más →
            </L>
          </article>

          {/* Columnas 1-3: niveles del Mapa de Madurez */}
          {niveles.map((s) => (
            <article className="summary-col" data-slug={s.slug} key={s.slug}>
              <div className="summary-col__numero">0{s.nivel}</div>
              <div className="summary-col__icon" aria-hidden="true">
                <Icon name={s.icon} />
              </div>
              <p className="summary-col__kicker">
                <L k="services.level_word">Nivel</L> {s.nivel} · <L en={s.fase!.en}>{s.fase!.es}</L>
              </p>
              <L as="h2" className="summary-col__titulo" en={s.nombre_corto.en}>
                {s.nombre_corto.es}
              </L>
              <L as="p" className="summary-col__servicio" en={s.titulo.en}>
                {s.titulo.es}
              </L>
              <L as="p" className="summary-col__beneficio" en={s.beneficio.en}>
                {s.beneficio.es}
              </L>
              <L as="p" className="summary-col__resumen" en={s.resumen.en}>
                {s.resumen.es}
              </L>
              <div className="summary-col__precio">
                <L className="precio-final" en={from(s)}>
                  {desde(s)}
                </L>
                <L className="precio-plazo" en={s.plazo.en}>
                  {s.plazo.es}
                </L>
                <L className="precio-nota" k="services.price_note_short">
                  *Precio referencial
                </L>
              </div>
              <L as="p" className="summary-col__cuidado-mention" k="services.cuidado_mention">
                + Plan Cuidado mensual desde S/ 180
              </L>
              <L as="a" className="summary-col__cta" href={`#${s.slug}`} k="services.see_more">
                Ver más →
              </L>
            </article>
          ))}
        </div>

        {/* Strip de Potenciadores */}
        <aside className="summary-potenciadores" aria-label="Potenciadores opcionales">
          <header className="summary-potenciadores__header">
            <L as="p" className="kicker" k="services.potenciadores_kicker_top">
              + Potenciadores opcionales
            </L>
            <L as="p" className="caption" k="services.potenciadores_caption">
              Suman a cualquier estrategia. Haz clic en cada uno para ver detalle.
            </L>
          </header>
          <div className="potenciadores-chips">
            {addons.map((a) => (
              <a href={`#addon-${a.slug}`} className="potenciador-chip" key={a.slug}>
                <span className="potenciador-chip__icon" aria-hidden="true">
                  <Icon name={a.icon} />
                </span>
                <span className="potenciador-chip__text">
                  <L as="strong" en={a.titulo.en}>
                    {a.titulo.es}
                  </L>
                  <L
                    as="small"
                    en={`${a.precio_es_referencial ? "From " : ""}USD ${pick(a.precio_usd, "en")}`}
                  >
                    {`${a.precio_es_referencial ? "Desde " : ""}S/ ${pick(a.precio_pen, "es")}`}
                  </L>
                </span>
              </a>
            ))}
          </div>
        </aside>

        {/* Strip Plan Cuidado */}
        <aside className="summary-cuidado" aria-label="Plan Cuidado mensual">
          <header className="summary-cuidado__header">
            <L as="p" className="kicker" k="services.care_strip_kicker">
              + Plan Cuidado mensual
            </L>
            <L as="p" className="caption" k="services.care_strip_caption">
              Hosting, soporte y mejoras continuas. Independiente del desarrollo.
            </L>
          </header>
          <div className="cuidado-chips">
            {planCuidado.map((p) => (
              <a href={`#cuidado-${p.slug}`} className="cuidado-chip" key={p.slug}>
                <L className="cuidado-chip__nombre" en={p.nombre.en}>
                  {p.nombre.es}
                </L>
                <L className="cuidado-chip__precio" en={`${p.precio_es_referencial ? "From " : ""}USD ${p.precio_usd}/month`}>
                  {`${p.precio_es_referencial ? "Desde " : ""}S/ ${p.precio_pen}/mes`}
                </L>
                <L className="cuidado-chip__incluye" en={p.incluye.en}>
                  {p.incluye.es}
                </L>
              </a>
            ))}
          </div>
        </aside>

        {/* Strip Nuestro Método */}
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
            {[
              ["01", "services.method_step1_short", "Conversamos"],
              ["02", "services.method_step2_short", "Propuesta"],
              ["03", "services.method_step3_short", "Construimos"],
              ["04", "services.method_step4_short", "Lanzamos y cuidamos"],
            ].map(([n, key, es], i) => (
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
          <L as="a" className="metodo-ver-detalle" href="#proceso" k="services.method_see_detail">
            Ver detalle del proceso ↓
          </L>
        </aside>
      </section>

      <section className="strategies-intro">
        <L as="p" k="services.intro_body">
          Toda pyme recorre el mismo camino digital; solo cambia el punto de partida. Aquí están los tres niveles del Mapa de Madurez y un primer paso para ordenar tu WhatsApp antes de invertir en lo grande.
        </L>
      </section>

      <section className="strategies-divisor">
        <L as="p" className="kicker" k="services.detail_section">
          Detalle de cada estrategia
        </L>
      </section>

      {/* ═══ QUICK WIN — detalle ═══ */}
      <article className="strategy-card strategy-card--quickwin" id={qw.slug}>
        <L className="strategy-card__badge" as="div" en={qw.badge!.en}>
          {qw.badge!.es}
        </L>
        <header className="strategy-card__header">
          <div className="strategy-card__icon" aria-hidden="true">
            <Icon name={qw.icon} />
          </div>
          <div>
            <L as="p" className="strategy-card__kicker" k="services.detail_qw_kicker">
              Paso 0 · Activación inmediata
            </L>
            <L as="h2" className="strategy-card__titulo" en={qw.titulo.en}>
              {qw.titulo.es}
            </L>
            <L as="p" className="strategy-card__beneficio" en={qw.beneficio.en}>
              {qw.beneficio.es}
            </L>
          </div>
        </header>
        <L as="p" className="strategy-card__resumen" en={qw.detalle.en}>
          {qw.detalle.es}
        </L>
        <Incluye s={qw} />
        <Footer s={qw} full />
        <Back />
      </article>

      {/* ═══ NIVELES — detalle ═══ */}
      {niveles.map((s) => (
        <article className="strategy-card strategy-card--nivel" id={s.slug} key={s.slug}>
          <div className="strategy-card__numero-grande">0{s.nivel}</div>
          <header className="strategy-card__header strategy-card__header--simple">
            <p className="strategy-card__kicker">
              <L k="services.level_word">Nivel</L> {s.nivel} · <L en={s.fase!.en}>{s.fase!.es}</L>
            </p>
            <L as="h2" className="strategy-card__titulo" en={s.nombre_corto.en}>
              {s.nombre_corto.es}
            </L>
            <L as="p" className="strategy-card__servicio" en={s.titulo.en}>
              {s.titulo.es}
            </L>
            <L as="p" className="strategy-card__beneficio" en={s.beneficio.en}>
              {s.beneficio.es}
            </L>
          </header>
          <L as="p" className="strategy-card__resumen" en={s.detalle.en}>
            {s.detalle.es}
          </L>
          <Incluye s={s} />
          <Footer s={s} />
          <Back />
        </article>
      ))}

      {/* ═══ POTENCIADORES (detalle) ═══ */}
      <section className="strategies-addons" id="potenciadores">
        <header className="strategies-addons__header">
          <L as="p" className="kicker" k="services.addons_kicker">
            Potenciadores opcionales
          </L>
          <L as="h2" k="services.addons_title">
            Servicios que se suman a cualquier estrategia
          </L>
          <L as="p" k="services.addons_body">
            Integraciones puntuales, capacitación y marketing experiencial. Se cotizan aparte y se suman a cualquier paso del mapa.
          </L>
        </header>
        <div className="addons-grid">
          {addons.map((a) => (
            <article className="addon-card" id={`addon-${a.slug}`} key={a.slug}>
              <div className="addon-card__icon" aria-hidden="true">
                <Icon name={a.icon} />
              </div>
              <L as="p" className="addon-card__kicker" en={a.kicker.en}>
                {a.kicker.es}
              </L>
              <L as="h3" className="addon-card__titulo" en={a.titulo.en}>
                {a.titulo.es}
              </L>
              <L as="p" className="addon-card__resumen" en={a.resumen.en}>
                {a.resumen.es}
              </L>
              {a.detalle && (
                <L as="p" className="addon-card__detalle" en={a.detalle.en}>
                  {a.detalle.es}
                </L>
              )}
              <dl className="addon-card__meta">
                <div>
                  <L as="dt" k="services.addons_investment">
                    Inversión
                  </L>
                  <dd>
                    <L en={`${a.precio_es_referencial ? "From " : ""}USD ${pick(a.precio_usd, "en")}`}>
                      {`${a.precio_es_referencial ? "Desde " : ""}S/ ${pick(a.precio_pen, "es")}`}
                    </L>
                    <br />
                    <L className="pen-small" en={`≈ PEN ${pick(a.precio_pen, "en")}`}>
                      {`≈ USD ${pick(a.precio_usd, "es")}`}
                    </L>
                    {a.precio_es_referencial && (
                      <>
                        <br />
                        <L className="precio-nota precio-nota--mini" k="services.reference_short">
                          *Referencial
                        </L>
                      </>
                    )}
                  </dd>
                </div>
                <div>
                  <L as="dt" k="services.addons_term">
                    Plazo
                  </L>
                  <L as="dd" en={a.plazo.en}>
                    {a.plazo.es}
                  </L>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ PLAN CUIDADO ═══ */}
      <section className="strategies-cuidado" id="plan-cuidado">
        <header className="strategies-cuidado__header">
          <L as="p" className="kicker" k="services.care_kicker">
            Plan Cuidado mensual
          </L>
          <L as="h2" k="services.care_title">
            Hosting, soporte y mejoras continuas
          </L>
          <L as="p" k="services.care_body">
            Todo proyecto en producción necesita mantenimiento. El Plan Cuidado es la operación recurrente — independiente del costo de desarrollo.
          </L>
        </header>
        <div className="cuidado-grid">
          {planCuidado.map((p) => (
            <article className="cuidado-card" id={`cuidado-${p.slug}`} key={p.slug}>
              <L as="h3" en={p.nombre.en}>
                {p.nombre.es}
              </L>
              <L as="p" en={p.incluye.en}>
                {p.incluye.es}
              </L>
              <div className="cuidado-card__precio">
                <L className="precio-final" en={`${p.precio_es_referencial ? "From " : ""}USD ${p.precio_usd}/month`}>
                  {`${p.precio_es_referencial ? "Desde " : ""}S/ ${p.precio_pen}/mes`}
                </L>
                <L className="precio-pen" en={`≈ PEN ${p.precio_pen}`}>
                  {`≈ USD ${p.precio_usd}`}
                </L>
                {p.precio_es_referencial && (
                  <L className="precio-nota precio-nota--cuidado" k="services.reference_short">
                    *Referencial
                  </L>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ CÓMO TRABAJAMOS ═══ */}
      <section className="strategies-proceso" id="proceso">
        <L as="h2" k="services.process_title">
          ¿Cómo trabajamos juntos?
        </L>
        <ol>
          {[
            ["Conversamos sin compromiso.", "Una llamada de 30 minutos para entender qué problema quieres resolver. Te muestro demos en vivo de proyectos funcionando."],
            ["Te paso una propuesta clara.", "Alcance, hitos, tiempos y costo en un solo documento. Si te encaja, firmamos. Si no, tan amigos."],
            ["Construimos juntos.", "Cada semana hay una entrega tangible que puedes revisar y aprobar. Staging durante todo el desarrollo; producción al pago del último hito."],
            ["Lanzamos y cuidamos.", "Una vez en vivo, el Plan Cuidado mantiene el sistema funcionando, con soporte directo conmigo."],
          ].map(([title, body], i) => (
            <li key={title}>
              <L as="strong" k={`services.process_step${i + 1}`}>
                {title}
              </L>{" "}
              <L k={`services.process_step${i + 1}_body`}>{body}</L>
            </li>
          ))}
        </ol>
      </section>

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
