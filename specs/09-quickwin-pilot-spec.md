# Spec — Quick Win Pilot en eliasjurado.com

> **Propósito:** implementar el Quick Win (Automatización por WhatsApp) como piloto
> en el propio sitio de Elías. Dogfooding: operar el producto antes de venderlo con
> convicción. Vertebra los 6 intents que ya existen como demo client-side, pero con
> backend real: Cloud API + n8n + Supabase.
>
> Esta spec es el plano. La guía operativa completa está en
> `05-operacion/guia-quickwin-whatsapp-piloto.md`.

---

## 1. Estado actual vs. estado deseado

| | Hoy (solo demo) | Target (piloto en producción) |
|---|---|---|
| **Chat** | Demo JS client-side, 6 intents simulados, `wa.me` al final | Bot real respondiendo por WhatsApp Cloud API |
| **Captura** | Cero — el demo no guarda nada | Leads estructurados a Supabase |
| **Handoff** | Link wa.me genérico | Escala a humano + notificación a Elías |
| **Panel** | No existe | Vista de conversaciones activas + leads capturados |
| **Métrica** | Cero | % resuelto por bot, tiempo de respuesta, leads/día |
| **Número** | +51 920 050 617 (el personal de Elías) | Línea dedicada nueva para el piloto |

---

## 2. Arquitectura

```
eliasjurado.com (Jekyll / GH Pages)
       │  CTA "Chatear por WhatsApp"
       ▼
Usuario escribe a línea dedicada (+51 XXX XXX XXX)
       │
       ▼
WhatsApp Cloud API (Meta)
       │  webhook POST
       ▼
n8n (VPS Elías)
  ├── Router de intents (LLM + keyword fallback)
  ├── Handler Servicios
  ├── Handler Precios
  ├── Handler Cotización (captura a Supabase)
  ├── Handler Portafolio
  ├── Handler Proceso
  ├── Handler Humano (notifica a Elías)
  │
  ├──▶ Supabase
  │     ├── contactos (nombre, teléfono, fuente, label)
  │     ├── conversaciones (sesión, estado, último intent)
  │     └── mensajes (rol, texto, timestamp)
  │
  └──▶ Panel (v1 = Supabase Studio / v2 = UI propia)
            └── Conversaciones activas + leads + handoff
```

**Stack confirmado:**
- **WhatsApp Cloud API** (Meta oficial) — nunca OpenWA/Baileys, no arriesgar el número.
- **n8n** self-hosted en el VPS de Elías (mismo que corre otros servicios).
- **Supabase** — mismo proyecto de desarrollo (nueva schema `quickwin_pilot`), o proyecto separado.
- **Línea dedicada** — SIM/eSIM nueva, NO el número personal de Elías.

---

## 3. Los 6 intents (adaptados para eliasjurado.com)

Son los mismos del demo JS, pero con backend real. Cada intent tiene:

- **Trigger:** frase clave detectada por LLM/router
- **Flujo n8n:** respuesta + opciones de seguimiento
- **Captura:** qué datos guardar en Supabase
- **Handoff:** cuándo pasa a humano

### Intent 1 — Servicios
**Trigger:** "qué haces", "servicios", "qué ofreces", "en qué trabajas"
**Respuesta:** lista los 4 servicios (QW, Landing, E-commerce, CRM) con una línea cada uno
**Captura:** qué servicio mencionó el lead
**Siguientes:** Precios, Cotización, Portafolio

### Intent 2 — Precios
**Trigger:** "cuánto cuesta", "precios", "tarifas", "presupuesto"
**Respuesta:** rangos referenciales (QW USD 400, Landing USD 800, E-commerce USD 2,000, CRM USD 5,000) + "depende del alcance"
**Captura:** qué precio le interesó
**Siguientes:** Cotización, Portafolio

### Intent 3 — Cotización (nodo de captura crítica)
**Trigger:** "cotización", "quiero contratar", "trabajemos", "necesito"
**Respuesta:** pide 3 datos: (1) qué tiene hoy, (2) a qué se dedica, (3) qué necesita
**Captura:** nombre, teléfono, respuestas → `leads` table
**Handoff:** notifica a Elías por WhatsApp + email

### Intent 4 — Portafolio
**Trigger:** "portafolio", "trabajos", "clientes", "proyectos", "dónde has trabajado"
**Respuesta:** Hanna, Donaire, Foti (cada uno con una línea) + link al portafolio del sitio
**Captura:** qué caso le interesó
**Siguientes:** Cotización, Hablar con Elías

### Intent 5 — Proceso
**Trigger:** "cómo trabajas", "proceso", "método", "pasos", "metodología"
**Respuesta:** diagnóstico → propuesta → construcción por hitos → medición
**Captura:** —
**Siguientes:** Cotización, Servicios

### Intent 6 — Hablar con Elías (handoff)
**Trigger:** "hablar con Elías", "humano", "quiero hablar", "asesoría"
**Respuesta:** avisa que lo pasa con Elías + notifica
**Handoff:** mensaje interno a Elías + link a la conversación en el panel
**Captura:** marca conversación como `needs_human`

### Fallback (no match)
**Respuesta:** "No entendí bien. ¿Sobre cuál de estos necesitas ayuda?" + menu de 6 opciones.
**Captura:** guarda el mensaje no reconocido para revisión (mejora continua).

---

## 4. Supabase schema

### Table `quickwin_pilot.contactos`
| columna | tipo | descripción |
|---|---|---|
| id | uuid PK | |
| wa_id | text | número WhatsApp (único) |
| nombre | text | nombre del contacto (si lo da) |
| fuente | text | `web_eliasjurado`, `directo` |
| tags | text[] | `['lead_caliente', 'pidio_precios']` |
| created_at | timestamptz | |
| last_seen | timestamptz | |

### Table `quickwin_pilot.conversaciones`
| columna | tipo | descripción |
|---|---|---|
| id | uuid PK | |
| contacto_id | uuid FK → contactos | |
| estado | text | `activa`, `resuelta`, `escalada`, `pendiente` |
| intent_actual | text | último intent ejecutado |
| metadata | jsonb | datos capturados (respuestas, preferencias) |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### Table `quickwin_pilot.mensajes`
| columna | tipo | descripción |
|---|---|---|
| id | uuid PK | |
| conversacion_id | uuid FK → conversaciones | |
| rol | text | `bot`, `user`, `agent` |
| texto | text | |
| intent | text | qué intent procesó esto |
| raw_webhook | jsonb | payload original de Meta |
| created_at | timestamptz | |

### Table `quickwin_pilot.leads`
| columna | tipo | descripción |
|---|---|---|
| id | uuid PK | |
| contacto_id | uuid FK → contactos | |
| negocio | text | "a qué se dedica" |
| situacion_actual | text | "qué tiene hoy" |
| necesidad | text | "qué necesita" |
| lead_score | int | 1-5 |
| contacted_at | timestamptz | cuándo Elías respondió |
| converted | boolean | |

---

## 5. Flujo n8n (un workflow, 6+ routers)

### Estructura del workflow

```
[Webhook] ← POST de Cloud API
    │
    ▼
[Set headers] ← verificar token de webhook
    │
    ▼
[Router: LLM Classifier]
    ├─ "servicios"     ──▶ [Sub-workflow: Servicios]       ──▶ [Set estado] ──▶ [Response]
    ├─ "precios"       ──▶ [Sub-workflow: Precios]         ──▶ [Set estado] ──▶ [Response]
    ├─ "cotizacion"    ──▶ [Sub-workflow: Cotización]      ──▶ [Set estado] ──▶ [Response]
    ├─ "portafolio"    ──▶ [Sub-workflow: Portafolio]      ──▶ [Set estado] ──▶ [Response]
    ├─ "proceso"       ──▶ [Sub-workflow: Proceso]         ──▶ [Set estado] ──▶ [Response]
    ├─ "humano"        ──▶ [Sub-workflow: Handoff]         ──▶ [Notificar] ──▶ [Response]
    └─ fallback        ──▶ [Menú genérico]                 ──▶ [Set estado] ──▶ [Response]
                              │
                              ▼
                         [Supabase: guardar mensaje + actualizar estado]
```

**Clasificador:** usar OpenAI API (o LLM local si da el ancho) con un system prompt que categoriza el mensaje del usuario en uno de los 6 intents. Costo estimado: ~USD 0.002 por clasificación (GPT-4o-mini). Alternativa: keyword matching + regex para fase inicial (gratis, menos preciso).

### Handoff a humano
Cuando el bot detecta `intent = humano`, o cuando el usuario insiste 2+ veces en lo mismo sin resolver:
1. Marca `conversaciones.estado = 'escalada'`
2. Envía notificación a Elías por WhatsApp (segundo número) o email:
   - "🔔 *Nuevo lead caliente*: [nombre] quiere hablar.
     📱 [teléfono] · 💬 [último mensaje]
     👉 [link al panel]"
3. Elías responde desde el panel (o desde su WhatsApp si el panel v1 es básico)

---

## 6. Integración con eliasjurado.com

### Lo que cambia

| Componente | Cambio |
|---|---|
| `_includes/whatsapp-demo.html` | Se reemplaza el demo JS por un CTA que abre WhatsApp directo a la línea dedicada. El demo actual se conserva como página de portafolio del producto. |
| `_layouts/default.html` | Incluye el nuevo CTA flotante en lugar del demo |
| `_config.yml` | Nueva variable `whatsapp_dedicated` con el número de la línea piloto |
| `services.md` | El detalle del Quick Win ahora dice "En producción en mi propio sitio" (prueba social) |

### El demo actual no se pierde
El `whatsapp-demo.html` se mueve a una página de portafolio (`/quickwin-demo/`) como muestra de lo que el producto puede hacer. Sigue siendo demo client-side pero ahora es material de venta, no la interfaz principal.

### CTA flotante (reemplazo)
```html
<!-- En _includes/whatsapp-cta.html -->
<div id="wa-cta">
  <a href="https://wa.me/{{ site.whatsapp_dedicated }}" target="_blank" rel="noopener">
    <svg>...icono whatsapp...</svg>
    <span data-i18n="cta_whatsapp">Chatear por WhatsApp</span>
  </a>
</div>
```

Sin el demo interactivo — solo el link directo. El bot responde automáticamente del otro lado.

---

## 7. Panel de monitorización (v1)

### V1 — Supabase Studio (gratis, 0 desarrollo)
Elías accede a la tabla `conversaciones` filtrada por `estado = 'activa'` o `'escalada'`. Desde ahí ve:
- Últimos mensajes
- Estado de cada conversación
- Leads capturados con datos completos

### V2 — UI propia (si el piloto valida)
Una vista simple tipo dashboard:
- Bandeja de conversaciones activas
- Leads nuevos (los que pidieron cotización)
- Métricas: conversaciones/hoy, % resuelto por bot, tiempo promedio de respuesta
- Botón "tomar conversación" que marca como `en_curso`

---

## 8. Línea dedicada (requisito no-negociable)

La Cloud API "consume" el número. El piloto necesita:

- **SIM/eSIM nueva** con un número que NO sea el personal de Elías ni el de cliente en uso.
- **Costo:** ~S/ 15–25/mes (prepago), depende del operador.
- **Recomendación:** Bitel o Entel para integración con Cloud API (menos fricción que Movistar).
- La cuenta Meta Business + el número van a nombre de Elías para el piloto (para clientes futuros, van a nombre del cliente).

---

## 9. Timeline estimado

| Día | Hito |
|---|---|
| 1 | Línea dedicada activa + cuenta Meta Business verificada |
| 2 | App de WhatsApp creada + token + webhook configurado |
| 3-4 | n8n: setup + schema Supabase + flujo de router |
| 5-6 | n8n: 6 handlers + respuestas + captura |
| 7 | Handoff + notificaciones a Elías |
| 8 | Pruebas con casos reales + reemplazo del demo en el sitio |
| 9 | Capacitación (Elías aprende a leer el panel) |
| 10 | **Go-live** |

**Total:** 10 días hábiles (~2 semanas). Coherente con el plazo "2 a 3 semanas" del catálogo.

---

## 10. Costos del piloto

| Concepto | Monto |
|---|---|
| Línea dedicada (setup) | S/ 0–30 (chip nuevo) |
| Línea dedicada (mensual) | S/ 15–25/mes |
| Meta Cloud API (mensajes inbound) | **$0** (servicio = gratis en ventana 24h) |
| n8n (VPS existente) | $0 (marginal) |
| Supabase (plan gratis/pro) | $0–25/mes |
| OpenAI API (clasificación LLM) | ~$1–3/mes estimado (solo para el tráfico de Elías) |
| **Inversión inicial única** | **~$0 (infra existente) + tiempo de Elías** |
| **Costo operativo mensual** | **~$5–30** |

El costo real es tiempo de setup. La operación mensual es marginal.

---

## 11. Qué medir (validación del piloto)

Estos números definen si el Quick Win es viable como producto vendible:

| Métrica | Objetivo | Por qué |
|---|---|---|
| % resuelto por bot | >70% | Si el bot resuelve <50%, el producto no libera tiempo |
| Tiempo de respuesta | <30s | Vs. minutos/horas si Elías responde a mano |
| Leads capturados/día | — | Línea base para proyectar valor |
| Handoffs a humano | <30% | Más de 30% = el producto escala pobremente |
| Incidencias/semana | <1 | Cada vez que se rompe = costo oculto |
| Tiempo de soporte/mes | <2h | Para que el Plan Cuidado sea rentable |

---

## 12. Riesgos y mitigaciones

| Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|
| Meta rechaza verificación de negocio | Media | Alto | Usar documentos de Elías (RUC, web, redes). Tener DNI a mano. |
| Clasificador LLM alucina intents | Baja | Medio | Log de todos los mensajes + revisión semanal. Fallback a menú explícito. |
| Elías descuida el panel y el piloto no mide | Media | Alto | Automatizar notificación de leads por WhatsApp (no depender del panel). |
| Clientes escriben al número personal en vez de la línea dedicada | Alta | Bajo | Redirigir desde el personal con un mensaje automático de Google Messages / responder "escríbeme acá". |
| El bot recibe spam/irrelevante | Media | Bajo | Ignorar mensajes de números no reconocidos. Capturar igual pero no notificar. |

---

## 13. Abierto / por decidir

- **Clasificador:** ¿OpenAI GPT-4o-mini o keyword matching v1? OpenAI da mejor experiencia, keyword es gratis.
- **Panel v1:** ¿Supabase Studio directo o una UI liviana (Next.js / Retool)?
- **Mensajes de bienvenida:** ¿El bot saluda automáticamente cuando un nuevo contacto escribe, o espera el primer mensaje? (Cloud API permite enviar mensajes proactivos solo en ventana de 24h).
- **Número de la línea dedicada:** ¿Bitel? ¿Entel? ¿Cuál tiene mejor integración con Cloud API desde Perú?
- **¿Unificar con el Supabase de Hanna/Donaire o proyecto separado?** Separado = más limpio para el piloto.

---

## 14. Entregables de esta spec

1. Línea dedicada activa
2. Cuenta Meta Business verificada + App de WhatsApp
3. n8n con workflow de router + 6 handlers
4. Supabase schema (3-4 tablas)
5. Reemplazo del demo en el sitio por CTA directo
6. Demo original movido a `/quickwin-demo/`
7. Panel v1 funcional (Supabase Studio o UI)
8. 2 semanas de monitoreo + reporte de métricas
9. Decisión: ¿el Quick Win es producto vendible o necesita ajustes?
