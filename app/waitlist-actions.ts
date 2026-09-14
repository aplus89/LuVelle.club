"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

async function getSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // Server Actions can safely continue if response cookies cannot be changed.
          }
        },
      },
    },
  )
}

export async function createBeautyBoxWaitlistAction(data: {
  name: string
  email: string
  whatsapp?: string
  preferred_category: string
  purchase_preference?: string
  approximate_budget?: string
  must_have?: string
  source?: string
}) {
  try {
    const supabase = await getSupabaseServerClient()
    const { data: insertedData, error } = await supabase
      .from("beauty_box_waitlist")
      .insert([
        {
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp,
          preferred_category: data.preferred_category,
          purchase_preference: data.purchase_preference,
          approximate_budget: data.approximate_budget,
          must_have: data.must_have,
          source: data.source || "beauty-box-waitlist-v1",
        },
      ])
      .select()

    if (error) {
      console.error("[LuVelle] Error creating Beauty Box waitlist entry:", error.message)
      return { success: false, error: error.message }
    }

    return { success: true, data: insertedData }
  } catch (error) {
    console.error("[LuVelle] Exception creating Beauty Box waitlist entry:", error)
    return { success: false, error: "Failed to create Beauty Box waitlist entry" }
  }
}

export async function createClubVipWaitlistAction(data: {
  name?: string
  email: string
  whatsapp?: string
  benefits: string[]
  monthly_beauty_spend: string
  membership_intent: string
  open_feedback?: string
  source?: string
}) {
  try {
    const supabase = await getSupabaseServerClient()
    const { data: insertedData, error } = await supabase
      .from("club_vip_waitlist")
      .insert([
        {
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp,
          benefits: data.benefits,
          monthly_beauty_spend: data.monthly_beauty_spend,
          membership_intent: data.membership_intent,
          open_feedback: data.open_feedback,
          source: data.source || "club-vip-waitlist-v1",
        },
      ])
      .select()

    if (error) {
      console.error("[LuVelle] Error creating Club VIP waitlist entry:", error.message)
      return { success: false, error: error.message }
    }

    return { success: true, data: insertedData }
  } catch (error) {
    console.error("[LuVelle] Exception creating Club VIP waitlist entry:", error)
    return { success: false, error: "Failed to create Club VIP waitlist entry" }
  }
}
