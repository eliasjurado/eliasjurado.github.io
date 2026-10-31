import { site } from "@/lib/site";

export const dynamic = "force-static";

// Feed Atom (jekyll-feed): el sitio no tiene entradas de blog, así que sale vacío con la identidad del sitio.
export function GET() {
  const now = new Date().toISOString();
  const xml = `<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom"><link href="${site.url}/feed.xml" rel="self" type="application/atom+xml" /><link href="${site.url}/" rel="alternate" type="text/html" /><updated>${now}</updated><id>${site.url}/feed.xml</id><title type="html">${site.title}</title><subtitle>${site.description}</subtitle><author><name>${site.author.name}</name><email>${site.author.email}</email></author></feed>`;
  return new Response(xml, { headers: { "Content-Type": "application/atom+xml; charset=utf-8" } });
}
