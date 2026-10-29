# Plan 018
- Íconos: ampliar `_includes/mm-icon.html` (renombrar a uso general si conviene, p. ej. `_includes/icon.html` con `name=`), y usarlo en `services.md`, `contact.md` y donde se lea `icon` de `servicios.yml` (cambiar los valores `icon:` a nombres de ícono en vez de emoji).
- Portafolio: `captura:` en `_proyectos/{donaire,hanna,llerena}.md`; render en el layout/include de tarjetas de portfolio y en el layout del caso.
- i18n: `_data/i18n.yml` + atributos `data-i18n` en `services.md` y `_includes/footer.html`; alinear el H1 servido.
- Mapa: `assets/js/mapa-madurez.js` (is-past solo para idx ≥1; scrollIntoView del panel en móvil; orden de botones en `_includes/mm-panel.html`).
- CSS en `_sass/_components.scss` / estilos inline existentes, mobile-first.
