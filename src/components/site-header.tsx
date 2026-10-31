"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { L } from "@/components/l";
import { LangToggle } from "@/components/lang-toggle";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-header__brand" aria-label={`${site.title} — Inicio`}>
          {/* Logo pequeño = el «EJ» de las propuestas (cuadro carbón). El jaguar va en grande (hero). */}
          <span className="brand-ej" aria-hidden="true">
            EJ
          </span>
          <span>{site.title}</span>
        </Link>

        <nav className="site-nav" aria-label="Navegación principal">
          {site.nav.map((item) => (
            <L key={item.url} as="a" link href={item.url} k={item.i18n} aria-current={pathname === item.url ? "page" : undefined}>
              {item.label}
            </L>
          ))}
        </nav>

        <LangToggle />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="site-nav__toggle" type="button" aria-label="Abrir menú" aria-expanded={open}>
              <Icon name="menu" className="nav-toggle__svg" />
            </button>
          </SheetTrigger>
          <SheetContent side="top" className="gap-0 rounded-none border-b border-[#e0e0e0] bg-white p-0">
            <SheetTitle className="sr-only">Menú</SheetTitle>
            <SheetDescription className="sr-only">Navegación principal</SheetDescription>
            <nav className="site-nav--mobile is-open container" aria-label="Navegación móvil" style={{ borderTop: 0 }}>
              {site.nav.map((item) => (
                <L key={item.url} as="a" link href={item.url} k={item.i18n} onClick={() => setOpen(false)}>
                  {item.label}
                </L>
              ))}
              <LangToggle mobile />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
