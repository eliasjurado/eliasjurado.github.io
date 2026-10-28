-- Quick Win Pilot — Supabase Schema
-- Ejecutar en el SQL Editor de Supabase (proyecto nuevo o existente).
-- Crea schema separado para no mezclar con otros proyectos.

create schema if not exists quickwin_pilot;

-- ── CONTACTOS ─────────────────────────────────────────────────────────────────
create table quickwin_pilot.contactos (
  id          uuid primary key default gen_random_uuid(),
  wa_id       text not null unique,                -- número WhatsApp (ej. "51977822333")
  nombre      text,                                -- si el contacto lo da
  fuente      text default 'web_eliasjurado',       -- canal de origen
  tags        text[] default '{}',                  -- etiquetas: lead_caliente, pidio_precios, etc.
  metadata    jsonb default '{}',                   -- info adicional flexible
  created_at  timestamptz default now(),
  last_seen   timestamptz default now()
);

-- ── CONVERSACIONES ────────────────────────────────────────────────────────────
create table quickwin_pilot.conversaciones (
  id            uuid primary key default gen_random_uuid(),
  contacto_id   uuid not null references quickwin_pilot.contactos(id) on delete cascade,
  estado        text not null default 'activa'
                  check (estado in ('activa', 'resuelta', 'escalada', 'pendiente')),
  intent_actual text,                               -- último intent ejecutado
  metadata      jsonb default '{}',                  -- datos capturados durante la conversación
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index idx_conversaciones_contacto on quickwin_pilot.conversaciones(contacto_id);
create index idx_conversaciones_estado on quickwin_pilot.conversaciones(estado);

-- ── MENSAJES ──────────────────────────────────────────────────────────────────
create table quickwin_pilot.mensajes (
  id                uuid primary key default gen_random_uuid(),
  conversacion_id   uuid not null references quickwin_pilot.conversaciones(id) on delete cascade,
  rol               text not null check (rol in ('user', 'bot', 'agent')),
  texto             text not null,
  intent            text,                           -- qué intent procesó este mensaje
  raw_webhook       jsonb,                           -- payload original del webhook de Meta
  created_at        timestamptz default now()
);

create index idx_mensajes_conversacion on quickwin_pilot.mensajes(conversacion_id);

-- ── LEADS (captura estructurada del intent "Cotización") ──────────────────────
create table quickwin_pilot.leads (
  id              uuid primary key default gen_random_uuid(),
  contacto_id     uuid not null references quickwin_pilot.contactos(id) on delete cascade,
  negocio         text,                               -- "a qué se dedica"
  situacion_actual text,                              -- "qué tiene hoy"
  necesidad       text,                               -- "qué necesita"
  lead_score      int default 1 check (lead_score between 1 and 5),
  contacted_at    timestamptz,                        -- cuándo Elías respondió
  converted       boolean default false,
  notas           text,
  created_at      timestamptz default now()
);

-- ── FUNCIÓN: actualizar updated_at automáticamente ────────────────────────────
create or replace function quickwin_pilot.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_conversaciones_updated_at
  before update on quickwin_pilot.conversaciones
  for each row execute function quickwin_pilot.set_updated_at();

-- ── FUNCIÓN: actualizar last_seen al recibir mensaje ──────────────────────────
create or replace function quickwin_pilot.touch_contacto()
returns trigger as $$
begin
  update quickwin_pilot.contactos
  set last_seen = now()
  where id = (select contacto_id from quickwin_pilot.conversaciones where id = new.conversacion_id);
  return new;
end;
$$ language plpgsql;

create trigger trg_mensajes_touch_contacto
  after insert on quickwin_pilot.mensajes
  for each row execute function quickwin_pilot.touch_contacto();

-- ── VISTA: bandeja de conversaciones activas (para el panel) ──────────────────
create or replace view quickwin_pilot.vista_bandeja as
select
  c.id as conversacion_id,
  ct.wa_id,
  ct.nombre,
  c.estado,
  c.intent_actual,
  c.metadata,
  c.updated_at as ultima_actividad,
  (select texto from quickwin_pilot.mensajes
   where conversacion_id = c.id
   order by created_at desc limit 1) as ultimo_mensaje
from quickwin_pilot.conversaciones c
join quickwin_pilot.contactos ct on ct.id = c.contacto_id
where c.estado in ('activa', 'escalada')
order by c.updated_at desc;
