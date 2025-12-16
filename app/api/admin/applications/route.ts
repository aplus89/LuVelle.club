import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await getSupabaseServerClient()

    const [providerResult, brandResult] = await Promise.all([
      supabase.from("provider_applications").select("*").order("created_at", { ascending: false }),
      supabase.from("brand_applications").select("*").order("created_at", { ascending: false }),
    ])

    const providerApps = (providerResult.data || []).map((app) => ({
      ...app,
      status: app.status === "pending" ? "Nuevo" : app.status || "Nuevo",
    }))

    const brandApps = (brandResult.data || []).map((app) => ({
      ...app,
      status: app.status === "pending" ? "Nuevo" : app.status || "Nuevo",
    }))

    return NextResponse.json({
      success: true,
      providerApplications: providerApps,
      brandApplications: brandApps,
    })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch applications" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { type, id, status } = await request.json()
    const supabase = await getSupabaseServerClient()

    const table = type === "provider" ? "provider_applications" : "brand_applications"

    const { error } = await supabase.from(table).update({ status, updated_at: new Date().toISOString() }).eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating application:", error)
    return NextResponse.json({ success: false, error: "Failed to update application" }, { status: 500 })
  }
}
