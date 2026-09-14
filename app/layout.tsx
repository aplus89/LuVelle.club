import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Dancing_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PersonaProvider } from "@/components/persona-provider"
import { GoogleTagManager } from "@/components/gtm"
import { GoogleAnalytics } from "@/components/google-analytics"
import "./globals.css"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.luvelle.club"),
  title: {
    default: "LuVelle | Belleza, bienestar y crecimiento para profesionales",
    template: "%s | LuVelle",
  },
  description:
    "LuVelle ayuda a profesionales de belleza y bienestar a mostrar su talento, conectar con oportunidades y acceder a nuevas herramientas para hacer crecer su negocio.",
  keywords: [
    "LuVelle",
    "profesionales de belleza",
    "bienestar",
    "Costa Rica",
    "maquillistas",
    "lash artists",
    "nail artists",
    "esteticistas",
    "perfiles profesionales",
  ],
  openGraph: {
    title: "LuVelle | Tu talento merece ser visto",
    description: "Perfiles, comunidad y herramientas para profesionales de belleza y bienestar.",
    type: "website",
    locale: "es_CR",
    siteName: "LuVelle",
    url: "https://www.luvelle.club",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuVelle | Tu talento merece ser visto",
    description: "Perfiles, comunidad y herramientas para profesionales de belleza y bienestar.",
  },
  alternates: {
    languages: {
      "es-CR": "/",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-CR" className={`${plusJakarta.variable} ${dancingScript.variable}`}>
      <head>
        <GoogleTagManager />
        <GoogleAnalytics />
      </head>
      <body className="font-sans antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NF9NPXQX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <PersonaProvider>{children}</PersonaProvider>
        <Analytics />
      </body>
    </html>
  )
}
