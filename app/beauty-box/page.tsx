import type { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { BeautyBoxInterestExperiment } from "@/components/beauty-box/beauty-box-interest-experiment"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "The Beauty Box",
  description: "Sumate al acceso anticipado de The Beauty Box by LuVelle: una experiencia curada para descubrir productos, marcas y favoritos de belleza y bienestar.",
  openGraph: {
    title: "The Beauty Box by LuVelle | Algo especial viene para vos",
    description: "Una experiencia curada para descubrir productos, marcas y favoritos de belleza y bienestar.",
    url: "https://www.luvelle.club/beauty-box",
  },
  twitter: {
    title: "The Beauty Box by LuVelle",
    description: "Una experiencia curada para descubrir productos, marcas y favoritos de belleza y bienestar.",
  },
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
