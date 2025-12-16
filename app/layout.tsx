import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Dancing_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PersonaProvider } from "@/components/persona-provider"
import { GoogleTagManager } from "@/components/gtm"
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
  title: "LuVelle.club - Tu bienestar, transformado",
  description:
    "Una sola plataforma. Tres formas de transformar tu bienestar. LuVelle Ai, The Beauty Box y LuVelle Pro.",
  keywords: "beauty box, belleza, bienestar, suscripción, Costa Rica, skincare, maquillaje, LuVelle, proveedoras",
  openGraph: {
    title: "LuVelle.club - Tu bienestar, transformado",
    description: "Una sola plataforma. Tres formas de transformar tu bienestar.",
    type: "website",
    locale: "es_CR",
    siteName: "LuVelle.club",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuVelle.club - Tu bienestar, transformado",
    description: "Una sola plataforma. Tres formas de transformar tu bienestar.",
  },
  alternates: {
    languages: {
      "es-CR": "/",
    },
  },
    generator: 'v0.app'
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
