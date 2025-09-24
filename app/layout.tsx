import type React from "react"
import type { Metadata } from "next"
import { Inter, Dancing_Script, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
})
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "LuVelle - Club de Belleza y Bienestar para Mujeres LATAM",
  description:
    "Descubre The Beauty Box by LuVelle, tu experiencia mensual personalizada de belleza y bienestar. Productos premium, servicios exclusivos y beneficios únicos.",
  keywords: "belleza, bienestar, mujeres, LATAM, beauty box, membresía, productos de belleza",
  openGraph: {
    title: "LuVelle - Club de Belleza y Bienestar",
    description: "Tu experiencia mensual personalizada de belleza y bienestar",
    url: "https://luvelle.club",
    siteName: "LuVelle",
    images: [
      {
        url: "/images/luvelle-hero-new.png",
        width: 1200,
        height: 630,
        alt: "LuVelle Beauty Box",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuVelle - Club de Belleza y Bienestar",
    description: "Tu experiencia mensual personalizada de belleza y bienestar",
    images: ["/images/luvelle-hero-new.png"],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${dancingScript.variable} ${playfairDisplay.variable} bg-dark text-cream`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  )
}
