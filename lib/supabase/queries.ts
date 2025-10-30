import { getSupabaseServerClient } from "./server"
import type { Plan, Category, Product, Service, Lead, ProviderApplicant, BrandApplicant } from "./types"

const FALLBACK_PLANS: Plan[] = [
  {
    id: "1",
    name: "Essential",
    slug: "essential",
    price_range: "$15-20",
    max_products: null,
    max_services: null,
    features: [
      "Contenido digital exclusivo",
      "Tips de belleza semanales",
      "Acceso a comunidad",
      "Descuentos en productos",
    ],
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Premium",
    slug: "premium",
    price_range: "$30-40",
    max_products: 3,
    max_services: 1,
    features: [
      "3 productos personalizados",
      "1 servicio de belleza",
      "Contenido digital exclusivo",
      "Envío gratis",
      "Prioridad en nuevos lanzamientos",
    ],
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Deluxe",
    slug: "deluxe",
    price_range: "$50-60",
    max_products: 5,
    max_services: 2,
    features: [
      "5 productos premium",
      "2 servicios de belleza",
      "Contenido digital exclusivo",
      "Envío gratis express",
      "Acceso VIP a eventos",
      "Consultoría personalizada",
    ],
    is_available: true,
    created_at: new Date().toISOString(),
  },
]

function isMissingTableError(error: any): boolean {
  const errorMessage = error?.message || error?.toString() || ""
  return (
    (errorMessage.includes("relation") && errorMessage.includes("does not exist")) ||
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
        console.log("[v0] Database tables not set up yet. Using fallback plans data.")
        console.log("[v0] To set up the database, run the SQL scripts in the /scripts folder.")
      } else {
        console.error("[v0] Error fetching plans:", error.message)
      }
      return FALLBACK_PLANS
    }

    if (!data || data.length === 0) {
      console.log("[v0] No plans found in database. Using fallback data.")
      return FALLBACK_PLANS
    }

    return data
  } catch (err) {
    if (isMissingTableError(err)) {
      console.log("[v0] Database tables not set up yet. Using fallback plans data.")
      console.log("[v0] To set up the database, run the SQL scripts in the /scripts folder.")
    } else {
      console.error("[v0] Unexpected error fetching plans:", err)
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
      console.error("[v0] Error fetching categories:", error.message)
      return []
    }

    return data || []
  } catch (err) {
    console.error("[v0] Unexpected error fetching categories:", err)
    return []
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
      console.error("[v0] Error fetching active categories:", error.message)
      return []
    }

    return data || []
  } catch (err) {
    console.error("[v0] Unexpected error fetching active categories:", err)
    return []
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
      console.error("[v0] Error fetching products:", error.message)
      return []
    }

    return data || []
  } catch (err) {
    console.error("[v0] Unexpected error fetching products:", err)
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
      console.error("[v0] Error fetching services:", error.message)
      return []
    }

    return data || []
  } catch (err) {
    console.error("[v0] Unexpected error fetching services:", err)
    return []
  }
}

// Lead capture
export async function createLead(lead: Lead): Promise<boolean> {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.from("leads").insert(lead)

    if (error) {
      console.error("[v0] Error creating lead:", error.message)
      return false
    }

    return true
  } catch (err) {
    console.error("[v0] Unexpected error creating lead:", err)
    return false
  }
}

// Provider applications
export async function createProviderApplication(applicant: ProviderApplicant): Promise<boolean> {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.from("applicants_providers").insert(applicant)

    if (error) {
      console.error("[v0] Error creating provider application:", error.message)
      return false
    }

    return true
  } catch (err) {
    console.error("[v0] Unexpected error creating provider application:", err)
    return false
  }
}

// Brand applications
export async function createBrandApplication(applicant: BrandApplicant): Promise<boolean> {
  try {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.from("applicants_brands").insert(applicant)

    if (error) {
      console.error("[v0] Error creating brand application:", error.message)
      return false
    }

    return true
  } catch (err) {
    console.error("[v0] Unexpected error creating brand application:", err)
    return false
  }
}
