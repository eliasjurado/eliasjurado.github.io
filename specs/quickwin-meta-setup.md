# Meta Business Setup — Quick Win WhatsApp

> **Tiempo estimado:** 20-30 min. Es el paso más tedioso del piloto, pero se hace
> una sola vez. Apenas termines, el bot empieza a funcionar.

---

## Paso 1 — Verificación de negocio (si no la tienes)

1. Ve a [business.facebook.com](https://business.facebook.com)
2. Crea o entra a tu Business Account (la que usas para ads o la que sea)
3. Settings → Business Info → Complete los datos (nombre, dirección, web, email)
4. **Verificación:** Business Settings → Security Center → Business Verification
   - Sube RUC (10434645421) o DNI
   - Tener la web eliasjurado.com activa ayuda
   - Meta verifica en 1-5 días hábiles (a veces horas)

> Si tu cuenta ya está verificada (tienes ads running), salta este paso.

---

## Paso 2 — Crear App de WhatsApp

1. Ve a [developers.facebook.com](https://developers.facebook.com)
2. Mis Apps → Crear App → **"Business"** (es importante, no "Consumer")
3. Nombre: `QuickWin-Pilot` (o como quieras)
4. Contacto: tu email
5. Agregar producto: **WhatsApp** → Set Up

---

## Paso 3 — Registrar la línea dedicada (+51 977 822 333)

En la configuración de WhatsApp de tu app:

1. **Create Sender** → Phone Number
2. Ingresa: `+51 977 822 333`
3. Elige cómo recibes el código de verificación:
   - **SMS** (Meta envía un código al número) — recomendado
   - Llamada telefónica
4. Ingresa el código que recibas
5. Una vez verificado, el número queda registrado

**Importante:** desde este momento, el número +51 977 822 333 YA NO funciona en la app
de WhatsApp normal. Solo vive dentro de la Cloud API.

---

## Paso 4 — Obtener credenciales

En la misma página de WhatsApp → API Setup:

| Qué necesitas | Dónde está |
|---|---|
| **Phone Number ID** | Justo debajo del número registrado |
| **Temporary Token** | Al lado del Phone Number ID (expira en 24h — no usar para producción) |
| **Permanent Token** | App → System Users → Add System User → Admin → Generate Token → Seleccionar WhatsApp → Permissions: `whatsapp_business_messaging` + `whatsapp_business_management` |

**El token permanente es el que va en el `.env` como `WHATSAPP_TOKEN`.**

---

## Paso 5 — Configurar Webhook

En la misma página, sección **Webhook**:

1. **Callback URL:** `https://[tu-vps-o-dominio]/webhook/whatsapp`
   - Si n8n está en `https://n8n.tudominio.com`, sería `https://n8n.tudominio.com/webhook/whatsapp`
2. **Verify Token:** `ELIAS_QUICKWIN_2026` (el mismo que pusiste en el `.env` y en n8n)
3. **Webhook Fields** — marcar:
   - `messages` (obligatorio)
   - `message_deliveries` (opcional pero útil)
4. **Verify and Save** — Meta hace un GET con `hub.challenge`; si n8n responde OK, queda conectado.

---

## Paso 6 — Configurar template de mensaje (opcional pero recomendado)

Para que el bot pueda enviar **el primer mensaje** a un nuevo contacto, necesitas un
template aprobado por Meta:

1. En la app de WhatsApp → **Message Templates** → Create Template
2. Categoría: **Utility**
3. Nombre: `bienvenida_quickwin`
4. Idioma: Español
5. Cuerpo: `¡Hola {{1}}! Soy el asistente de Estudio Elías Jurado. Escríbeme cualquier consulta sobre servicios, precios o proyectos. Estoy aquí para ayudarte.`

Sin template, el bot solo puede responder cuando el usuario ya escribió primero
(dentro de la ventana de servicio de 24h, que es gratis).

---

## Resumen checklist

- [ ] Business Account verificada (o en proceso)
- [ ] App de WhatsApp creada (tipo Business)
- [ ] Número +51 977 822 333 registrado y verificado
- [ ] Token permanente generado → `.env`
- [ ] Phone Number ID copiado → `.env`
- [ ] Webhook configurado apuntando al endpoint de n8n
- [ ] Template de mensaje creado (opcional)

Cuando termines estos pasos, dime el **Phone Number ID** y el **Permanent Token**
(por el chat, no escribirlos en el repo) y yo los pongo en el `.env`.
