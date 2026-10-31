import dict from "@/content/i18n.json";

export type Lang = "es" | "en";
export const STORAGE_KEY = "eliasjurado_lang";
export const SUPPORTED: Lang[] = ["es", "en"];

type Node = { [k: string]: Node | string };

// "nav.home" → "Inicio" / "Home" (mismo contrato que el i18n.js de Jekyll)
export function lookup(key: string, lang: Lang): string | null {
  let node: unknown = dict;
  for (const part of key.split(".")) {
    if (!node || typeof node !== "object") return null;
    node = (node as Node)[part];
  }
  if (node && typeof node === "object") {
    const v = (node as Node)[lang];
    if (typeof v === "string") return v;
  }
  return null;
}

export function detectLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
  } catch {
    /* modo privado */
  }
  const nav = (navigator.language || "es").toLowerCase();
  return nav.startsWith("es") ? "es" : "en";
}
