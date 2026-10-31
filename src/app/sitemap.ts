import type { MetadataRoute } from "next";
import { proyectos } from "@/lib/data";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// /card/ queda fuera (sitemap: false en Jekyll).
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/services/", "/portfolio/", ...proyectos.map((p) => `/portfolio/${p.slug}/`), "/about/", "/contact/"];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
