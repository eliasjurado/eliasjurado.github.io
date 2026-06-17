# Design/UI Spec: sistema visual y UX

Version: 1.0
Fecha: 2026-06-04

## 1) Principios de marca obligatorios

1. Tono: tuteo peruano, directo y profesional.
2. Paleta oficial:
- #000000
- #243038
- #606060
- #ffffff
3. Tipografia: Montserrat.
4. Esquinas vivas: border-radius = 0 en todo.

## 2) Sistema de componentes

Componentes base:

- Header sticky con nav desktop + nav mobile.
- Toggle de idioma (desktop y mobile).
- Botones primario/ghost/acento.
- Cards (servicios, portfolio, contacto).
- Footer con contacto y enlaces.

## 3) Reglas de interaccion

- Menu mobile:
  - abre/cierra por boton,
  - cierra por tap fuera,
  - estado visual activo en boton.
- Toggle de idioma:
  - funcional en desktop y mobile,
  - estado sincronizado en ambos.

## 4) Reglas responsive

Breakpoints relevantes:

- < 768: comportamiento mobile.
- >= 768: desktop nav.

Patrones mobile aplicados:

- Hero centrado visualmente, con logo protagonista.
- CTAs centrados y con espaciado consistente.
- Header compacto para mejorar primer pantallazo.
- Paginas internas con subtitulo y acciones alineadas al sistema.

## 5) Accesibilidad minima esperada

- aria-label en nav y controles de idioma/menu.
- aria-expanded en toggle de nav mobile.
- Estados visuales de foco/hover en controles interactivos.
- Contraste legible en combinaciones oscuro/claro.

## 6) Anti-patrones a evitar

- Nuevos inline styles para layout principal.
- Breakpoints inconsistentes entre componentes relacionados.
- Forzar aspect-ratio de logos sin validar asset real.
- Agregar colores fuera de la paleta oficial.
