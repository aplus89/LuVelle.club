export const PLANS = {
  esencial: {
    id: "esencial",
    name: "Esencial",
    minPrice: 26000,
    maxPrice: 30000,
    margin: 0.5,
    description: "Ideal para quienes empiezan su camino de autocuidado",
    priceRange: "₡26.000 – ₡30.000",
    features: [
      "Contenido digital exclusivo",
      "Acceso a comunidad y eventos",
      "Caja con productos esenciales",
      "Diseñá tu box hasta ₡30.000",
    ],
    note: "Ideal para comenzar tu ritual de bienestar",
  },
  premium: {
    id: "premium",
    name: "Premium",
    minPrice: 31000,
    maxPrice: 39000,
    margin: 0.45,
    description: "Tu experiencia completa de belleza",
    priceRange: "₡31.000 – ₡39.000",
    cashback: 3,
    features: [
      "Productos personalizados",
      "Hasta 4 categorías recomendadas",
      "Agregar extras de productos",
      "3% cashback por referidas",
    ],
    note: "Tu experiencia completa de belleza",
  },
  deluxe: {
    id: "deluxe",
    name: "Deluxe",
    minPrice: 40000,
    maxPrice: 50000,
    margin: 0.4,
    description: "Lujo y recompensas solo para vos",
    priceRange: "₡40.000 – ₡50.000+",
    cashback: 8,
    features: [
      "Acceso completo sin límites",
      "Incluye productos y servicios",
      "8% cashback por referidas Deluxe",
      "Caja física premium incluida",
    ],
    note: "Lujo y recompensas solo para vos",
  },
} as const

export const CATEGORIES = [
  {
    id: "facial",
    name: "Belleza facial",
    icon: "✨",
    available: true,
  },
  {
    id: "makeup",
    name: "Maquillaje",
    icon: "💄",
    available: true,
  },
  {
    id: "corporal",
    name: "Cuidado corporal",
    icon: "🌿",
    available: true,
  },
  {
    id: "cabello",
    name: "Cabello",
    icon: "💇",
    available: true,
  },
  {
    id: "bienestar",
    name: "Bienestar emocional",
    icon: "💆",
    available: true,
  },
  {
    id: "higiene",
    name: "Higiene femenina",
    icon: "🌸",
    available: true,
  },
  {
    id: "medicamentos",
    name: "Medicamentos menstruales",
    icon: "💊",
    available: false,
  },
  {
    id: "maternidad",
    name: "Maternidad",
    icon: "🤰",
    available: false,
  },
  {
    id: "lenceria",
    name: "Lencería",
    icon: "👙",
    available: false,
  },
  {
    id: "perfumeria",
    name: "Perfumería",
    icon: "🌺",
    available: false,
  },
] as const

export const PRODUCTS = {
  facial: [
    {
      id: "serum-vitamin-c",
      name: "Sérum Vitamina C",
      brand: "Florina CR",
      description: "Sérum antioxidante para luminosidad y protección",
      image: "/placeholder.svg?height=200&width=200",
      price: 8500,
      available: true,
    },
    {
      id: "crema-hidratante",
      name: "Crema Hidratante Facial",
      brand: "Flormar",
      description: "Hidratación profunda para todo tipo de piel",
      image: "/placeholder.svg?height=200&width=200",
      price: 6200,
      available: true,
    },
    {
      id: "mascarilla-arcilla",
      name: "Mascarilla de Arcilla",
      brand: "Natura",
      description: "Purifica y minimiza poros",
      image: "/placeholder.svg?height=200&width=200",
      price: 4800,
      available: true,
    },
    {
      id: "contorno-ojos",
      name: "Contorno de Ojos",
      brand: "Avon",
      description: "Reduce ojeras y líneas de expresión",
      image: "/placeholder.svg?height=200&width=200",
      price: 7300,
      available: false,
    },
  ],
  makeup: [
    {
      id: "base-maquillaje",
      name: "Base de Maquillaje",
      brand: "Flormar",
      description: "Cobertura natural de larga duración",
      image: "/placeholder.svg?height=200&width=200",
      price: 9200,
      available: true,
    },
    {
      id: "labial-mate",
      name: "Labial Mate",
      brand: "Florina CR",
      description: "Color intenso y acabado mate",
      image: "/placeholder.svg?height=200&width=200",
      price: 3800,
      available: true,
    },
    {
      id: "paleta-sombras",
      name: "Paleta de Sombras",
      brand: "Natura",
      description: "12 tonos versátiles para cualquier look",
      image: "/placeholder.svg?height=200&width=200",
      price: 12500,
      available: true,
    },
    {
      id: "rimel-volumen",
      name: "Rímel Volumen",
      brand: "Avon",
      description: "Pestañas voluminosas y definidas",
      image: "/placeholder.svg?height=200&width=200",
      price: 5600,
      available: false,
    },
  ],
  corporal: [
    {
      id: "crema-corporal",
      name: "Crema Corporal Nutritiva",
      brand: "Natura",
      description: "Hidratación intensa para piel suave",
      image: "/placeholder.svg?height=200&width=200",
      price: 7800,
      available: true,
    },
    {
      id: "exfoliante-corporal",
      name: "Exfoliante Corporal",
      brand: "Florina CR",
      description: "Elimina células muertas y suaviza",
      image: "/placeholder.svg?height=200&width=200",
      price: 5400,
      available: true,
    },
    {
      id: "aceite-corporal",
      name: "Aceite Corporal",
      brand: "Flormar",
      description: "Nutrición profunda con aroma relajante",
      image: "/placeholder.svg?height=200&width=200",
      price: 8900,
      available: true,
    },
  ],
  cabello: [
    {
      id: "shampoo-reparador",
      name: "Shampoo Reparador",
      brand: "Natura",
      description: "Repara y fortalece cabello dañado",
      image: "/placeholder.svg?height=200&width=200",
      price: 6700,
      available: true,
    },
    {
      id: "mascarilla-capilar",
      name: "Mascarilla Capilar",
      brand: "Avon",
      description: "Tratamiento intensivo para cabello sedoso",
      image: "/placeholder.svg?height=200&width=200",
      price: 8200,
      available: true,
    },
    {
      id: "aceite-capilar",
      name: "Aceite Capilar",
      brand: "Florina CR",
      description: "Nutrición y brillo natural",
      image: "/placeholder.svg?height=200&width=200",
      price: 5900,
      available: false,
    },
  ],
  bienestar: [
    {
      id: "vela-aromatica",
      name: "Vela Aromática",
      brand: "Natura",
      description: "Relajación y aromaterapia",
      image: "/placeholder.svg?height=200&width=200",
      price: 4200,
      available: true,
    },
    {
      id: "sales-baño",
      name: "Sales de Baño",
      brand: "Flormar",
      description: "Baño relajante y desestresante",
      image: "/placeholder.svg?height=200&width=200",
      price: 3600,
      available: true,
    },
  ],
  higiene: [
    {
      id: "gel-intimo",
      name: "Gel Íntimo",
      brand: "Florina CR",
      description: "Cuidado delicado y protección",
      image: "/placeholder.svg?height=200&width=200",
      price: 4800,
      available: true,
    },
    {
      id: "toallitas-intimas",
      name: "Toallitas Íntimas",
      brand: "Natura",
      description: "Frescura y limpieza en cualquier momento",
      image: "/placeholder.svg?height=200&width=200",
      price: 3200,
      available: true,
    },
  ],
} as const

export const SERVICES = [
  {
    id: "facial-spa",
    name: "Facial Spa Completo",
    provider: "Spa Belleza CR",
    description: "Tratamiento facial completo con limpieza profunda",
    price: 15000,
    category: "facial",
    available: true,
  },
  {
    id: "masaje-relajante",
    name: "Masaje Relajante",
    provider: "Wellness Center",
    description: "Masaje corporal de 60 minutos",
    price: 18000,
    category: "bienestar",
    available: true,
  },
  {
    id: "manicure-pedicure",
    name: "Manicure + Pedicure",
    provider: "Nails Studio",
    description: "Servicio completo de uñas",
    price: 12000,
    category: "belleza",
    available: true,
  },
  {
    id: "tratamiento-capilar",
    name: "Tratamiento Capilar",
    provider: "Hair Salon",
    description: "Tratamiento reconstructivo para el cabello",
    price: 20000,
    category: "cabello",
    available: true,
  },
] as const

export const INTERESTS = [
  { id: "productos", name: "Productos", icon: "Package" },
  { id: "servicios", name: "Servicios", icon: "Sparkles" },
  { id: "ambos", name: "Ambos", icon: "Crown" },
] as const

export const SOCIAL_LINKS = {
  email: "hello@luvelle.club",
  whatsapp: "https://wa.me/15557792120",
  instagram: "https://www.instagram.com/luvelle_club",
  tiktok: "https://www.tiktok.com/@luvelle.club",
  linkedin: "https://www.linkedin.com/company/luvelleai",
  twitter: "https://twitter.com/LuVelleAi",
} as const

// Costos fijos
export const FIXED_COSTS = {
  box: 4500, // Costo de la caja
  shipping: 3500, // Costo de envío
} as const

// Función para determinar el margen dinámico
export function determinarMargen(costoTotal: number): number {
  if (costoTotal < 30000) return 0.5
  if (costoTotal < 40000) return 0.45
  if (costoTotal < 50000) return 0.4
  return 0.35
}

// Función para calcular el precio final
export function calcularPrecioFinal(costoProductos: number): {
  costoTotal: number
  margen: number
  precioFinal: number
  utilidad: number
  planAlcanzado: string
} {
  const costoTotal = costoProductos + FIXED_COSTS.box + FIXED_COSTS.shipping
  const margen = determinarMargen(costoTotal)
  const precioFinal = Math.round(costoTotal / (1 - margen))
  const utilidad = precioFinal - costoTotal

  let planAlcanzado = "esencial"
  if (precioFinal >= PLANS.premium.minPrice && precioFinal <= PLANS.premium.maxPrice) {
    planAlcanzado = "premium"
  } else if (precioFinal >= PLANS.deluxe.minPrice) {
    planAlcanzado = "deluxe"
  }

  return {
    costoTotal,
    margen,
    precioFinal,
    utilidad,
    planAlcanzado,
  }
}
