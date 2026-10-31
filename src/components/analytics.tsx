"use client";

import { useEffect } from "react";

type Params = Record<string, unknown>;
type W = Window & { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] };

// Tracking mínimo de eventos comerciales (portado de assets/js/analytics.js):
// click_whatsapp · click_email · click_cta_services · lang_switch (lo dispara el LangProvider).
export function Analytics() {
  useEffect(() => {
    const w = window as W;
    const track = (name: string, params: Params = {}) => {
      if (typeof w.gtag === "function") {
        w.gtag("event", name, params);
        return;
      }
      if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event: name, ...params });
    };
    w.eliasTrackEvent = track;

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest("a");
      const href = link?.getAttribute("href");
      if (!href) return;
      const base = { link_href: href, page_path: window.location.pathname };
      if (href.includes("wa.me/")) track("click_whatsapp", base);
      else if (href.startsWith("mailto:")) track("click_email", base);
      else if (href === "/services/" || href.startsWith("/services/?")) track("click_cta_services", base);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
