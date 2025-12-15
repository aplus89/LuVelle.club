-- LuVelle Payment System Schema
-- Adds support for Onvopay integration with subscriptions and payments

-- 1. Add Onvopay fields to plans table
ALTER TABLE plans ADD COLUMN IF NOT EXISTS type TEXT CHECK (type IN ('beauty_box', 'ai', 'provider')) DEFAULT 'beauty_box';
ALTER TABLE plans ADD COLUMN IF NOT EXISTS onvo_product_id TEXT;
ALTER TABLE plans ADD COLUMN IF NOT EXISTS onvo_plan_id TEXT;
ALTER TABLE plans ADD COLUMN IF NOT EXISTS billing_period TEXT CHECK (billing_period IN ('monthly', 'yearly', 'one_time')) DEFAULT 'monthly';
ALTER TABLE plans ADD COLUMN IF NOT EXISTS trial_days INTEGER DEFAULT 0;

-- 2. Add Onvopay fields to subscriptions table
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS onvo_subscription_id TEXT;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS onvo_customer_id TEXT;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS current_period_start TIMESTAMPTZ;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS current_period_end TIMESTAMPTZ;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS cancel_at_period_end BOOLEAN DEFAULT false;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS trial_end TIMESTAMPTZ;

-- Update status check constraint to include more states
ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS subscriptions_status_check;
ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_status_check 
  CHECK (status IN ('pending', 'trialing', 'active', 'past_due', 'paused', 'cancelled', 'expired'));

-- 3. Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Who paid
  user_id UUID,
  provider_id UUID REFERENCES providers(id) ON DELETE SET NULL,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  
  -- What they paid for
  plan_id UUID REFERENCES plans(id) ON DELETE SET NULL,
  
  -- Payment details
  amount_crc DECIMAL(12, 2) NOT NULL,
  amount_usd DECIMAL(10, 2),
  currency TEXT DEFAULT 'CRC',
  exchange_rate DECIMAL(10, 4),
  
  -- Onvopay reference
  onvo_payment_id TEXT,
  onvo_checkout_id TEXT,
  onvo_invoice_id TEXT,
  
  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'paid', 'failed', 'refunded', 'cancelled')),
  failure_reason TEXT,
  
  -- Metadata
  description TEXT,
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create payment_events table for webhook history
CREATE TABLE IF NOT EXISTS payment_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID REFERENCES payments(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
  
  -- Event details
  event_type TEXT NOT NULL,
  onvo_event_id TEXT,
  
  -- Raw payload for debugging
  payload JSONB NOT NULL,
  
  -- Processing status
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMPTZ,
  error TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_provider ON payments(provider_id);
CREATE INDEX IF NOT EXISTS idx_payments_subscription ON payments(subscription_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_onvo ON payments(onvo_payment_id);
CREATE INDEX IF NOT EXISTS idx_payments_created ON payments(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_payment_events_payment ON payment_events(payment_id);
CREATE INDEX IF NOT EXISTS idx_payment_events_subscription ON payment_events(subscription_id);
CREATE INDEX IF NOT EXISTS idx_payment_events_type ON payment_events(event_type);
CREATE INDEX IF NOT EXISTS idx_payment_events_processed ON payment_events(processed);

CREATE INDEX IF NOT EXISTS idx_subscriptions_onvo ON subscriptions(onvo_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_period_end ON subscriptions(current_period_end);

CREATE INDEX IF NOT EXISTS idx_plans_type ON plans(type);
CREATE INDEX IF NOT EXISTS idx_plans_onvo ON plans(onvo_plan_id);

-- 6. Enable RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_events ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies
-- Payments: Users can read their own payments
CREATE POLICY "Users can read own payments" ON payments
  FOR SELECT USING (
    user_id IS NOT NULL OR 
    provider_id IS NOT NULL
  );

-- Payments: Service role can do everything (for webhooks)
CREATE POLICY "Service role full access on payments" ON payments
  FOR ALL USING (auth.role() = 'service_role');

-- Payment events: Only service role
CREATE POLICY "Service role full access on payment_events" ON payment_events
  FOR ALL USING (auth.role() = 'service_role');

-- 8. Update plans with Onvopay metadata and type
UPDATE plans SET type = 'beauty_box' WHERE slug LIKE 'beauty-box%' OR slug IN ('esencial', 'premium', 'deluxe');
UPDATE plans SET type = 'ai' WHERE slug LIKE 'ai-%' OR slug IN ('free', 'club-luvelle', 'luvelle-plus');
UPDATE plans SET type = 'provider' WHERE slug LIKE 'pro%' OR slug IN ('prueba-gratis', 'pro', 'pro-plus');

-- Set trial days for provider plans
UPDATE plans SET trial_days = 30 WHERE type = 'provider';

-- Comments for documentation
COMMENT ON TABLE payments IS 'Stores all payment transactions processed through Onvopay';
COMMENT ON TABLE payment_events IS 'Webhook event history from Onvopay for auditing and debugging';
COMMENT ON COLUMN plans.onvo_product_id IS 'Onvopay product ID for one-time payments';
COMMENT ON COLUMN plans.onvo_plan_id IS 'Onvopay plan ID for recurring subscriptions';
COMMENT ON COLUMN subscriptions.onvo_subscription_id IS 'Onvopay subscription ID for managing recurring billing';
