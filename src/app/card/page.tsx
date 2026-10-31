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
  const quick = [
    { href: `tel:+${site.contact.whatsapp}`, label: "Llamar por teléfono", icon: "phone", es: "Llamar", en: "Call" },
    { href: `mailto:${site.contact.email}`, label: "Enviar correo", icon: "mail", es: "Correo", en: "Email" },
    { href: site.url, label: "Ir al sitio web", icon: "globe", es: "Web", en: "Website", ext: true },
  ];
  return (
    <div className={styles.page}>
      <main className={styles.card}>
        <span className={`brand-ej ${styles.ej}`} aria-hidden="true">
          EJ
        </span>
        <header className={styles.head}>
          <img className={styles.jaguar} src="/assets/images/card/jaguar.webp" width={630} height={640} alt="" />
          <h1 className={styles.name}>Elías Jurado</h1>
          <L as="p" en="Digital sales systems for small businesses" className={styles.role}>
            Sistemas de ventas digitales para pymes
          </L>
        </header>

        <div className={styles.body}>
          <a
            className={styles.primary}
            href={waLink(site.contact.whatsapp, waText)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="chat" className={styles.ico} />
            <L en="Message me on WhatsApp">Escríbeme por WhatsApp</L>
          </a>

          <nav className={styles.quick} aria-label="Contacto">
            {quick.map((r) => (
              <a key={r.icon} className={styles.q} href={r.href} aria-label={r.label} {...(r.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <Icon name={r.icon} className={styles.ico} />
                <L en={r.en}>{r.es}</L>
              </a>
            ))}
          </nav>

          <CardActions />
        </div>

        <footer className={styles.foot}>
          <p>{site.contact.city}</p>
          <p>
            RUC {site.contact.ruc} · <a href={site.url}>{host}</a>
          </p>
        </footer>
      </main>
    </div>
  );
}
