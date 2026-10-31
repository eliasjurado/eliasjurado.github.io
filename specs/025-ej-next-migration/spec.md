# Spec 025 — Migración de eliasjurado.com de Jekyll a Next.js

**Fecha:** 2026-10-31 · **Rama:** `feat/next-migration` (desde `development`) · **Receta:** `05-operacion/stack-frontend.md` §"Migrar un sitio Jekyll al estándar".

## Qué y por qué

El sitio personal sigue en Jekyll (Liquid + SCSS + JS vanilla) mientras el estándar de Elías para todo sitio nuevo o existente es Next.js (App Router, TS) + Tailwind v4 + shadcn/ui. Dos sistemas vivos en el repo es costo sin retorno: se migra con **paridad total** (mismo diseño, mismos textos, mismas URLs) y las mejoras vienen después, no dentro de este cambio.

## Alcance (inventario)

| URL (trailingSlash) | Origen Jekyll | Notas |
|---|---|---|
| `/` | `index.html` + `_layouts/home.html` | Hero con jaguar, tira de clientes, Mapa de Madurez interactivo (spec 017), casos destacados, cierre. `og_title` propio. |
| `/services/` | `services.md` | Resumen 4 columnas, strips (potenciadores, cuidado, método), detalle por nivel, add-ons, Plan Cuidado, proceso, CTA. Datos de `servicios.yml`. |
| `/portfolio/` | `portfolio.md` | Tarjetas de la colección `_proyectos`. |
| `/portfolio/{donaire,hanna,llerena}/` | `_proyectos/*.md` | Layout `proyecto`: captura móvil, callout, cuerpo. |
| `/about/` | `about.md` | «Quién hay detrás» al final, antes del CTA. Bloques jaguar/RSE siguen ocultos (estaban en `{% comment %}`). |
| `/contact/` | `contact.md` | Formulario → `wa.me` con nombre/empresa. |
| `/card/` | `card.html` (`layout: null`) | Tarjeta digital, vCard, compartir. Fuera del sitemap. |
| `404.html` | (no existía; GitHub Pages servía el suyo) | Nueva, con la marca. |
| `/sitemap.xml`, `/robots.txt`, `/feed.xml` | plugins jekyll-sitemap / jekyll-feed | Equivalentes estáticos. |
| `/docs/`, `/src/` | carpetas del repo publicadas por Jekyll | Se conservan en `public/` (mismas URLs). |

Datos: `_data/{i18n,servicios,clientes}.yml` → `src/content/*.json`; `_config.yml` → `src/lib/site.ts`.

## Requisitos

1. **URLs idénticas** (`trailingSlash: true`), `CNAME` en el export, `favicon.ico`, `favicon-ej-32.png`, `icon-180.png`.
2. **i18n idéntico:** misma detección (localStorage `eliasjurado_lang` > `navigator.language` > ES), mismas claves, toggle ES | EN en header y menú móvil, eventos `lang_switch`.
3. **SEO:** `<title>` «Página — Elías Jurado», description por página, `og_title`/`og_description` de la home («¿Te escriben mucho y cierras poco? · Elías Jurado»), `og:image` 1200×630, twitter card, canonical, JSON-LD (WebSite en home y /about/, WebPage en el resto, BlogPosting en casos).
4. **Analítica:** contenedor GTM `GTM-MMX46W5Q` (script + noscript) y eventos `click_whatsapp`, `click_email`, `click_cta_services`, `lang_switch`.
5. **Marca:** logo del header = bloque «EJ» (Montserrat 800 blanco sobre #000, 40 px) + «ELÍAS JURADO» en versalitas; logo grande del hero = `jaguar-hero.jpg`. Tokens shadcn mapeados a la paleta oficial (#000, #243038, #606060, #fff; auxiliares #f5f5f7, #e0e0e0, #d2d2d7); radio 0. Montserrat 400/500/600/800 vía `next/font`.
6. **shadcn donde es natural:** `Button` (variantes de marca), `Card`, `Sheet` (menú móvil).
7. **Despliegue:** workflow de Pages en push a `development`; Jekyll se borra en el mismo cambio.

## Criterios de aceptación

- CA1 `npm run build` sin errores; `out/` contiene todas las URLs del inventario.
- CA2 Render 390 y 1440 de home, services, portfolio, about y contact con diferencia de píxeles < 1 % contra el sitio en vivo.
- CA3 Toggle de idioma, menú móvil, selector del Mapa de Madurez y formulario de contacto funcionan (prueba con Playwright), sin errores de hidratación en consola.
- CA4 Detector impeccable sin hits nuevos respecto al sitio Jekyll.
- CA5 Compuerta de seguridad: ningún secreto en el repo; `.env.local` sigue ignorado.

## Fuera de alcance (anotado como deuda)

- Reescribir `brand.css` en utilidades de Tailwind y pasar los `max-width` a `min-width`.
- PWA (manifest + sw): el sitio Jekyll no la tenía.
- `whatsapp-demo.html` / `whatsapp-cta.html`: existían como includes pero **ninguna página los incluía**; no se migran (siguen en el historial de git).
- Cambiar el origen de Pages a «GitHub Actions» (acción manual de Elías en Settings).

## Decisiones

- **Tailwind v4 sin preflight.** La hoja de marca está escrita sobre los valores por defecto del navegador (listas, formularios); con preflight la paridad se rompía (viñetas, alturas de inputs). Se importan solo `theme` y `utilities`.
- **Hoja de marca heredada (`brand.css`) en vez de reescribir a utilidades:** paridad primero; las mejoras después (receta, paso 3).
- **i18n por componente `L`, no por manipulación del DOM:** React es dueño del DOM; el HTML estático sale en ES (como Jekyll) y cambia al montar.
- **CSS por página scopeado** (`.page-services`, `.page-about`, `.page-portfolio`): las reglas `<style>` inline de cada página eran globales solo por accidente.
