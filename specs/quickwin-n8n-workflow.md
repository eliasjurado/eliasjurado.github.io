# n8n Workflow — Quick Win WhatsApp Bot

> **Propósito:** workflow que recibe webhooks de WhatsApp Cloud API, clasifica el
> mensaje por keywords, responde automáticamente y guarda todo en Supabase.
>
> **Costo:** $0 (sin OpenAI, clasificador por keywords + regex).
>
> **Cómo importar:** en n8n, Create New Workflow → Import from JSON (si usas la
> export) o recrear siguiendo este documento nodo por nodo.

---

## 1. Arquitectura del workflow

```
[1. Webhook]
    Recibe POST de WhatsApp Cloud API
    │
    ▼
[2. Set Headers]
    Verifica token del webhook
    │
    ▼
[3. IF: verificación Meta]
    └─ Si mode=subscribe & token coincide → responde 200 con challenge
    └─ Si no → procesa mensaje
    │
    ▼
[4. Extract]
    Extrae: wa_id, nombre (si viene), texto del mensaje, message_id
    │
    ▼
[5. Switch: Router de intents]
    ├─ keyword "servicio/ofert/haces/trabajas/que haces"          → Intent: servicios
    ├─ keyword "precio/cuanto/cuesta/tarifa/presupuesto/valor"     → Intent: precios
    ├─ keyword "cotizacion/cotizar/contratar/propuesta/trabajemos" → Intent: cotizacion
    ├─ keyword "portafolio/trabajos/proyectos/clientes/casos"      → Intent: portafolio
    ├─ keyword "proceso/metodo/como trabajas/pasos/metodologia"    → Intent: proceso
    ├─ keyword "humano/hablar/elias/persona/asesor/ayuda"          → Intent: humano
    └─ fallback                                                     → Intent: fallback
    │
    ▼ (cada rama)
[6. Supabase: guardar/actualizar]
    ├─ Upsert contacto (wa_id)
    ├─ Buscar conversación activa o crear nueva
    └─ Insertar mensaje (rol: user)
    │
    ▼
[7. Set Response]
    Texto de respuesta según intent + opciones de seguimiento
    │
    ▼
[8. Supabase: guardar respuesta]
    Insertar mensaje (rol: bot)
    │
    ▼
[9. WhatsApp Cloud API: send message]
    POST a /v22.0/{phone_number_id}/messages
    │
    ▼
[10. Responder 200 al webhook]
```

---

## 2. Nodo 1 — Webhook

```
Method: POST
Path: /webhook/whatsapp
Options:
  - Response Mode: Last Node
  - Respond to Webhook: Automatically
```

URL del webhook (para Meta): `https://tudominio.com/webhook/whatsapp`

---

## 3. Nodo 2 — Set Headers (verificación)

Este nodo solo se activa cuando Meta envía la verificación inicial (GET request).

**IF Node condition:**
```
{{ $json.query["hub.mode"] === "subscribe" && $json.query["hub.verify_token"] === "ELIAS_QUICKWIN_2026" }}
```

**Then:** Responder con `{{ $json.query["hub.challenge"] }}`
**Else:** Continuar al procesamiento de mensajes.

> El `verify_token` lo defines tú. Llévalo a `_config.yml` como `meta_verify_token` o mantenlo
> como variable de entorno en n8n. El mismo valor se pone en el panel de Meta al configurar
> el webhook.

---

## 4. Nodo 3 — Extract (datos del mensaje)

Usar **Set** node o **Function** node para extraer:

```javascript
// Function node: Extract message data
const entry = $json.entry?.[0];
const change = entry?.changes?.[0];
const value = change?.value;

const messages = value?.messages;
const message = messages?.[0];
const contact = value?.contacts?.[0];

return {
  wa_id: contact?.wa_id || message?.from || '',
  profile_name: contact?.profile?.name || '',
  message_text: message?.text?.body || '',
  message_id: message?.id || '',
  message_type: message?.type || 'text',
  timestamp: message?.timestamp || '',
  phone_number_id: value?.metadata?.phone_number_id || '',
};
```

---

## 5. Nodo 4 — Router de intents (Switch node)

Usar un **Switch** node con modo `Expression`. Cada ruta evalúa el texto del mensaje contra keywords.

**Modo:** Expression
**Expression:** `{{ $json.message_text.toLowerCase() }}`

**Rutas (valores de regex):**

| Ruta | Regex | Intent |
|---|---|---|
| 0 | `\b(servicios?|ofertas?|haces|trabajas?|que haces|consultoría)\b` | servicios |
| 1 | `\b(precios?|cuanto cuesta|cuesta|tarifas?|presupuesto|valor|inversión|costo)\b` | precios |
| 2 | `\b(cotización|cotizar|contratar|propuesta|trabajemos|necesito|quiero contratar|presupuesto)\b` | cotizacion |
| 3 | `\b(portafolio|trabajos|proyectos|clientes|casos|experiencia|trabajado)\b` | portafolio |
| 4 | `\b(proceso|método|como trabajas|pasos|metodología|trabajan|como funciona)\b` | proceso |
| 5 | `\b(humano|hablar con|elías|persona|asesor|ayuda|atención|contactar|quiero hablar)\b` | humano |
| 6 | fallback (default) | fallback |

> Si el mensaje activa múltiples rutas, n8n ejecuta la primera coincidencia (orden 0→6).
> Pon los más específicos primero (ej. "cotización" antes que "precio").

---

## 6. Respuestas por intent

### Intent 0 — Servicios
```
¡Hola! Soy el asistente de Elías Jurado. Te ayudo al toque.

Trabajo cuatro servicios principales:

▸ *Automatización por WhatsApp* — responde y captura leads sin que estés pegado al celular.
▸ *Landing / Sitio web* — una página profesional que capta clientes.
▸ *E-commerce* — vende tu catálogo 24/7.
▸ *CRM* — ordena clientes y procesos cuando ya creciste.

¿Sobre cuál te gustaría saber más?
```

**Botones de seguimiento:** `Precios`, `Cotización`, `Portafolio`

### Intent 1 — Precios
```
Para que te ubiques, los rangos referenciales son:

• WhatsApp Automation: desde *USD 400*
• Landing / Sitio web: desde *USD 800*
• E-commerce: desde *USD 2,000*
• CRM: desde *USD 5,000*

El precio justo lo defino después de entender tu caso — así no te cobro de más ni de menos.
```

**Botones de seguimiento:** `Cotización`, `Portafolio`, `Servicios`

### Intent 2 — Cotización (captura crítica)
```
Perfecto, te ayudo con una cotización.

Para aterrizarla necesito 3 datos:

1️⃣ *¿Qué tienes hoy?* — web, solo redes, nada, ¿algo funcionando?
2️⃣ *¿A qué se dedica tu negocio?*
3️⃣ *¿Qué te gustaría lograr?*

Cuéntame y preparo una propuesta a tu medida.
```

Cuando el usuario responde los 3 datos:
- Guardar en tabla `leads`
- Notificar a Elías vía email + WhatsApp personal

### Intent 3 — Portafolio
```
Algunos proyectos en producción:

• *Hanna Comida Árabe* — tienda online con pedidos por WhatsApp
• *Joyería Donaire* — e-commerce con catálogo dinámico
• *Estudio Foti* — automatización de WhatsApp para estudio jurídico

Puedes verlos en mi portafolio: https://eliasjurado.com/portfolio/
```

**Botones de seguimiento:** `Cotización`, `Hablar con Elías`

### Intent 4 — Proceso
```
Trabajo en 4 pasos sencillos:

1️⃣ *Diagnóstico* — conversación de 30 min, sin compromiso, entiendo tu caso.
2️⃣ *Propuesta* — te envío alcance, precio y cronograma por escrito.
3️⃣ *Construcción* — desarrollo con entregas por hitos. Siempre ves avance.
4️⃣ *Cuidado* — una vez en vivo, el Plan Cuidado mantiene todo funcionando.

Plazos típicos: WhatsApp 2-3 semanas, landing 1-2 semanas, e-commerce 6-10 semanas.
```

**Botones de seguimiento:** `Cotización`, `Servicios`

### Intent 5 — Humano (handoff)
```
Perfecto, te paso con Elías. En un momento te escribe directamente.

Mientras tanto, cuéntame rápidamente: ¿sobre qué proyecto te gustaría conversar?
```

**Acción interna:**
- Marcar `conversaciones.estado = 'escalada'`
- Enviar notificación a Elías (teléfono personal):
  "🔔 *Lead listo para hablar*: [nombre] · wa.me/[número]
   💬 "[último mensaje]" → [link a Supabase]"

### Fallback
```
No terminé de entender. ¿Sobre cuál de estos te ayudo?

1. Servicios
2. Precios
3. Cotización
4. Portafolio
5. Proceso de trabajo
6. Hablar con Elías

Responde el número o la opción que te interese.
```

---

## 7. Supabase — operaciones vía API

n8n se conecta a Supabase vía HTTP Request nodes (no necesita librería especial).

### Config: HTTP Request base
```
URL: https://[project-ref].supabase.co/rest/v1/
Headers:
  apikey: [anon key]
  Authorization: Bearer [service_role key]
  Content-Type: application/json
  Prefer: return=minimal
```

### Operación: Upsert contacto
```
POST /quickwin_pilot/contactos
Body:
{
  "wa_id": "{{ $json.wa_id }}",
  "nombre": "{{ $json.profile_name }}"
}
Headers:
  Prefer: resolution=merge-duplicates
```

### Operación: Buscar conversación activa
```
GET /quickwin_pilot/conversaciones?contacto_id=eq.{{ $json.contacto_id }}&estado=eq.activa&order=created_at.desc&limit=1
```

### Operación: Crear conversación
```
POST /quickwin_pilot/conversaciones
Body:
{
  "contacto_id": "{{ $json.contacto_id }}",
  "estado": "activa",
  "intent_actual": "{{ $json.intent }}"
}
```

### Operación: Insertar mensaje
```
POST /quickwin_pilot/mensajes
Body:
{
  "conversacion_id": "{{ $json.conversacion_id }}",
  "rol": "user|bot",
  "texto": "{{ $json.texto }}",
  "intent": "{{ $json.intent }}"
}
```

### Operación: Actualizar estado de conversación
```
PATCH /quickwin_pilot/conversaciones?id=eq.{{ $json.conversacion_id }}
Body:
{
  "estado": "escalada",
  "intent_actual": "humano"
}
```

### Operación: Insertar lead
```
POST /quickwin_pilot/leads
Body:
{
  "contacto_id": "{{ $json.contacto_id }}",
  "negocio": "{{ $json.respuesta_1 }}",
  "situacion_actual": "{{ $json.respuesta_2 }}",
  "necesidad": "{{ $json.respuesta_3 }}"
}
```

---

## 8. Enviar respuesta por WhatsApp Cloud API

### HTTP Request Node
```
Method: POST
URL: https://graph.facebook.com/v22.0/{{ $json.phone_number_id }}/messages
Headers:
  Authorization: Bearer {{ $env.WHATSAPP_TOKEN }}
  Content-Type: application/json
Body:
{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "{{ $json.wa_id }}",
  "type": "text",
  "text": { "body": "{{ $json.respuesta }}" }
}
```

> `WHATSAPP_TOKEN` = access token permanente de la app de WhatsApp (no el token temporal).
> Se obtiene del panel de Meta → WhatsApp → API Setup → Token.
> Se expira cada 24h salvo que generes un token de sistema permanente.

### Para enviar botones (interactive reply):
```json
{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "{{ $json.wa_id }}",
  "type": "interactive",
  "interactive": {
    "type": "button",
    "body": { "text": "{{ $json.respuesta }}" },
    "action": {
      "buttons": [
        { "type": "reply", "reply": { "id": "precios", "title": "Precios" } },
        { "type": "reply", "reply": { "id": "cotizar", "title": "Cotizar" } }
      ]
    }
  }
}
```

> Los botones interactivos SOLO funcionan si el negocio tiene *Tier de calidad* aprobado
> (requiere verificación de negocio). Si no, usar texto plano con opciones numeradas.

---

## 9. Contexto conversacional (manejo de multi-turno)

Para que el bot recuerde el contexto (ej. usuario dice "cuéntame más" después de "Servicios"):

### En el extract node, incluir:
```javascript
// Verificar si es respuesta a un botón interactivo
const interactive = message?.interactive;
const buttonReply = interactive?.button_reply;
const listReply = interactive?.list_reply;

return {
  // ... datos anteriores ...
  context_intent: buttonReply?.id || listReply?.id || '',
  is_reply: !!(buttonReply || listReply),
};
```

### En el router, si `$json.is_reply` es true:
- Si context_intent no está vacío, procesar ESE intent directamente (saltar clasificación).
- El resto del flujo es idéntico.

### Seguimiento de estado conversacional:
Actualizar `conversaciones.metadata` con un JSON:
```json
{
  "ultimo_intent": "servicios",
  "paso": 0,
  "datos_recogidos": {
    "negocio": "",
    "situacion": ""
  }
}
```

---

## 10. Notificación a Elías (handoff)

Cuando un lead escala a humano, enviar notificación vía WhatsApp personal:

### HTTP Request Node
```
POST https://graph.facebook.com/v22.0/{{ phone_number_id_personal }}/messages
Body:
{
  "messaging_product": "whatsapp",
  "to": "51920050617",  ← número personal de Elías
  "type": "text",
  "text": {
    "body": "🔔 NUEVO LEAD\n📱 {{ $json.wa_id }}\n💬 {{ $json.ultimo_mensaje }}\n👉 {{ $json.link_panel }}"
  }
}
```

> Esto requiere que la Cloud API tenga DOS números registrados:
> 1. El de la línea dedicada (el bot)
> 2. El número personal de Elías (para notificaciones)
>
> Alternativa simple: usar email (SMTP node en n8n, gratuito con Gmail/Resend).
