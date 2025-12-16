-- Update existing 'pending' status to 'Nuevo'
UPDATE provider_applications 
SET status = 'Nuevo' 
WHERE status = 'pending' OR status IS NULL;

UPDATE brand_applications 
SET status = 'Nuevo' 
WHERE status = 'pending' OR status IS NULL;

-- Add check constraint to ensure only valid status values
ALTER TABLE provider_applications DROP CONSTRAINT IF EXISTS provider_applications_status_check;
ALTER TABLE provider_applications 
ADD CONSTRAINT provider_applications_status_check 
CHECK (status IN ('Nuevo', 'Contactada', 'Aprobada', 'Rechazada'));

ALTER TABLE brand_applications DROP CONSTRAINT IF EXISTS brand_applications_status_check;
ALTER TABLE brand_applications 
ADD CONSTRAINT brand_applications_status_check 
CHECK (status IN ('Nuevo', 'Contactada', 'Aprobada', 'Rechazada'));

-- Set default value for future inserts
ALTER TABLE provider_applications ALTER COLUMN status SET DEFAULT 'Nuevo';
ALTER TABLE brand_applications ALTER COLUMN status SET DEFAULT 'Nuevo';
