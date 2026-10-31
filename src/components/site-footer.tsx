import Link from "next/link";
import { L } from "@/components/l";
import { site, waLink } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <h4>{site.title}</h4>
            <L as="p" k="footer.description" className="site-footer__description">
              Que ninguna venta se quede en el WhatsApp. Webs, tiendas en línea y CRM para pymes que quieren vender más.
            </L>
          </div>

          <div>
            <L as="h4" k="footer.contact_label">
              Contacto
            </L>
            <p className="site-footer__list">
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              <br />
              <a href={waLink(site.contact.whatsapp, site.whatsappMessages.footer)} target="_blank" rel="noopener">
                {site.contact.phone}
              </a>
              <br />
              {site.contact.city}
              <br />
              RUC {site.contact.ruc}
            </p>
          </div>

          <div>
            <L as="h4" k="footer.links_label">
              Enlaces
            </L>
            <p className="site-footer__list">
              {site.nav.map((item) => (
                <span key={item.url}>
                  <L as="a" link href={item.url} k={item.i18n}>
                    {item.label}
                  </L>
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>
            © {year} {site.author.name}.{" "}
            <L k="footer.rights">Todos los derechos reservados.</L>
          </span>
          <span>
            <a href={`https://github.com/${site.redes.github}`} target="_blank" rel="noopener">
              GitHub
            </a>
            {" · "}
            <a href={`https://www.linkedin.com/in/${site.redes.linkedin}`} target="_blank" rel="noopener">
              LinkedIn
            </a>
            {" · "}
            <a href={`https://${site.redes.credly}`} target="_blank" rel="noopener">
              Credly
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
