import { getSupabaseServerClient } from "./server"
import type { Plan, Category, Product, Service, Lead, ProviderApplicant, BrandApplicant } from "./types"

const FALLBACK_PLANS: Plan[] = [
  {
    id: "1",
    name: "Esencial",
    slug: "essential",
    price_range: "₡26.000 – ₡30.000",
    max_products: null,
    max_services: null,
    features: [
      "Caja curada por LuVelle según tu perfil",
      "Sin personalización de productos",
      "Contenido digital (LuVelle AI, podcast, newsletter)",
    ],
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Premium",
    slug: "premium",
    price_range: "₡31.000 – ₡39.000",
    max_products: 3,
    max_services: 0,
    features: [
      "Personalización parcial de productos",
      "Acceso a categorías seleccionadas",
      "Podés añadir productos extra con puntos",
      "Programa de referidos: 3% cashback (compra > $120)",
      "Incluye todo lo de Esencial",
    ],
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Deluxe",
    slug: "deluxe",
    price_range: "₡40.000 – ₡50.000+",
    max_products: 5,
    max_services: 2,
    features: [
      "Personalización total: productos + servicios",
      "Acceso completo a todas las categorías",
      "Programa de referidos: 8% cashback (consumo > $120)",
      "Incluye todo lo de Premium",
    ],
    is_available: true,
    created_at: new Date().toISOString(),
  },
]

const FALLBACK_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Skincare",
    slug: "skincare",
    description: "Cuidado de la piel",
    icon: "sparkles",
    is_active: true,
    coming_soon: false,
    display_order: 1,
  },
  {
    id: "2",
    name: "Makeup",
    slug: "makeup",
    description: "Maquillaje",
    icon: "palette",
    is_active: true,
    coming_soon: false,
    display_order: 2,
  },
  {
    id: "3",
    name: "Haircare",
    slug: "haircare",
    description: "Cuidado del cabello",
    icon: "scissors",
    is_active: true,
    coming_soon: false,
    display_order: 3,
  },
  {
    id: "4",
    name: "Wellness",
    slug: "wellness",
    description: "Bienestar",
    icon: "heart",
    is_active: true,
    coming_soon: true,
    display_order: 4,
  },
]

function isMissingTableError(error: any): boolean {
  if (!error) return false
  const errorMessage = error?.message || error?.toString() || ""
  const errorCode = error?.code || ""
  return (
    errorCode === "42P01" || // PostgreSQL: relation does not exist
    errorCode === "PGRST204" || // PostgREST: table not found
    (errorMessage.includes("relation") && errorMessage.includes("does not exist")) ||
    errorMessage.includes("42P01") ||
    errorMessage.includes("failed with status 404") ||
    errorMessage.includes("Invalid") ||
    errorMessage.includes("not valid JSON")
  )
}

// Plans
export async function getPlans(): Promise<Plan[]> {
  try {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase
      .from("plans")
      .select("*")
      .eq("is_available", true)
      .order("max_products", { ascending: true, nullsFirst: true })

    if (error) {
      if (isMissingTableError(error)) {
        console.log("[SERVER] Database tables not set up yet. Using fallback plans data.")
        console.log("[SERVER] To set up the database, run scripts/setup_database.sql in Supabase SQL Editor.")
      } else {
        console.error("[SERVER] Error fetching plans:", error.message)
      }
      return FALLBACK_PLANS
    }

    if (!data || data.length === 0) {
      console.log("[SERVER] No plans found in database. Using fallback data.")
      return FALLBACK_PLANS
    }

    return data
  } catch (err: any) {
    if (isMissingTableError(err)) {
      console.log("[SERVER] Database tables not set up yet. Using fallback plans data.")
      console.log("[SERVER] To set up the database, run scripts/setup_database.sql in Supabase SQL Editor.")
    } else {
      console.error("[SERVER] Unexpected error fetching plans:", err?.message || err)
    }
    return FALLBACK_PLANS
  }
}

// Categories
export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase.from("categories").select("*").order("display_order", { ascending: true })

    if (error) {
      if (isMissingTableError(error)) {
        console.log("[SERVER] Categories table not set up. Using fallback data.")
      } else {
        console.error("[SERVER] Error fetching categories:", error.message)
      }
      return FALLBACK_CATEGORIES
    }

    return data && data.length > 0 ? data : FALLBACK_CATEGORIES
  } catch (err: any) {
    if (isMissingTableError(err)) {
      console.log("[SERVER] Categories table not set up. Using fallback data.")
    } else {
      console.error("[SERVER] Unexpected error fetching categories:", err?.message || err)
    }
    return FALLBACK_CATEGORIES
  }
}

export async function getActiveCategories(): Promise<Category[]> {
  try {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true })

    if (error) {
      if (isMissingTableError(error)) {
        return FALLBACK_CATEGORIES.filter((c) => c.is_active)
      }
      console.error("[SERVER] Error fetching active categories:", error.message)
      return FALLBACK_CATEGORIES.filter((c) => c.is_active)
    }

    return data && data.length > 0 ? data : FALLBACK_CATEGORIES.filter((c) => c.is_active)
  } catch (err: any) {
    if (isMissingTableError(err)) {
      return FALLBACK_CATEGORIES.filter((c) => c.is_active)
    }
    console.error("[SERVER] Unexpected error fetching active categories:", err?.message || err)
    return FALLBACK_CATEGORIES.filter((c) => c.is_active)
  }
}

// Products
export async function getProductsByCategory(categoryId: string, planType?: string): Promise<Product[]> {
  try {
    const supabase = await getSupabaseServerClient()
    let query = supabase.from("products").select("*").eq("category_id", categoryId).eq("is_active", true)

    if (planType) {
      query = query.contains("available_in", [planType])
    }

    const { data, error } = await query

    if (error) {
      console.error("[SERVER] Error fetching products:", error.message)
      return []
    }

    return data || []
  } catch (err) {
    console.error("[SERVER] Unexpected error fetching products:", err)
    return []
  }
}

// Services
export async function getServicesByCategory(categoryId: string): Promise<Service[]> {
  try {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("category_id", categoryId)
      .eq("is_active", true)

    if (error) {
      console.error("[SERVER] Error fetching services:", error.message)
      return []
    }

    return data || []
  } catch (err) {
    console.error("[SERVER] Unexpected error fetching services:", err)
    return []
  }
}

// Lead capture
export async function createLead(lead: Lead): Promise<boolean> {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.from("leads").insert(lead)

    if (error) {
      console.error("[SERVER] Error creating lead:", error.message)
      return false
    }

    return true
  } catch (err) {
    console.error("[SERVER] Unexpected error creating lead:", err)
    return false
  }
}

// Provider applications
export async function createProviderApplication(applicant: ProviderApplicant): Promise<boolean> {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.from("applicants_providers").insert(applicant)

    if (error) {
      console.error("[SERVER] Error creating provider application:", error.message)
      return false
    }

    return true
  } catch (err) {
    console.error("[SERVER] Unexpected error creating provider application:", err)
    return false
  }
}

// Brand applications
export async function createBrandApplication(applicant: BrandApplicant): Promise<boolean> {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.from("applicants_brands").insert(applicant)

    if (error) {
      console.error("[SERVER] Error creating brand application:", error.message)
      return false
    }

    return true
  } catch (err) {
    console.error("[SERVER] Unexpected error creating brand application:", err)
    return false
  }
}
