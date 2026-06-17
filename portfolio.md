---
title: Portafolio
permalink: /portfolio/
kicker: Casos
subtitle: Selección de proyectos en los que trabajo o trabajé. Más casos próximamente.
i18n_prefix: portfolio
---

{% if site.proyectos.size > 0 %}
<div class="grid grid--2">
  {%- for p in site.proyectos -%}
    <article class="card">
      <h3 class="card__title"{% if p.title_en %} data-i18n-en="{{ p.title_en }}"{% endif %}>{{ p.title }}</h3>
      {%- if p.cliente -%}<p class="text-sm portfolio-card__meta">{{ p.cliente }} · <span data-i18n-en="{{ p.industria_en | default: p.industria }}">{{ p.industria }}</span></p>{%- endif -%}
      <p class="card__body"{% if p.resumen_en %} data-i18n-en="{{ p.resumen_en }}"{% endif %}>{{ p.resumen }}</p>
      <p class="portfolio-card__actions">
        <a href="{{ p.url }}" class="portfolio-card__link" data-i18n-en="See case →">Ver caso →</a>
        {%- if p.url_vivo -%}
          <a href="{{ p.url_vivo }}" target="_blank" rel="noopener" class="portfolio-card__link portfolio-card__link--alt" data-i18n-en="See live site ↗">Ver sitio en vivo ↗</a>
        {%- endif -%}
      </p>
    </article>
  {%- endfor -%}
</div>
{% else %}
<p class="text-muted" data-i18n-en="Coming soon. I'm preparing the first cases to share.">Próximamente. Estoy preparando los primeros casos para mostrar.</p>
{% endif %}

---

<p data-i18n-en-html="Need specific references from your industry? <a href='/contact/'>Tell me what you're looking for</a> and I'll share the closest cases.">¿Necesitas referencias específicas de tu industria? <a href="/contact/">Cuéntame qué buscas</a> y te paso los casos más cercanos a lo que necesitas.</p>

<style>
  .portfolio-card__meta {
    margin-bottom: 0.5rem;
  }

  .portfolio-card__actions {
    margin-top: 1.25rem;
    display: flex;
    gap: 1.25rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .portfolio-card__link {
    color: #000;
    font-size: 0.9rem;
    text-decoration: none;
  }

  .portfolio-card__link--alt {
    color: #243038;
  }

  @media (max-width: 767px) {
    .portfolio-card__actions {
      justify-content: center;
      text-align: center;
      gap: 0.8rem;
    }
  }
</style>
