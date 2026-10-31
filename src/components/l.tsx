"use client";

import Link from "next/link";
import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  type Ref,
} from "react";
import { detectLang, lookup, STORAGE_KEY, type Lang } from "@/lib/i18n";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "es", setLang: () => {} });

declare global {
  interface Window {
    eliasTrackEvent?: (name: string, params?: Record<string, unknown>) => void;
  }
}

// Idioma: ES en el HTML estático; al montar se aplica localStorage > navigator.language (igual que i18n.js).
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    // Detección en cliente tras hidratar: el HTML estático siempre sale en ES.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangState(detectLang());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      setLangState(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* modo privado */
      }
      window.eliasTrackEvent?.("lang_switch", { from_lang: lang, to_lang: next, page_path: window.location.pathname });
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Traducción por clave del diccionario (equivale a data-i18n-attr-*). */
export function useT() {
  const { lang } = useLang();
  return useCallback((key: string, fallback = "") => lookup(key, lang) ?? fallback, [lang]);
}

type LProps<T extends ElementType> = {
  as?: T;
  /** clave del diccionario i18n.json (data-i18n) */
  k?: string;
  /** texto EN plano (data-i18n-en). Los hijos son el texto ES. */
  en?: string;
  /** HTML EN (data-i18n-en-html). Los hijos son el HTML ES. */
  enHtml?: string;
  /** atributos traducidos por clave: { "aria-label": "toggle.aria_label" } */
  attrs?: Record<string, string>;
  link?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: Ref<any>;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

/**
 * Elemento traducible. Replica los tres patrones del i18n.js de Jekyll:
 *  - k      → texto del diccionario (cae a los hijos si falta la clave)
 *  - en     → EN literal; ES = hijos
 *  - enHtml → EN con HTML; ES = hijos
 */
export function L<T extends ElementType = "span">({ as, k, en, enHtml, attrs, link, children, ...rest }: LProps<T>) {
  const { lang } = useLang();
  const props: Record<string, unknown> = { ...rest };
  if (attrs) for (const [attr, key] of Object.entries(attrs)) {
    const v = lookup(key, lang);
    if (v !== null) props[attr] = v;
  }
  const Tag = (link ? Link : (as ?? "span")) as ElementType;
  if (link && as && as !== "a") throw new Error("L: link solo aplica a <a>");

  if (k) {
    const v = lookup(k, lang);
    return createElement(Tag, props, v ?? children);
  }
  if (enHtml !== undefined && lang === "en") {
    return createElement(Tag, { ...props, dangerouslySetInnerHTML: { __html: enHtml } });
  }
  if (en !== undefined && lang === "en") {
    return createElement(Tag, props, en);
  }
  return createElement(Tag, props, children);
}
