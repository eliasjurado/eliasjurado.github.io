# Plan 028

- `src/lib/servicios.ts`: lista unificada `entries` (grupo, kicker, nombre, resumen, precio bilingüe) construida desde `servicios.json` vía `src/lib/data.ts`; helpers `neighbors`, `related`, `fullName`. Falla el build si un slug se repite o es `proceso`.
- Componentes: `ServicioCard` (tarjeta = `<Link>`), `ServicioCta` (cliente; mensaje de `services.wa_message` con `{name}` según idioma; `waLink` de `lib/site`), `AnchorRedirect` (cliente, `router.replace`).
- Rutas: `services/page.tsx` (catálogo), `services/[slug]/page.tsx` (`dynamicParams=false`, metadata por página), `services/proceso/page.tsx`.
- CSS: bloque `.svc-*` al final de `brand.css`, mobile-first con `min-width`; barra inferior `position: sticky` dentro del `<article>` (no tapa el pie).
- `sitemap.ts` suma proceso y los 12 slugs; `maturity-map.tsx` apunta a `/services/<slug>/`; el nav marca «Servicios» activo en subrutas.
- Header: `background:#fff`, sin blur.
