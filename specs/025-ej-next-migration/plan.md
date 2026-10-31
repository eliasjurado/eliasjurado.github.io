# Plan 025 — Cómo

## Stack
Next.js 16 (App Router, TS) · Tailwind CSS v4 (sin preflight) · shadcn/ui (`button`, `card`, `sheet`; `components.json`, `cn`) · `next/font/google` Montserrat · `output: "export"` + `trailingSlash` + `images.unoptimized` · Node ≥ 20.9 (CI usa 22).

## Mapeo Jekyll → Next

| Jekyll | Next |
|---|---|
| `_layouts/default.html`, `_includes/seo.html` | `src/app/layout.tsx` (html, GTM, fuente, `LangProvider`) + `lib/seo.ts` (`generateMetadata`, JSON-LD) |
| `_layouts/page.html` | `components/page-shell.tsx` |
| `_layouts/home.html` | `src/app/(site)/page.tsx` + `components/maturity-map.tsx` (client) |
| `_layouts/proyecto.html` + `_proyectos/*.md` | `portfolio/[slug]/page.tsx` (`generateStaticParams`) + `content/proyectos.json` + `content/proyectos/*.tsx` |
| `_includes/header.html` | `components/site-header.tsx` (`Sheet` para el menú móvil) + `lang-toggle.tsx` |
| `_includes/mm-icon.html` | `components/icon.tsx` |
| `assets/js/i18n.js` | `components/l.tsx` + `lib/i18n.ts` |
| `assets/js/analytics.js` | `components/analytics.tsx` |
| `assets/js/mapa-madurez.js` | `components/maturity-map.tsx` |
| `_sass/*` + `<style>` inline | `app/brand.css` (compilado con sass; reglas de página scopeadas) |
| `_data/*.yml`, `_config.yml` | `content/*.json`, `lib/site.ts` |
| `card.html` (layout null) | `app/card/` fuera del grupo `(site)`, CSS Module |
| `jekyll-sitemap/feed` | `sitemap.ts`, `robots.ts`, `feed.xml/route.ts` |
| `CNAME`, `favicon.*`, `assets/`, `docs/`, `src/` | `public/` (mismas URLs) |

## Método
1. Conversión asistida (script de un solo uso, no commiteado): el HTML renderizado por Jekyll de about, contact y casos se convirtió a TSX con `<L k|en|enHtml>`; services, home, portfolio, header/footer y mapa se escribieron a mano sobre datos tipados.
2. SCSS compilado con `sass` a `brand.css`; `font-family` → `var(--font-sans)`.
3. Verificación por diferencia de píxeles contra https://eliasjurado.com/ (Chromium headless 390 y 1440) + Playwright para interacción.

## Despliegue
`.github/workflows/pages.yml`: checkout → setup-node 22 (cache npm) → `configure-pages` → `npm ci && npm run build` → `upload-pages-artifact` (`out`) → `deploy-pages`. Disparo: push a `development` (+ manual). Settings → Pages → Source = GitHub Actions.

## Riesgos
- Mientras el origen de Pages siga en «Deploy from a branch», el push a `development` publicaría el repo crudo: el cambio de origen y el merge deben ir juntos.
- `next/font/google` descarga Montserrat en build: requiere red en CI (disponible en GitHub Actions).
