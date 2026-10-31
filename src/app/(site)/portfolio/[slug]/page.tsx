import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Body as DonaireBody } from "@/content/proyectos/donaire";
import { Body as HannaBody } from "@/content/proyectos/hanna";
import { Body as LlerenaBody } from "@/content/proyectos/llerena";
import { JsonLd } from "@/components/json-ld";
import { L } from "@/components/l";
import { PageShell } from "@/components/page-shell";
import { ProyectoCaptura } from "@/components/proyecto-captura";
import { Button } from "@/components/ui/button";
import { proyectos } from "@/lib/data";
import { jsonLd, pageMetadata } from "@/lib/seo";

const bodies = { donaire: DonaireBody, hanna: HannaBody, llerena: LlerenaBody } as const;
// jekyll-seo-tag usaba el primer encabezado del caso como descripción del JSON-LD.
const LD_DESCRIPTION = "El contexto";

export const dynamicParams = false;
export function generateStaticParams() {
  return proyectos.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = proyectos.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMetadata({ title: p.title, path: `/portfolio/${slug}/` });
}

export default async function ProyectoPage({ params }: Props) {
  const { slug } = await params;
  const p = proyectos.find((x) => x.slug === slug);
  if (!p) notFound();
  const Body = bodies[slug as keyof typeof bodies];

  return (
    <PageShell title={p.title} kicker="Caso de estudio" subtitle={p.resumen} narrow subtitleClass="text-muted proyecto__resumen">
      <JsonLd data={jsonLd("BlogPosting", p.title, `/portfolio/${slug}/`, LD_DESCRIPTION)} />
      <ProyectoCaptura p={p} size="hero" />
      <div className="callout">
        {p.cliente && (
          <>
            <strong>Cliente:</strong> {p.cliente}
            <br />
          </>
        )}
        {p.industria && (
          <>
            <strong>Industria:</strong> {p.industria}
            <br />
          </>
        )}
        {p.stack && (
          <>
            <L as="strong" en="Technology:">
              Tecnología:
            </L>{" "}
            {p.stack}
            <br />
          </>
        )}
        {p.url_vivo && (
          <>
            <strong>Sitio:</strong>{" "}
            <a href={p.url_vivo} target="_blank" rel="noopener">
              {p.url_vivo}
            </a>
          </>
        )}
      </div>

      <Body />

      <p className="proyecto__back">
        <Button asChild variant="ghost">
          <L as="a" link href="/portfolio/">
            ← Volver al portafolio
          </L>
        </Button>
      </p>
    </PageShell>
  );
}
