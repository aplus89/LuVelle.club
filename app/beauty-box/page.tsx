import type { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { BeautyBoxInterestExperiment } from "@/components/beauty-box/beauty-box-interest-experiment"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "The Beauty Box | LuVelle",
  description: "Acceso anticipado a la experiencia Beauty Box de LuVelle. Ayudanos a validar categorías, formato y rango de precio antes del lanzamiento.",
}

export default function BeautyBoxPage() {
  return (
    <main className="min-h-screen bg-[#FFF7F3]">
      <Header />
      <BeautyBoxInterestExperiment />
      <Footer />
    </main>
  )
}
