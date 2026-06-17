# Lecciones aprendidas: mobile nav, i18n y consistencia interna

Fecha: 2026-06-04

## Contexto

Durante esta iteracion se corrigieron problemas de experiencia mobile:

- El toggle de idioma no funcionaba en celular.
- La navegacion principal se veia desalineada en mobile/tablet.
- El hero en mobile se percibia descentrado (logo y jerarquia visual).
- En paginas internas habia diferencias de espaciado y estilo frente al home.

## Hallazgos clave

1. Un selector unico en JS puede romper variantes mobile.
- Causa: bind de click solo al primer [data-lang-toggle].
- Leccion: cuando hay elementos duplicados por breakpoint (desktop/mobile), siempre iterar sobre todos.

2. Un breakpoint mal calibrado elimina controles criticos.
- Causa: esconder toggle de idioma a max-width: 900px aunque el nav desktop vive desde 768px.
- Leccion: alinear breakpoints de visibilidad con los breakpoints del layout real.

3. El descentrado percibido no siempre es de CSS, muchas veces es del asset.
- Causa: se uso aspect-ratio fijo para un logo que puede tener otra relacion o padding interno.
- Leccion: no forzar ratio en logos; primero respetar proporcion nativa y luego ajustar el asset (trim) si hay aire interno.

4. El cierre de menu por tap externo mejora UX y reduce friccion.
- Leccion: todo menu overlay en mobile debe cerrar por:
  - tap fuera,
  - tap en enlace,
  - Escape (siguiente mejora recomendada).

5. Inline styles aceleran, pero erosionan consistencia.
- Hallazgo: varias paginas internas usaban estilos inline para acciones/espaciados.
- Leccion: migrar a clases semanticas para mantener coherencia y facilitar evolucion responsive.

## Cambios aplicados en esta iteracion

- i18n toggle enlazado a todos los toggles desktop/mobile.
- Ajuste de breakpoint del toggle de idioma.
- Alineacion/ritmo del menu mobile.
- Cierre de menu al hacer tap fuera y al tocar un enlace.
- Hero mobile: logo protagonista, orden visual corregido, centrado de contenido y CTAs.
- Refactor de estilos inline a clases en home/footer/about/portfolio/contact/proyecto.
- Header de paginas internas estandarizado con clases reutilizables.
- README actualizado al estado real del proyecto.
- Checklist QA smoke documentado para pre-merge.
- Cierre de menu con tecla Escape implementado (accesibilidad keyboard).
- Capa minima de tracking implementada para eventos comerciales y cambio de idioma.

## Criterios para no repetir estos problemas

Checklist previo a merge:

1. Navegacion mobile:
- Abrir/cerrar desde boton.
- Cerrar por tap fuera.
- Cerrar al navegar.

2. i18n:
- Toggle funcional en desktop y mobile.
- Estado activo sincronizado en ambos toggles.
- Persistencia en localStorage.

3. Hero mobile:
- Logo centrado opticamente.
- Jerarquia visual clara en primer pantallazo.

4. Paginas internas:
- Evitar inline styles nuevos.
- Reusar clases y patrones del sistema.

5. QA visual:
- Revisar en 360x800, 390x844 y >=768.
- Verificar que no desaparezcan controles criticos entre 768 y 900.
