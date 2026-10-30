# Spec 022 — Textos de eliasjurado.com: "vender más con tecnología"

> Aprobado por Elías (2026-10-30: "dale con todo, confío en ti"). Origen: crítica Impeccable 21/32
> (`.impeccable/critique/2026-10-29T08-15-45Z__eliasjurado-com.md`, raíz del proyecto) + posicionamiento decidido el
> 30-oct (skill `estrategia-maduracion-ej` §5b). Método: skills `copywriting` (diagnóstico B: hay voz propia → se
> restaura, no se reemplaza), `copy-editing` (siete pasadas, frases con estilo de IA) y `storybrand-messaging`
> (una frase). Constitución: `.specify/memory/constitution.md` → `CLAUDE.md`.

## Qué y por qué

El sitio vende "madurez digital" (abstracto, critica P1) y enseña el stack (n8n, Supabase, Next.js) en el texto de
venta. El posicionamiento nuevo es **vender más con tecnología**, con la promesa que Elías controla: **cada consulta
con respuesta y cada cotización con seguimiento**. El Mapa de Madurez se queda como **el método** (es su propiedad
intelectual), no como el titular. **Cero cifras, testimonios o logos inventados.**

**Fuera de alcance:** diseño visual, estructura de páginas, foto de Elías en /about/, métricas reales de casos
(dependen de Elías), quitar o reordenar servicios.

## Cambios (texto exacto; ES / EN)

### 1. Hero (home) — H1 servido = H1 de i18n
- `hero.title_short` y `index.html` `hero_title` y default de `_layouts/home.html`:
  ES **"Que ninguna venta se quede en el WhatsApp."** · EN **"No more sales lost in WhatsApp."**
- El párrafo bajo el H1 (hoy `hero.subtitle_flow`, "Visibilidad → Conversión → Eficiencia") pasa a una clave nueva
  `hero.subtitle` (y `index.html` `hero_subtitle`):
  ES "Ayudo a las pymes a vender más con tecnología. Conecto tu web, tu tienda en línea y tu WhatsApp para que cada
  consulta tenga respuesta y cada cotización tenga seguimiento."
  EN "I help small businesses sell more with technology. I connect your website, online store and WhatsApp so every
  inquiry gets an answer and every quote gets a follow-up."
  (`hero.subtitle_flow` se conserva en el YAML, sin uso en el hero.)
- `hero.cta_secondary`: ES "Ver servicios y precios" · EN "See services and pricing".
- `hero.kicker`/`hero.tagline` (si se usan en algún lugar): ES kicker "Sistemas de ventas digitales para pymes" · EN
  "Digital sales systems for small businesses"; tagline = mismo texto que `hero.subtitle`.

### 2. Navegación y página de servicios
- `nav.strategies` y `services.page_title`: ES "Servicios" · EN "Services" (Jordan no entiende "Estrategias").
- `services.page_kicker` se queda "Mapa de Madurez Digital".
- `services.page_subtitle`: ES "Un paso para cada momento de tu negocio. Empieza donde estés y avanza cuando el
  retorno lo justifique." · EN "One step for each stage of your business. Start where you are and move forward when
  the return justifies it."
- `services.intro_body`: ES "Toda pyme recorre el mismo camino digital; solo cambia el punto de partida. Aquí están
  los tres niveles del Mapa de Madurez y un primer paso para ordenar tu WhatsApp antes de invertir en lo grande." ·
  EN "Every small business walks the same digital path; only the starting point changes. Here are the three levels of
  the Digital Maturity Map and a first step to organize your WhatsApp before investing in the bigger pieces."
- `services.addons_body`: ES "Integraciones puntuales, capacitación y marketing experiencial. Se cotizan aparte y se
  suman a cualquier paso del mapa." · EN "Targeted integrations, training and experiential marketing. Priced separately
  and added to any step of the map."
- `home.levels_cta`: ES "Ver precios y potenciadores →" · EN "See pricing and boosters →" (en el copy visible los add-ons se llaman "Potenciadores", CLAUDE.md del repo §6).

### 3. Precios en soles primero (ES) y dólares en EN
En `_includes/mm-station.html`, `_includes/mm-panel.html` y `services.md` (Quick Win, niveles, add-ons y Plan
Cuidado): en español el precio principal es **S/** con `precio_pen` y, donde hoy hay "≈ PEN", pasa a "≈ USD
`precio_usd`". En inglés (vía `data-i18n-en`) se ve "From USD `precio_usd`" y "≈ PEN `precio_pen`". Los valores salen
de `_data/servicios.yml` (no se cambian números). Si `precio_pen`/`precio_usd` es objeto `{es, en}`, usar `.es` en el
texto y `.en` en `data-i18n-en`. El "Desde"/"From" sigue con `services.starting_at`.

### 4. Servicios: sin stack en el texto que vende (`_data/servicios.yml`)
- Quick Win (`whatsapp`): en `resumen.es/en` quitar la frase "Stack: n8n + Supabase + Cloud API." y "Integración con
  WhatsApp Cloud API (oficial Meta) o motor open-source" → "Conexión con el WhatsApp oficial de tu negocio" / "Connection
  to your business's official WhatsApp". En `incluye`, "Captura estructurada de leads a Supabase / Google Sheets" →
  "Cada contacto queda registrado en una hoja o base de datos" / "Every contact is logged in a sheet or database";
  "Integración WhatsApp Cloud API (o OpenWA según caso)" → "Conexión con WhatsApp Business (API oficial)" / "WhatsApp
  Business connection (official API)".
- Landing: en `resumen`, "Stack moderno (Next.js o Jekyll según caso), hosting incluido en el Plan Cuidado, deploy
  automático y…" → "Hosting incluido en el Plan Cuidado, publicación automática de cambios y…" (y su EN equivalente).
- E-commerce: `titulo` ES "E-commerce con IA" → **"Tienda en línea que vende sola"** · EN "Online store that sells on its
  own". `nombre_corto` se queda "E-commerce".
- CRM: `beneficio` ES "Recupera el tiempo de tu equipo" → **"Ninguna cotización sin seguimiento"** · EN "No quote
  without a follow-up". (Es la promesa B2B del posicionamiento.)
- Ningún otro texto de servicios cambia. `/about/` conserva su sección "Stack técnico" (ahí sí es credencial).

### 5. Casos (home + páginas de caso) — resultados con hechos, sin promesas vacías
- `resumen` / `resumen_en` de `_proyectos/*.md` (se ven en la home):
  - **llerena**: ES "Las pacientes reservan su valoración desde la web y la cita cae directo en el Google Calendar de
    la doctora. Antes, la agenda se llevaba a mano por WhatsApp." · EN "Patients book their consultation on the website
    and the appointment lands straight in the doctor's Google Calendar. Before, the schedule was handled by hand over
    WhatsApp."
  - **hanna**: ES "Los pedidos llegan ordenados desde la web, con un panel para el equipo que cuenta pedidos atendidos
    y venta perdida. Antes, cada pedido se tomaba a mano por mensaje." · EN "Orders arrive organized from the website,
    with a team dashboard that counts fulfilled orders and lost sales. Before, every order was taken by hand over chat."
  - **donaire**: ES "El catálogo que vivía en WhatsApp y redes ahora es una tienda en línea en español, inglés e
    italiano, que la joyería administra sola." · EN "The catalog that lived in WhatsApp and social media is now an online
    store in Spanish, English and Italian that the jewelry shop runs on its own."
- En el cuerpo de cada caso, la frase "Se actualizará este caso con métricas…" se reemplaza (ES; su EN si existe):
  - **hanna**: "En producción en su dominio propio. **Lo que medimos:** pedidos recibidos, atendidos y venta perdida,
    mes a mes, desde el panel del negocio."
  - **llerena**: "En producción desde octubre de 2026 en su dominio propio. **Lo que medimos:** cada reserva queda
    registrada en la hoja de solicitudes de la clínica, con fecha, sede, tratamiento y cómo nos conoció."
  - **donaire**: "En producción desde octubre de 2026 en su dominio propio. **Lo que medimos:** visitas, productos
    vistos, carritos y compras con Google Analytics 4 (en activación)."
- `<h2>` de la sección de casos en la home: ES "Ya está funcionando" · EN "Already running" (kicker "Portafolio" se queda).

### 6. Cierre de la home
- `home.closing_title`: ES **"¿Te escriben mucho y cierras poco?"** · EN "Lots of messages, few sales?"
- `home.closing_body`: ES "Cuéntame cómo te llegan hoy los clientes y te digo por dónde empezar. Te respondo en menos
  de 24 horas en días hábiles." · EN "Tell me how customers reach you today and I'll tell you where to start. I reply
  within 24 hours on business days."
- `home.closing_cta` se queda.

### 7. Metadatos, pie y tarjeta
- `_config.yml` `tagline`: "Que ninguna venta se quede en el WhatsApp." · `description`: "Webs, tiendas en línea y
  WhatsApp conectados para que las pymes vendan más: cada consulta con respuesta y cada cotización con seguimiento."
- `index.html` `description`: "Webs, tiendas en línea y sistemas de seguimiento para pymes que quieren vender más,
  con un Plan Cuidado mensual que mantiene todo funcionando."
- `footer.description`: ES "Que ninguna venta se quede en el WhatsApp. Webs, tiendas en línea y CRM para pymes que
  quieren vender más." · EN "No more sales lost in WhatsApp. Websites, online stores and CRM for small businesses that
  want to sell more."
- `card.tagline` y `card.share_text`: ES "Sistemas de ventas digitales para pymes" · EN "Digital sales systems for
  small businesses".

### 8. Reglas de redacción para todo texto nuevo o tocado
Español peruano con tuteo; sin "no es X, es Y"; sin raya (—) en textos cortos (títulos, botones, subtítulos);
sin listas de tres adornos; sin "IA", "n8n", "Supabase", "stack", "deploy" en texto de venta.

## Criterios de aceptación
- CA1. H1 servido (HTML del build) = `hero.title_short` ES; en EN el H1 cambia a "No more sales lost in WhatsApp."
- CA2. Ningún texto de home/services/casos/footer/card contiene: "madurez digital de tu pyme" como titular, "Stack",
  "n8n", "Supabase", "Next.js", "deploy", "Cloud API", "E-commerce con IA", "Se actualizará", "pricing", "add-ons" (en ES).
  (`/about/` sección "Stack técnico" exenta.)
- CA3. En ES los precios de home y services muestran "S/" primero; en EN muestran "USD" primero. Mismos números del YAML.
- CA4. Todas las claves nuevas o cambiadas tienen `es` y `en`; cambiar de idioma no deja textos en el otro idioma en
  hero, mapa, casos, cierre, footer.
- CA5. Build Jekyll OK; `impeccable detect --json` sin hits nuevos frente al estado previo; sin scroll horizontal a 390 px;
  H1 del hero no se parte en más de 4 líneas a 390 px.
- CA6. Ninguna cifra, testimonio o logo nuevo que no esté en este spec.

## Decisiones del orquestador tras la verificación (30-oct)
- **Páginas de caso conservan la tecnología usada**, con la etiqueta "Tecnología:" (antes "Stack:"): ahí la mira quien
  evalúa cómo trabaja Elías, no es texto de venta del titular. Excepción explícita a CA2.
- "Chatbot de IA" en E-commerce → "asistente que responde consultas de productos" (regla 8).
- La home muestra los casos en orden Llerena → Hanna (campo `orden_home`): la clínica es el caso del pitch de BNI.
