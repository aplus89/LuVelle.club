-- Script completo para crear la tabla items desde cero
-- Ejecutar este script en Supabase SQL Editor si la tabla no existe

-- Eliminar tabla existente si hay problemas (CUIDADO: esto borra todos los datos)
-- DROP TABLE IF EXISTS items CASCADE;

-- Crear la tabla items con todas las columnas necesarias
CREATE TABLE IF NOT EXISTS items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT,
  description TEXT,
  price INTEGER NOT NULL CHECK (price >= 0),
  image_url TEXT,
  category TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('product', 'service')),
  available BOOLEAN DEFAULT true NOT NULL,
  provider TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_items_updated_at ON items;
CREATE TRIGGER update_items_updated_at
    BEFORE UPDATE ON items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_items_category ON items(category);
CREATE INDEX IF NOT EXISTS idx_items_type ON items(type);
CREATE INDEX IF NOT EXISTS idx_items_available ON items(available);
CREATE INDEX IF NOT EXISTS idx_items_category_available ON items(category, available);
CREATE INDEX IF NOT EXISTS idx_items_category_type ON items(category, type);

-- Habilitar RLS (Row Level Security)
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Allow read access to all users" ON items;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON items;
DROP POLICY IF EXISTS "Allow update for authenticated users" ON items;

-- Crear política para permitir lectura a todos los usuarios
CREATE POLICY "Allow read access to all users" ON items
  FOR SELECT USING (true);

-- Opcional: Crear política para permitir inserción solo a usuarios autenticados
-- CREATE POLICY "Allow insert for authenticated users" ON items
--   FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Opcional: Crear política para permitir actualización solo a usuarios autenticados
-- CREATE POLICY "Allow update for authenticated users" ON items
--   FOR UPDATE USING (auth.role() = 'authenticated');

-- Insertar datos de ejemplo
INSERT INTO items (name, brand, description, price, category, type, available, image_url) VALUES
-- Belleza Facial
('Sérum Vitamina C', 'Florina CR', 'Sérum antioxidante para luminosidad y protección diaria', 8500, 'Belleza facial', 'product', true, '/placeholder.svg?height=200&width=200&text=Serum+Vitamina+C'),
('Crema Hidratante Facial', 'Flormar', 'Hidratación profunda para todo tipo de piel, textura ligera', 6200, 'Belleza facial', 'product', true, '/placeholder.svg?height=200&width=200&text=Crema+Hidratante'),
('Mascarilla de Arcilla', 'Natura', 'Purifica poros y controla grasa, ideal para piel mixta', 4800, 'Belleza facial', 'product', true, '/placeholder.svg?height=200&width=200&text=Mascarilla+Arcilla'),

-- Maquillaje
('Base de Maquillaje', 'Flormar', 'Cobertura natural de larga duración, SPF 15', 9200, 'Maquillaje', 'product', true, '/placeholder.svg?height=200&width=200&text=Base+Maquillaje'),
('Labial Mate', 'Florina CR', 'Color intenso y acabado mate que dura todo el día', 3800, 'Maquillaje', 'product', true, '/placeholder.svg?height=200&width=200&text=Labial+Mate'),

-- Cuidado Corporal
('Crema Corporal Nutritiva', 'Natura', 'Hidratación intensa para piel suave y sedosa', 7800, 'Cuidado corporal', 'product', true, '/placeholder.svg?height=200&width=200&text=Crema+Corporal'),
('Exfoliante Corporal', 'Florina CR', 'Elimina células muertas y suaviza la piel', 5400, 'Cuidado corporal', 'product', true, '/placeholder.svg?height=200&width=200&text=Exfoliante+Corporal'),

-- Cabello
('Shampoo Reparador', 'Natura', 'Repara y fortalece cabello dañado con keratina', 6700, 'Cabello', 'product', true, '/placeholder.svg?height=200&width=200&text=Shampoo+Reparador'),
('Mascarilla Capilar', 'Avon', 'Tratamiento intensivo para cabello sedoso y brillante', 8200, 'Cabello', 'product', true, '/placeholder.svg?height=200&width=200&text=Mascarilla+Capilar'),

-- Bienestar Emocional
('Vela Aromática', 'Natura', 'Relajación y aromaterapia con esencias naturales', 4200, 'Bienestar emocional', 'product', true, '/placeholder.svg?height=200&width=200&text=Vela+Aromatica'),
('Sales de Baño', 'Flormar', 'Baño relajante y desestresante con minerales del mar', 3600, 'Bienestar emocional', 'product', true, '/placeholder.svg?height=200&width=200&text=Sales+Baño'),

-- Higiene Femenina
('Gel Íntimo', 'Florina CR', 'Cuidado delicado y protección con pH balanceado', 4800, 'Higiene femenina', 'product', true, '/placeholder.svg?height=200&width=200&text=Gel+Intimo'),
('Toallitas Íntimas', 'Natura', 'Frescura y limpieza en cualquier momento del día', 3200, 'Higiene femenina', 'product', true, '/placeholder.svg?height=200&width=200&text=Toallitas+Intimas'),

-- Servicios
('Facial Spa Completo', 'Spa Belleza CR', 'Tratamiento facial completo con limpieza profunda, exfoliación y mascarilla', 15000, 'Belleza facial', 'service', true, null),
('Masaje Relajante', 'Wellness Center', 'Masaje corporal de 60 minutos con aceites esenciales', 18000, 'Bienestar emocional', 'service', true, null),
('Manicure + Pedicure', 'Nails Studio', 'Servicio completo de uñas con esmaltado semipermanente', 12000, 'Cuidado corporal', 'service', true, null),
('Tratamiento Capilar', 'Hair Salon', 'Tratamiento reconstructivo para el cabello con keratina', 20000, 'Cabello', 'service', true, null)

ON CONFLICT (id) DO NOTHING;

-- Verificar que todo se creó correctamente
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'items' 
ORDER BY ordinal_position;

-- Contar registros por categoría
SELECT 
  category,
  type,
  COUNT(*) as count,
  COUNT(*) FILTER (WHERE available = true) as available_count
FROM items 
GROUP BY category, type 
ORDER BY category, type;
