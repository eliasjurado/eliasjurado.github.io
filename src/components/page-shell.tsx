import type { ReactNode } from "react";
import { L } from "@/components/l";

type Props = {
  prefix?: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  /** clase extra del <article> (alcance de estilos por página) */
  pageClass?: string;
  /** claves i18n explícitas cuando `prefix` no basta (p. ej. subpáginas) */
  keys?: { kicker?: string; title?: string; subtitle?: string };
  narrow?: boolean;
  subtitleClass?: string;
  children: ReactNode;
};

// Layout «page» de Jekyll: cabecera de página + <article class="section"><div class="container">.
export function PageShell({ prefix, kicker, title, subtitle, pageClass = "", keys, narrow = false, subtitleClass = "text-muted page-header__subtitle", children }: Props) {
  return (
    <>
      <header className="page-header">
        <div className={`container${narrow ? " container-narrow" : " page-header__inner"}`}>
          {kicker && (
            <L as="p" k={keys?.kicker ?? (prefix ? `${prefix}.page_kicker` : undefined)} className="page-header__kicker">
              {kicker}
            </L>
          )}
          <L as="h1" k={keys?.title ?? (prefix ? `${prefix}.page_title` : undefined)}>
            {title}
          </L>
          {subtitle && (
            <L as="p" k={keys?.subtitle ?? (prefix ? `${prefix}.page_subtitle` : undefined)} className={subtitleClass}>
              {subtitle}
            </L>
          )}
        </div>
      </header>
      <article className={`section ${pageClass}`.trim()}>
        <div className={narrow ? "container container-narrow" : "container"}>{children}</div>
      </article>
    </>
  );
}
