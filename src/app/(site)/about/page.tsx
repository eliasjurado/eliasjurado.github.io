import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { AboutBody } from "./body";

export const metadata: Metadata = pageMetadata({ title: "Sobre mí", path: "/about/" });

export default function AboutPage() {
  return (
    <PageShell
      prefix="about"
      kicker="Misión y método"
      title="Sobre mí"
      subtitle="Por qué hago lo que hago, cómo lo hago, y para quién."
      pageClass="page-about"
    >
      <JsonLd data={jsonLd("WebSite", "Sobre mí", "/about/")} />
      <AboutBody />
    </PageShell>
  );
}
