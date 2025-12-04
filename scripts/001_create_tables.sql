-- LuVelle.club Database Schema
-- Create all required tables for the beauty box subscription platform
-- Run this script first to create the database structure

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
  referral_percent DECIMAL(5,2) DEFAULT 0,
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

-- Updated leads table with whatsapp column
-- Leads table (general lead capture)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  persona TEXT CHECK (persona IN ('user', 'provider', 'brand')) NOT NULL,
  name TEXT,
  email TEXT,
  whatsapp TEXT,
  phone TEXT,
  source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Renamed to provider_applications (matches server action)
-- Provider applications table
CREATE TABLE IF NOT EXISTS provider_applications (
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

-- Renamed to brand_applications (matches server action)
-- Brand applications table
CREATE TABLE IF NOT EXISTS brand_applications (
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

-- User subscriptions table (for tracking actual subscribers)
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  plan_id UUID REFERENCES plans(id),
  email TEXT NOT NULL,
  whatsapp TEXT,
  name TEXT,
  referral_code TEXT UNIQUE,
  referred_by TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'paused', 'cancelled')),
  selected_categories JSONB DEFAULT '[]',
  selected_products JSONB DEFAULT '[]',
  selected_services JSONB DEFAULT '[]',
  shipping_address JSONB,
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
CREATE INDEX IF NOT EXISTS idx_provider_applications_status ON provider_applications(status);
CREATE INDEX IF NOT EXISTS idx_brand_applications_status ON brand_applications(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_referral ON subscriptions(referral_code);

-- Add RLS policies for public inserts
-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- RLS Policies for anonymous inserts (forms)
CREATE POLICY "Allow anonymous insert on leads" ON leads
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on provider_applications" ON provider_applications
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on brand_applications" ON brand_applications
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on subscriptions" ON subscriptions
  FOR INSERT TO anon WITH CHECK (true);

-- RLS Policies for public reads (plans, categories, products, services)
CREATE POLICY "Allow public read on plans" ON plans
  FOR SELECT TO anon USING (is_available = true);

CREATE POLICY "Allow public read on categories" ON categories
  FOR SELECT TO anon USING (is_active = true);

CREATE POLICY "Allow public read on products" ON products
  FOR SELECT TO anon USING (is_active = true);

CREATE POLICY "Allow public read on services" ON services
  FOR SELECT TO anon USING (is_active = true);
