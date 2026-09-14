import type { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { PartnersGrowthExperiment } from "@/components/partners/partners-growth-experiment"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "Para marcas",
  description: "Conectá tu marca con profesionales, comunidad, eventos, Club VIP, Beauty Box y nuevas experiencias de belleza y bienestar dentro de LuVelle.",
  openGraph: {
    title: "LuVelle para marcas | Conectá con nuestra comunidad",
    description: "Explorá colaboraciones con profesionales, comunidad, eventos y nuevas experiencias LuVelle.",
    url: "https://www.luvelle.club/partners",
  },
}

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-[#FFF7F3]">
      <Header />
      <PartnersGrowthExperiment />
      <Footer />
    </main>
  )
}
