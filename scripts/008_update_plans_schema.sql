-- Migration: Update plans table with additional fields for pricing and display
-- Run this to add missing columns to the plans table

-- Add price_crc column (integer for Costa Rican colones)
ALTER TABLE plans ADD COLUMN IF NOT EXISTS price_crc INTEGER;

-- Add description column
ALTER TABLE plans ADD COLUMN IF NOT EXISTS description TEXT;

-- Add highlight column for "most popular" badge
ALTER TABLE plans ADD COLUMN IF NOT EXISTS highlight BOOLEAN DEFAULT false;

-- Add cashback_rate column (0.00 to 0.08 for 0-8%)
ALTER TABLE plans ADD COLUMN IF NOT EXISTS cashback_rate NUMERIC(4,2) DEFAULT 0;

-- Add tier_order column for display ordering
ALTER TABLE plans ADD COLUMN IF NOT EXISTS tier_order INTEGER DEFAULT 0;

-- Add active column if not exists
ALTER TABLE plans ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

-- Update existing plans with price_crc values (convert from price_local if exists)
UPDATE plans SET price_crc = COALESCE(price_local::integer, 0) WHERE price_crc IS NULL;

-- Set tier_order based on plan type and pricing
UPDATE plans SET tier_order = 1 WHERE slug LIKE '%free%' OR slug LIKE '%esencial%' OR slug LIKE '%basico%';
UPDATE plans SET tier_order = 2 WHERE slug LIKE '%club%' OR slug LIKE '%premium%' OR slug LIKE '%pro' OR slug = 'pro';
UPDATE plans SET tier_order = 3 WHERE slug LIKE '%plus%' OR slug LIKE '%deluxe%';

-- Set highlight for middle/popular tiers
UPDATE plans SET highlight = true WHERE slug LIKE '%club%' OR slug LIKE '%premium%' OR slug = 'pro';

-- Set cashback rates
UPDATE plans SET cashback_rate = 0.03 WHERE slug LIKE '%premium%' OR slug = 'pro';
UPDATE plans SET cashback_rate = 0.05 WHERE slug LIKE '%club%';
UPDATE plans SET cashback_rate = 0.08 WHERE slug LIKE '%plus%' OR slug LIKE '%deluxe%';

-- Insert/update AI plans if they don't exist
INSERT INTO plans (id, slug, name, type, price_crc, description, highlight, cashback_rate, tier_order, active)
VALUES 
  (gen_random_uuid(), 'ai-free', 'LuVelle Ai Free', 'ai', 0, 'Consultas básicas por WhatsApp', false, 0, 1, true),
  (gen_random_uuid(), 'ai-club', 'Club LuVelle', 'ai', 2990, 'Acceso completo a LuVelle Ai + descuentos exclusivos', true, 0.05, 2, true),
  (gen_random_uuid(), 'ai-plus', 'LuVelle Plus', 'ai', 5990, 'Todo el Club + Beauty Box con descuento', false, 0.08, 3, true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_crc = EXCLUDED.price_crc,
  description = EXCLUDED.description,
  highlight = EXCLUDED.highlight,
  cashback_rate = EXCLUDED.cashback_rate,
  tier_order = EXCLUDED.tier_order;

-- Insert/update Beauty Box plans
INSERT INTO plans (id, slug, name, type, price_crc, description, highlight, cashback_rate, tier_order, active)
VALUES 
  (gen_random_uuid(), 'beauty-box-esencial', 'Esencial', 'beauty_box', 29990, '4-5 productos de belleza seleccionados', false, 0, 1, true),
  (gen_random_uuid(), 'beauty-box-premium', 'Premium', 'beauty_box', 39990, '6-7 productos + personalización completa', true, 0.03, 2, true),
  (gen_random_uuid(), 'beauty-box-deluxe', 'Deluxe', 'beauty_box', 54990, '8-10 productos premium + regalos sorpresa', false, 0.08, 3, true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_crc = EXCLUDED.price_crc,
  description = EXCLUDED.description,
  highlight = EXCLUDED.highlight,
  cashback_rate = EXCLUDED.cashback_rate,
  tier_order = EXCLUDED.tier_order;

-- Insert/update Provider plans
INSERT INTO plans (id, slug, name, type, price_crc, description, highlight, cashback_rate, tier_order, active, trial_days)
VALUES 
  (gen_random_uuid(), 'provider-trial', 'Prueba Gratis', 'provider', 0, 'Probá LuVelle Pro por 30 días sin costo', false, 0, 1, true, 30),
  (gen_random_uuid(), 'provider-pro', 'Pro', 'provider', 9990, 'Gestión completa de citas y pagos', true, 0.03, 2, true, 0),
  (gen_random_uuid(), 'provider-pro-plus', 'Pro Plus', 'provider', 19990, 'Todo Pro + herramientas avanzadas de marketing', false, 0.08, 3, true, 0)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_crc = EXCLUDED.price_crc,
  description = EXCLUDED.description,
  highlight = EXCLUDED.highlight,
  cashback_rate = EXCLUDED.cashback_rate,
  tier_order = EXCLUDED.tier_order,
  trial_days = EXCLUDED.trial_days;

-- Add unique constraint on slug if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'plans_slug_unique') THEN
    ALTER TABLE plans ADD CONSTRAINT plans_slug_unique UNIQUE (slug);
  END IF;
END $$;

-- Create index on type for faster filtering
CREATE INDEX IF NOT EXISTS idx_plans_type ON plans(type);
CREATE INDEX IF NOT EXISTS idx_plans_active ON plans(active);
CREATE INDEX IF NOT EXISTS idx_plans_tier_order ON plans(tier_order);
