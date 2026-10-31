"use client";

import { L, useLang, useT } from "@/components/l";
import { Button } from "@/components/ui/button";
import { fullName, type Entry } from "@/lib/servicios";
import { site, waLink } from "@/lib/site";

/** CTA «Cotizar por WhatsApp» con el nombre del servicio en el mensaje (idioma activo). */
export function ServicioCta({ e, className, size }: { e: Entry; className?: string; size?: "default" | "lg" }) {
  const { lang } = useLang();
  const t = useT();
  const template = t("services.wa_message", "Hola Elías, vi tu web y me gustaría cotizar: {name}.");
  const href = waLink(site.contact.whatsapp, template.replace("{name}", fullName(e)[lang]));
  return (
    <Button asChild size={size} className={className}>
      <a href={href} target="_blank" rel="noopener" data-service={e.slug}>
        <L k="services.cta_quote">Cotizar por WhatsApp</L>
      </a>
    </Button>
  );
}
