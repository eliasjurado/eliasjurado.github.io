import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { ContactBody } from "./body";

export const metadata: Metadata = pageMetadata({ title: "Contacto", path: "/contact/" });

export default function ContactPage() {
  return (
    <PageShell
      prefix="contact"
      kicker="Conversemos"
      title="Contacto"
      subtitle="La forma más rápida de empezar es escribirme. Te respondo en menos de 24 horas en días hábiles."
    >
      <JsonLd data={jsonLd("WebPage", "Contacto", "/contact/")} />
      <ContactBody />
    </PageShell>
  );
}
