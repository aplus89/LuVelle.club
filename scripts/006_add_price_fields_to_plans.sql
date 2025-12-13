-- Add price_local and currency_local to plans table for multi-currency support
ALTER TABLE plans
ADD COLUMN IF NOT EXISTS price_local NUMERIC(10,2),
ADD COLUMN IF NOT EXISTS currency_local VARCHAR(10) DEFAULT 'CRC';

-- Update existing plans with local prices (assuming 1 USD = 500 CRC as default)
UPDATE plans
SET price_local = CASE 
  WHEN slug LIKE 'beauty-box-%' THEN 
    CASE slug
      WHEN 'beauty-box-esencial' THEN 29995
      WHEN 'beauty-box-premium' THEN 39995
      WHEN 'beauty-box-deluxe' THEN 49995
      ELSE 0
    END
  WHEN slug LIKE 'ai-%' THEN
    CASE slug
      WHEN 'ai-free' THEN 0
      WHEN 'ai-club' THEN 1995
      WHEN 'ai-plus' THEN 3495
      ELSE 0
    END
  WHEN slug LIKE 'pro-%' THEN
    CASE slug
      WHEN 'pro-trial' THEN 0
      WHEN 'pro-basic' THEN 4995
      WHEN 'pro-plus' THEN 7495
      ELSE 0
    END
  ELSE 0
END,
currency_local = 'CRC'
WHERE price_local IS NULL;

COMMENT ON COLUMN plans.price_local IS 'Price in local currency (CRC)';
COMMENT ON COLUMN plans.currency_local IS 'Currency code for price_local';
