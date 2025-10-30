-- LuVelle.club Database Schema
-- Create all required tables for the beauty box subscription platform

-- Plans table
CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price_range TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]',
  is_available BOOLEAN DEFAULT true,
  allows_product_customization BOOLEAN DEFAULT false,
  allows_service_customization BOOLEAN DEFAULT false,
  max_products INTEGER,
  max_services INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  status TEXT CHECK (status IN ('activo', 'proximamente')) DEFAULT 'activo',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  image_url TEXT,
  price_crc DECIMAL(10, 2),
  available_in TEXT[] DEFAULT ARRAY['Premium', 'Deluxe'],
  is_active BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  image_url TEXT,
  price_crc DECIMAL(10, 2),
  available_in TEXT[] DEFAULT ARRAY['Deluxe'],
  is_active BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads table (general lead capture)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  persona TEXT CHECK (persona IN ('user', 'provider', 'brand')) NOT NULL,
  name TEXT,
  email TEXT,
  phone TEXT,
  source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Provider applicants table
CREATE TABLE IF NOT EXISTS applicants_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT,
  categories JSONB DEFAULT '[]',
  portfolio_url TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Brand applicants table
CREATE TABLE IF NOT EXISTS applicants_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  catalog_url TEXT,
  country TEXT DEFAULT 'Costa Rica',
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active);
CREATE INDEX IF NOT EXISTS idx_leads_persona ON leads(persona);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
