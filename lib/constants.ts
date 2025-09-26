// Social media links
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/luvelle.club",
  tiktok: "https://tiktok.com/@luvelle.club",
  whatsapp: "https://wa.me/15557792120",
  email: "mailto:hola@luvelle.club",
}

// Updated subscription plans
export const SUBSCRIPTION_PLANS = {
  esencial: {
    id: "esencial",
    name: "Esencial",
    price: "₡26.000 – ₡30.000",
    priceRange: { min: 26000, max: 30000 },
    icon: "Package",
    description: "Ideal para quienes quieren probar LuVelle por primera vez",
    features: [
      "Productos físicos seleccionados por el equipo LuVelle",
      "No incluye servicios ni personalización",
      "Caja curada con los mejores productos del mes",
      "Envío incluido a toda Costa Rica",
    ],
    cta: "Comenzar con Esencial",
    action: "direct-payment", // Direct payment flow
    popular: false,
    color: "from-blue-500/20 to-blue-600/10",
    borderColor: "border-blue-400/30",
  },
  premium: {
    id: "premium",
    name: "Premium",
    price: "₡31.000 – ₡39.000",
    priceRange: { min: 31000, max: 39000 },
    icon: "Crown",
    description: "Personalización parcial con beneficios exclusivos",
    features: [
      "Personalización parcial de productos",
      "Posibilidad de añadir productos extra con puntos",
      "Acceso limitado a categorías",
      "Cashback del 3% sobre consumo superior a $120",
    ],
    cta: "Crear mi Caja Premium",
    action: "wizard", // Redirect to wizard
    popular: true,
    ribbon: "✨ Más Elegido",
    color: "from-gold/20 to-gold/10",
    borderColor: "border-gold/40",
  },
  deluxe: {
    id: "deluxe",
    name: "Deluxe",
    price: "₡40.000 – ₡50.000+",
    priceRange: { min: 40000, max: 50000 },
    icon: "Sparkles",
    description: "Experiencia premium completa y personalizada",
    features: [
      "Personalización total: productos y servicios",
      "Acceso completo a todas las categorías",
      "Cashback del 8% sobre consumo superior a $120",
      "Posibilidad de compartir o recibir una caja como regalo",
    ],
    cta: "Diseñar mi Experiencia Deluxe",
    action: "wizard", // Redirect to wizard
    popular: false,
    color: "from-purple-500/20 to-purple-600/10",
    borderColor: "border-purple-400/30",
  },
}

// Legacy plans (keeping for backward compatibility)
export const PLANS = {
  basico: {
    id: "basico",
    name: "Básico",
    price: 25000,
    originalPrice: 30000,
    description: "Perfecto para comenzar tu journey de belleza",
    features: [
      "3-4 productos de belleza premium",
      "Envío gratis a toda Costa Rica",
      "Acceso a la comunidad LuVelle",
      "Garantía de satisfacción 100%",
    ],
    popular: false,
    cta: "Comenzar con Básico",
  },
  premium: {
    id: "premium",
    name: "Premium",
    price: 35000,
    originalPrice: 45000,
    description: "La experiencia completa de belleza personalizada",
    features: [
      "5-6 productos premium seleccionados",
      "Personalización según tu perfil",
      "Productos exclusivos y lanzamientos",
      "Envío express gratuito",
      "Soporte prioritario",
      "Descuentos en compras adicionales",
    ],
    popular: true,
    cta: "Elegir Premium",
  },
  deluxe: {
    id: "deluxe",
    name: "Deluxe",
    price: 50000,
    originalPrice: 65000,
    description: "Lujo absoluto con productos de alta gama",
    features: [
      "7-8 productos de lujo internacional",
      "Consulta personalizada con expertos",
      "Acceso VIP a eventos exclusivos",
      "Productos de edición limitada",
      "Envío premium con packaging especial",
      "Cashback del 10% en compras",
      "Regalos sorpresa mensuales",
    ],
    popular: false,
    cta: "Experiencia Deluxe",
  },
}

// Categories for the wizard
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

// Products for the wizard
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

// Services for the wizard
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

// User interests for step 1
export const INTERESTS = [
  {
    id: "productos",
    name: "Productos",
    icon: "Package",
    description: "Productos para el cuidado facial y corporal",
  },
  {
    id: "servicios",
    name: "Servicios",
    icon: "Sparkles",
    description: "Cosméticos y productos de belleza",
  },
  {
    id: "ambos",
    name: "Ambos",
    icon: "Crown",
    description: "Productos para el bienestar integral",
  },
] as const

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
  if (
    precioFinal >= SUBSCRIPTION_PLANS.premium.priceRange.min &&
    precioFinal <= SUBSCRIPTION_PLANS.premium.priceRange.max
  ) {
    planAlcanzado = "premium"
  } else if (precioFinal >= SUBSCRIPTION_PLANS.deluxe.priceRange.min) {
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
