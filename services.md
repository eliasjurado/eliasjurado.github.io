---
title: Estrategias
permalink: /services/
kicker: Mapa de Madurez Digital
subtitle: Una estrategia para cada fase del negocio. Empieza donde estés — y avanza cuando el retorno lo pida.
i18n_prefix: services
---

<!-- ═══════════════════════════ RESUMEN COMPARATIVO (4 columnas) ═══════════════════════════ -->
<section class="summary" aria-label="Resumen de estrategias">
  <div class="summary-grid summary-grid--four">

    <!-- ───── Columna 0: Quick Win (capa de entrada) ───── -->
    {% assign qw = site.data.servicios.quick_win %}
    <article class="summary-col summary-col--quickwin" data-slug="{{ qw.slug }}">
      <div class="summary-col__badge" data-i18n-en="{{ qw.badge.en }}">{{ qw.badge.es }}</div>
      <div class="summary-col__numero">00</div>
      <div class="summary-col__icon" aria-hidden="true">{{ qw.icon }}</div>
      <p class="summary-col__kicker">Nivel de entrada · <span data-i18n-en="{{ qw.factor_humano.en }}">{{ qw.factor_humano.es }}</span></p>
      <h3 class="summary-col__titulo" data-i18n-en="{{ qw.nombre_corto.en }}">{{ qw.nombre_corto.es }}</h3>
      <p class="summary-col__servicio" data-i18n-en="{{ qw.titulo.en }}">{{ qw.titulo.es }}</p>
      <p class="summary-col__beneficio" data-i18n-en="{{ qw.beneficio.en }}">{{ qw.beneficio.es }}</p>
      <p class="summary-col__resumen" data-i18n-en="{{ qw.resumen.en }}">{{ qw.resumen.es }}</p>
      <div class="summary-col__precio">
        <span class="precio-final"><span data-i18n="services.starting_at">Desde</span> USD {{ qw.precio_usd }}</span>
        <span class="precio-plazo" data-i18n-en="{{ qw.plazo.en }}">{{ qw.plazo.es }}</span>
        <span class="precio-nota" data-i18n="services.price_note_short">*Precio referencial</span>
      </div>
      <a class="summary-col__cta summary-col__cta--inverted" href="#{{ qw.slug }}" data-scroll data-i18n="services.see_more">Ver más →</a>
    </article>

    <!-- ───── Columnas 1-3: niveles del Mapa de Madurez ───── -->
    {% for s in site.data.servicios.niveles %}
    <article class="summary-col" data-slug="{{ s.slug }}">
      <div class="summary-col__numero">0{{ s.nivel }}</div>
      <div class="summary-col__icon" aria-hidden="true">{{ s.icon }}</div>
      <p class="summary-col__kicker">Nivel {{ s.nivel }} · <span data-i18n-en="{{ s.fase.en }}">{{ s.fase.es }}</span></p>
      <h3 class="summary-col__titulo" data-i18n-en="{{ s.nombre_corto.en }}">{{ s.nombre_corto.es }}</h3>
      <p class="summary-col__servicio" data-i18n-en="{{ s.titulo.en }}">{{ s.titulo.es }}</p>
      <p class="summary-col__beneficio" data-i18n-en="{{ s.beneficio.en }}">{{ s.beneficio.es }}</p>
      <p class="summary-col__resumen" data-i18n-en="{{ s.resumen.en }}">{{ s.resumen.es }}</p>
      <div class="summary-col__precio">
        <span class="precio-final"><span data-i18n="services.starting_at">Desde</span> USD {{ s.precio_usd }}</span>
        <span class="precio-plazo" data-i18n-en="{{ s.plazo.en }}">{{ s.plazo.es }}</span>
        <span class="precio-nota" data-i18n="services.price_note_short">*Precio referencial</span>
      </div>
      <p class="summary-col__cuidado-mention" data-i18n="services.cuidado_mention">+ Plan Cuidado mensual desde USD 48</p>
      <a class="summary-col__cta" href="#{{ s.slug }}" data-scroll data-i18n="services.see_more">Ver más →</a>
    </article>
    {% endfor %}

  </div>

  <!-- ─── Strip de Potenciadores — visible desde el top ─── -->
  <aside class="summary-potenciadores" aria-label="Potenciadores opcionales">
    <header class="summary-potenciadores__header">
      <p class="kicker" data-i18n="services.potenciadores_kicker_top">+ Potenciadores opcionales</p>
      <p class="caption" data-i18n="services.potenciadores_caption">Suman a cualquier estrategia. Haz clic en cada uno para ver detalle.</p>
    </header>
    <div class="potenciadores-chips">
      {% for a in site.data.servicios.addons %}
      <a href="#addon-{{ a.slug }}" data-scroll class="potenciador-chip">
        <span class="potenciador-chip__icon" aria-hidden="true">{{ a.icon }}</span>
        <span class="potenciador-chip__text">
          <strong data-i18n-en="{{ a.titulo.en }}">{{ a.titulo.es }}</strong>
          <small>{% if a.precio_es_referencial %}<span data-i18n="services.starting_at">Desde</span> {% endif %}USD <span{% if a.precio_usd.en %} data-i18n-en="{{ a.precio_usd.en }}"{% endif %}>{{ a.precio_usd.es | default: a.precio_usd }}</span></small>
        </span>
      </a>
      {% endfor %}
    </div>
  </aside>

  <!-- ─── Strip Plan Cuidado — recurrente, paralelo a Potenciadores ─── -->
  <aside class="summary-cuidado" aria-label="Plan Cuidado mensual">
    <header class="summary-cuidado__header">
      <p class="kicker" data-i18n="services.care_strip_kicker">+ Plan Cuidado mensual</p>
      <p class="caption" data-i18n="services.care_strip_caption">Hosting, soporte y mejoras continuas. Independiente del desarrollo.</p>
    </header>
    <div class="cuidado-chips">
      {% for p in site.data.servicios.plan_cuidado %}
      <a href="#cuidado-{{ p.slug }}" data-scroll class="cuidado-chip">
        <span class="cuidado-chip__nombre" data-i18n-en="{{ p.nombre.en }}">{{ p.nombre.es }}</span>
        <span class="cuidado-chip__precio">{% if p.precio_es_referencial %}Desde {% endif %}USD {{ p.precio_usd }}/mes</span>
        <span class="cuidado-chip__incluye" data-i18n-en="{{ p.incluye.en }}">{{ p.incluye.es }}</span>
      </a>
      {% endfor %}
    </div>
  </aside>

  <!-- ─── Strip Nuestro Método — timeline compacto de 4 pasos ─── -->
  <aside class="summary-metodo" aria-label="Nuestro método de trabajo">
    <header class="summary-metodo__header">
      <p class="kicker" data-i18n="services.method_strip_kicker">Nuestro método</p>
      <p class="caption" data-i18n="services.method_strip_caption">4 pasos. Cada uno con un entregable tangible que validas antes de continuar.</p>
    </header>
    <ol class="metodo-steps">
      <li class="metodo-step">
        <span class="metodo-step__num">01</span>
        <span class="metodo-step__label" data-i18n="services.method_step1_short">Conversamos</span>
      </li>
      <li class="metodo-step__arrow" aria-hidden="true">→</li>
      <li class="metodo-step">
        <span class="metodo-step__num">02</span>
        <span class="metodo-step__label" data-i18n="services.method_step2_short">Propuesta</span>
      </li>
      <li class="metodo-step__arrow" aria-hidden="true">→</li>
      <li class="metodo-step">
        <span class="metodo-step__num">03</span>
        <span class="metodo-step__label" data-i18n="services.method_step3_short">Construimos</span>
      </li>
      <li class="metodo-step__arrow" aria-hidden="true">→</li>
      <li class="metodo-step">
        <span class="metodo-step__num">04</span>
        <span class="metodo-step__label" data-i18n="services.method_step4_short">Lanzamos y cuidamos</span>
      </li>
    </ol>
    <a class="metodo-ver-detalle" href="#proceso" data-scroll data-i18n="services.method_see_detail">Ver detalle del proceso ↓</a>
  </aside>
</section>

<section class="strategies-intro">
  <p data-i18n="services.intro_body">
    Toda pyme atraviesa el mismo viaje digital — solo cambia en qué punto está hoy.
    Acá vas a encontrar <strong>tres niveles del Mapa de Madurez</strong> para construir
    capacidad real, y un <em>Quick Win</em> transversal que activa la conversión inmediata
    antes de invertir en lo grande.
  </p>
</section>

<!-- ═══════════════════════════ DIVISOR ═══════════════════════════ -->
<section class="strategies-divisor">
  <p class="kicker" data-i18n="services.detail_section">Detalle de cada estrategia</p>
</section>

<!-- ═══════════════════════════ QUICK WIN — detalle ═══════════════════════════ -->
<article class="strategy-card strategy-card--quickwin" id="{{ qw.slug }}">
  <div class="strategy-card__badge" data-i18n-en="{{ qw.badge.en }}">{{ qw.badge.es }}</div>

  <header class="strategy-card__header">
    <div class="strategy-card__icon" aria-hidden="true">{{ qw.icon }}</div>
    <div>
      <p class="strategy-card__kicker" data-i18n="services.detail_qw_kicker">Paso 0 · Activación inmediata</p>
      <h2 class="strategy-card__titulo"><span data-i18n-en="{{ qw.nombre_corto.en }}">{{ qw.nombre_corto.es }}</span> — <span data-i18n-en="{{ qw.titulo.en }}">{{ qw.titulo.es }}</span></h2>
      <p class="strategy-card__beneficio" data-i18n-en="{{ qw.beneficio.en }}">{{ qw.beneficio.es }}</p>
    </div>
  </header>

  <p class="strategy-card__resumen" data-i18n-en="{{ qw.detalle.en }}">{{ qw.detalle.es }}</p>

  <div class="strategy-card__incluye">
    <h3 data-i18n="services.whats_included">Qué incluye</h3>
    <ul>
      {% for item in qw.incluye %}<li data-i18n-en="{{ item.en }}">{{ item.es }}</li>{% endfor %}
    </ul>
  </div>

  <div class="strategy-card__footer">
    <div class="strategy-card__precio">
      <span class="precio-ref"><span data-i18n="services.market_ref_long">Referencia mercado</span>: USD {{ qw.precio_referencia_usd }}</span>
      <span class="precio-final"><span data-i18n="services.starting_at">Desde</span> USD {{ qw.precio_usd }}</span>
      <span class="precio-pen">≈ PEN {{ qw.precio_pen }}</span>
      <span class="precio-plazo" data-i18n-en="{{ qw.plazo.en }}">{{ qw.plazo.es }}</span>
      <span class="precio-nota" data-i18n="services.price_note_long">*Precio referencial. La cotización final se ajusta según alcance.</span>
    </div>
    <a class="btn btn--primary" href="/contact/?strategy={{ qw.cta_key }}" data-i18n-en="{{ qw.cta_label.en }}">{{ qw.cta_label.es }}</a>
  </div>

  <a class="strategy-card__back" href="#top" data-scroll data-i18n="services.back_to_summary">↑ Volver al resumen</a>
</article>

<!-- ═══════════════════════════ NIVELES — detalle ═══════════════════════════ -->
{% for s in site.data.servicios.niveles %}
<article class="strategy-card strategy-card--nivel" id="{{ s.slug }}">
  <div class="strategy-card__numero-grande">0{{ s.nivel }}</div>

  <header class="strategy-card__header strategy-card__header--simple">
    <p class="strategy-card__kicker">Nivel {{ s.nivel }} · <span data-i18n-en="{{ s.fase.en }}">{{ s.fase.es }}</span></p>
    <h2 class="strategy-card__titulo" data-i18n-en="{{ s.nombre_corto.en }}">{{ s.nombre_corto.es }}</h2>
    <p class="strategy-card__servicio" data-i18n-en="{{ s.titulo.en }}">{{ s.titulo.es }}</p>
    <p class="strategy-card__beneficio" data-i18n-en="{{ s.beneficio.en }}">{{ s.beneficio.es }}</p>
  </header>

  <p class="strategy-card__resumen" data-i18n-en="{{ s.detalle.en }}">{{ s.detalle.es }}</p>

  <div class="strategy-card__incluye">
    <h3 data-i18n="services.whats_included">Qué incluye</h3>
    <ul>
      {% for item in s.incluye %}<li data-i18n-en="{{ item.en }}">{{ item.es }}</li>{% endfor %}
    </ul>
  </div>

  <div class="strategy-card__footer">
    <div class="strategy-card__precio">
      <span class="precio-ref"><span data-i18n="services.market_ref">Mercado</span>: USD {{ s.precio_referencia_usd }}</span>
      <span class="precio-final"><span data-i18n="services.starting_at">Desde</span> USD {{ s.precio_usd }}</span>
      <span class="precio-pen">≈ PEN {{ s.precio_pen }}</span>
      <span class="precio-plazo" data-i18n-en="{{ s.plazo.en }}">{{ s.plazo.es }}</span>
      <span class="precio-nota" data-i18n="services.price_note_long">*Precio referencial. La cotización final se ajusta según alcance.</span>
    </div>
    <a class="btn btn--outline" href="/contact/?strategy={{ s.cta_key }}" data-i18n-en="{{ s.cta_label.en }}">{{ s.cta_label.es }}</a>
  </div>

  <a class="strategy-card__back" href="#top" data-scroll data-i18n="services.back_to_summary">↑ Volver al resumen</a>
</article>
{% endfor %}

<!-- ═══════════════════════════ POTENCIADORES (detalle) ═══════════════════════════ -->
<section class="strategies-addons" id="potenciadores">
  <header class="strategies-addons__header">
    <p class="kicker" data-i18n="services.addons_kicker">Potenciadores opcionales</p>
    <h2 data-i18n="services.addons_title">Servicios que se suman a cualquier estrategia</h2>
    <p data-i18n="services.addons_body">
      Marketing experiencial, integraciones puntuales y capacitación. Se cotizan aparte
      y se agregan al Quick Win o a cualquier nivel del Mapa.
    </p>
  </header>

  <div class="addons-grid">
    {% for a in site.data.servicios.addons %}
    <article class="addon-card" id="addon-{{ a.slug }}">
      <div class="addon-card__icon" aria-hidden="true">{{ a.icon }}</div>
      <p class="addon-card__kicker" data-i18n-en="{{ a.kicker.en }}">{{ a.kicker.es }}</p>
      <h3 class="addon-card__titulo" data-i18n-en="{{ a.titulo.en }}">{{ a.titulo.es }}</h3>
      <p class="addon-card__resumen" data-i18n-en="{{ a.resumen.en }}">{{ a.resumen.es }}</p>
      {% if a.detalle %}<p class="addon-card__detalle" data-i18n-en="{{ a.detalle.en }}">{{ a.detalle.es }}</p>{% endif %}
      <dl class="addon-card__meta">
        <div>
          <dt data-i18n="services.addons_investment">Inversión</dt>
          <dd>{% if a.precio_es_referencial %}<span data-i18n="services.starting_at">Desde</span> {% endif %}USD <span{% if a.precio_usd.en %} data-i18n-en="{{ a.precio_usd.en }}"{% endif %}>{{ a.precio_usd.es | default: a.precio_usd }}</span><br><span class="pen-small">≈ PEN <span{% if a.precio_pen.en %} data-i18n-en="{{ a.precio_pen.en }}"{% endif %}>{{ a.precio_pen.es | default: a.precio_pen }}</span></span>{% if a.precio_es_referencial %}<br><span class="precio-nota precio-nota--mini" data-i18n="services.reference_short">*Referencial</span>{% endif %}</dd>
        </div>
        <div>
          <dt data-i18n="services.addons_term">Plazo</dt>
          <dd data-i18n-en="{{ a.plazo.en }}">{{ a.plazo.es }}</dd>
        </div>
      </dl>
    </article>
    {% endfor %}
  </div>
</section>

<!-- ═══════════════════════════ PLAN CUIDADO ═══════════════════════════ -->
<section class="strategies-cuidado" id="plan-cuidado">
  <header class="strategies-cuidado__header">
    <p class="kicker" data-i18n="services.care_kicker">Plan Cuidado mensual</p>
    <h2 data-i18n="services.care_title">Hosting, soporte y mejoras continuas</h2>
    <p data-i18n="services.care_body">Todo proyecto en producción necesita mantenimiento. El Plan Cuidado es la operación recurrente — independiente del costo de desarrollo.</p>
  </header>

  <div class="cuidado-grid">
    {% for p in site.data.servicios.plan_cuidado %}
    <article class="cuidado-card" id="cuidado-{{ p.slug }}">
      <h3 data-i18n-en="{{ p.nombre.en }}">{{ p.nombre.es }}</h3>
      <p data-i18n-en="{{ p.incluye.en }}">{{ p.incluye.es }}</p>
      <div class="cuidado-card__precio">
        <span class="precio-final">{% if p.precio_es_referencial %}<span data-i18n="services.starting_at">Desde</span> {% endif %}USD {{ p.precio_usd }}/mes</span>
        <span class="precio-pen">≈ PEN {{ p.precio_pen }}</span>
        {% if p.precio_es_referencial %}<span class="precio-nota precio-nota--cuidado" data-i18n="services.reference_short">*Referencial</span>{% endif %}
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<!-- ═══════════════════════════ COMO TRABAJAMOS ═══════════════════════════ -->
<section class="strategies-proceso" id="proceso">
  <h2 data-i18n="services.process_title">¿Cómo trabajamos juntos?</h2>
  <ol>
    <li><strong data-i18n="services.process_step1">Conversamos sin compromiso.</strong> <span data-i18n="services.process_step1_body">Una llamada de 30 minutos para entender qué problema quieres resolver. Te muestro demos en vivo de proyectos funcionando.</span></li>
    <li><strong data-i18n="services.process_step2">Te paso una propuesta clara.</strong> <span data-i18n="services.process_step2_body">Alcance, hitos, tiempos y costo en un solo documento. Si te encaja, firmamos. Si no, tan amigos.</span></li>
    <li><strong data-i18n="services.process_step3">Construimos juntos.</strong> <span data-i18n="services.process_step3_body">Cada semana hay una entrega tangible que puedes revisar y aprobar. Staging durante todo el desarrollo; producción al pago del último hito.</span></li>
    <li><strong data-i18n="services.process_step4">Lanzamos y cuidamos.</strong> <span data-i18n="services.process_step4_body">Una vez en vivo, el Plan Cuidado mantiene el sistema funcionando, con soporte directo conmigo.</span></li>
  </ol>
</section>

<section class="strategies-cta-final">
  <h2 data-i18n="services.final_title">¿No sabes por dónde empezar?</h2>
  <p data-i18n="services.final_body">Conversemos 30 minutos. Te ayudo a ubicar tu negocio en el mapa y te muestro qué retorno concreto esperar de cada paso.</p>
  <a href="/contact/" class="btn btn--primary btn--lg" data-i18n="services.final_cta">Agendar conversación</a>
</section>

<style>
  /* ═══ ANCHO ALINEADO CON EL HEADER PARA /services/ ═══
     El layout `page` envuelve todo en .container.container-narrow (max 720px).
     Para pricing usamos el mismo ancho que el home y el header (1080px = $container-max)
     para que el contenido se alinee visualmente con el logo y la nav. */
  .page-header > .container-narrow,
  .section > .container-narrow {
    max-width: 1080px;
  }

  /* ═══ ANCLA INVISIBLE para "volver al resumen" ═══ */
  #top { position: absolute; top: 0; }
  /* Smooth scroll local a esta página */
  html { scroll-behavior: smooth; }
  /* Offset para anclas considerando header sticky */
  .strategy-card[id], .summary[id], section[id] { scroll-margin-top: 90px; }

  /* ═══ STRIP DE POTENCIADORES (top de la página, antes del detalle) ═══ */
  .summary-potenciadores {
    margin-top: 1.5rem;
    padding: 1.5rem;
    background: #f5f5f7;
    border: 1px solid #e0e0e0;
  }
  .summary-potenciadores__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .summary-potenciadores .kicker {
    font-size: 0.78rem;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 800;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }
  .summary-potenciadores .caption {
    font-size: 0.82rem;
    color: #606060;
    margin: 0;
  }
  .potenciadores-chips {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 0.7rem;
  }
  .potenciador-chip {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    padding: 0.7rem 0.85rem;
    text-decoration: none;
    color: #000;
    transition: border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
  }
  .potenciador-chip:hover {
    border-color: #000;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(0,0,0,0.07);
  }
  .potenciador-chip__icon {
    font-size: 1.3rem;
    line-height: 1;
    flex-shrink: 0;
  }
  .potenciador-chip__text {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    line-height: 1.2;
  }
  .potenciador-chip__text strong {
    font-size: 0.82rem;
    font-weight: 700;
    color: #000;
    font-family: 'Montserrat', sans-serif;
  }
  .potenciador-chip__text small {
    font-size: 0.72rem;
    color: #606060;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.02em;
  }

  /* ═══ STRIP PLAN CUIDADO (resumen del top) ═══ */
  .summary-cuidado {
    margin-top: 1rem;
    padding: 1.5rem;
    background: #000;
    color: #fff;
  }
  .summary-cuidado__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .summary-cuidado .kicker {
    font-size: 0.78rem;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 800;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }
  .summary-cuidado .caption {
    font-size: 0.82rem;
    color: #d2d2d7;
    margin: 0;
  }
  .cuidado-chips {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.7rem;
  }
  .cuidado-chip {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.18);
    padding: 0.9rem 1rem;
    text-decoration: none;
    color: #fff;
    transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
  }
  .cuidado-chip:hover {
    background: rgba(255,255,255,0.12);
    border-color: #fff;
    transform: translateY(-1px);
  }
  .cuidado-chip__nombre {
    font-size: 0.78rem;
    font-weight: 800;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-family: 'Montserrat', sans-serif;
  }
  .cuidado-chip__precio {
    font-size: 1rem;
    font-weight: 800;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: -0.01em;
  }
  .cuidado-chip__incluye {
    font-size: 0.74rem;
    color: #d2d2d7;
    line-height: 1.4;
  }

  /* ═══ STRIP NUESTRO MÉTODO (timeline horizontal compacto) ═══ */
  .summary-metodo {
    margin-top: 1rem;
    padding: 1.5rem;
    background: #f5f5f7;
    border: 1px solid #e0e0e0;
  }
  .summary-metodo__header {
    text-align: center;
    margin-bottom: 1.2rem;
  }
  .summary-metodo .kicker {
    font-size: 0.78rem;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 800;
    margin: 0 0 0.3rem;
    font-family: 'Montserrat', sans-serif;
  }
  .summary-metodo .caption {
    font-size: 0.82rem;
    color: #606060;
    margin: 0;
  }
  .metodo-steps {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem;
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
    align-items: center;
    gap: 0;
  }
  .metodo-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.3rem;
    padding: 0.5rem;
  }
  .metodo-step__num {
    font-size: 0.7rem;
    font-weight: 800;
    color: #d2d2d7;
    letter-spacing: 0.2em;
    font-family: 'Montserrat', sans-serif;
  }
  .metodo-step__label {
    font-size: 0.88rem;
    font-weight: 700;
    color: #000;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: -0.01em;
  }
  .metodo-step__arrow {
    color: #606060;
    font-size: 1.2rem;
    padding: 0 0.4rem;
  }
  .metodo-ver-detalle {
    display: block;
    text-align: center;
    font-size: 0.78rem;
    color: #606060;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    transition: color 160ms ease;
  }
  .metodo-ver-detalle:hover { color: #000; }

  /* Mention de Plan Cuidado en cards de nivel */
  .summary-col__cuidado-mention {
    font-size: 0.74rem;
    color: #606060;
    font-style: italic;
    margin: 0 0 0.8rem;
    padding-top: 0.5rem;
    border-top: 1px dashed #e0e0e0;
    text-align: center;
  }

  /* Responsive: strips en mobile */
  @media (max-width: 700px) {
    .cuidado-chips { grid-template-columns: 1fr; }
    .metodo-steps {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
    .metodo-step__arrow {
      padding: 0.3rem 0;
      transform: rotate(90deg);
    }
  }

  /* ═══════════════════════ INTRO ═══════════════════════ */
  .strategies-intro {
    max-width: 44em;
    margin: 0 auto 2.5rem;
    text-align: center;
  }
  .strategies-intro p { font-size: 1.05rem; line-height: 1.7; color: #424245; }

  /* ═══════════════════════ RESUMEN: 3 COLUMNAS + FILA QW ═══════════════════════ */
  .summary { margin: 0 0 4rem; }

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin-top: 0;
  }
  .summary-grid--four {
    grid-template-columns: repeat(4, 1fr);
  }

  .summary-col {
    background: #ffffff;
    border: 1px solid #d2d2d7;
    padding: 1.8rem 1.5rem;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
  }
  .summary-col:hover {
    border-color: #000;
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0,0,0,0.06);
  }

  /* ─── Columna Quick Win (entry tier, capa "free" estilo SaaS) ─── */
  .summary-col--quickwin {
    background: linear-gradient(165deg, #000 0%, #243038 100%);
    border-color: #000;
    color: #fff;
  }
  .summary-col--quickwin:hover {
    border-color: #000;
    box-shadow: 0 8px 28px rgba(0,0,0,0.25);
  }
  .summary-col__badge {
    position: absolute;
    top: -12px;
    left: 1.2rem;
    background: #fff;
    color: #000;
    padding: 4px 12px;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
  }
  .summary-col--quickwin .summary-col__numero {
    color: rgba(255,255,255,0.25);
  }
  .summary-col--quickwin .summary-col__kicker {
    color: #d2d2d7;
  }
  .summary-col--quickwin .summary-col__titulo {
    color: #fff;
  }
  .summary-col--quickwin .summary-col__servicio {
    color: #d2d2d7;
  }
  .summary-col--quickwin .summary-col__beneficio {
    color: #fff;
    border-bottom-color: rgba(255,255,255,0.18);
  }
  .summary-col--quickwin .summary-col__resumen {
    color: #d2d2d7;
  }
  .summary-col--quickwin .summary-col__precio {
    border-top-color: rgba(255,255,255,0.18);
  }
  /* Forzar colores claros en el bloque de precio de la columna oscura.
     Override fuerte porque .summary-col__precio .precio-final (negro) está
     declarado más abajo en el archivo y ganaría por orden de cascada. */
  .summary-col--quickwin .summary-col__precio .precio-final,
  .summary-col--quickwin .precio-final {
    color: #fff !important;
  }
  .summary-col--quickwin .summary-col__precio .precio-plazo,
  .summary-col--quickwin .precio-plazo {
    color: #d2d2d7 !important;
  }
  .summary-col--quickwin .summary-col__precio .precio-nota,
  .summary-col--quickwin .precio-nota {
    color: #d2d2d7 !important;
  }
  .summary-col__cta--inverted {
    background: #fff !important;
    color: #000 !important;
  }
  .summary-col__cta--inverted:hover {
    background: #d2d2d7 !important;
    color: #000 !important;
  }

  .summary-col__numero {
    font-size: 0.85rem;
    font-weight: 800;
    color: #d2d2d7;
    letter-spacing: 0.15em;
    margin-bottom: 0.6rem;
    font-family: 'Montserrat', sans-serif;
  }

  .summary-col__icon {
    font-size: 2.2rem;
    line-height: 1;
    margin-bottom: 0.8rem;
  }

  .summary-col__kicker {
    font-size: 0.7rem;
    color: #606060;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 600;
    margin: 0 0 0.4rem;
    font-family: 'Montserrat', sans-serif;
  }

  .summary-col__titulo {
    font-size: 1.5rem;
    font-weight: 800;
    color: #000;
    margin: 0 0 0.3rem;
    line-height: 1.1;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: -0.01em;
  }

  .summary-col__servicio {
    font-size: 0.85rem;
    color: #606060;
    margin: 0 0 0.7rem;
  }

  .summary-col__beneficio {
    font-size: 1.02rem;
    font-weight: 600;
    color: #000;
    margin: 0 0 0.9rem;
    line-height: 1.35;
    padding-bottom: 0.9rem;
    border-bottom: 1px solid #f5f5f7;
  }

  .summary-col__resumen {
    font-size: 0.9rem;
    line-height: 1.55;
    color: #424245;
    margin: 0 0 1.2rem;
    flex: 1;
  }

  .summary-col__precio {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin-bottom: 1rem;
    padding-top: 0.9rem;
    border-top: 1px solid #f5f5f7;
  }
  .summary-col__precio .precio-final {
    font-size: 1.1rem;
    font-weight: 800;
    color: #000;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: -0.01em;
  }
  .summary-col__precio .precio-plazo {
    font-size: 0.72rem;
    color: #606060;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
  }

  .summary-col__cta {
    display: inline-block;
    background: #000;
    color: #fff;
    padding: 0.7rem 1rem;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    text-decoration: none;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    transition: background 200ms ease;
  }
  .summary-col__cta:hover { background: #243038; color: #fff; }

  /* ─── FILA TRANSVERSAL QUICK WIN ─── */
  .summary-row {
    background: linear-gradient(90deg, #000 0%, #243038 100%);
    color: #fff;
    padding: 1.6rem 1.8rem;
    position: relative;
    transition: transform 200ms ease, box-shadow 200ms ease;
  }
  .summary-row:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(0,0,0,0.18);
  }

  .summary-row__badge {
    position: absolute;
    top: -12px;
    left: 1.8rem;
    background: #fff;
    color: #000;
    padding: 4px 12px;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
  }

  .summary-row__body {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    gap: 1.5rem;
    align-items: center;
  }

  .summary-row__icon {
    font-size: 2.6rem;
    line-height: 1;
  }

  .summary-row__kicker {
    font-size: 0.7rem;
    color: #d2d2d7;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 600;
    margin: 0 0 0.25rem;
    font-family: 'Montserrat', sans-serif;
  }

  .summary-row__titulo {
    font-size: 1.35rem;
    font-weight: 800;
    color: #fff;
    margin: 0 0 0.3rem;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: -0.01em;
  }

  .summary-row__beneficio {
    font-size: 0.95rem;
    color: #d2d2d7;
    margin: 0;
    line-height: 1.45;
  }

  .summary-row__precio {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    text-align: right;
  }
  .summary-row__precio .precio-final {
    font-size: 1.15rem;
    font-weight: 800;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: -0.01em;
  }
  .summary-row__precio .precio-plazo {
    font-size: 0.72rem;
    color: #d2d2d7;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
  }

  .summary-row__cta {
    background: #fff;
    color: #000;
    padding: 0.85rem 1.4rem;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    transition: background 200ms ease;
    white-space: nowrap;
  }
  .summary-row__cta:hover { background: #d2d2d7; color: #000; }

  /* ═══════════════════════ DIVISOR ENTRE RESUMEN Y DETALLES ═══════════════════════ */
  .strategies-divisor {
    text-align: center;
    margin: 3rem 0 2.5rem;
    padding-top: 2.5rem;
    border-top: 1px solid #d2d2d7;
  }
  .strategies-divisor .kicker {
    font-size: 0.78rem;
    color: #606060;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: 600;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }

  /* ═══════════════════════ STRATEGY CARD (detalle expandido) ═══════════════════════ */
  .strategy-card {
    background: #ffffff;
    border: 1px solid #d2d2d7;
    padding: 2.2rem;
    margin-bottom: 2.5rem;
    position: relative;
  }

  .strategy-card--quickwin {
    border: 2px solid #000;
    background: linear-gradient(180deg, #ffffff 0%, #f5f5f7 100%);
  }

  .strategy-card__badge {
    position: absolute;
    top: -14px;
    left: 2rem;
    background: #000;
    color: #fff;
    padding: 5px 14px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
  }

  .strategy-card__numero-grande {
    font-size: 4rem;
    font-weight: 800;
    color: #f5f5f7;
    line-height: 1;
    position: absolute;
    top: 1.5rem;
    right: 2rem;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: -0.04em;
    z-index: 0;
  }

  .strategy-card__header {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
  }
  .strategy-card__header--simple { display: block; }

  .strategy-card__icon {
    font-size: 2.5rem;
    line-height: 1;
    flex-shrink: 0;
  }

  .strategy-card__kicker {
    font-size: 0.72rem;
    color: #606060;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 600;
    margin: 0 0 0.4rem;
    font-family: 'Montserrat', sans-serif;
  }

  .strategy-card__titulo {
    font-size: 1.7rem;
    font-weight: 800;
    color: #000;
    margin: 0 0 0.3rem;
    line-height: 1.1;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: -0.02em;
  }
  .strategy-card--quickwin .strategy-card__titulo { font-size: 1.9rem; }

  .strategy-card__servicio {
    font-size: 0.92rem;
    color: #606060;
    margin: 0 0 0.5rem;
  }

  .strategy-card__beneficio {
    font-size: 1.15rem;
    font-weight: 500;
    color: #000;
    margin: 0;
    line-height: 1.4;
  }

  .strategy-card__resumen {
    color: #424245;
    font-size: 0.95rem;
    line-height: 1.7;
    margin: 1.5rem 0;
    padding-top: 1.25rem;
    border-top: 1px solid #d2d2d7;
    position: relative;
    z-index: 1;
  }

  .strategy-card__incluye {
    position: relative;
    z-index: 1;
  }
  .strategy-card__incluye h3 {
    font-size: 0.78rem;
    color: #606060;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 600;
    margin: 0 0 0.8rem;
    font-family: 'Montserrat', sans-serif;
  }
  .strategy-card__incluye ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem;
  }
  .strategy-card__incluye li {
    padding: 0.4rem 0 0.4rem 1.4rem;
    position: relative;
    font-size: 0.93rem;
    line-height: 1.5;
    color: #1d1d1f;
  }
  .strategy-card__incluye li::before {
    content: "■";
    color: #000;
    position: absolute;
    left: 0;
    top: 0.55rem;
    font-size: 0.6rem;
  }

  .strategy-card__footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #d2d2d7;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }

  .strategy-card__precio {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .precio-ref {
    font-size: 0.78rem;
    color: #606060;
    text-decoration: line-through;
    font-family: 'Montserrat', sans-serif;
  }
  .precio-final {
    font-size: 1.5rem;
    color: #000;
    font-weight: 800;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: -0.02em;
  }
  .precio-pen {
    font-size: 0.85rem;
    color: #606060;
    font-family: 'Montserrat', sans-serif;
  }
  .precio-plazo {
    font-size: 0.78rem;
    color: #243038;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 600;
    margin-top: 0.4rem;
    font-family: 'Montserrat', sans-serif;
  }

  .precio-nota {
    font-size: 0.72rem;
    color: #606060;
    font-style: italic;
    margin-top: 0.5rem;
    line-height: 1.4;
    display: block;
  }
  .precio-nota--mini { font-size: 0.65rem; margin-top: 0.3rem; }
  .precio-nota--cuidado { color: #d2d2d7; font-size: 0.7rem; margin-top: 0.3rem; }
  .summary-row__precio .precio-nota { color: #d2d2d7; }

  .strategy-card__back {
    display: inline-block;
    margin-top: 1.5rem;
    font-size: 0.78rem;
    color: #606060;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    transition: color 200ms ease;
  }
  .strategy-card__back:hover { color: #000; }

  /* ═══════════════════════ ADD-ONS ═══════════════════════ */
  .strategies-addons {
    margin: 4rem 0;
    padding: 3rem 0;
    border-top: 1px solid #d2d2d7;
    border-bottom: 1px solid #d2d2d7;
  }
  .strategies-addons__header {
    text-align: center;
    max-width: 40em;
    margin: 0 auto 2.5rem;
  }
  .strategies-addons__header .kicker {
    font-size: 0.78rem;
    color: #606060;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: 600;
    margin: 0 0 0.6rem;
    font-family: 'Montserrat', sans-serif;
  }
  .strategies-addons__header h2 {
    font-size: 1.6rem;
    font-weight: 800;
    margin: 0 0 0.8rem;
    color: #000;
    font-family: 'Montserrat', sans-serif;
  }
  .strategies-addons__header p { color: #424245; font-size: 0.95rem; line-height: 1.6; margin: 0; }

  .addons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
  }
  .addon-card {
    background: #ffffff;
    border: 1px solid #d2d2d7;
    padding: 1.75rem;
    transition: border-color 200ms ease;
  }
  .addon-card:hover { border-color: #000; }
  .addon-card__icon { font-size: 2rem; margin-bottom: 0.75rem; }
  .addon-card__kicker {
    font-size: 0.72rem;
    color: #606060;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 600;
    margin: 0 0 0.4rem;
    font-family: 'Montserrat', sans-serif;
  }
  .addon-card__titulo {
    font-size: 1.15rem;
    font-weight: 800;
    margin: 0 0 0.6rem;
    color: #000;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: -0.01em;
  }
  .addon-card__resumen { color: #424245; font-size: 0.9rem; line-height: 1.55; margin: 0 0 0.75rem; }
  .addon-card__detalle { color: #606060; font-size: 0.85rem; line-height: 1.55; margin: 0 0 1rem; }
  .addon-card__meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1rem 0 0;
    padding-top: 1rem;
    border-top: 1px solid #f5f5f7;
  }
  .addon-card__meta dt {
    font-size: 0.7rem;
    color: #606060;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 600;
    margin-bottom: 0.25rem;
    font-family: 'Montserrat', sans-serif;
  }
  .addon-card__meta dd {
    font-size: 0.92rem;
    color: #000;
    font-weight: 700;
    margin: 0;
    line-height: 1.3;
    font-family: 'Montserrat', sans-serif;
  }
  .addon-card__meta .pen-small { font-size: 0.78rem; color: #606060; font-weight: 500; }

  /* ═══════════════════════ PLAN CUIDADO ═══════════════════════ */
  .strategies-cuidado { margin: 3rem 0; }
  .strategies-cuidado__header {
    text-align: center;
    max-width: 40em;
    margin: 0 auto 2.5rem;
  }
  .strategies-cuidado__header .kicker {
    font-size: 0.78rem;
    color: #606060;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: 600;
    margin: 0 0 0.6rem;
    font-family: 'Montserrat', sans-serif;
  }
  .strategies-cuidado__header h2 {
    font-size: 1.6rem;
    font-weight: 800;
    margin: 0 0 0.8rem;
    color: #000;
    font-family: 'Montserrat', sans-serif;
  }
  .strategies-cuidado__header p { color: #424245; font-size: 0.95rem; line-height: 1.6; margin: 0; }

  .cuidado-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }
  .cuidado-card {
    background: #000;
    color: #fff;
    padding: 1.75rem;
    text-align: center;
  }
  .cuidado-card h3 {
    font-size: 1.05rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #fff;
    margin: 0 0 0.6rem;
    font-family: 'Montserrat', sans-serif;
  }
  .cuidado-card p { color: #d2d2d7; font-size: 0.88rem; line-height: 1.55; margin: 0 0 1.2rem; min-height: 3.5em; }
  .cuidado-card .precio-final { color: #fff; font-size: 1.2rem; display: block; }
  .cuidado-card .precio-pen { color: #d2d2d7; font-size: 0.82rem; }

  /* ═══════════════════════ PROCESO + CTA FINAL ═══════════════════════ */
  .strategies-proceso {
    margin: 4rem 0 3rem;
    padding: 2.5rem;
    background: #f5f5f7;
  }
  .strategies-proceso h2 {
    font-size: 1.5rem;
    margin: 0 0 1.2rem;
    font-weight: 800;
    color: #000;
    font-family: 'Montserrat', sans-serif;
  }
  .strategies-proceso ol { line-height: 1.8; padding-left: 1.2rem; margin: 0; color: #1d1d1f; }
  .strategies-proceso li { margin-bottom: 0.6rem; font-size: 0.95rem; }

  .strategies-cta-final {
    text-align: center;
    margin: 3rem 0 2rem;
    padding: 3rem 2rem;
    background: #000;
    color: #fff;
  }
  .strategies-cta-final h2 {
    font-size: 1.8rem;
    font-weight: 800;
    margin: 0 0 0.8rem;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
  }
  .strategies-cta-final p { color: #d2d2d7; font-size: 1rem; margin: 0 0 1.8rem; line-height: 1.6; }

  /* ═══════════════════════ RESPONSIVE ═══════════════════════ */
  @media (max-width: 1100px) {
    .summary-grid--four { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 700px) {
    .summary-grid,
    .summary-grid--four { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .strategy-card { padding: 1.5rem; }
    .strategy-card__header { flex-direction: column; gap: 1rem; }
    .strategy-card--quickwin .strategy-card__titulo { font-size: 1.5rem; }
    .strategy-card__footer { flex-direction: column; align-items: stretch; }
    .strategy-card__footer .btn { width: 100%; text-align: center; }
    .strategy-card__numero-grande { font-size: 3rem; top: 1rem; right: 1.2rem; }
    .strategies-proceso { padding: 1.5rem; }
    .strategies-cta-final { padding: 2rem 1.5rem; }
  }
</style>

<!-- ═══════════════════════════ ANCLA TOP (invisible) ═══════════════════════════ -->
<span id="top" aria-hidden="true"></span>

<script>
  // Smooth scroll + foco visual breve a la card destino
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-scroll]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var hash = this.getAttribute('href');
        if (!hash || hash.charAt(0) !== '#') return;
        var target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // micro-highlight
        target.style.transition = 'box-shadow 600ms ease';
        target.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.12)';
        setTimeout(function () { target.style.boxShadow = ''; }, 1200);
        // actualizar URL sin saltar
        if (history && history.pushState) history.pushState(null, '', hash);
      });
    });
  });
</script>
