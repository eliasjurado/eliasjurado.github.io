# Roadmap de mejoras sugeridas

Version: 1.0
Fecha: 2026-06-04

## Priorizacion

- P0: impacto alto y esfuerzo bajo/medio.
- P1: impacto alto y esfuerzo medio.
- P2: impacto medio o preparacion de escala.

## P0 (proximo sprint)

Estado: completado (2026-06-04)

1. Migrar estilos inline criticos a clases reutilizables.
- Alcance ejecutado: home, footer, about, portfolio, contact, proyecto.
- Impacto: consistencia, mantenibilidad, menos regresiones.

2. Cierre de menu al seleccionar enlace mobile.
- Ejecutado junto a cierre por tap fuera.
- Impacto: UX mas fluida.

3. Actualizar README del repo.
- Ejecutado con stack, estructura y flujo real del repositorio.
- Impacto: onboarding tecnico rapido y menos confusiones.

4. QA checklist formal por viewport.
- Ejecutado en specs/05-qa-smoke-checklist.md.

## P1

Estado: en progreso (2026-06-04)

1. Implementar GA4 minimo viable.
- Eventos: click_whatsapp, click_email, click_cta_services, lang_switch.
- Implementado: capa de tracking JS, eventos disparados y snippet GA4 condicional por `site.analytics`.
- Pendiente: colocar Measurement ID real en produccion y validar en DebugView.
- Impacto: medicion real del embudo.

2. Hardening de accesibilidad.
- Agregar cierre con Escape para menu mobile.
- Revisar foco visible y orden de tab.
- Implementado: cierre con Escape en menu mobile + retorno de foco al boton.

3. Estandarizar estilos de paginas internas en SCSS compartido.
- Evitar bloques <style> por pagina cuando no sea necesario.

## P2

1. Sistema de componentes mas modular.
- Extraer secciones repetidas (cards de acciones, bloques de CTA, strips).

2. Pruebas visuales automatas.
- Capturas por viewport y diff visual en CI.

3. Evolucion de contenidos SEO/i18n.
- Completar traducciones faltantes y ampliar portfolio con casos nuevos.

## Recomendacion estrategica

Lo mas rentable ahora no es agregar mas features visuales; es cerrar el loop de calidad + medicion:

1. QA responsive estandar.
2. Tracking de eventos comerciales.
3. Refactor de inline styles mas sensibles.

Eso reduce retrabajo y te da datos para decidir con criterio que optimizar despues.
