# Plan 022 — cómo

- **Textos:** casi todo vive en `_data/i18n.yml` (claves `hero.*`, `nav.*`, `home.*`, `services.*`, `footer.*`,
  `card.*`). El HTML lleva el fallback ES dentro del elemento con `data-i18n="<clave>"`: **cambiar también el fallback**
  en `_layouts/home.html`, `services.md`, `_includes/*` para que el HTML servido (sin JS) diga lo mismo que i18n ES.
- **H1:** `index.html` front matter `hero_title`/`hero_subtitle`, default en `_layouts/home.html` (front matter del
  layout) y `<p class="hero__tagline" data-i18n="hero.subtitle">`. Nueva clave `hero.subtitle` en i18n.
- **Precios:** patrón `<span data-i18n-en="From USD {{ s.precio_usd }}"><span>Desde</span> S/ {{ s.precio_pen }}</span>` —
  revisar cómo `assets/js` aplica `data-i18n-en` (reemplaza `textContent`: el span hijo "Desde" se pierde en EN, por
  eso el valor EN incluye "From"). Si el JS no soporta anidado, usar dos spans hermanos (`.lang`-style) siguiendo el
  patrón ya usado en `services.md`. Comprobar con el toggle en el navegador headless.
- **Servicios:** editar solo los campos nombrados en `_data/servicios.yml`; preservar formato YAML (`>-`).
- **Casos:** `_proyectos/{hanna,llerena,donaire}.md` — `resumen`, `resumen_en` y la frase "Se actualizará…" (y su
  equivalente EN si existe en el cuerpo).
- **Casos h2:** en `_layouts/home.html` (`data-i18n-en`).
- **Config:** `_config.yml` `tagline`/`description`; `index.html` `description`.
- **Build:** `docker run --rm -v "$PWD":/srv -v ej-gems:/usr/local/bundle -w /srv ruby:3.3.6 bash -c "bundle install -q && bundle exec jekyll build -q -d /srv/.oc-site"`
  (si el Gemfile es de github-pages, puede tardar la primera vez). Servir `.oc-site` con `python3 -m http.server`,
  medir con Playwright (node + playwright-core, `executablePath:'/usr/bin/chromium'`, `serviceWorkers:'block'`), matar
  por PID, borrar `.oc-site`.
- **Detector:** `/home/elias/Claude/Projects/EliasJurado/.claude/skills/impeccable/scripts/impeccable detect --json`
  sobre los archivos tocados; comparar con el estado previo (correrlo antes de editar y guardar el conteo).
- **Git:** commits con la identidad global de Elías (ridimdev@gmail.com) en rama `development`; **no** hacer push (lo hace
  el orquestador).
