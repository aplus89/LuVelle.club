-- Add plan_requested field to provider_applications table
-- This allows tracking which LuVelle Pro plan the provider selected

ALTER TABLE provider_applications 
ADD COLUMN IF NOT EXISTS plan_requested TEXT;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_provider_applications_plan ON provider_applications(plan_requested);

-- Add comment to document the field
COMMENT ON COLUMN provider_applications.plan_requested IS 'Selected LuVelle Pro plan: pro, pro-plus, or pro-trial (1 mes gratis)';
