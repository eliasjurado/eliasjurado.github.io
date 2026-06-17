# QA Smoke Checklist (pre-merge)

Fecha de creacion: 2026-06-04

Usar esta lista antes de mergear cambios de UI/contenido.

## 1) Navegacion y menu mobile

- [ ] El boton hamburguesa abre y cierra el menu.
- [ ] El menu cierra al tocar fuera.
- [ ] El menu cierra al tocar un enlace.
- [ ] aria-expanded cambia correctamente entre true/false.

## 2) Idioma ES/EN

- [ ] El toggle funciona en desktop.
- [ ] El toggle funciona en mobile.
- [ ] El estado activo ES/EN se sincroniza en ambos toggles.
- [ ] La preferencia persiste al recargar (localStorage).

## 3) Hero y above-the-fold mobile

- [ ] Logo del hero se ve centrado opticamente.
- [ ] Titulo, subtitulo y CTAs tienen jerarquia clara.
- [ ] No hay saltos visuales extra al abrir menu o cambiar idioma.

## 4) Paginas internas

- [ ] Header interno mantiene alineacion consistente con home.
- [ ] CTAs y acciones de cards se ven alineadas en mobile.
- [ ] No aparecen estilos rotos por cambios de clase.

## 5) Visual y marca

- [ ] Colores dentro de la paleta oficial (luxury black).
- [ ] Tipografia Montserrat en componentes nuevos.
- [ ] Sin border-radius agregado.

## 6) Viewports minimos

Validar al menos:

- [ ] 360x800
- [ ] 390x844
- [ ] 768x1024
- [ ] 1280+ desktop

## 7) Requisitos tecnicos

- [ ] Sin errores de sintaxis en archivos editados.
- [ ] No se rompio la navegacion de colecciones/paginas.
- [ ] Enlaces de contacto (WhatsApp/correo) funcionales.
