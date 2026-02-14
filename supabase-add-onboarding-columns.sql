-- Add proper onboarding columns to users table
-- Run this in Supabase SQL Editor

-- ============================================
-- Add new columns
-- ============================================

-- Add goal column
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS goal TEXT 
CHECK (goal IN ('growth', 'monetization', 'both'));

-- Add experience_level column
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS experience_level TEXT 
CHECK (experience_level IN ('beginner', 'intermediate', 'advanced'));

-- Add selected_platforms column (array of text)
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS selected_platforms TEXT[];

-- ============================================
-- Drop old onboarding_data column (if exists)
-- ============================================

ALTER TABLE public.users 
DROP COLUMN IF EXISTS onboarding_data;

-- ============================================
-- Verify structure
-- ============================================

SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$ 
BEGIN
    RAISE NOTICE '✅ Onboarding columns added successfully!';
    RAISE NOTICE '✅ Columns: goal, experience_level, selected_platforms';
    RAISE NOTICE '✅ Old onboarding_data JSON column removed';
    RAISE NOTICE '✅ Clean architecture implemented!';
END $$;
