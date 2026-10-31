import { addons, niveles, pick, planCuidado, quickWin, type Bi } from "@/lib/data";

export type Grupo = "estrategias" | "potenciadores" | "cuidado";

/** Entrada unificada del catálogo: cada una tiene su página en /services/<slug>/. */
export interface Entry {
  slug: string;
  grupo: Grupo;
  icon?: string;
  badge?: Bi;
  kicker: Bi;
  name: Bi;
  sub?: Bi;
  resumen: Bi;
  detalle?: Bi;
  beneficio?: Bi;
  incluye?: Bi[];
  focus?: Bi;
  aplicaA?: Bi[];
  price: Bi;
  priceAlt: Bi;
  referencia?: string;
  plazo?: Bi;
  referencial: boolean;
}

const bi = (es: string, en: string): Bi => ({ es, en });

export const entries: Entry[] = [
  {
    slug: quickWin.slug,
    grupo: "estrategias",
    icon: quickWin.icon,
    badge: quickWin.badge,
    kicker: bi("Paso 0 · Activación inmediata", "Step 0 · Immediate activation"),
    name: quickWin.nombre_corto,
    sub: quickWin.titulo,
    resumen: quickWin.resumen,
    detalle: quickWin.detalle,
    beneficio: quickWin.beneficio,
    incluye: quickWin.incluye,
    focus: quickWin.factor_humano,
    price: bi(`Desde S/ ${quickWin.precio_pen}`, `From USD ${quickWin.precio_usd}`),
    priceAlt: bi(`≈ USD ${quickWin.precio_usd}`, `≈ PEN ${quickWin.precio_pen}`),
    referencia: quickWin.precio_referencia_usd,
    plazo: quickWin.plazo,
    referencial: true,
  },
  ...niveles.map(
    (s): Entry => ({
      slug: s.slug,
      grupo: "estrategias",
      icon: s.icon,
      kicker: bi(`Nivel ${s.nivel} · ${s.fase!.es}`, `Level ${s.nivel} · ${s.fase!.en}`),
      name: s.nombre_corto,
      sub: s.titulo,
      resumen: s.resumen,
      detalle: s.detalle,
      beneficio: s.beneficio,
      incluye: s.incluye,
      focus: s.factor_humano,
      price: bi(`Desde S/ ${s.precio_pen}`, `From USD ${s.precio_usd}`),
      priceAlt: bi(`≈ USD ${s.precio_usd}`, `≈ PEN ${s.precio_pen}`),
      referencia: s.precio_referencia_usd,
      plazo: s.plazo,
      referencial: true,
    })
  ),
  ...addons.map(
    (a): Entry => ({
      slug: a.slug,
      grupo: "potenciadores",
      icon: a.icon,
      kicker: a.kicker,
      name: a.titulo,
      resumen: a.resumen,
      detalle: a.detalle,
      aplicaA: (a.aplica_a ?? [])
        .map((slug) => niveles.find((n) => n.slug === slug)?.nombre_corto)
        .filter((x): x is Bi => Boolean(x)),
      price: bi(
        `${a.precio_es_referencial ? "Desde " : ""}S/ ${pick(a.precio_pen, "es")}`,
        `${a.precio_es_referencial ? "From " : ""}USD ${pick(a.precio_usd, "en")}`
      ),
      priceAlt: bi(`≈ USD ${pick(a.precio_usd, "es")}`, `≈ PEN ${pick(a.precio_pen, "en")}`),
      plazo: a.plazo,
      referencial: Boolean(a.precio_es_referencial),
    })
  ),
  ...planCuidado.map(
    (p): Entry => ({
      slug: p.slug,
      grupo: "cuidado",
      kicker: bi("Plan Cuidado mensual", "Monthly Care Plan"),
      name: bi(`Plan Cuidado ${p.nombre.es}`, `Care Plan ${p.nombre.en}`),
      resumen: p.incluye,
      price: bi(
        `${p.precio_es_referencial ? "Desde " : ""}S/ ${p.precio_pen}/mes`,
        `${p.precio_es_referencial ? "From " : ""}USD ${p.precio_usd}/month`
      ),
      priceAlt: bi(`≈ USD ${p.precio_usd}`, `≈ PEN ${p.precio_pen}`),
      referencial: Boolean(p.precio_es_referencial),
    })
  ),
];

// Los slugs vienen de los datos y no colisionan entre grupos; si algún día chocan, falla el build.
const seen = new Set<string>();
for (const e of entries) {
  if (seen.has(e.slug) || e.slug === "proceso") throw new Error(`Slug de servicio duplicado o reservado: ${e.slug}`);
  seen.add(e.slug);
}

export const grupoLabel: Record<Grupo, { key: string; es: string }> = {
  estrategias: { key: "services.group_estrategias", es: "Estrategias" },
  potenciadores: { key: "services.group_potenciadores", es: "Potenciadores" },
  cuidado: { key: "services.group_cuidado", es: "Plan Cuidado" },
};

export const entriesOf = (g: Grupo) => entries.filter((e) => e.grupo === g);
export const entryBySlug = (slug: string) => entries.find((e) => e.slug === slug);

/** Nombre completo para título SEO y mensaje de WhatsApp: «Landing — Diseño y desarrollo web». */
export const fullName = (e: Entry): Bi => ({
  es: e.sub ? `${e.name.es} — ${e.sub.es}` : e.name.es,
  en: e.sub ? `${e.name.en} — ${e.sub.en}` : e.name.en,
});

export function neighbors(e: Entry) {
  const group = entriesOf(e.grupo);
  const i = group.findIndex((x) => x.slug === e.slug);
  return { prev: group[i - 1] ?? null, next: group[i + 1] ?? null };
}

/** 3 relacionados: hermanos de grupo (en orden cíclico) y, si faltan, de las estrategias. */
export function related(e: Entry, n = 3): Entry[] {
  const group = entriesOf(e.grupo);
  const i = group.findIndex((x) => x.slug === e.slug);
  const sibs = [...group.slice(i + 1), ...group.slice(0, i)];
  const fill = entries.filter((x) => x.grupo !== e.grupo);
  return [...sibs, ...fill].slice(0, n);
}
