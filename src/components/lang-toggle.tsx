"use client";

import { useLang, useT } from "@/components/l";

// Toggle ES | EN (mismas clases que el sitio Jekyll: lang-toggle*).
export function LangToggle({ mobile = false }: { mobile?: boolean }) {
  const { lang, setLang } = useLang();
  const t = useT();
  return (
    <div
      className={`lang-toggle${mobile ? " lang-toggle--mobile" : ""}`}
      role="group"
      aria-label={t("toggle.aria_label", "Cambiar idioma")}
    >
      {(["es", "en"] as const).map((code, i) => (
        <span key={code} style={{ display: "contents" }}>
          {i === 1 && (
            <span className="lang-toggle__sep" aria-hidden="true">
              |
            </span>
          )}
          <button
            type="button"
            className={`lang-toggle__btn${lang === code ? " is-active" : ""}`}
            aria-pressed={lang === code}
            onClick={() => setLang(code)}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
