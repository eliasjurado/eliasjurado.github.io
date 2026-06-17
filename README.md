# eliasjurado.com

Sitio comercial de Elias Jurado construido con Jekyll.

Objetivo: captar leads calificados para servicios de madurez digital (Quick Win, Landing, E-commerce, CRM) con experiencia bilingue ES/EN y diseno luxury black.

## Stack

- Jekyll
- SCSS (assets/css/main.scss + _sass)
- JavaScript vanilla para i18n y nav mobile
- Deploy en GitHub Pages

## Estructura principal

```
_config.yml
_data/
  i18n.yml
  servicios.yml
_includes/
  header.html
  footer.html
  seo.html
_layouts/
  default.html
  home.html
  page.html
  proyecto.html
_sass/
  _variables.scss
  _base.scss
  _components.scss
assets/
  css/main.scss
  js/i18n.js
about.md
services.md
portfolio.md
contact.md
card.html
```

## Desarrollo local

### Opcion 1: Ruby local

```bash
bundle install
bundle exec jekyll serve
```

Sitio disponible en:

- http://localhost:4000

### Opcion 2: Docker

```bash
docker-compose up
```

## Convenciones clave

- Marca:
  - Paleta oficial: #000000, #243038, #606060, #ffffff
  - Tipografia: Montserrat
  - Esquinas vivas: sin border-radius
- i18n:
  - Diccionario central en _data/i18n.yml
  - Toggle de idioma en desktop y mobile
  - Persistencia por localStorage (eliasjurado_lang)
- Comercial:
  - Precio visible tipo "Desde USD X"
  - Nota de precio referencial cuando aplique

## Specs

Las especificaciones vivas del proyecto estan en:

- specs/README.md

Incluyen:

- Lecciones aprendidas
- Product spec
- Design/UI spec
- Technical spec
- Roadmap de mejoras
- Checklist QA de smoke test

## Checklist de validacion rapida

Antes de mergear cambios de UI:

1. Probar menu mobile (abrir/cerrar, tap fuera, tap enlace).
2. Probar switch ES/EN en desktop y mobile.
3. Validar hero y CTAs en 360x800 y 390x844.
4. Confirmar que no se introdujeron inline styles innecesarios.

