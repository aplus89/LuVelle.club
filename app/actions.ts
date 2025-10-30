"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

async function getSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Ignore errors in Server Components
        }
      },
    },
  })
}

export async function createLeadAction(data: {
  persona: string
  email?: string
  whatsapp?: string
  notes?: string
  source?: string
}) {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase.from("leads").insert([
      {
        persona: data.persona,
        email: data.email,
        whatsapp: data.whatsapp,
        notes: data.notes,
        source: data.source || "website",
      },
    ])

    if (error) {
      console.error("[v0] Error creating lead:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Error creating lead:", error)
    return { success: false, error: "Failed to create lead" }
  }
}

export async function createProviderApplicationAction(data: {
  name: string
  whatsapp: string
  email: string
  city?: string
  categories: string[]
  portfolio_url?: string
  message?: string
}) {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase.from("provider_applications").insert([
      {
        name: data.name,
        whatsapp: data.whatsapp,
        email: data.email,
        city: data.city,
        categories: data.categories,
        portfolio_url: data.portfolio_url,
        message: data.message,
      },
    ])

    if (error) {
      console.error("[v0] Error creating provider application:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Error creating provider application:", error)
    return { success: false, error: "Failed to create application" }
  }
}

export async function createBrandApplicationAction(data: {
  brand_name: string
  contact_name: string
  email: string
  whatsapp: string
  catalog_url?: string
  country?: string
  message?: string
}) {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase.from("brand_applications").insert([
      {
        brand_name: data.brand_name,
        contact_name: data.contact_name,
        email: data.email,
        whatsapp: data.whatsapp,
        catalog_url: data.catalog_url,
        country: data.country || "Costa Rica",
        message: data.message,
      },
    ])

    if (error) {
      console.error("[v0] Error creating brand application:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Error creating brand application:", error)
    return { success: false, error: "Failed to create application" }
  }
}
