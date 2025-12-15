// Onvopay Integration Types for LuVelle

export type PaymentStatus = "pending" | "processing" | "paid" | "failed" | "refunded" | "cancelled"
export type SubscriptionStatus = "pending" | "trialing" | "active" | "past_due" | "paused" | "cancelled" | "expired"
export type PlanType = "beauty_box" | "ai" | "provider"
export type BillingPeriod = "monthly" | "yearly" | "one_time"

// Database types
export interface Plan {
  id: string
  name: string
  slug: string
  type: PlanType
  price_local: number
  currency_local: string
  price_range?: string
  features: string[]
  is_available: boolean
  onvo_product_id?: string
  onvo_plan_id?: string
  billing_period: BillingPeriod
  trial_days: number
  referral_percent: number
  max_products?: number
  max_services?: number
  allows_product_customization: boolean
  allows_service_customization: boolean
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id?: string
  provider_id?: string
  plan_id: string
  email: string
  whatsapp?: string
  name?: string
  status: SubscriptionStatus
  referral_code?: string
  referred_by?: string
  onvo_subscription_id?: string
  onvo_customer_id?: string
  current_period_start?: string
  current_period_end?: string
  cancel_at_period_end: boolean
  trial_end?: string
  selected_categories?: any[]
  selected_products?: any[]
  selected_services?: any[]
  shipping_address?: any
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  user_id?: string
  provider_id?: string
  subscription_id?: string
  plan_id?: string
  amount_crc: number
  amount_usd?: number
  currency: string
  exchange_rate?: number
  onvo_payment_id?: string
  onvo_checkout_id?: string
  onvo_invoice_id?: string
  status: PaymentStatus
  failure_reason?: string
  description?: string
  metadata?: Record<string, any>
  paid_at?: string
  created_at: string
  updated_at: string
}

export interface PaymentEvent {
  id: string
  payment_id?: string
  subscription_id?: string
  event_type: string
  onvo_event_id?: string
  payload: Record<string, any>
  processed: boolean
  processed_at?: string
  error?: string
  created_at: string
}

// Checkout request types
export interface CheckoutRequest {
  planSlug: string
  customerEmail: string
  customerWhatsapp?: string
  customerName?: string
  // For Beauty Box
  selectedCategories?: string[]
  selectedProducts?: string[]
  selectedServices?: string[]
  shippingAddress?: {
    line1: string
    line2?: string
    city: string
    province: string
    postalCode?: string
    country: string
  }
  // For referrals
  referralCode?: string
  // Metadata
  metadata?: Record<string, any>
}

export interface CheckoutResponse {
  success: boolean
  checkoutUrl?: string
  paymentId?: string
  error?: string
}

// Onvopay API types (based on typical payment gateway patterns)
export interface OnvoCheckoutSession {
  id: string
  url: string
  amount: number
  currency: string
  status: string
  customer_email?: string
  metadata?: Record<string, any>
  success_url: string
  cancel_url: string
  expires_at?: string
}

export interface OnvoSubscription {
  id: string
  customer_id: string
  plan_id: string
  status: string
  current_period_start: number
  current_period_end: number
  cancel_at_period_end: boolean
  trial_end?: number
}

export interface OnvoWebhookEvent {
  id: string
  type: string
  data: {
    object: any
  }
  created: number
}

// Webhook event types
export type OnvoEventType =
  | "checkout.completed"
  | "payment.succeeded"
  | "payment.failed"
  | "subscription.created"
  | "subscription.updated"
  | "subscription.cancelled"
  | "subscription.past_due"
  | "invoice.paid"
  | "invoice.payment_failed"
