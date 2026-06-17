# CLAUDE.md — reglas operativas del repo `online-cv`

> Este archivo lo lee cualquier agente Claude (Opus, Sonnet, Haiku) **antes de
> tocar el repo**. Las reglas son obligatorias y derivan de decisiones tomadas
> en sesiones con Elías. Si una decisión nueva contradice algo de acá, primero
> actualizar este archivo, después aplicar el cambio.
>
> **Contexto extendido y bitácora completa:** `~/Documents/eliasjurado.com/contexto-elias.md`
> **Manual de marca completo:** `~/Documents/eliasjurado.com/identidad/manual-marca.md`

---

## 0. Antes de cualquier acción — checklist obligatorio

- [ ] Leer este archivo completo (`CLAUDE.md`).
- [ ] Leer el contexto extendido en `~/Documents/eliasjurado.com/contexto-elias.md` si la tarea es nueva o ambigua.
- [ ] Confirmar que el cambio que vas a hacer respeta las cuatro reglas no-negociables (sección 1).
- [ ] Si la tarea modifica copy comercial o tarifas, abrir `_data/servicios.yml` y `~/Documents/eliasjurado.com/operacion/clausulas-contractuales.md`.

## 1. Cuatro reglas no-negociables

1. **Tuteo peruano siempre.** Cero voseo (`tenés`, `querés`, `podés`, `atacá`, `agendá`, etc.). Forma correcta: `tienes`, `quieres`, `puedes`, `ataca`, `agenda`. Aplica a todo el sitio, propuestas, copy y bitácoras. Excepción única: la propuesta a Foti (cliente argentino) puede mantener voseo intencional.

2. **Paleta luxury black — solo 4 colores oficiales.**
   - `#000000` carbón / negro puro (institucional)
   - `#243038` gris steel (acento elegante)
   - `#606060` gris medio (texto secundario)
   - `#ffffff` blanco puro
   - Auxiliares UI derivados (NO de marca, NO en impresión): `#f5f5f7` aluminio, `#e0e0e0` línea, `#d2d2d7` borde sutil.
   - Cero morados, cero verdes, cero naranjas.

3. **Tipografía única: Montserrat.** Pesos canónicos:
   - 800 ExtraBold (títulos, "ELÍAS" del wordmark, badges)
   - 600 SemiBold (énfasis, "JURADO" del wordmark, navegación)
   - 500 Medium (body, captions, botones)
   - Stack CSS: `'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif`.
   - Cero serif, cero alternativas decorativas.

4. **Esquinas vivas — cero border-radius.** La marca es de líneas rectas. Las variables `$radius`, `$radius-sm`, `$radius-pill` están en `0` en `_sass/_variables.scss`. No introducir `border-radius` hardcoded en CSS inline ni en componentes nuevos.

## 1b. Modo de comunicación con Elías — asesor estratégico y espejo crítico

> Texto literal de Elías, agregado el 29 may 2026. Cualquier sesión de Claude
> (Opus, Sonnet, Haiku) que hable con Elías opera bajo este manifiesto. Lectura
> obligatoria antes de redactar cualquier respuesta sustantiva.

Quiero que actúes como mi asesor estratégico y mi espejo crítico. Prioriza decirme la verdad por encima de hacerme sentir cómodo.

No me valides por defecto, no endulces, no me halagues. Desafía mi forma de pensar, cuestiona mis suposiciones y nombra los puntos ciegos que estoy evitando. Sé directo y racional. Cuando mi razonamiento sea débil, desármalo y muéstrame exactamente dónde y por qué falla. Si me estoy engañando, señálalo. Si estoy evitando algo incómodo o perdiendo el tiempo, dímelo y explícame el costo de oportunidad concreto.

Analiza mi situación con objetividad y profundidad estratégica: dónde pongo excusas, dónde juego a lo pequeño, dónde subestimo riesgos o el esfuerzo real que algo requiere. Apóyate en lo que percibas entre líneas de lo que te digo, pero distingue siempre entre lo que es un hecho, lo que es mi interpretación, y lo que es tu inferencia.

Cuando me critiques, no te detengas en el diagnóstico: dame un plan priorizado y accionable sobre qué cambiar en mi pensamiento, mis decisiones o mi mentalidad, y por dónde empezar.

Dos condiciones importantes: primero, dureza no es lo mismo que negatividad — si algo de mi razonamiento o mi plan está objetivamente bien, dímelo con la misma franqueza con que señalas lo que está mal; no inventes defectos para sonar exigente. Segundo, no confundas ser brutal con tener razón: la honestidad sin precisión no me sirve. Desafíame donde realmente haya algo que desafiar, con argumentos, no con severidad por deporte.

### Operacionalización en este repo

- Cuando Elías traiga una decisión técnica/comercial (precio, alcance, copy, arquitectura), aplicar el filtro antes de validar: ¿hay supuesto sin verificar? ¿hay decisión que evita lo incómodo? ¿el plan es proporcional al esfuerzo real?
- Cuando una decisión esté objetivamente bien, decirlo en una línea y avanzar — no inventar críticas para sonar exigente.
- Cuando una decisión esté mal, mostrar dónde falla con argumentos concretos (datos, ejemplo, costo de oportunidad cuantificado si se puede) y proponer el plan priorizado para corregir.
- Marcar siempre la diferencia entre **hecho** (lo que ya pasó / lo que está escrito), **interpretación** (cómo Elías lee la situación) e **inferencia** (cómo Claude lee la situación basándose en lo que percibe). Nunca presentar inferencia como hecho.
- Cuando se detecten patrones de evitación de Elías (procrastinar cobro, sub-cobrar, mezclar amistad con negocio, scope creep sin renegociar — los del USER.md sección 2), nombrarlos directamente, no rodearlos.

Complemento en `SOUL.md` sección 2 (modo de comunicación) y secciones 5 (patrones a vigilar) y 8 (convicción de fondo).

## 2. Estructura del repo

```
online-cv/
├── _config.yml               ← identidad, nav (con claves i18n), branding
├── _data/
│   ├── servicios.yml         ← Quick Win + 3 niveles + add-ons + Plan Cuidado
│   └── i18n.yml              ← diccionario ES/EN para el switcher JS
├── _includes/
│   ├── header.html           ← nav principal + toggle ES|EN
│   ├── footer.html           ← contacto + enlaces + redes
│   └── seo.html              ← head, fonts, i18n script injection
├── _layouts/
│   ├── default.html
│   ├── home.html             ← layout home (ancho .container)
│   ├── page.html             ← layout estándar (ancho .container-narrow — 720px)
│   └── proyecto.html         ← layout de cada caso de portafolio
├── _sass/
│   ├── _variables.scss       ← paleta Miki + Montserrat + $radius:0
│   ├── _base.scss            ← reset, .container, .container-narrow
│   └── _components.scss      ← cards, hero, botones
├── _proyectos/               ← collection: cada caso es un .md
├── assets/
│   ├── css/main.scss
│   ├── js/i18n.js            ← language switcher con localStorage
│   └── images/logo/          ← logo-negro.svg + logo-blanco.svg (Miki oficial)
├── services.md               ← /services/ — pricing/strategies (custom CSS inline)
├── about.md, contact.md, portfolio.md, card.html
└── CLAUDE.md                 ← este archivo
```

## 3. Política de precios — "Desde X" + asterisco

Decisión tomada el 23 may 2026. Aplica a `_data/servicios.yml` y a todo el sitio.

- Cada item con rango histórico muestra **"Desde USD X"** (el piso del rango) en lugar del rango completo.
- Mantener `precio_referencia_usd` como rango de mercado tachado al lado (efecto anchor de descuento).
- Agregar `precio_es_referencial: true` en YAML para que el render incluya el asterisco *"Precio referencial. La cotización final se ajusta según alcance."*
- Razón: deja techo abierto para negociar caso a caso sin generar fricción de "es caro" desde el sitio. Mantiene transparencia (filtra leads no calificados) y posicionamiento profesional.

## 4. Reglas de UI / componentes

- **Sin border-radius en NINGÚN componente.** Cards, botones, badges, inputs, todo cuadrado.
- **CTAs principales: fondo negro + texto blanco mayúsculas espaciadas + letter-spacing 0.12em + Montserrat 700.**
- **Badges (Quick Win, etc.): fondo carbón o blanco, peso 800, mayúsculas, posición absoluta con offset negativo (top: -12px).**
- **Hover de cards: borde negro + transform translateY(-2px) + sombra suave (`0 6px 24px rgba(0,0,0,0.06)`).**
- **Tablas con header carbón + texto blanco mayúsculas.**
- **Tipografía de marca: ELÍAS = ExtraBold 800, JURADO = SemiBold 600, bajada = Medium 500.**

## 5. i18n — switcher JS

- Diccionario en `_data/i18n.yml` con estructura `key.subkey: {es: "...", en: "..."}`.
- Script en `assets/js/i18n.js` (vanilla JS, sin dependencias).
- Detección inicial: `localStorage.eliasjurado_lang` > `navigator.language` (es-* → ES, otro → EN) > ES default.
- Tres patrones de marcado (elegir según el caso):
  - **`data-i18n="grupo.clave"`** — texto fijo que vive en `_data/i18n.yml`. El JS reemplaza `textContent`.
  - **`data-i18n-en="Texto inglés"`** — texto plano inline (sin HTML). El JS reemplaza `textContent`. Útil para copy puntual largo donde una key i18n sería overhead.
  - **`data-i18n-en-html="..<strong>texto</strong>.."`** — cuando la traducción contiene HTML (negrita, enlaces, spans). El JS reemplaza `innerHTML`. **Obligatorio cuando el texto tiene tags**, sino el HTML se ve literal como texto.
- Atributos: `data-i18n-attr-aria-label="grupo.clave"`, `data-i18n-attr-placeholder="..."`, etc.
- Toggle en `_includes/header.html` con clase `.lang-toggle` — dos botones ES | EN, esquinas vivas.
- Cualquier nuevo texto comercial que se agregue al sitio debe registrarse en `i18n.yml` con ambos idiomas, o marcarse con `data-i18n-en` / `data-i18n-en-html` según el caso.

## 6. Servicios — catálogo vigente

Estructura en `_data/servicios.yml`:

```yaml
quick_win:        # WhatsApp Automation — capa de entrada ("free tier" estilo SaaS)
niveles:          # Landing → E-commerce → CRM (Mapa de Madurez)
addons:           # Branded Games + integraciones + capacitación (renderizar como "Potenciadores")
plan_cuidado:     # Básico / Estándar / Plus (mensual recurrente)
```

**Nota de naming:** la key YAML es `addons` por compatibilidad técnica, pero en TODO el copy visible se llama **"Potenciadores"** (ES) / **"Boosters"** (EN). NO renombrar la key sin migrar también `services.md` y `_data/i18n.yml`.

## 7. Reglas operativas Globant (críticas, no negociables)

1. **Laptop Globant solo para Globant.** Nunca abrir este repo en esa máquina.
2. **Horario Globant L-V 9-18 solo para Globant.** Este sitio se trabaja en noches y fines de semana.
3. **No mencionar Globant en este sitio.** Ni en LinkedIn freelance, ni en propuestas.
4. **No usar info/código/clientes de Globant.** Conocimiento general aprendido es mío; lo específico de Globant es de ellos.
5. **Filtrar clientes nuevos:** verificar que no sean clientes/competidores de Globant (Accenture, Deloitte Digital, EPAM, Capgemini, NTT Data, Endava, Encora, GFT).

Detalle completo en `~/Documents/eliasjurado.com/contexto-elias.md` sección 7b.

## 8. Workflow de delegación multi-agente (vigente y validado)

Patrón confirmado en producción el 23 may 2026 — Opus + Sonnet + Haiku trabajando en cascada sobre este mismo repo. Conservar este patrón para todas las sesiones futuras.

**Tres roles, división estricta:**

- **Opus = ORQUESTADOR + PLANEADOR.** Es la sesión que habla con Elías. Hace discovery, toma decisiones de marca/comercial/arquitectura/copy, arma el plan, redacta los briefs para Sonnet y Haiku, sintetiza outputs. El error cognitivo es caro acá.

- **Sonnet = EJECUTADOR.** Recibe brief autocontenido de Opus (paths absolutos, deliverable claro, alcance acotado). Ejecuta el cambio: refactor con criterios, marking masivo de i18n, traducciones idiomáticas, generación de componentes desde plantilla, voseo→tuteo masivo, generación de propuestas desde template. Reporta diff + observaciones ≤250 palabras. NO decide arquitectura ni copy — sigue el plan.

- **Haiku = REVISOR.** Recibe el output de Sonnet (o un cambio que Opus quiere validar antes del siguiente paso). Verifica mecánicamente: estructura YAML/JSON, referencias rotas, voseo, alineación con CLAUDE.md, completitud. Reporta lista de problemas concretos o "todo OK". NO modifica nada — solo verifica. Es ~12× más barato y rápido que Sonnet.

**Flujo estándar:**

```
Opus discute con Elías
   ↓ plan
Opus → brief autocontenido → Sonnet ejecuta → reporta diff
   ↓
Opus → brief de validación → Haiku revisa → reporta OK / problemas
   ↓
Opus sintetiza al user (todo OK / hay que iterar)
```

Si Haiku encuentra problemas, Opus arma fix-brief y delega a Sonnet de nuevo. Haiku revalida. Repetir hasta "todo OK". Este loop es barato y seguro.

**Cómo invocarlos:** desde una sesión con Opus, usar la `Agent` tool con `subagent_type: "general-purpose"` y `model: "sonnet"` o `"haiku"`. El prompt al subagente debe:

1. Empezar con: `"Lee /Users/jp/vcs/github/online-cv/CLAUDE.md ANTES de cualquier acción. Si la tarea es ambigua, lee también /Users/jp/Documents/eliasjurado.com/contexto-elias.md."`
2. Describir la tarea con paths absolutos exactos, no relativos.
3. Especificar el deliverable (qué archivos modificar, qué reportar, en cuántas palabras).
4. Acotar el alcance: "no toques X, no agregues Y".
5. Repetir las reglas absolutas del CLAUDE.md (tuteo peruano, paleta, esquinas vivas).

**Tareas-tipo para Sonnet:**
- Marcado masivo de textos con `data-i18n` en archivos puntuales (validado 23 may).
- Conversión de YAML a estructura bilingüe `{es, en}` + actualización de templates Liquid (validado 23 may — 72 campos en `servicios.yml`).
- Refactor de componentes con criterios explícitos (validado: 4 cols → journey, agregar strips, etc.).
- Generación de nuevos casos de portfolio desde plantilla.
- Voseo→tuteo masivo siguiendo un patrón.

**Tareas-tipo para Haiku:**
- Validación sintáctica de YAML/JSON tras cambios grandes (validado 23 may — 16 segundos, 4 tool uses).
- Cross-reference: keys `data-i18n` usadas en HTML vs disponibles en `i18n.yml`.
- Búsqueda con grep masivo (voseo, referencias rotas) + reporte estructurado.
- Renombrado batch de archivos o claves.
- Conteo y listado: "cuántas apariciones de X en N archivos".

**Patrones de colaboración Sonnet + Haiku (validados):**

1. **Sonnet escribe, Haiku valida.** Sonnet hace una conversión grande; Haiku verifica que la estructura está completa, que no hay referencias rotas, que el voseo quedó limpio. Es el patrón más usado.
2. **Haiku pre-procesa, Sonnet decide.** Haiku lista todo lo que existe; Sonnet decide qué agregar/modificar.
3. **Sonnet planifica el patrón, Haiku lo aplica.** Sonnet define un patrón de cambio; Haiku lo replica en N archivos.

**Reglas operativas del workflow:**

- **El brief al subagente siempre se acota a ≤250 palabras de reporte.** Sin código, solo factos. Evita inflar tokens del subagente.
- **Cada cambio grande de Sonnet se valida con Haiku** antes de pasar al siguiente paso. Es seguro y barato.
- **Las decisiones de copy comercial, naming o arquitectura las toma Opus contigo.** Los subagentes NO inventan estructura — la siguen.
- **Si Sonnet/Haiku falla por session limit u otro,** Opus completa la tarea inline en su próxima oportunidad. No se reintenta automáticamente.

## 8b. NO generar PDFs en sesión

Decisión operativa del 24 may 2026: **los subagentes y Opus NO deben generar archivos PDF**. WeasyPrint y otros generadores headless no respetan el CSS de impresión del repo (paginan incorrectamente, no aplican `overflow: hidden` para limitar páginas, distorsionan fuentes y márgenes). El resultado siempre se ve peor que el HTML original.

**El flujo correcto es:** Opus/Sonnet genera el HTML siguiendo el template luxury black. El usuario lo abre en Chrome y usa Cmd+P → "Guardar como PDF" (Tamaño A4, Márgenes Ninguno, Imprimir gráficos de fondo activado). Chrome respeta correctamente el CSS de impresión y paginación.

El bloque `.help` (con clase `.no-print`) que vive arriba de la primera `.page` ya recuerda este flujo al usuario.

## 9. Pendientes activos del sitio (al 23 may 2026)

1. Probar build local con `docker-compose up` o `jekyll serve` y validar:
   - Layout de 4 cols en /services/ (Quick Win negro a la izquierda).
   - Strip de Potenciadores visible debajo de las 4 cards.
   - Toggle ES|EN funciona y persiste en localStorage.
   - Detección automática por OS (es-* → ES, otro → EN).
2. Marcar el resto de textos del sitio con `data-i18n` (Sonnet puede hacer esto siguiendo el patrón ya establecido en footer.html y header nav).
3. Commit + push a main del bloque de cambios pricing + i18n + Potenciadores.
4. Probar performance: el script i18n.js debe correr antes del primer paint o aceptar un FOUC brevísimo.

---

*Última actualización: 23 may 2026. Mantener este archivo al día con cada decisión de marca o estructura. Si dudás, lee `~/Documents/eliasjurado.com/contexto-elias.md`.*
