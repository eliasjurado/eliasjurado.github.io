import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { L } from "@/components/l";
import { site, waLink } from "@/lib/site";
import { CardActions } from "./card-actions";
import styles from "./card.module.css";

// Tarjeta digital (layout null en Jekyll, sin header/footer ni sitemap).
export const metadata: Metadata = {
  title: `${site.title} · Tarjeta digital`,
  description: site.description,
  openGraph: { title: site.title, description: "Landing web · E-commerce · CRM." },
};

const host = site.url.replace(/^https?:\/\//, "");

export default function CardPage() {
  const waText = site.whatsappMessages.default;
  const rows = [
    { cls: `${styles.btn} ${styles.whatsapp}`, href: waLink(site.contact.whatsapp, waText), label: "Abrir WhatsApp", icon: "chat", key: "card.whatsapp_label", es: "WhatsApp", value: site.contact.phone, ext: true },
    { cls: styles.btn, href: `tel:+${site.contact.whatsapp}`, label: "Llamar por telefono", icon: "phone", key: "card.call_label", es: "Llamar", value: site.contact.phone },
    { cls: styles.btn, href: `mailto:${site.contact.email}`, label: "Enviar correo", icon: "mail", key: "card.email_label", es: "Correo", value: site.contact.email },
    { cls: styles.btn, href: site.url, label: "Ir al sitio web", icon: "globe", key: "card.website_label", es: "Sitio web", value: host, ext: true },
  ];
  return (
    <div className={styles.page}>
      <main className={styles.card}>
        <header className={styles.head}>
          <img className={styles.head__logo} src="/assets/images/logo/logo-blanco.svg" alt={site.title} />
          <h1 className={styles.head__name}>{site.title}</h1>
          <L as="p" k="card.tagline" className={styles.head__tagline}>
            Sistemas de ventas digitales para pymes
          </L>
        </header>

        <nav className={styles.actions} aria-label="Contacto">
          {rows.map((r) => (
            <a key={r.icon} className={r.cls} href={r.href} aria-label={r.label} {...(r.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              <span className={styles.ico} aria-hidden="true">
                <Icon name={r.icon} className={styles["ico-svg"]} />
              </span>
              <span className={styles.text}>
                <L k={r.key} className={styles["label-r"]}>
                  {r.es}
                </L>
                <span className={styles.value}>{r.value}</span>
              </span>
            </a>
          ))}
        </nav>

        <CardActions />

        <footer className={styles.foot}>
          {site.contact.city} · <L k="card.tax_id_label">RUC</L> {site.contact.ruc}
          <br />
          <a href={site.url}>{host}</a>
        </footer>
      </main>
    </div>
  );
}
