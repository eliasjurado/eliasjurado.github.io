"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Enlaces viejos /services/#<slug> → /services/<slug>/ (los compartidos siguen funcionando). */
export function AnchorRedirect({ slugs }: { slugs: string[] }) {
  const router = useRouter();
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const slug = hash.replace(/^(addon|cuidado)-/, "");
    if (hash === "proceso") router.replace("/services/proceso/");
    else if (slugs.includes(slug)) router.replace(`/services/${slug}/`);
  }, [router, slugs]);
  return null;
}
