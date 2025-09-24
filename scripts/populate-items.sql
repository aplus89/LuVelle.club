-- Script para poblar la tabla items con datos reales
-- Ejecutar este script en Supabase SQL Editor

-- Primero, crear la tabla si no existe
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

-- Limpiar datos existentes (opcional)
-- DELETE FROM items;

-- Insertar productos de Belleza Facial
INSERT INTO items (name, brand, description, price, category, type, available, image_url) VALUES
('Sérum Vitamina C', 'Florina CR', 'Sérum antioxidante para luminosidad y protección diaria', 8500, 'Belleza facial', 'product', true, '/placeholder.svg?height=200&width=200&text=Serum+Vitamina+C'),
('Crema Hidratante Facial', 'Flormar', 'Hidratación profunda para todo tipo de piel, textura ligera', 6200, 'Belleza facial', 'product', true, '/placeholder.svg?height=200&width=200&text=Crema+Hidratante'),
('Mascarilla de Arcilla', 'Natura', 'Purifica poros y controla grasa, ideal para piel mixta', 4800, 'Belleza facial', 'product', true, '/placeholder.svg?height=200&width=200&text=Mascarilla+Arcilla'),
('Contorno de Ojos', 'Avon', 'Reduce ojeras y líneas de expresión, fórmula suave', 7300, 'Belleza facial', 'product', true, '/placeholder.svg?height=200&width=200&text=Contorno+Ojos'),
('Limpiador Facial', 'Florina CR', 'Gel limpiador suave para uso diario', 5400, 'Belleza facial', 'product', true, '/placeholder.svg?height=200&width=200&text=Limpiador+Facial');

-- Insertar productos de Maquillaje
INSERT INTO items (name, brand, description, price, category, type, available, image_url) VALUES
('Base de Maquillaje', 'Flormar', 'Cobertura natural de larga duración, SPF 15', 9200, 'Maquillaje', 'product', true, '/placeholder.svg?height=200&width=200&text=Base+Maquillaje'),
('Labial Mate', 'Florina CR', 'Color intenso y acabado mate que dura todo el día', 3800, 'Maquillaje', 'product', true, '/placeholder.svg?height=200&width=200&text=Labial+Mate'),
('Paleta de Sombras', 'Natura', '12 tonos versátiles para cualquier look, pigmentación intensa', 12500, 'Maquillaje', 'product', true, '/placeholder.svg?height=200&width=200&text=Paleta+Sombras'),
('Rímel Volumen', 'Avon', 'Pestañas voluminosas y definidas, resistente al agua', 5600, 'Maquillaje', 'product', true, '/placeholder.svg?height=200&width=200&text=Rimel+Volumen'),
('Corrector', 'Flormar', 'Cobertura completa para imperfecciones', 4200, 'Maquillaje', 'product', true, '/placeholder.svg?height=200&width=200&text=Corrector');

-- Insertar productos de Cuidado Corporal
INSERT INTO items (name, brand, description, price, category, type, available, image_url) VALUES
('Crema Corporal Nutritiva', 'Natura', 'Hidratación intensa para piel suave y sedosa', 7800, 'Cuidado corporal', 'product', true, '/placeholder.svg?height=200&width=200&text=Crema+Corporal'),
('Exfoliante Corporal', 'Florina CR', 'Elimina células muertas y suaviza la piel', 5400, 'Cuidado corporal', 'product', true, '/placeholder.svg?height=200&width=200&text=Exfoliante+Corporal'),
('Aceite Corporal', 'Flormar', 'Nutrición profunda con aroma relajante de lavanda', 8900, 'Cuidado corporal', 'product', true, '/placeholder.svg?height=200&width=200&text=Aceite+Corporal'),
('Loción Corporal', 'Avon', 'Hidratación diaria con protección UV', 6500, 'Cuidado corporal', 'product', true, '/placeholder.svg?height=200&width=200&text=Locion+Corporal');

-- Insertar productos de Cabello
INSERT INTO items (name, brand, description, price, category, type, available, image_url) VALUES
('Shampoo Reparador', 'Natura', 'Repara y fortalece cabello dañado con keratina', 6700, 'Cabello', 'product', true, '/placeholder.svg?height=200&width=200&text=Shampoo+Reparador'),
('Mascarilla Capilar', 'Avon', 'Tratamiento intensivo para cabello sedoso y brillante', 8200, 'Cabello', 'product', true, '/placeholder.svg?height=200&width=200&text=Mascarilla+Capilar'),
('Aceite Capilar', 'Florina CR', 'Nutrición y brillo natural, sin residuos grasos', 5900, 'Cabello', 'product', true, '/placeholder.svg?height=200&width=200&text=Aceite+Capilar'),
('Acondicionador', 'Flormar', 'Suaviza y desenreda, ideal para cabello rizado', 5200, 'Cabello', 'product', true, '/placeholder.svg?height=200&width=200&text=Acondicionador');

-- Insertar productos de Bienestar
INSERT INTO items (name, brand, description, price, category, type, available, image_url) VALUES
('Vela Aromática', 'Natura', 'Relajación y aromaterapia con esencias naturales', 4200, 'Bienestar emocional', 'product', true, '/placeholder.svg?height=200&width=200&text=Vela+Aromatica'),
('Sales de Baño', 'Flormar', 'Baño relajante y desestresante con minerales del mar', 3600, 'Bienestar emocional', 'product', true, '/placeholder.svg?height=200&width=200&text=Sales+Baño'),
('Aceite Esencial', 'Florina CR', 'Mezcla relajante de lavanda y eucalipto', 6800, 'Bienestar emocional', 'product', true, '/placeholder.svg?height=200&width=200&text=Aceite+Esencial');

-- Insertar productos de Higiene Femenina
INSERT INTO items (name, brand, description, price, category, type, available, image_url) VALUES
('Gel Íntimo', 'Florina CR', 'Cuidado delicado y protección con pH balanceado', 4800, 'Higiene femenina', 'product', true, '/placeholder.svg?height=200&width=200&text=Gel+Intimo'),
('Toallitas Íntimas', 'Natura', 'Frescura y limpieza en cualquier momento del día', 3200, 'Higiene femenina', 'product', true, '/placeholder.svg?height=200&width=200&text=Toallitas+Intimas'),
('Copa Menstrual', 'EcoCup', 'Alternativa ecológica y económica, silicona médica', 15000, 'Higiene femenina', 'product', true, '/placeholder.svg?height=200&width=200&text=Copa+Menstrual');

-- Insertar servicios disponibles
INSERT INTO items (name, provider, description, price, category, type, available) VALUES
('Facial Spa Completo', 'Spa Belleza CR', 'Tratamiento facial completo con limpieza profunda, exfoliación y mascarilla', 15000, 'Belleza facial', 'service', true),
('Masaje Relajante', 'Wellness Center', 'Masaje corporal de 60 minutos con aceites esenciales', 18000, 'Bienestar emocional', 'service', true),
('Manicure + Pedicure', 'Nails Studio', 'Servicio completo de uñas con esmaltado semipermanente', 12000, 'Cuidado corporal', 'service', true),
('Tratamiento Capilar', 'Hair Salon', 'Tratamiento reconstructivo para el cabello con keratina', 20000, 'Cabello', 'service', true),
('Depilación Láser', 'Beauty Clinic', 'Sesión de depilación láser en zona pequeña', 25000, 'Cuidado corporal', 'service', true),
('Limpieza Facial Profunda', 'Derma Center', 'Limpieza facial profesional con extracción de comedones', 12000, 'Belleza facial', 'service', true);

-- Insertar algunas categorías sin productos (para probar el formulario de notificación)
INSERT INTO items (name, brand, description, price, category, type, available, image_url) VALUES
('Perfume Floral', 'Chanel', 'Fragancia floral elegante y sofisticada', 45000, 'Perfumería', 'product', false, '/placeholder.svg?height=200&width=200&text=Perfume+Floral'),
('Lencería de Encaje', 'Victoria Secret', 'Conjunto de lencería elegante y cómoda', 25000, 'Lencería', 'product', false, '/placeholder.svg?height=200&width=200&text=Lenceria+Encaje'),
('Vitaminas Prenatales', 'Centrum', 'Suplemento vitamínico para embarazadas', 18000, 'Maternidad', 'product', false, '/placeholder.svg?height=200&width=200&text=Vitaminas+Prenatales');

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_items_category ON items(category);
CREATE INDEX IF NOT EXISTS idx_items_type ON items(type);
CREATE INDEX IF NOT EXISTS idx_items_available ON items(available);
CREATE INDEX IF NOT EXISTS idx_items_category_available ON items(category, available);

-- Habilitar RLS (Row Level Security)
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir lectura a todos los usuarios autenticados y no autenticados
CREATE POLICY "Allow read access to all users" ON items
  FOR SELECT USING (true);

-- Opcional: Crear política para permitir inserción solo a usuarios autenticados
-- CREATE POLICY "Allow insert for authenticated users" ON items
--   FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Opcional: Crear política para permitir actualización solo a usuarios autenticados
-- CREATE POLICY "Allow update for authenticated users" ON items
--   FOR UPDATE USING (auth.role() = 'authenticated');
