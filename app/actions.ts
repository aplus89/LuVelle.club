"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

// Use service role key for server actions to bypass RLS when needed
async function getSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key instead of anon key
    {
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
    },
  )
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

    const { data: insertedData, error } = await supabase
      .from("leads")
      .insert([
        {
          persona: data.persona,
          email: data.email,
          whatsapp: data.whatsapp,
          notes: data.notes,
          source: data.source || "website",
        },
      ])
      .select()

    if (error) {
      console.error("[v0] Error creating lead:", error.message, error.details, error.hint)
      return { success: false, error: error.message }
    }

    console.log("[v0] Lead created successfully:", insertedData)
    return { success: true, data: insertedData }
  } catch (error) {
    console.error("[v0] Exception creating lead:", error)
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

    const { data: insertedData, error } = await supabase
      .from("provider_applications")
      .insert([
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
      .select()

    if (error) {
      console.error("[v0] Error creating provider application:", error.message, error.details, error.hint)
      return { success: false, error: error.message }
    }

    console.log("[v0] Provider application created successfully:", insertedData)
    return { success: true, data: insertedData }
  } catch (error) {
    console.error("[v0] Exception creating provider application:", error)
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

    const { data: insertedData, error } = await supabase
      .from("brand_applications")
      .insert([
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
      .select()

    if (error) {
      console.error("[v0] Error creating brand application:", error.message, error.details, error.hint)
      return { success: false, error: error.message }
    }

    console.log("[v0] Brand application created successfully:", insertedData)
    return { success: true, data: insertedData }
  } catch (error) {
    console.error("[v0] Exception creating brand application:", error)
    return { success: false, error: "Failed to create application" }
  }
}

export async function createSubscriptionAction(data: {
  email: string
  whatsapp?: string
  name?: string
  plan_slug: string
  selected_categories?: string[]
  selected_products?: string[]
  selected_services?: string[]
  referral_code_used?: string
  shipping_address?: {
    address: string
    city: string
    province: string
    postal_code?: string
  }
}) {
  try {
    const supabase = await getSupabaseServerClient()

    // Get the plan ID from the slug
    const { data: planData, error: planError } = await supabase
      .from("plans")
      .select("id")
      .eq("slug", data.plan_slug)
      .single()

    if (planError) {
      console.error("[v0] Error finding plan:", planError.message)
      // Continue without plan_id if not found
    }

    // Generate a unique referral code for this user
    const referralCode = `LV${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`

    const { data: insertedData, error } = await supabase
      .from("subscriptions")
      .insert([
        {
          email: data.email,
          whatsapp: data.whatsapp,
          name: data.name,
          plan_id: planData?.id,
          referral_code: referralCode,
          referred_by: data.referral_code_used,
          selected_categories: data.selected_categories || [],
          selected_products: data.selected_products || [],
          selected_services: data.selected_services || [],
          shipping_address: data.shipping_address,
          status: "pending",
        },
      ])
      .select()

    if (error) {
      console.error("[v0] Error creating subscription:", error.message, error.details, error.hint)
      return { success: false, error: error.message }
    }

    console.log("[v0] Subscription created successfully:", insertedData)
    return { success: true, data: insertedData, referralCode }
  } catch (error) {
    console.error("[v0] Exception creating subscription:", error)
    return { success: false, error: "Failed to create subscription" }
  }
}

export async function getCategoriesAction() {
  try {
    const supabase = await getSupabaseServerClient()

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true })

    if (error) {
      console.error("[v0] Error fetching categories:", error.message)
      return { success: false, error: error.message, data: [] }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error("[v0] Exception fetching categories:", error)
    return { success: false, error: "Failed to fetch categories", data: [] }
  }
}
