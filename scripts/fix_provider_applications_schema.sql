-- Update provider_applications table to match the form fields
ALTER TABLE provider_applications 
  ADD COLUMN IF NOT EXISTS name TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS categories TEXT[],
  ADD COLUMN IF NOT EXISTS portfolio_url TEXT,
  ADD COLUMN IF NOT EXISTS message TEXT;

-- Update brand_applications table to match the form fields  
ALTER TABLE brand_applications
  ADD COLUMN IF NOT EXISTS catalog_url TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'Costa Rica';

-- Drop and recreate RLS policies with explicit roles
DROP POLICY IF EXISTS "Anyone can insert provider applications" ON provider_applications;
DROP POLICY IF EXISTS "Anyone can insert brand applications" ON brand_applications;

CREATE POLICY "Enable insert for anon and authenticated" 
ON provider_applications FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Enable insert for anon and authenticated" 
ON brand_applications FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);
