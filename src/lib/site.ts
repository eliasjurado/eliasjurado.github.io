// Datos del sitio (antes _config.yml). Una sola fuente para identidad, contacto y mensajes de WhatsApp.
export const site = {
  title: "Elías Jurado",
  tagline: "Que ninguna venta se quede en el WhatsApp.",
  description:
    "Webs, tiendas en línea y WhatsApp conectados para que las pymes vendan más: cada consulta con respuesta y cada cotización con seguimiento.",
  url: "https://eliasjurado.com",
  locale: "es_PE",
  author: { name: "Elías Luis Jurado Santos", email: "info@eliasjurado.com" },
  themeColor: "#000000",
  gtm: "GTM-MMX46W5Q",
  contact: {
    email: "info@eliasjurado.com",
    phone: "+51 920 050 617",
    whatsapp: "51920050617",
    whatsappDemo: "51977822333",
    city: "Miraflores, Lima — Perú",
    ruc: "10434645421",
  },
  whatsappMessages: {
    default: "Hola Elías, vi tu web y me gustaría conversar sobre un proyecto.",
    hero: "Hola Elías, vi tu web y me gustaría conversar sobre un proyecto.",
    contacto: "Hola Elías, te escribo desde tu página de contacto. Me interesa saber más sobre tus servicios.",
    footer: "Hola Elías, te escribo desde tu web. Me gustaría más información.",
    quickwin: "Hola, vengo de tu web. Quisiera información sobre tus servicios.",
  },
  redes: { github: "eliasjurado", linkedin: "eliasjurado", credly: "credly.com/users/eliasjurado" },
  nav: [
    { label: "Inicio", url: "/", i18n: "nav.home" },
    { label: "Servicios", url: "/services/", i18n: "nav.strategies" },
    { label: "Portafolio", url: "/portfolio/", i18n: "nav.portfolio" },
    { label: "Sobre mí", url: "/about/", i18n: "nav.about" },
    { label: "Contacto", url: "/contact/", i18n: "nav.contact" },
  ],
} as const;

export const ogImage = `${site.url}/assets/images/brand/og-eliasjurado.png`;

export function waLink(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
