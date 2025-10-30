export type Persona = "user" | "provider" | "brand"

export interface Plan {
  id: string
  name: string
  slug: string
  price_range: string
  features: string[]
  is_available: boolean
  allows_product_customization: boolean
  allows_service_customization: boolean
  max_products: number | null
  max_services: number | null
}

export interface Category {
  id: string
  name: string
  icon: string | null
  is_active: boolean
  status: "activo" | "proximamente"
  display_order: number
}

export interface Product {
  id: string
  name: string
  category_id: string
  image_url: string | null
  price_crc: number
  available_in: string[]
  is_active: boolean
  description: string | null
}

export interface Service {
  id: string
  name: string
  category_id: string
  image_url: string | null
  price_crc: number
  available_in: string[]
  is_active: boolean
  description: string | null
}

export interface Lead {
  persona: Persona
  name?: string
  email?: string
  phone?: string
  source?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  notes?: string
}

export interface ProviderApplicant {
  name: string
  whatsapp: string
  email: string
  city?: string
  categories: string[]
  portfolio_url?: string
  message?: string
}

export interface BrandApplicant {
  brand_name: string
  contact_name: string
  email: string
  whatsapp: string
  catalog_url?: string
  country?: string
  message?: string
}
