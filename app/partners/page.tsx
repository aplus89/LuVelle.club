import type { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { PartnersGrowthExperiment } from "@/components/partners/partners-growth-experiment"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "LuVelle para marcas | LuVelle",
  description: "Explorá colaboraciones con profesionales, Club VIP, Beauty Box, eventos y comunidad de belleza y bienestar.",
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
