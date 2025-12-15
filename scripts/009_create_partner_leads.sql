-- Migration: Create partner_leads table for brand applications
-- This complements the existing brand_applications table with plan selection

-- Add selected_plan_slug to brand_applications if not exists
ALTER TABLE brand_applications ADD COLUMN IF NOT EXISTS selected_plan_slug TEXT;

-- Add alliance_type column for type of partnership
ALTER TABLE brand_applications ADD COLUMN IF NOT EXISTS alliance_type TEXT;

-- Add company_size column
ALTER TABLE brand_applications ADD COLUMN IF NOT EXISTS company_size TEXT;

-- Add product_categories column (JSON array)
ALTER TABLE brand_applications ADD COLUMN IF NOT EXISTS product_categories JSONB DEFAULT '[]'::jsonb;

-- Add monthly_volume column
ALTER TABLE brand_applications ADD COLUMN IF NOT EXISTS monthly_volume TEXT;

-- Create partner_leads view for consistency with naming convention
CREATE OR REPLACE VIEW partner_leads AS
SELECT 
  id,
  brand_name,
  contact_name,
  email,
  whatsapp,
  country,
  catalog_url,
  message,
  status,
  created_at,
  updated_at,
  selected_plan_slug,
  alliance_type,
  company_size,
  product_categories,
  monthly_volume
FROM brand_applications;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_brand_applications_status ON brand_applications(status);
CREATE INDEX IF NOT EXISTS idx_brand_applications_created ON brand_applications(created_at DESC);
