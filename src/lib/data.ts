import clientesJson from "@/content/clientes.json";
import proyectosJson from "@/content/proyectos.json";
import serviciosJson from "@/content/servicios.json";

export type Bi = { es: string; en: string };
/** Campo que puede ser texto simple o bilingüe (add-ons). */
export type MaybeBi = string | Bi;

export interface Servicio {
  slug: string;
  nivel?: number;
  fase?: Bi;
  badge?: Bi;
  icon: string;
  nombre_corto: Bi;
  titulo: Bi;
  factor_humano: Bi;
  beneficio: Bi;
  resumen: Bi;
  detalle: Bi;
  incluye: Bi[];
  precio_usd: string;
  precio_pen: string;
  precio_referencia_usd: string;
  precio_es_referencial?: boolean;
  plazo: Bi;
  cta_label: Bi;
  cta_key: string;
}

export interface Addon {
  slug: string;
  icon: string;
  titulo: Bi;
  kicker: Bi;
  resumen: Bi;
  detalle?: Bi;
  aplica_a?: string[];
  precio_usd: MaybeBi;
  precio_pen: MaybeBi;
  precio_es_referencial?: boolean;
  plazo: Bi;
}

export interface PlanCuidado {
  slug: string;
  nombre: Bi;
  incluye: Bi;
  precio_usd: string;
  precio_pen: string;
  precio_es_referencial?: boolean;
}

export interface Cliente {
  nombre: string;
  industria: Bi;
  url?: string;
}

export interface Proyecto {
  title: string;
  title_en?: string;
  slug: string;
  destacado?: boolean;
  orden_home?: number;
  cliente?: string;
  industria?: string;
  industria_en?: string;
  stack?: string;
  captura?: string;
  captura_alt?: string;
  url_vivo?: string;
  resumen: string;
  resumen_en?: string;
}

export const quickWin = serviciosJson.quick_win as unknown as Servicio;
export const niveles = serviciosJson.niveles as unknown as Servicio[];
export const addons = serviciosJson.addons as unknown as Addon[];
export const planCuidado = serviciosJson.plan_cuidado as unknown as PlanCuidado[];
export const clientes = clientesJson as unknown as Cliente[];
export const proyectos = proyectosJson as unknown as Proyecto[];

/** `x.en | default: x` / `x.es | default: x` de Liquid. */
export const pick = (v: MaybeBi, lang: "es" | "en") => (typeof v === "string" ? v : v[lang]);
