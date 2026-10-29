# Spec 018 — Correcciones seguras de la crítica Impeccable de eliasjurado.com (21/32)

> Crítica: `.impeccable/critique/2026-10-29T08-15-45Z__eliasjurado-com.md` (raíz del proyecto). Elías pidió "limpiar mi web" y
> "termina todo" antes de dormir: se aplica lo que corrige errores **sin cambiar el mensaje ni agregar afirmaciones**. Las
> decisiones de posicionamiento (H1 nuevo, PEN antes que USD, quitar stack técnico, métricas/testimonios, simplificar
> services) quedan para Elías. Marca: `01-identidad/manual-marca.md` (luxury black, Montserrat, radio 0).

## 1. Prueba visual en el portafolio (P0 parcial, sin afirmaciones nuevas)
Capturas móviles reales de los sitios en vivo ya están en `assets/img/portfolio/{donaire,hanna,llerena}-movil.jpg`
(780×1688). Mostrarlas en las tarjetas de `/portfolio/` (y en la tarjeta destacada del home si existe el mismo componente) y
al inicio de cada caso `/portfolio/<slug>/`, dentro de un marco sobrio de teléfono (borde 1px `#e0e0e0`, radio 0, sin
sombras de brillo), con `alt` descriptivo ("Página de inicio de Joyería Donaire en un celular") y `loading="lazy"`,
`width`/`height` reales. Campo nuevo `captura:` en el front matter de cada `_proyectos/*.md`. No tocar textos de los casos.

## 2. Emoji → íconos SVG (línea roja de la marca)
Reemplazar todos los emoji usados como íconos en `services.md`, `contact.md` y donde aparezcan (`servicios.yml` campos `icon:`
usados en services y en chips de add-ons) por SVG del set de `_includes/mm-icon.html` (ampliar con los que falten: juego/
gamificación, paquete/migración, tarjeta/pasarela, globo/dominio, birrete/capacitación, sobre/correo). Mismo trazo 1.5px,
terminaciones cuadradas, `currentColor`, `aria-hidden`.

## 3. i18n incompleto
Pasar a `_data/i18n.yml` (ES/EN) los textos fijos que no cambian con el idioma: "Nivel de entrada", "Nivel N", "Desde… /mes"
en `services.md`, el footer (`_includes/footer.html`), y cualquier etiqueta visible en ES sin `data-i18n`. El H1 que renderiza
el servidor en la home (`index.html` front matter / `_layouts/home.html`) debe ser **el mismo texto ES** que pone `i18n.js`
(`home.title_short`), para que la vista previa de WhatsApp/Google y la página digan lo mismo y no parpadee.

## 4. Mapa de Madurez (P2)
- La estación de entrada (WhatsApp) **nunca** se marca `is-past`: es transversal. Solo las etapas 1–3 anteriores a la elegida.
- En móvil (<900px), al elegir una opción: desplazamiento suave hasta el panel "Tu siguiente paso" (respetar
  `prefers-reduced-motion`: salto sin animación) y el panel queda visible.
- En el panel, el botón principal es **"Conversemos"** (`/contact/`, estilo primario) y "Ver detalle →" queda secundario.

## 5. Hero en móvil
El monograma `[ E·J ]` (`.hero__avatar` o equivalente) no debe ocupar el primer pantallazo: en móvil va **debajo** del
texto y los botones, o reducido a ≤40 % del ancho. El H1 y los CTA deben verse sin scroll a 390×844.

## 6. Servicios — errores de maquetación
- "Nuestro método": las flechas/conectores no se montan sobre el texto en móvil.
- Jerarquía: agregar h2 donde hoy se salta de h1 a h3 (services y portfolio), sin cambiar el aspecto visual.
- Textos <12px (`.summary-col__badge`, `.precio-nota`, `.precio-nota--mini`, `.summary-col__cuidado-mention`) a ≥0.75rem.
- Medida de lectura: `.strategy-card__resumen` y los párrafos de `/about/` a máx. 68ch.
- `/contact/`: tarjetas de WhatsApp y correo con la misma alineación.

## 7. Errores de contenido evidentes (sin inventar)
- "WhatsApp — WhatsApp Automation" redundante → solo un nombre por idioma.
- El caso de Hanna dice "pendiente de go-live" aunque el sitio está en producción (hannacomidaarabe.com responde): cambiar
  solo esa frase de estado a "En producción en su dominio propio." (ES) / "In production on its own domain." (EN). Nada más.

## Criterios de aceptación
- CA1. `/portfolio/` y los 3 casos muestran su captura; imágenes con alt y dimensiones.
- CA2. Cero emoji como ícono en el sitio construido (`_site`), salvo dentro de textos de ejemplo del mock de WhatsApp.
- CA3. Cambiar a EN traduce footer y etiquetas de services; el H1 servido = H1 de i18n en ES.
- CA4. Mapa: WhatsApp nunca gris "pasado"; en móvil se ve el panel tras elegir; "Conversemos" es el CTA primario.
- CA5. A 390×844 el H1 y los CTA del hero se ven sin scroll; sin scroll horizontal en ninguna página.
- CA6. Detector URL sin `skipped-heading`, `tiny-text`, `undersized-ui-text` (salvo logotipo/numerales decorativos) ni `line-length`.
- CA7. Build OK, `impeccable detect --json` sobre el markup sin hallazgos nuevos, `node --check` del JS.
