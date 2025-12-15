import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import type { OnvoWebhookEvent, PaymentStatus, SubscriptionStatus } from "@/lib/onvopay/types"

// Use service role for webhook processing
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const ONVO_WEBHOOK_SECRET = process.env.ONVO_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text()
    const signature = request.headers.get("x-onvo-signature") || ""

    // Verify webhook signature in production
    if (process.env.NODE_ENV === "production" && ONVO_WEBHOOK_SECRET) {
      const crypto = require("crypto")
      const expectedSignature = crypto.createHmac("sha256", ONVO_WEBHOOK_SECRET).update(payload).digest("hex")

      if (signature !== expectedSignature) {
        console.error("[Webhook] Invalid signature")
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      }
    }

    const event: OnvoWebhookEvent = JSON.parse(payload)

    // Log the event for debugging
    console.log("[Webhook] Received event:", event.type, event.id)

    // Store the event
    const { data: eventRecord, error: eventError } = await supabase
      .from("payment_events")
      .insert({
        event_type: event.type,
        onvo_event_id: event.id,
        payload: event,
        processed: false,
      })
      .select()
      .single()

    if (eventError) {
      console.error("[Webhook] Error storing event:", eventError)
    }

    // Process the event
    try {
      await processWebhookEvent(event)

      // Mark as processed
      if (eventRecord) {
        await supabase
          .from("payment_events")
          .update({ processed: true, processed_at: new Date().toISOString() })
          .eq("id", eventRecord.id)
      }
    } catch (processError: any) {
      console.error("[Webhook] Error processing event:", processError)

      // Store the error
      if (eventRecord) {
        await supabase.from("payment_events").update({ error: processError.message }).eq("id", eventRecord.id)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("[Webhook] Unexpected error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

async function processWebhookEvent(event: OnvoWebhookEvent) {
  const { type, data } = event

  switch (type) {
    case "checkout.completed":
      await handleCheckoutCompleted(data.object)
      break

    case "payment.succeeded":
      await handlePaymentSucceeded(data.object)
      break

    case "payment.failed":
      await handlePaymentFailed(data.object)
      break

    case "subscription.created":
      await handleSubscriptionCreated(data.object)
      break

    case "subscription.updated":
      await handleSubscriptionUpdated(data.object)
      break

    case "subscription.cancelled":
      await handleSubscriptionCancelled(data.object)
      break

    case "subscription.past_due":
      await handleSubscriptionPastDue(data.object)
      break

    case "invoice.paid":
      await handleInvoicePaid(data.object)
      break

    case "invoice.payment_failed":
      await handleInvoicePaymentFailed(data.object)
      break

    default:
      console.log("[Webhook] Unhandled event type:", type)
  }
}

async function handleCheckoutCompleted(checkout: any) {
  const subscriptionId = checkout.metadata?.subscription_id
  const paymentId = checkout.metadata?.payment_id

  if (subscriptionId) {
    // Update subscription status
    await supabase
      .from("subscriptions")
      .update({
        status: checkout.mode === "subscription" ? "active" : "active",
        onvo_customer_id: checkout.customer_id,
        onvo_subscription_id: checkout.subscription_id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", subscriptionId)
  }

  if (paymentId) {
    // Update payment status
    await supabase
      .from("payments")
      .update({
        status: "paid" as PaymentStatus,
        onvo_payment_id: checkout.payment_id,
        paid_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", paymentId)
  }

  // TODO: Send welcome email/WhatsApp
  console.log("[Webhook] Checkout completed for subscription:", subscriptionId)
}

async function handlePaymentSucceeded(payment: any) {
  const paymentId = payment.metadata?.payment_id

  if (paymentId) {
    await supabase
      .from("payments")
      .update({
        status: "paid" as PaymentStatus,
        onvo_payment_id: payment.id,
        paid_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", paymentId)
  }

  console.log("[Webhook] Payment succeeded:", payment.id)
}

async function handlePaymentFailed(payment: any) {
  const paymentId = payment.metadata?.payment_id

  if (paymentId) {
    await supabase
      .from("payments")
      .update({
        status: "failed" as PaymentStatus,
        failure_reason: payment.failure_reason || "Pago rechazado",
        updated_at: new Date().toISOString(),
      })
      .eq("id", paymentId)
  }

  console.log("[Webhook] Payment failed:", payment.id)
}

async function handleSubscriptionCreated(subscription: any) {
  // Find subscription by Onvo ID and update
  await supabase
    .from("subscriptions")
    .update({
      status: "active" as SubscriptionStatus,
      onvo_subscription_id: subscription.id,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("onvo_customer_id", subscription.customer_id)

  console.log("[Webhook] Subscription created:", subscription.id)
}

async function handleSubscriptionUpdated(subscription: any) {
  await supabase
    .from("subscriptions")
    .update({
      status: mapOnvoStatus(subscription.status),
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    })
    .eq("onvo_subscription_id", subscription.id)

  console.log("[Webhook] Subscription updated:", subscription.id)
}

async function handleSubscriptionCancelled(subscription: any) {
  await supabase
    .from("subscriptions")
    .update({
      status: "cancelled" as SubscriptionStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("onvo_subscription_id", subscription.id)

  console.log("[Webhook] Subscription cancelled:", subscription.id)
}

async function handleSubscriptionPastDue(subscription: any) {
  await supabase
    .from("subscriptions")
    .update({
      status: "past_due" as SubscriptionStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("onvo_subscription_id", subscription.id)

  // TODO: Send payment reminder via WhatsApp
  console.log("[Webhook] Subscription past due:", subscription.id)
}

async function handleInvoicePaid(invoice: any) {
  // Create a payment record for the invoice
  const subscriptionId = invoice.subscription_id

  if (subscriptionId) {
    // Find subscription and create payment
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("id, plan_id")
      .eq("onvo_subscription_id", subscriptionId)
      .single()

    if (subscription) {
      await supabase.from("payments").insert({
        subscription_id: subscription.id,
        plan_id: subscription.plan_id,
        amount_crc: invoice.amount_paid / 100, // Convert from cents
        currency: invoice.currency?.toUpperCase() || "CRC",
        onvo_invoice_id: invoice.id,
        onvo_payment_id: invoice.payment_id,
        status: "paid",
        paid_at: new Date().toISOString(),
        description: `Pago recurrente - ${invoice.description || "Suscripción LuVelle"}`,
      })
    }
  }

  console.log("[Webhook] Invoice paid:", invoice.id)
}

async function handleInvoicePaymentFailed(invoice: any) {
  console.log("[Webhook] Invoice payment failed:", invoice.id)
  // TODO: Send payment failed notification
}

function mapOnvoStatus(onvoStatus: string): SubscriptionStatus {
  const statusMap: Record<string, SubscriptionStatus> = {
    active: "active",
    trialing: "trialing",
    past_due: "past_due",
    canceled: "cancelled",
    cancelled: "cancelled",
    unpaid: "past_due",
    paused: "paused",
  }
  return statusMap[onvoStatus] || "pending"
}
