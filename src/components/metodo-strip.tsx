import { Fragment } from "react";
import { Icon } from "@/components/icon";
import { L } from "@/components/l";

const steps: [string, string, string][] = [
  ["01", "services.method_step1_short", "Conversamos"],
  ["02", "services.method_step2_short", "Propuesta"],
  ["03", "services.method_step3_short", "Construimos"],
  ["04", "services.method_step4_short", "Lanzamos y cuidamos"],
];

/** Franja «Nuestro método» (4 pasos). Con `detail` enlaza al proceso completo; sin él, es solo la visual. */
export function MetodoStrip({ detail = true }: { detail?: boolean }) {
  return (
    <aside className="summary-metodo" aria-label="Nuestro método de trabajo">
      <header className="summary-metodo__header">
        <L as="p" className="kicker" k="services.method_strip_kicker">
          Nuestro método
        </L>
        <L as="p" className="caption" k="services.method_strip_caption">
          4 pasos. Cada uno con un entregable tangible que validas antes de continuar.
        </L>
      </header>
      <ol className="metodo-steps">
        {steps.map(([n, key, es], i) => (
          <Fragment key={n}>
            {i > 0 && (
              <li className="metodo-step__arrow" aria-hidden="true">
                <Icon name="arrow" className="metodo-step__arrow-svg" />
              </li>
            )}
            <li className="metodo-step">
              <span className="metodo-step__num">{n}</span>
              <L className="metodo-step__label" k={key}>
                {es}
              </L>
            </li>
          </Fragment>
        ))}
      </ol>
      {detail && (
        <L as="a" link className="metodo-ver-detalle" href="/services/proceso/" k="services.method_see_detail">
          Ver el proceso completo →
        </L>
      )}
    </aside>
  );
}
