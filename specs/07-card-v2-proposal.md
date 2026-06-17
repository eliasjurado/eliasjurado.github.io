# Propuesta V2: tarjeta digital /card/

Version: propuesta
Fecha: 2026-06-04
Estado: aprobado y ejecutado (2026-06-04)

## 1) Objetivo

Subir la calidad de /card/ para que quede alineada con:

- estandar visual actual del sitio,
- instrumentacion de analytics/GTM,
- consistencia de datos de contacto,
- accesibilidad minima esperada.

Sin perder su ventaja principal: conversion rapida en mobile.

## 2) Diagnostico actual

Fortalezas:

- Jerarquia visual clara (marca > acciones > secundarios).
- Flujo de contacto directo y corto.
- Buena legibilidad general y CTA accionables.

Gaps detectados:

1. Medicion incompleta.
- /card/ usa `layout: null`, por lo que no hereda includes globales.
- Riesgo: GTM/eventos no unificados con el resto del sitio.

2. Inconsistencia de datos de contacto.
- El numero visible puede no coincidir 100% con configuracion global.
- Riesgo: confianza y conversion.

3. i18n parcial/no operativo.
- Hay atributos `data-i18n` pero no flujo i18n montado en esa pagina.
- Riesgo: deuda tecnica y comportamiento confuso.

4. Accesibilidad de zoom.
- `maximum-scale=1` limita zoom en mobile.
- Riesgo: barrera de accesibilidad.

5. Desalineacion de marca estricta.
- Acento verde de WhatsApp rompe paleta luxury black definida en el proyecto.

## 3) Propuesta V2 (alcance)

### Bloque A — Integracion tecnica

1. Conectar GTM en /card/ igual que en layout default.
- Insertar script GTM en head.
- Insertar noscript GTM justo despues de body.

2. Conectar tracking de eventos en /card/.
- Cargar `assets/js/analytics.js`.
- Mantener nomenclatura de eventos existente:
  - `click_whatsapp`
  - `click_email`
  - `click_cta_services` (si aplica)
  - `lang_switch` (si se activa i18n)

### Bloque B — Consistencia de datos

1. Unificar telefono, WhatsApp y correo con `_config.yml`.
- Evitar hardcode de datos sensibles que puedan divergir.

### Bloque C — UX + accesibilidad

1. Permitir zoom del usuario.
- Cambiar viewport a `width=device-width, initial-scale=1`.

2. Mejorar etiquetas ARIA y feedback de accion.
- `aria-label` explicito en botones de accion principal.
- Mantener estados hover/focus visibles.

### Bloque D — Coherencia de marca

1. Sustituir acento verde WhatsApp por paleta oficial.
- Mantener diferenciacion del boton por forma/label/icono, no por color fuera de marca.

### Bloque E — i18n (decision)

Decision propuesta:

- Opcion recomendada: habilitar i18n real en /card/ (diccionario + script), para no romper consistencia del sitio.
- Opcion minima: remover atributos `data-i18n` de /card/ y dejarla solo en ES.

Recomendacion: Opcion recomendada (i18n real), porque ya existe la infraestructura en el proyecto.

## 4) Criterios de aceptacion

1. GTM en /card/ aparece en source y en Tag Assistant.
2. Clicks en WhatsApp y correo desde /card/ llegan a DebugView.
3. Numero/whatsapp/correo coinciden con `_config.yml`.
4. No existe `maximum-scale=1` en viewport.
5. Colores usados en /card/ cumplen paleta oficial (o derivados UI permitidos).
6. Sin errores de sintaxis tras cambios.

## 5) Riesgos y mitigacion

Riesgo: perder contraste al quitar verde WhatsApp.
- Mitigacion: reforzar iconografia, label y jerarquia tipografica.

Riesgo: duplicar tracking si se carga por dos vias.
- Mitigacion: mantener una sola estrategia de eventos por pagina (via `analytics.js` + GTM).

Riesgo: mayor complejidad en una pagina simple.
- Mitigacion: implementar en capas (A y B primero, luego C-D-E).

## 6) Plan de implementacion sugerido

Fase 1 (tecnica, rapida):

1. GTM + analytics.js en /card/.
2. Unificar datos de contacto con config.
3. Ajuste viewport accesible.

Fase 2 (coherencia visual):

1. Ajustar color WhatsApp a paleta oficial.
2. Pulir focus/hover y labels ARIA.

Fase 3 (i18n):

1. Activar i18n real en /card/ o remover atributos no funcionales.

## 7) Fuera de alcance (esta propuesta)

- Rediseño completo de layout de /card/.
- Nuevos bloques de contenido o storytelling largo.
- A/B testing visual en esta iteracion.

## 8) Resultado de ejecucion

Implementado en [card.html](card.html):

- Fase 1:
  - GTM script + noscript integrados.
  - `analytics.js` conectado.
  - Datos de contacto unificados con `_config.yml`.
  - Viewport accesible sin `maximum-scale=1`.

- Fase 2:
  - Acento WhatsApp alineado a paleta oficial.
  - Estados de foco visibles en botones.
  - Aria-labels en acciones principales.

- Fase 3:
  - i18n real activado en /card/ mediante `i18n-data` + `i18n.js`.
  - Conservado el esquema `data-i18n="card.*"` existente.
  - Mensajes de compartir/copiado y etiqueta fiscal del footer localizados ES/EN.
