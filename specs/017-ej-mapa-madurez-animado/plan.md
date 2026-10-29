# Plan 017 — cómo
- Markup en `_layouts/home.html` (reemplaza `<section class="section maturity-journey">…</section>` y su CSS asociado si está inline). SVG del camino con `<path>` medido por JS (`getTotalLength`) o con dos paths (vertical para móvil / horizontal para desktop) visibles según `min-width`.
- JS vanilla en `assets/js/mapa-madurez.js` (IIFE): IntersectionObserver para el trazo inicial (una vez), estado de selección, re-trazo hasta la estación, panel `aria-live`, restablecer; lee los datos de `data-*` renderizados por Liquid (nada de fetch). Respeta `matchMedia('(prefers-reduced-motion: reduce)')`.
- CSS en `_sass/_components.scss` (o donde vivan los estilos de la home), mobile-first, tokens de `_sass/_variables.scss`. Easing `cubic-bezier(.16,1,.3,1)`.
- i18n: claves nuevas en `_data/i18n.yml` bajo `home.` siguiendo el patrón existente.
