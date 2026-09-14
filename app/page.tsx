import type { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { HomeStrategyV1 } from "@/components/home/home-strategy-v1"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "Tu talento merece ser visto",
  description: "Creá un perfil profesional LuVelle para mostrar tu trabajo, inspirar confianza y hacer crecer tu negocio de belleza o bienestar.",
  openGraph: {
    title: "LuVelle | Tu talento merece ser visto",
    description: "Creá un perfil profesional para mostrar tu trabajo, inspirar confianza y hacer crecer tu negocio.",
    url: "https://www.luvelle.club/",
  },
  twitter: {
    title: "LuVelle | Tu talento merece ser visto",
    description: "Creá un perfil profesional para mostrar tu trabajo, inspirar confianza y hacer crecer tu negocio.",
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFF7F3]">
      <Header />
      <HomeStrategyV1 />
      <Footer />
    </main>
  )
}
