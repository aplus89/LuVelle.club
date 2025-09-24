-- Script para corregir la tabla items y asegurar que tenga todas las columnas necesarias
-- Ejecutar este script en Supabase SQL Editor

-- Primero, verificar si la tabla existe y crear si no existe
CREATE TABLE IF NOT EXISTS items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT,
  description TEXT,
  price INTEGER NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('product', 'service')),
  available BOOLEAN DEFAULT true,
  provider TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agregar la columna available si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'items' AND column_name = 'available') THEN
        ALTER TABLE items ADD COLUMN available BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Agregar otras columnas que podrían faltar
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'items' AND column_name = 'provider') THEN
        ALTER TABLE items ADD COLUMN provider TEXT;
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'items' AND column_name = 'image_url') THEN
        ALTER TABLE items ADD COLUMN image_url TEXT;
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'items' AND column_name = 'created_at') THEN
        ALTER TABLE items ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'items' AND column_name = 'updated_at') THEN
        ALTER TABLE items ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Actualizar todos los registros existentes para que tengan available = true por defecto
UPDATE items SET available = true WHERE available IS NULL;

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_items_category ON items(category);
CREATE INDEX IF NOT EXISTS idx_items_type ON items(type);
CREATE INDEX IF NOT EXISTS idx_items_available ON items(available);
CREATE INDEX IF NOT EXISTS idx_items_category_available ON items(category, available);

-- Habilitar RLS (Row Level Security)
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Allow read access to all users" ON items;

-- Crear política para permitir lectura a todos los usuarios
CREATE POLICY "Allow read access to all users" ON items
  FOR SELECT USING (true);

-- Verificar la estructura de la tabla
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'items' 
ORDER BY ordinal_position;
