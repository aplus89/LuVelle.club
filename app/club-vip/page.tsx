import type { Metadata } from "next"
import { ClubVipExperiment } from "@/components/club-vip/club-vip-experiment"

export const metadata: Metadata = {
  title: "LuVelle Club VIP | Acceso anticipado",
  description:
    "Un experimento de membresía para explorar beneficios, recompensas y futuras experiencias financieras alrededor de belleza y bienestar.",
}

export default function ClubVipPage() {
  return <ClubVipExperiment />
}
