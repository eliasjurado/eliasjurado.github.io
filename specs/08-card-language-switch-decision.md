# Decision Spec: switch de idioma en /card/

Fecha: 2026-06-04
Estado: decidido

## Decision

No agregar un switch visible de idioma en `/card/`.

## Razon principal

`/card/` es una tarjeta de contacto de accion rapida, no una pagina de exploracion.

Su trabajo principal es reducir friccion para que la persona haga una de estas acciones lo antes posible:

- escribir por WhatsApp,
- llamar,
- enviar correo,
- guardar contacto,
- compartir.

Un toggle visible compite con esas acciones en un espacio muy pequeno y reduce limpieza visual.

## Hechos

1. La card vive mejor en mobile y en contexto QR/networking.
2. La card ya tiene soporte tecnico para i18n.
3. El sitio principal ya resuelve cambio de idioma con controles visibles donde si hay mas espacio y mas profundidad de navegacion.

## Interpretacion

1. En una tarjeta, simplicidad gana sobre control adicional.
2. El costo visual de un toggle en esta superficie es mayor que su beneficio actual.

## Recomendacion operativa

1. Mantener `/card/` bilingue por debajo.
2. No mostrar switch visible.
3. Resolver idioma automaticamente por:
- preferencia existente del sitio,
- idioma del navegador,
- fallback a ES.

## Alternativa recomendada si se necesita control explicito

No usar toggle visible. Usar una de estas opciones:

1. Soporte por query param:
- `/card/?lang=en`
- `/card/?lang=es`

2. QR separados por idioma para eventos especificos.

## Cuando revisar esta decision

Reabrir esta decision solo si ocurre una de estas condiciones:

1. `/card/` empieza a usarse de forma recurrente en eventos con audiencia mixta ES/EN.
2. Se detecta confusion real por idioma en pruebas o uso comercial.
3. `/card/` deja de ser una tarjeta compacta y se convierte en mini landing con mas contenido.

## Criterio de producto

Hoy, el beneficio marginal de un switch visible en `/card/` es bajo.
El costo en limpieza visual, foco y conversion es real.

Conclusion: mantener la card simple y accionable. Si hace falta mas control, agregar soporte por URL, no por UI visible.
