"use client";

import { L, useLang, useT } from "@/components/l";
import { Button } from "@/components/ui/button";
import { site, waLink } from "@/lib/site";

/** CTA «Conversemos» que abre WhatsApp directo (mensaje en el idioma activo). Con `topic` nombra el servicio. */
export function WhatsAppCta({ topic, variant }: { topic?: { es: string; en: string }; variant?: "default" | "ghost" | "outline" | "accent" }) {
  const { lang } = useLang();
  const t = useT();
  const message = topic
    ? t("services.wa_talk_message", "Hola Elías, vi tu web y me gustaría conversar sobre: {name}.").replace("{name}", topic[lang])
    : t("hero.wa_message", site.whatsappMessages.hero);
  return (
    <Button asChild size={topic ? "default" : "lg"} variant={variant}>
      <a href={waLink(site.contact.whatsapp, message)} target="_blank" rel="noopener">
        <L k="hero.cta_primary">Conversemos</L>
      </a>
    </Button>
  );
}
