# Quick Win — Plan operativo

> Todo lo que necesitas para manana en un solo lugar.

---

## Manana: 3 pasos que haces tu (30 min)

1. **Verificar negocio en Meta** (si no esta) -> [guia](quickwin-meta-setup.md)
2. **Crear App WhatsApp + registrar numero** -> [guia pasos 2-4](quickwin-meta-setup.md)
3. **Configurar webhook** -> [guia paso 5](quickwin-meta-setup.md)

Al terminar, me pasas:
- Phone Number ID
- Permanent Token
- Supabase URL + Service Key (si creas proyecto nuevo)

---

## Lo que esta listo (yo ya lo hice)

| Archivo | Que es |
|---|---|
| `_config.yml` | + `contact.whatsapp_demo: 51977822333` |
| `_includes/whatsapp-cta.html` | Nuevo CTA flotante a la linea dedicada |
| `_layouts/default.html` | Ahora incluye el CTA en vez del demo |
| `_data/i18n.yml` | + `cta.whatsapp` para ES/EN |
| `specs/09-quickwin-pilot-spec.md` | Spec completa del piloto |
| `specs/quickwin-supabase-schema.sql` | SQL para las 4 tablas (copia y pega en Supabase) |
| `specs/quickwin-n8n-workflow.md` | Config del workflow n8n nodo por nodo |
| `specs/quickwin-meta-setup.md` | Guia paso a paso para Meta |
| `specs/quickwin-env.md` | Template `.env` con todas las variables |

---

## Despues de Meta: lo que hacemos juntos (30 min)

1. Pegas el SQL de `quickwin-supabase-schema.sql` en Supabase SQL Editor -> Run
2. Configuramos el workflow en n8n siguiendo `quickwin-n8n-workflow.md`
3. Metemos las credenciales en el `.env`
4. Probamos: escribes a la linea dedicada desde tu celular
5. Si funciona, hacemos commit y push de los cambios del sitio

---

El piloto arranca esta semana si manana haces los 3 pasos de Meta.
