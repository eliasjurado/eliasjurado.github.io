# GA4 setup y validacion (DebugView)

Fecha: 2026-06-04

## 1) Activacion

1. Abre [_config.yml](_config.yml).
2. En `analytics`, coloca tu Measurement ID de GA4:

```yml
analytics: G-XXXXXXXXXX
```

3. Build/deploy del sitio.

Nota: el snippet de GA4 se inyecta automaticamente desde [_includes/seo.html](_includes/seo.html).

## 2) Eventos instrumentados

Eventos ya listos en [assets/js/analytics.js](assets/js/analytics.js):

- `click_whatsapp`
- `click_email`
- `click_cta_services`
- `lang_switch` (emitido desde [assets/js/i18n.js](assets/js/i18n.js))

Parametros enviados:

- `page_path`
- `link_href` (para clicks de enlace)
- `from_lang` / `to_lang` (para cambio de idioma)

## 3) Verificacion en DebugView

1. Abre el sitio en una ventana normal.
2. En GA4, entra a Admin -> DebugView.
3. Ejecuta estas acciones en el sitio:
- Cambiar idioma ES/EN.
- Click en CTA hacia estrategias.
- Click en WhatsApp.
- Click en correo.
4. Verifica que aparezcan los 4 eventos.

## 4) Troubleshooting rapido

1. No llegan eventos:
- Verifica que `analytics` tenga un `G-...` valido en [_config.yml](_config.yml).
- Revisa que exista el script de GA4 en el HTML final (source).
- Confirma que no haya bloqueo por extensiones de privacidad.

2. Llega page_view pero no custom events:
- Verifica que [assets/js/analytics.js](assets/js/analytics.js) cargue en el HTML.
- Verifica que los enlaces sean `mailto:` / `wa.me` / `/services/` como en instrumentacion.

3. `lang_switch` no dispara:
- Solo se dispara cuando realmente cambia idioma (no al hacer click en el idioma ya activo).

## 5) Siguiente mejora recomendada

Mapear estos eventos a conversiones en GA4:

- `click_whatsapp`
- `click_email`

Y luego crear una exploracion simple por:

- pagina de origen (`page_path`)
- idioma (`to_lang`)
- tipo de canal de contacto.
