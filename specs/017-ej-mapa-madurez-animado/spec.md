# Spec 017 — Mapa de Madurez Digital animado (home de eliasjurado.com)

> Pedido de Elías (2026-10-29): "una animación para explicar el mapa de madurez digital".
> Identidad: **propiedad de Elías** → `01-identidad/manual-marca.md` (luxury black: `#000`, `#243038`, `#606060`, `#fff`,
> derivados `#f5f5f7`/`#e0e0e0`/`#2a2a2a`; Montserrat 500/600/800; **esquinas vivas, radio 0**). Sin jaguar (oculto por decisión de Elías).
> Constitución: `.specify/memory/constitution.md` (raíz del proyecto EliasJurado) → `CLAUDE.md`.

## Qué
Reemplazar la sección `.maturity-journey` de `_layouts/home.html` (hoy: lista estática con emojis 💬🚀🛒⚙️ y flechas "→")
por un **mapa animado e interactivo** que explique el recorrido: **Punto de entrada (WhatsApp) → 1 Despegue (Landing) →
2 Expansión (E-commerce) → 3 Liberación (CRM)**, con el eje de resultado **Visibilidad → Conversión → Eficiencia** y a quién
sirve cada etapa (Audiencia → Clientes → Equipo).

## Por qué
El concepto es el corazón de la propuesta de valor de Elías (personal trainer digital por etapas), pero hoy se lee como una
lista de precios. La animación debe hacer *sentir* que es un camino con dirección y que el visitante puede ubicarse en él.

## Momento autoral (uno solo)
**"El camino se traza."** Al entrar la sección en pantalla, una sola línea steel (`#243038`, 2px, recta, ángulos rectos)
se dibuja de la entrada a la etapa 3 (`stroke-dashoffset`, 900–1200 ms, ease-out exponencial). Cada estación (cuadrado de
esquinas vivas) pasa de contorno a relleno negro justo cuando la línea la alcanza, y su resultado ("Visibilidad",
"Conversión", "Eficiencia") aparece con un `clip-path` de revelado. Estado por defecto ya visible (si el JS o la animación no
corren, el mapa completo se ve igual). `prefers-reduced-motion`: todo aparece sin trazo, con un fundido de 150 ms.

## Interacción: "¿Dónde está tu negocio hoy?"
Debajo del título, 4 opciones (botones de verdad, ≥44px, `aria-pressed`), en lenguaje del dueño de pyme:
- "Atiendo todo por WhatsApp y se me escapan clientes" → Punto de entrada
- "No tengo web o no me encuentran" → 1 Despegue
- "Tengo web pero no vende sola" → 2 Expansión
- "Vendo, pero mi equipo se ahoga en tareas manuales" → 3 Liberación
Al elegir: la línea se re-traza **hasta** esa estación (FLIP/dashoffset, 400–500 ms), esa estación queda destacada (las demás
bajan a `#606060`), y aparece un panel corto "Tu siguiente paso: {nombre} — {beneficio}" con su precio "Desde USD X" y CTA
"Ver detalle →" (`/services/#slug`) + "Conversemos" (`/contact/`). Botón "Ver todo el mapa" restablece. Teclado completo,
`aria-live="polite"` para el panel.

## Contenido (fuente única)
Todo sale de `_data/servicios.yml`: `quick_win` y `niveles[]` (`nivel`, `fase`, `nombre_corto`, `beneficio`, `factor_humano`,
`precio_usd`, `slug`). No duplicar textos. Los textos nuevos (pregunta, 4 opciones, "Tu siguiente paso", "Ver todo el mapa")
van en `_data/i18n.yml` (ES/EN) y respetan el sistema `data-i18n` existente del sitio.

## Íconos
Quitar los emojis. Íconos SVG propios en línea, trazo 1.5px, terminaciones cuadradas, 24×24, `currentColor`: conversación
(entrada), lanzamiento/señal (Despegue), carrito/vitrina (Expansión), engranaje/flujo (Liberación). `aria-hidden`. (Opcional:
cambiar `icon:` en `servicios.yml` para que otras páginas no sigan usando emoji; si otras páginas lo usan, dejar el campo y
no tocarlas en este spec.)

## Layout
- Mobile-first: en móvil el camino es **vertical** (línea a la izquierda, estaciones apiladas); desde 900px es **horizontal**.
- Sin kicker/eyebrow sobre el título: el H2 es "Mapa de Madurez Digital" y el párrafo "Tu recorrido, paso a paso. Empieza donde
  estés; avanza cuando el retorno lo pida." (EN equivalente).
- No cards clónicas: estaciones como nodos del camino, no tarjetas con sombra.
- Mantener el CTA final existente ("Ver pricing completo + add-ons →").

## Criterios de aceptación
- CA1. Sin emojis en la sección; íconos SVG consistentes.
- CA2. La línea se traza una vez al entrar en vista; estaciones se rellenan en orden; contenido visible sin JS y con reduced-motion.
- CA3. Las 4 opciones llevan a la estación correcta, muestran el panel con datos de `servicios.yml` y restablecen con "Ver todo el mapa"; operable por teclado; `aria-pressed`/`aria-live` correctos.
- CA4. ES/EN funcionan con el selector de idioma del sitio.
- CA5. 390px vertical sin scroll horizontal; ≥900px horizontal; targets ≥44px; contraste AA; radio 0; solo la paleta luxury black.
- CA6. Build Jekyll OK (`docker compose run --rm jekyll jekyll build`), `impeccable detect --json _layouts/home.html` = `[]`, `node --check` del JS.
