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
            // Server Actions can continue when response cookies cannot be changed.
          }
        },
      },
    },
  )
}

export async function createLuvelleAiInterestAction(data: {
  full_name: string
  email: string
  whatsapp?: string
  business_type?: string
  biggest_pain_point: string
  weekly_inquiries_estimate?: string
  current_followup_method?: string
  would_pay_if_it_recovers_clients?: string
  notes?: string
  source?: string
}) {
  try {
    const supabase = await getSupabaseServerClient()
    const { data: insertedData, error } = await supabase
      .from("luvelle_ai_interest")
      .insert([
        {
          full_name: data.full_name,
          email: data.email,
          whatsapp: data.whatsapp,
          business_type: data.business_type,
          biggest_pain_point: data.biggest_pain_point,
          weekly_inquiries_estimate: data.weekly_inquiries_estimate,
          current_followup_method: data.current_followup_method,
          would_pay_if_it_recovers_clients: data.would_pay_if_it_recovers_clients,
          notes: data.notes,
          source: data.source || "luvelle-ai-beta-v1",
        },
      ])
      .select()

    if (error) {
      console.error("[LuVelle] Error creating AI interest entry:", error.message)
      return { success: false, error: error.message }
    }

    return { success: true, data: insertedData }
  } catch (error) {
    console.error("[LuVelle] Exception creating AI interest entry:", error)
    return { success: false, error: "Failed to create AI interest entry" }
  }
}
