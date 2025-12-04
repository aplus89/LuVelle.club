-- Updated seed data with new CRC pricing and Spanish features per spec
INSERT INTO plans (name, slug, price_range, features, is_available, allows_product_customization, allows_service_customization, max_products, max_services)
VALUES 
  (
    'Esencial',
    'essential',
    '₡26.000 – ₡30.000',
    '["Caja curada por LuVelle según tu perfil", "Sin personalización de productos", "Contenido digital (LuVelle AI, podcast, newsletter)"]',
    true,
    false,
    false,
    0,
    0
  ),
  (
    'Premium',
    'premium',
    '₡31.000 – ₡39.000',
    '["Personalización parcial de productos", "Acceso a categorías seleccionadas", "Podés añadir productos extra con puntos", "Programa de referidos: 3% cashback (compra > $120)", "Incluye todo lo de Esencial"]',
    true,
    true,
    false,
    3,
    0
  ),
  (
    'Deluxe',
    'deluxe',
    '₡40.000 – ₡50.000+',
    '["Personalización total: productos + servicios", "Acceso completo a todas las categorías", "Programa de referidos: 8% cashback (consumo > $120)", "Incluye todo lo de Premium"]',
    true,
    true,
    true,
    5,
    2
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_range = EXCLUDED.price_range,
  features = EXCLUDED.features,
  is_available = EXCLUDED.is_available,
  allows_product_customization = EXCLUDED.allows_product_customization,
  allows_service_customization = EXCLUDED.allows_service_customization,
  max_products = EXCLUDED.max_products,
  max_services = EXCLUDED.max_services,
  updated_at = NOW();
