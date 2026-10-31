import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Página no encontrada — Elías Jurado" };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="section">
          <div className="container container-narrow text-center">
            <h1>Esta página no existe (404)</h1>
            <p className="text-muted">El enlace puede estar roto o la página se movió. Vuelve al inicio o escríbeme y te ayudo.</p>
            <Button asChild size="lg">
              <Link href="/">Ir al inicio</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
