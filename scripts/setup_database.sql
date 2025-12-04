-- ================================================
-- LuVelle Database Setup Script
-- Run this in your Supabase Dashboard > SQL Editor
-- ================================================

-- 1. LEADS TABLE (for newsletter/waitlist signups)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  whatsapp TEXT,
  source TEXT DEFAULT 'website',
  persona TEXT DEFAULT 'user',
  interests TEXT[],
  referral_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROVIDER APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS provider_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  service_type TEXT,
  description TEXT,
  location TEXT,
  website TEXT,
  instagram TEXT,
  experience_years INTEGER,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BRAND APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS brand_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  instagram TEXT,
  product_types TEXT[],
  description TEXT,
  distribution_current TEXT,
  target_audience TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PLANS TABLE
CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  price_min INTEGER NOT NULL,
  price_max INTEGER NOT NULL,
  currency TEXT DEFAULT 'CRC',
  features JSONB DEFAULT '[]',
  is_popular BOOLEAN DEFAULT FALSE,
  max_products INTEGER DEFAULT 3,
  max_services INTEGER DEFAULT 0,
  includes_customization BOOLEAN DEFAULT FALSE,
  referral_percentage NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  coming_soon BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  brand TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  price NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'CRC',
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  provider_name TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  price NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'CRC',
  duration_minutes INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID REFERENCES plans(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  address TEXT,
  city TEXT,
  selected_categories UUID[],
  selected_products UUID[],
  selected_services UUID[],
  referral_code TEXT,
  total_price NUMERIC(10,2),
  currency TEXT DEFAULT 'CRC',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- ENABLE ROW LEVEL SECURITY
-- ================================================
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- ================================================
-- RLS POLICIES - Allow anonymous form submissions
-- ================================================

-- Leads: Anyone can insert (for newsletter signups)
DROP POLICY IF EXISTS "Anyone can insert leads" ON leads;
CREATE POLICY "Anyone can insert leads" ON leads FOR INSERT WITH CHECK (true);

-- Provider Applications: Anyone can insert
DROP POLICY IF EXISTS "Anyone can insert provider applications" ON provider_applications;
CREATE POLICY "Anyone can insert provider applications" ON provider_applications FOR INSERT WITH CHECK (true);

-- Brand Applications: Anyone can insert
DROP POLICY IF EXISTS "Anyone can insert brand applications" ON brand_applications;
CREATE POLICY "Anyone can insert brand applications" ON brand_applications FOR INSERT WITH CHECK (true);

-- Subscriptions: Anyone can insert
DROP POLICY IF EXISTS "Anyone can insert subscriptions" ON subscriptions;
CREATE POLICY "Anyone can insert subscriptions" ON subscriptions FOR INSERT WITH CHECK (true);

-- Plans: Public read access
DROP POLICY IF EXISTS "Public read access for plans" ON plans;
CREATE POLICY "Public read access for plans" ON plans FOR SELECT USING (true);

-- Categories: Public read access
DROP POLICY IF EXISTS "Public read access for categories" ON categories;
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (true);

-- Products: Public read access
DROP POLICY IF EXISTS "Public read access for products" ON products;
CREATE POLICY "Public read access for products" ON products FOR SELECT USING (true);

-- Services: Public read access
DROP POLICY IF EXISTS "Public read access for services" ON services;
CREATE POLICY "Public read access for services" ON services FOR SELECT USING (true);

-- ================================================
-- SEED DATA - Initial Plans
-- ================================================
INSERT INTO plans (name, slug, tagline, price_min, price_max, currency, features, is_popular, max_products, max_services, includes_customization, referral_percentage)
VALUES 
  ('Esencial', 'esencial', 'Descubre el lujo accesible', 26000, 30000, 'CRC', 
   '["3–4 productos tamaño regular", "Marcas nacionales e internacionales", "Envío incluido", "Caja sorpresa mensual"]'::jsonb,
   false, 4, 0, false, 0),
  ('Premium', 'premium', 'La experiencia completa', 31000, 39000, 'CRC',
   '["4–5 productos premium", "Marcas exclusivas", "1 servicio de bienestar", "Personalización de preferencias", "3% cashback en referidos", "Acceso anticipado a lanzamientos"]'::jsonb,
   true, 5, 1, true, 3),
  ('Deluxe', 'deluxe', 'Lujo sin límites', 40000, 50000, 'CRC',
   '["5–6 productos luxury", "Ediciones limitadas", "2 servicios premium", "Personalización total", "8% cashback en referidos", "Eventos VIP exclusivos", "Concierge de belleza personal"]'::jsonb,
   false, 6, 2, true, 8)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  price_min = EXCLUDED.price_min,
  price_max = EXCLUDED.price_max,
  features = EXCLUDED.features,
  is_popular = EXCLUDED.is_popular,
  max_products = EXCLUDED.max_products,
  max_services = EXCLUDED.max_services,
  includes_customization = EXCLUDED.includes_customization,
  referral_percentage = EXCLUDED.referral_percentage;

-- ================================================
-- SEED DATA - Categories
-- ================================================
INSERT INTO categories (name, slug, description, icon, is_active, coming_soon)
VALUES 
  ('Skincare', 'skincare', 'Cuidado facial y corporal premium', 'Sparkles', true, false),
  ('Maquillaje', 'maquillaje', 'Cosméticos de alta calidad', 'Palette', true, false),
  ('Cabello', 'cabello', 'Productos para el cuidado capilar', 'Scissors', true, false),
  ('Fragancias', 'fragancias', 'Perfumes y aromas exclusivos', 'Flower', true, false),
  ('Bienestar', 'bienestar', 'Servicios de spa y relajación', 'Heart', true, false),
  ('Uñas', 'unas', 'Manicure y pedicure profesional', 'Hand', true, true)
ON CONFLICT (slug) DO NOTHING;

-- ================================================
-- Done! Your database is ready.
-- ================================================
SELECT 'Database setup complete!' as status;
