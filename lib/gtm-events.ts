// Helper functions for Google Tag Manager events

declare global {
  interface Window {
    dataLayer: any[]
  }
}

export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    })
  }
}

// Specific event trackers
export const trackWhatsAppClick = (source: string) => {
  trackEvent("whatsapp_click", {
    source,
    category: "engagement",
    label: "WhatsApp CTA",
  })
}

export const trackBeautyBoxStart = (source: string) => {
  trackEvent("beauty_box_start", {
    source,
    category: "conversion",
    label: "Beauty Box Creation Started",
  })
}

export const trackProviderTrial = (plan: string) => {
  trackEvent("provider_trial_start", {
    plan,
    category: "conversion",
    label: "Provider Trial Started",
  })
}

export const trackFormSubmit = (formType: "provider" | "brand") => {
  trackEvent("form_submit", {
    form_type: formType,
    category: "lead",
    label: `${formType} Application Submitted`,
  })
}

export const trackPlanSelected = (planType: "ai" | "beauty_box" | "provider", planName: string) => {
  trackEvent("plan_selected", {
    plan_type: planType,
    plan_name: planName,
    category: "engagement",
    label: "Plan Selected",
  })
}
