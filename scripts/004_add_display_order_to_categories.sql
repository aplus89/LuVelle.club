-- Add display_order column to categories table
ALTER TABLE categories ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Update existing categories with display_order based on name alphabetically
UPDATE categories SET display_order = 1 WHERE name = 'Skincare';
UPDATE categories SET display_order = 2 WHERE name = 'Makeup';
UPDATE categories SET display_order = 3 WHERE name = 'Haircare';
UPDATE categories SET display_order = 4 WHERE name = 'Nails';
UPDATE categories SET display_order = 5 WHERE name = 'Wellness';

-- Set a default order for any other categories
UPDATE categories SET display_order = 99 WHERE display_order = 0;
