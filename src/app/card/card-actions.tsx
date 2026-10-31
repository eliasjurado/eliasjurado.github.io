"use client";

import { L, useLang } from "@/components/l";
import { lookup } from "@/lib/i18n";
import { site } from "@/lib/site";
import styles from "./card.module.css";

const E164 = `+${site.contact.whatsapp}`;

function downloadVCard() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${site.author.name}`,
    "N:Jurado;Elías;Luis;;",
    `ORG:${site.author.name}`,
    "TITLE:Sistemas de ventas digitales para pymes",
    `TEL;TYPE=CELL,VOICE:${E164}`,
    `EMAIL;TYPE=WORK:${site.contact.email}`,
    `URL:${site.url}`,
    `ADR;TYPE=WORK:;;;${site.contact.city};;;;`,
    "NOTE:Que ninguna venta se quede en el WhatsApp. Sistemas de ventas digitales para pymes.",
    "END:VCARD",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([vcard], { type: "text/vcard;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "elias-jurado.vcf";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 200);
}

export function CardActions() {
  const { lang } = useLang();
  const t = (key: string, fallback: string) => lookup(key, lang) ?? fallback;

  async function share() {
    const data = {
      title: t("card.share_title", site.title),
      text: t("card.share_text", "Sistemas de ventas digitales para pymes"),
      url: location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {
        /* cancelado */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(location.href);
      alert(t("card.link_copied", "Enlace copiado al portapapeles."));
    } catch {
      prompt(t("card.copy_link_prompt", "Copia este enlace:"), location.href);
    }
  }

  return (
    <div className={styles.secondary}>
      <L as="button" k="card.save_contact" en="Save contact" className={styles.btn2} onClick={downloadVCard}>
        Guardar contacto
      </L>
      <L as="button" k="card.share" en="Share" className={styles.btn2} onClick={share}>
        Compartir
      </L>
    </div>
  );
}
