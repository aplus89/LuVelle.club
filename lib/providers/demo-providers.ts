export type DemoProviderService = {
  name: string
  description: string
  duration: string
  priceFrom: string
  image: string
}

export type DemoProvider = {
  slug: string
  name: string
  verified: boolean
  specialties: string[]
  area: string
  yearsExperience: number
  clientsServed: number
  rating: number
  ratingCount: number
  responseLabel: string
  bio: string
  profileImage: string
  coverImage: string
  serviceTags: string[]
  services: DemoProviderService[]
  portfolio: string[]
}

const demoProviders: Record<string, DemoProvider> = {
  "mariana-lopez": {
    slug: "mariana-lopez",
    name: "Mariana López",
    verified: true,
    specialties: ["Cejas", "Pestañas", "Facial"],
    area: "Escazú y alrededores",
    yearsExperience: 6,
    clientsServed: 230,
    rating: 4.9,
    ratingCount: 128,
    responseLabel: "Responde rápido",
    bio: "Ayudo a mujeres a verse y sentirse seguras con resultados naturales, técnicas cuidadosas y una experiencia cálida. Mi enfoque combina detalle, higiene y atención personalizada.",
    profileImage: "/elegant-woman-with-luxury-beauty-products-spa-sett.jpg",
    coverImage: "/luxury-beauty-wellness-spa-products.jpg",
    serviceTags: ["Diseño de cejas", "Lifting de pestañas", "Henna", "Limpieza facial", "Skincare", "A domicilio"],
    services: [
      {
        name: "Diseño de cejas + Henna",
        description: "Realza tu mirada con un diseño personalizado y henna de larga duración.",
        duration: "60 min",
        priceFrom: "₡18.000",
        image: "/elegant-woman-holding-luxury-beauty-box-with-soft-.jpg",
      },
      {
        name: "Lifting de pestañas",
        description: "Eleva y curva tus pestañas naturales para una mirada más expresiva.",
        duration: "75 min",
        priceFrom: "₡26.000",
        image: "/elegant-woman-with-luxury-beauty-products-spa-sett.jpg",
      },
      {
        name: "Facial glow",
        description: "Limpieza profunda, hidratación y luminosidad para tu piel.",
        duration: "90 min",
        priceFrom: "₡42.000",
        image: "/luxury-beauty-products-cosmetics-bottles-elegant-d.jpg",
      },
    ],
    portfolio: [
      "/elegant-woman-with-luxury-beauty-products-spa-sett.jpg",
      "/elegant-woman-holding-luxury-beauty-box-with-soft-.jpg",
      "/luxury-beauty-wellness-spa-products.jpg",
      "/luxury-beauty-products-cosmetics-bottles-elegant-d.jpg",
    ],
  },
}

export function getDemoProvider(slug: string) {
  return demoProviders[slug]
}

export function getDemoProviderSlugs() {
  return Object.keys(demoProviders)
}
