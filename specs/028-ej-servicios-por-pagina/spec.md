# Spec 028 — Servicios como catálogo + una página por servicio

**Fecha:** 2026-10-31 · **Rama:** `development` · Pedido de Elías: header sólido (sin transparencia) y navegación tipo tienda en vez de SPA con saltos de ancla.

## Qué y por qué

`/services/` era una sola página larga con anclas (`#landing`, `#addon-*`, `#cuidado-*`): cada clic saltaba y obligaba a hacer scroll. Pasa a ser un **catálogo** (tarjetas) y cada servicio tiene su **página de producto** `/services/<slug>/`, como una tienda.

## Requisitos

1. Header: fondo `#fff` opaco, sin `backdrop-filter` ni `rgba`; borde inferior se mantiene. El menú móvil (Sheet) ya era `bg-white`.
2. `/services/` = intro + tarjetas agrupadas (Estrategias: Quick Win + 3 niveles · Potenciadores: 5 · Plan Cuidado: 3). Tarjeta: nombre, resumen, precio «desde» tal cual en `servicios.json`; toda la tarjeta enlaza a su página. Sin secciones de detalle largas ni «Ver detalle ↓».
3. `/services/[slug]/` (SSG con `generateStaticParams`, slugs de los datos, sin colisiones; `proceso` reservado) con: migas (Servicios › Grupo › Nombre), título, precio, CTA «Cotizar por WhatsApp» con el nombre del servicio en el mensaje, «Ver otros servicios», detalle (qué es, qué incluye, plazo, enfoque / se suma a), «También te puede interesar» (3), anterior/siguiente dentro del grupo, barra CTA fija en móvil (≥44 px).
4. `/services/proceso/`: el método de 4 pasos en página propia; en el catálogo queda la tira corta con enlace.
5. Bilingüe con `<L>` + claves nuevas en `i18n.json` (ES/EN). Sin precios ni claims nuevos.
6. SEO por página: title, description, canonical, og (imagen por defecto), `sitemap.ts`.
7. Enlaces internos a `/services/#<slug>` → `/services/<slug>/`. Compatibilidad: script cliente en `/services/` que redirige `#<slug>`, `#addon-<slug>`, `#cuidado-<slug>`, `#proceso`.

## Criterios de aceptación

- CA1 `npm run build` + `tsc` limpios; 12 páginas de servicio + proceso en `out/`.
- CA2 Sin overflow horizontal a 390 px; targets ≥ 44 px; detector impeccable sin hits nuevos.
- CA3 Playwright: tarjeta → detalle → CTA WhatsApp con el nombre; toggle ES⇄EN en detalle; redirección de anclas viejas.

## Fuera de alcance

Reestructurar otras páginas (se lista dónde queda el patrón de anclas). Limpieza del CSS heredado `summary-col*`/`strategy-card*` (sin uso).
