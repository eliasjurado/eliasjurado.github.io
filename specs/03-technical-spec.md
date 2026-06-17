# Technical Spec: arquitectura del sitio

Version: 1.0
Fecha: 2026-06-04

## 1) Stack y build

- Generador: Jekyll.
- SCSS: assets/css/main.scss importa _sass/variables, base, components.
- Deploy: GitHub Pages (main).
- Dev local:
  - bundle exec jekyll serve
  - docker-compose up

## 2) Estructura funcional

- _config.yml: identidad, nav, branding, colecciones, plugins.
- _layouts/: default, home, page, proyecto.
- _includes/: seo, header, footer.
- _data/servicios.yml: catalogo comercial.
- _data/i18n.yml: diccionario ES/EN.
- assets/js/i18n.js: motor de traduccion en cliente.

## 3) i18n runtime

Flujo:

1. Lee #i18n-data embebido por include seo.
2. Resuelve idioma por localStorage > navigator.language > default ES.
3. Aplica traducciones por:
- data-i18n,
- data-i18n-attr-*,
- data-i18n-en y data-i18n-en-html.
4. Sincroniza estado visual de todos los toggles de idioma.

## 4) Navegacion mobile

- Toggle en header abre/cierra data-nav-mobile.
- Cierre por tap fuera implementado en include footer.
- Estado UI actualizado via aria-expanded e icono visual.

## 5) Convenciones de datos

servicios.yml:

- quick_win, niveles, addons, plan_cuidado.
- Mantener key addons por compatibilidad tecnica.
- Campos bilingues: objetos {es, en}.
- Campos tecnicos/numero: strings estables.

## 6) Calidad y validacion

- Validar errores de sintaxis tras cada cambio.
- Revisar i18n en desktop/mobile.
- Revisar nav mobile en anchos de 360, 390 y 768.
- Evitar regresiones visuales por inline CSS nuevo.

## 7) Deuda tecnica identificada

- Mucho CSS inline en paginas de contenido (sobre todo home/services/footer).
- README desactualizado respecto a la realidad del proyecto.
- Falta de suite automatizada de regresion visual.
- Falta de analitica GA4 para medicion de embudo.
