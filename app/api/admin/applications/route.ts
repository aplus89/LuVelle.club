import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    console.log("[v0] API: Starting to fetch applications...")
    const supabase = await getSupabaseServerClient()
    console.log("[v0] API: Supabase client created")

    const [providerResult, brandResult] = await Promise.all([
      supabase.from("provider_applications").select("*").order("created_at", { ascending: false }),
      supabase.from("brand_applications").select("*").order("created_at", { ascending: false }),
    ])

    console.log("[v0] API: Provider result:", {
      data: providerResult.data,
      error: providerResult.error,
      count: providerResult.data?.length || 0,
    })
    console.log("[v0] API: Brand result:", {
      data: brandResult.data,
      error: brandResult.error,
      count: brandResult.data?.length || 0,
    })

    if (providerResult.error) {
      console.error("[v0] API: Provider query error:", providerResult.error)
    }
    if (brandResult.error) {
      console.error("[v0] API: Brand query error:", brandResult.error)
    }

    const providerApps = (providerResult.data || []).map((app) => ({
      ...app,
      status: app.status === "pending" ? "Nuevo" : app.status || "Nuevo",
    }))

    const brandApps = (brandResult.data || []).map((app) => ({
      ...app,
      status: app.status === "pending" ? "Nuevo" : app.status || "Nuevo",
    }))

    console.log("[v0] API: Mapped provider apps:", providerApps.length)
    console.log("[v0] API: Mapped brand apps:", brandApps.length)

    return NextResponse.json({
      success: true,
      providerApplications: providerApps,
      brandApplications: brandApps,
    })
  } catch (error) {
    console.error("[v0] API: Error fetching applications:", error)
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
