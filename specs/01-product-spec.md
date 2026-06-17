# Product Spec: eliasjurado.com

Version: 1.0
Fecha: 2026-06-04

## 1) Objetivo del producto

Sitio comercial personal orientado a captar y calificar leads B2B (pymes en LATAM) para servicios de madurez digital:

- Visibilidad (Landing)
- Conversion (E-commerce)
- Eficiencia (CRM/Automatizacion)
- Entrada de bajo riesgo (Quick Win por WhatsApp)

## 2) Propuesta de valor

Acompanamiento escalonado con narrativa clara de retorno:

- Empiezas donde estas.
- Avanzas cuando el retorno lo justifica.
- Precio de entrada visible, cotizacion final segun alcance.

## 3) Audiencia objetivo

- Duenos o decision makers de pymes.
- Equipos comerciales/operativos con procesos manuales.
- Negocios que necesitan ordenar su madurez digital sin sobreingenieria.

## 4) Arquitectura de contenido

Paginas principales:

- Home: posicionamiento + journey de madurez + CTA.
- Services: pricing narrativo, detalle por nivel, addons y plan recurrente.
- Portfolio: prueba social por casos.
- About: autoridad y metodo.
- Contact: conversion directa (WhatsApp + correo).
- Card: tarjeta digital compacta para networking.

## 5) Estrategia de monetizacion

Modelo hibrido:

- Proyectos one-shot por nivel (Quick Win, Nivel 1/2/3).
- Upsell por Potenciadores (addons).
- Ingreso recurrente por Plan Cuidado mensual.

## 6) Reglas comerciales clave

- Mostrar precio como Desde USD X.
- Mantener precio_referencia_usd para anclaje.
- Marcar precio_es_referencial cuando corresponda.
- Mantener transparencia de alcance y plazo.

## 7) Internacionalizacion (i18n)

Idiomas soportados:

- ES (default)
- EN

Estrategia:

- Diccionario central en _data/i18n.yml.
- Soporte de data-i18n, data-i18n-en y data-i18n-en-html.
- Preferencia persistida en localStorage.

## 8) Criterios de exito (KPIs sugeridos)

- CTR Home -> Services.
- CTR Services -> Contact.
- Click-to-WhatsApp rate por pagina.
- Ratio de leads calificados / leads totales.
- Distribucion de interes por nivel (Quick Win, 1, 2, 3).

## 9) No objetivos actuales

- Checkout transaccional en el sitio.
- CMS complejo para edicion por terceros no tecnicos.
- Automatizacion de marketing avanzada (aun sin GA4 habilitado).
