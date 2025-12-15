// Onvopay Client for LuVelle
// This is a placeholder implementation - replace with actual Onvopay SDK when available

import type { OnvoCheckoutSession, OnvoSubscription, Plan } from "./types"

const ONVO_API_URL = process.env.ONVO_API_URL || "https://api.onvopay.com/v1"
const ONVO_SECRET_KEY = process.env.ONVO_SECRET_KEY

if (!ONVO_SECRET_KEY && process.env.NODE_ENV === "production") {
  console.warn("[LuVelle] ONVO_SECRET_KEY is not set. Payment features will not work.")
}

class OnvopayClient {
  private apiUrl: string
  private secretKey: string | undefined

  constructor() {
    this.apiUrl = ONVO_API_URL
    this.secretKey = ONVO_SECRET_KEY
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.secretKey) {
      throw new Error("Onvopay API key not configured")
    }

    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `Onvopay API error: ${response.status}`)
    }

    return response.json()
  }

  /**
   * Create a checkout session for one-time or subscription payments
   */
  async createCheckoutSession(params: {
    plan: Plan
    customerEmail: string
    customerName?: string
    successUrl: string
    cancelUrl: string
    metadata?: Record<string, any>
  }): Promise<OnvoCheckoutSession> {
    const { plan, customerEmail, customerName, successUrl, cancelUrl, metadata } = params

    // Determine if this is a subscription or one-time payment
    const isSubscription = plan.billing_period !== "one_time" && plan.onvo_plan_id

    const payload: Record<string, any> = {
      customer_email: customerEmail,
      customer_name: customerName,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        plan_id: plan.id,
        plan_slug: plan.slug,
        plan_type: plan.type,
        ...metadata,
      },
    }

    if (isSubscription) {
      // Subscription checkout
      payload.mode = "subscription"
      payload.plan_id = plan.onvo_plan_id

      if (plan.trial_days > 0) {
        payload.trial_period_days = plan.trial_days
      }
    } else {
      // One-time payment checkout
      payload.mode = "payment"
      payload.amount = Math.round(plan.price_local * 100) // Convert to cents
      payload.currency = plan.currency_local || "CRC"
      payload.description = `LuVelle - ${plan.name}`

      if (plan.onvo_product_id) {
        payload.product_id = plan.onvo_product_id
      }
    }

    return this.request<OnvoCheckoutSession>("/checkout/sessions", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  /**
   * Retrieve a subscription by ID
   */
  async getSubscription(subscriptionId: string): Promise<OnvoSubscription> {
    return this.request<OnvoSubscription>(`/subscriptions/${subscriptionId}`)
  }

  /**
   * Cancel a subscription
   */
  async cancelSubscription(subscriptionId: string, cancelAtPeriodEnd = true): Promise<OnvoSubscription> {
    return this.request<OnvoSubscription>(`/subscriptions/${subscriptionId}`, {
      method: "PATCH",
      body: JSON.stringify({
        cancel_at_period_end: cancelAtPeriodEnd,
      }),
    })
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(payload: string, signature: string, webhookSecret: string): boolean {
    // Implement actual signature verification based on Onvopay's documentation
    // This is a placeholder - replace with actual implementation
    const crypto = require("crypto")
    const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(payload).digest("hex")

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  }
}

export const onvopay = new OnvopayClient()
