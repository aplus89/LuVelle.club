import type React from "react"
import type { Metadata } from "next"
import { Inter, Dancing_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PersonaProvider } from "@/components/persona-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
})

export const metadata: Metadata = {
  title: "LuVelle.club - Tu belleza, curada con amor",
  description:
    "Suscripción mensual de productos de belleza premium curados especialmente para ti. Skincare, maquillaje y más en Costa Rica.",
  keywords: "beauty box, belleza, suscripción, Costa Rica, skincare, maquillaje, LuVelle",
  openGraph: {
    title: "LuVelle.club - Tu belleza, curada con amor",
    description: "Suscripción mensual de productos de belleza premium curados especialmente para ti.",
    type: "website",
    locale: "es_CR",
    siteName: "LuVelle.club",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuVelle.club - Tu belleza, curada con amor",
    description: "Suscripción mensual de productos de belleza premium curados especialmente para ti.",
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
    <html lang="es-CR" className={`${inter.variable} ${dancingScript.variable}`}>
      <body className="font-sans antialiased">
        <PersonaProvider>{children}</PersonaProvider>
        <Analytics />
      </body>
    </html>
  )
}
