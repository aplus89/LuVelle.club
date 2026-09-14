import type { Metadata } from "next"
import { ClubVipExperiment } from "@/components/club-vip/club-vip-experiment"

export const metadata: Metadata = {
  title: "LuVelle Club VIP",
  description: "Sumate al acceso anticipado de LuVelle Club VIP: beneficios, recompensas y experiencias alrededor de belleza y bienestar.",
  openGraph: {
    title: "LuVelle Club VIP | Más beneficios para disfrutar lo que amás",
    description: "Acceso anticipado a beneficios, recompensas y experiencias de belleza y bienestar dentro de LuVelle.",
    url: "https://www.luvelle.club/club-vip",
  },
  twitter: {
    title: "LuVelle Club VIP",
    description: "Acceso anticipado a beneficios, recompensas y experiencias de belleza y bienestar dentro de LuVelle.",
  },
}

export default function ClubVipPage() {
  return <ClubVipExperiment />
}
