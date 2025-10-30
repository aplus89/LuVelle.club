-- Seed product/service categories
INSERT INTO categories (name, icon, is_active, status, display_order)
VALUES 
  ('Skincare', '✨', true, 'activo', 1),
  ('Maquillaje', '💄', true, 'activo', 2),
  ('Cabello', '💇‍♀️', true, 'activo', 3),
  ('Fragancias', '🌸', true, 'activo', 4),
  ('Uñas', '💅', true, 'activo', 5),
  ('Spa & Masajes', '🧖‍♀️', true, 'proximamente', 6),
  ('Tratamientos Faciales', '✨', true, 'proximamente', 7)
ON CONFLICT DO NOTHING;
