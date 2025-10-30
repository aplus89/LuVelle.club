-- Seed subscription plans
INSERT INTO plans (name, slug, price_range, features, is_available, allows_product_customization, allows_service_customization, max_products, max_services)
VALUES 
  (
    'Esencial',
    'essential',
    '₡5,000 - ₡8,000',
    '["Contenido digital exclusivo de LuVelle AI", "Acceso al podcast semanal", "Newsletter con tips de belleza", "Comunidad privada en redes", "Sin personalización de productos"]',
    true,
    false,
    false,
    0,
    0
  ),
  (
    'Premium',
    'premium',
    '₡15,000 - ₡25,000',
    '["Todo lo de Esencial", "3-5 productos de belleza curados", "Personalización parcial de productos", "Descuentos exclusivos con marcas aliadas", "Envío gratis en Costa Rica"]',
    true,
    true,
    false,
    5,
    0
  ),
  (
    'Deluxe',
    'deluxe',
    '₡35,000 - ₡50,000',
    '["Todo lo de Premium", "5-8 productos premium", "Personalización total de productos", "Acceso a servicios de belleza", "Consultoría personalizada mensual", "Prioridad en lanzamientos", "Regalos sorpresa"]',
    true,
    true,
    true,
    8,
    3
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
