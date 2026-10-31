import type { Metadata } from "next";
import { ogImage, site } from "@/lib/site";

type Opts = {
  /** page.title de Jekyll; "Inicio" en la home */
  title: string;
  path: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
};

// Título completo: «Página — Elías Jurado» (igual que _includes/seo.html).
export const fullTitle = (title: string) => (title && title !== site.title ? `${title} — ${site.title}` : site.title);

export function pageMetadata({ title, path, description, ogTitle, ogDescription }: Opts): Metadata {
  const desc = description ?? site.description;
  const url = `${site.url}${path}`;
  const shareTitle = ogTitle ?? fullTitle(title);
  const shareDesc = ogDescription ?? desc;
  return {
    metadataBase: new URL(site.url),
    title: { absolute: fullTitle(title) },
    description: desc,
    authors: [{ name: site.author.name }],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.title,
      title: shareTitle,
      description: shareDesc,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Elías Jurado — Sistemas de ventas digitales para pymes" }],
    },
    twitter: { card: "summary_large_image", title: shareTitle, description: shareDesc, images: [ogImage] },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/assets/images/brand/favicon-ej-32.png", type: "image/png", sizes: "32x32" },
      ],
      apple: "/assets/images/brand/icon-180.png",
    },
  };
}

// JSON-LD como el de jekyll-seo-tag (home y /about/ = WebSite; el resto WebPage; casos = BlogPosting).
export function jsonLd(kind: "WebSite" | "WebPage" | "BlogPosting", title: string, path: string, description: string = site.description) {
  const url = `${site.url}${path}`;
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": kind,
    author: { "@type": "Person", name: site.author.name },
    description,
    headline: title,
  };
  if (kind === "WebSite") base.name = site.title;
  if (kind === "BlogPosting") {
    const now = new Date().toISOString();
    base.dateModified = now;
    base.datePublished = now;
    base.mainEntityOfPage = { "@type": "WebPage", "@id": url };
  }
  base.url = url;
  return base;
}
