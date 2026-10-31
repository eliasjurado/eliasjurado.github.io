"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { L } from "@/components/l";
import { Button } from "@/components/ui/button";
import type { Servicio } from "@/lib/data";

// Mapa de Madurez Digital animado (spec 017). Port de mapa-madurez.js a React:
//  - Sin JS el mapa se ve completo (el selector solo aparece al montar).
//  - Al entrar en vista, el camino se «arma» y se traza una vez.
//  - Selector «¿Dónde está tu negocio hoy?»: traza hasta la estación elegida y muestra su panel.
//  - prefers-reduced-motion: sin trazo, fundido de 150 ms.
const STEP_MS = 600; // mismo valor que --mm-step en brand.css
type Phase = "" | "arm" | "play" | "fade" | "fade-in";
const ICONS = ["chat", "launch", "shop", "flow"];
const RESULT: Record<string, string> = { whatsapp: "Atención", landing: "Visibilidad", ecommerce: "Conversión" };

const priceEs = (s: Servicio) => `Desde S/ ${s.precio_pen}`;
const priceEn = (s: Servicio) => `From USD ${s.precio_usd}`;

export function MaturityMap({ entry, levels }: { entry: Servicio; levels: Servicio[] }) {
  const items = [entry, ...levels];
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [interactive, setInteractive] = useState(false);
  const [phase, setPhase] = useState<Phase>("");
  const mapRef = useRef<HTMLOListElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstPickRef = useRef<HTMLButtonElement>(null);
  const played = useRef(false);

  useEffect(() => {
    // El selector solo existe con JS: se muestra al montar (mejora progresiva).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
    const map = mapRef.current;
    if (!map || !("IntersectionObserver" in window)) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let timer: number | undefined;
    const play = () => {
      if (played.current) return;
      played.current = true;
      if (reduced) {
        setPhase("fade");
        requestAnimationFrame(() => requestAnimationFrame(() => setPhase("fade-in")));
        return;
      }
      setPhase("arm");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setPhase("play");
          timer = window.setTimeout(() => setPhase(""), STEP_MS * items.length + 700);
        })
      );
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          play();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(map);
    return () => {
      io.disconnect();
      if (timer) window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const k = selected ? items.findIndex((s) => s.slug === selected) : -1;

  function choose(slug: string | null) {
    setSelected(slug);
    setInteractive(true); // al elegir, el trazo inicial ya no manda: el redibujo responde de inmediato
    if (slug && window.matchMedia && !window.matchMedia("(min-width: 900px)").matches) {
      // En móvil (<900px) el panel queda bajo las opciones: llevar la vista hasta él.
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" }));
    }
  }

  const rootClass = ["section maturity-journey mm", interactive && "mm--interactive", phase && `mm--${phase}`].filter(Boolean).join(" ");

  const options: [Servicio, string, string][] = [
    [entry, "home.mm_opt_entry", "Atiendo todo por WhatsApp y se me escapan clientes"],
    [levels[0], "home.mm_opt_landing", "No tengo web o no me encuentran"],
    [levels[1], "home.mm_opt_ecommerce", "Tengo web pero no vende sola"],
    [levels[2], "home.mm_opt_crm", "Vendo, pero mi equipo se ahoga en tareas manuales"],
  ];

  return (
    <section className={rootClass} id="mapa-madurez">
      <div className="container">
        <header className="maturity-journey__header">
          <L as="h2" k="home.journey_title">
            Mapa de Madurez Digital
          </L>
          <L as="p" k="home.journey_body" className="text-muted">
            Tu recorrido, paso a paso. Empieza donde estés; avanza cuando el retorno lo pida.
          </L>
        </header>

        <div className="mm__select" hidden={!ready}>
          <L as="p" k="home.mm_question" className="mm__question" id="mm-question">
            ¿Dónde está tu negocio hoy?
          </L>
          <div className="mm__options" role="group" aria-labelledby="mm-question">
            {options.map(([s, key, es], i) => (
              <L
                key={s.slug}
                as="button"
                k={key}
                type="button"
                ref={i === 0 ? firstPickRef : undefined}
                className="mm__option"
                aria-pressed={selected === s.slug}
                onClick={() => choose(selected === s.slug ? null : s.slug)}
              >
                {es}
              </L>
            ))}
          </div>
          <div className="mm__panel" aria-live="polite" ref={panelRef}>
            {items.map((s) => (
              <div className="mm__panel-item" key={s.slug} hidden={selected !== s.slug}>
                <p className="mm__next">
                  <L k="home.mm_next">Tu siguiente paso:</L>{" "}
                  <L as="strong" en={s.nombre_corto.en}>
                    {s.nombre_corto.es}
                  </L>{" "}
                  —{" "}
                  <L en={s.beneficio.en}>{s.beneficio.es}</L>
                </p>
                <L as="p" en={priceEn(s)} className="mm__panel-price">
                  {priceEs(s)}
                </L>
                <div className="mm__panel-actions">
                  <Button asChild>
                    <L as="a" link href="/contact/" k="hero.cta_primary">
                      Conversemos
                    </L>
                  </Button>
                  <Button asChild variant="ghost">
                    <L as="a" link href={`/services/#${s.slug}`} k="home.journey_cta">
                      Ver detalle →
                    </L>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <L
            as="button"
            k="home.mm_reset"
            type="button"
            className="mm__reset"
            hidden={k === -1}
            onClick={() => {
              choose(null);
              firstPickRef.current?.focus();
            }}
          >
            Ver todo el mapa
          </L>
        </div>

        <L as="ol" className="mm__map" ref={mapRef} attrs={{ "aria-label": "home.mm_aria_map" }} aria-label="Mapa de madurez digital">
          {items.map((s, i) => {
            const cls = [
              "mm__station",
              k !== -1 && i === k && "is-selected",
              k !== -1 && i !== k && "is-dim",
              k !== -1 && i > 0 && i < k && "is-past",
              k !== -1 && i > k && "is-ahead",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <li className={cls} key={s.slug} style={{ ["--i" as string]: i }}>
                {i < 3 && (
                  <span className="mm__seg" aria-hidden="true">
                    <span className={`mm__seg-fill${k !== -1 && i >= k ? " is-undrawn" : ""}`} />
                  </span>
                )}
                <span className="mm__node">
                  <Icon name={ICONS[i]} />
                </span>
                <div className="mm__body">
                  <p className="mm__phase">
                    {i === 0 ? (
                      <L k="home.journey_entry">Punto de entrada</L>
                    ) : (
                      <>
                        <span className="mm__num">0{s.nivel}</span>{" "}
                        <L en={s.fase!.en}>{s.fase!.es}</L>
                      </>
                    )}
                  </p>
                  <h3 className="mm__name">
                    <L as="a" link className="mm__link" href={`/services/#${s.slug}`} en={s.nombre_corto.en}>
                      {s.nombre_corto.es}
                    </L>
                  </h3>
                  <p className="mm__result">
                    <L k={`home.mm_res_${s.slug}`}>{RESULT[s.slug] ?? "Eficiencia"}</L>
                  </p>
                  <L as="p" className="mm__benefit" en={s.beneficio.en}>
                    {s.beneficio.es}
                  </L>
                  <L as="p" className="mm__factor" en={s.factor_humano.en}>
                    {s.factor_humano.es}
                  </L>
                  <L as="p" className="mm__price" en={priceEn(s)}>
                    {priceEs(s)}
                  </L>
                  <L as="span" className="mm__more" aria-hidden="true" k="home.journey_cta">
                    Ver detalle →
                  </L>
                </div>
              </li>
            );
          })}
        </L>

        <div className="maturity-journey__cta-wrap">
          <Button asChild variant="ghost">
            <L as="a" link href="/services/" k="home.levels_cta">
              Ver precios y potenciadores →
            </L>
          </Button>
        </div>
      </div>
    </section>
  );
}
