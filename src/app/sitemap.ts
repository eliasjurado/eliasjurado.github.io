import type { MetadataRoute } from "next";
import { proyectos } from "@/lib/data";
import { entries } from "@/lib/servicios";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// /card/ queda fuera (sitemap: false en Jekyll).
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/services/", "/services/proceso/", ...entries.map((e) => `/services/${e.slug}/`), "/portfolio/", ...proyectos.map((p) => `/portfolio/${p.slug}/`), "/about/", "/contact/"];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
