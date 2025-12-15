import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { onvopay } from "@/lib/onvopay/client"
import type { CheckoutRequest, CheckoutResponse } from "@/lib/onvopay/types"

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json()

    const {
      planSlug,
      customerEmail,
      customerWhatsapp,
      customerName,
      selectedCategories,
      selectedProducts,
      selectedServices,
      shippingAddress,
      referralCode,
      metadata,
    } = body

    // Validate required fields
    if (!planSlug || !customerEmail) {
      return NextResponse.json<CheckoutResponse>(
        { success: false, error: "Plan y email son requeridos" },
        { status: 400 },
      )
    }

    const supabase = await createClient()

    // 1. Get the plan from database
    const { data: plan, error: planError } = await supabase
      .from("plans")
      .select("*")
      .eq("slug", planSlug)
      .eq("is_available", true)
      .single()

    if (planError || !plan) {
      return NextResponse.json<CheckoutResponse>({ success: false, error: "Plan no encontrado" }, { status: 404 })
    }

    // 2. Create pending subscription record
    const { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .insert({
        plan_id: plan.id,
        email: customerEmail,
        whatsapp: customerWhatsapp,
        name: customerName,
        status: "pending",
        referred_by: referralCode,
        selected_categories: selectedCategories || [],
        selected_products: selectedProducts || [],
        selected_services: selectedServices || [],
        shipping_address: shippingAddress,
      })
      .select()
      .single()

    if (subError || !subscription) {
      console.error("[Checkout] Error creating subscription:", subError)
      return NextResponse.json<CheckoutResponse>(
        { success: false, error: "Error al crear la suscripción" },
        { status: 500 },
      )
    }

    // 3. Create pending payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        subscription_id: subscription.id,
        plan_id: plan.id,
        amount_crc: plan.price_local || 0,
        currency: plan.currency_local || "CRC",
        status: "pending",
        description: `LuVelle - ${plan.name}`,
        metadata: {
          plan_slug: planSlug,
          plan_type: plan.type,
          ...metadata,
        },
      })
      .select()
      .single()

    if (paymentError) {
      console.error("[Checkout] Error creating payment:", paymentError)
      // Don't fail - we can still proceed without the payment record
    }

    // 4. Build success/cancel URLs
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin
    const successUrl = `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&subscription_id=${subscription.id}`
    const cancelUrl = `${baseUrl}/checkout/cancelled?subscription_id=${subscription.id}`

    // 5. Create Onvopay checkout session
    try {
      const checkoutSession = await onvopay.createCheckoutSession({
        plan,
        customerEmail,
        customerName,
        successUrl,
        cancelUrl,
        metadata: {
          subscription_id: subscription.id,
          payment_id: payment?.id,
        },
      })

      // Update payment with Onvopay checkout ID
      if (payment) {
        await supabase
          .from("payments")
          .update({
            onvo_checkout_id: checkoutSession.id,
            status: "processing",
          })
          .eq("id", payment.id)
      }

      return NextResponse.json<CheckoutResponse>({
        success: true,
        checkoutUrl: checkoutSession.url,
        paymentId: payment?.id,
      })
    } catch (onvoError: any) {
      console.error("[Checkout] Onvopay error:", onvoError)

      // If Onvopay is not configured, return a mock URL for development
      if (process.env.NODE_ENV !== "production") {
        const mockUrl = `${baseUrl}/checkout/mock?subscription_id=${subscription.id}&plan=${planSlug}`
        return NextResponse.json<CheckoutResponse>({
          success: true,
          checkoutUrl: mockUrl,
          paymentId: payment?.id,
        })
      }

      return NextResponse.json<CheckoutResponse>(
        { success: false, error: "Error al procesar el pago" },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("[Checkout] Unexpected error:", error)
    return NextResponse.json<CheckoutResponse>({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
