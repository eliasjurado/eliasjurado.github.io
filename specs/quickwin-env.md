# Quick Win — Variables de entorno

Crear `quickwin-pilot/.env` con estos valores (NO en el repo, NO committear):

```env
# ── Supabase ──────────────────────────────────────────────────────────────────
# Obtener de: Supabase Dashboard → Project Settings → API
SUPABASE_URL=https://[project-ref].supabase.co
SUPABASE_ANON_KEY=eyJ...   # anon/public key
SUPABASE_SERVICE_KEY=eyJ...  # service_role key (tiene permisos totales)
SUPABASE_DB_PASSWORD=       # password de la DB (para conexión directa)

# ── WhatsApp Cloud API ────────────────────────────────────────────────────────
# Obtener de: Meta for Developers → App → WhatsApp → API Setup
# El token permanente se genera en: App → System Users → Generate Token
WHATSAPP_PHONE_NUMBER_ID=   # ID numérico de la línea dedicada
WHATSAPP_TOKEN=EAAT...       # access token permanente
WHATSAPP_VERIFY_TOKEN=<elige-uno>   # el que elijas para el webhook

# ── Notificaciones (para el handoff) ──────────────────────────────────────────
WHATSAPP_PERSONAL=51920050617   # número personal de Elías (recibe notificaciones)

# ── Línea dedicada (para referencias) ─────────────────────────────────────────
WHATSAPP_DEDICATED=51977822333
```
