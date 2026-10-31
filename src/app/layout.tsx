import type { Viewport } from "next";
import { Montserrat } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@/components/analytics";
import { LangProvider } from "@/components/l";
import { site } from "@/lib/site";
import "./globals.css";
import "./brand.css";

// Tipografía única de la marca: Montserrat 400/500/600/800 (manual-marca.md).
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  display: "swap",
  variable: "--font-montserrat",
});

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: site.themeColor };

const gtmSnippet = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtm}');`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: gtmSnippet }} />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${site.gtm}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <LangProvider>
          <Analytics />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
