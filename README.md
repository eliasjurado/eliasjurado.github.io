# eliasjurado.com

Sitio comercial de Elías Jurado: Next.js (App Router, TypeScript) + Tailwind CSS v4 + shadcn/ui, exportado como HTML estático y publicado en GitHub Pages (dominio propio vía `public/CNAME`).

Objetivo: captar leads calificados para servicios de madurez digital (Quick Win, Landing, E-commerce, CRM), con experiencia bilingüe ES/EN y diseño luxury black (Montserrat, esquinas vivas).

## Desarrollo

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build      # genera out/
python3 -m http.server -d out 8765   # revisar el export
```

## Despliegue

Push a `main` → `.github/workflows/pages.yml` (build + `actions/deploy-pages`).
Requiere **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Estructura y reglas

Ver `CLAUDE.md` (reglas de marca, i18n, precios) y `specs/025-ej-next-migration/` (migración desde Jekyll).
