-- Supabase Setup for Firebase Authentication
-- Run this entire script in Supabase SQL Editor

-- ============================================
-- STEP 1: Disable RLS for users table
-- ============================================
-- Since we're using Firebase auth (not Supabase auth),
-- RLS policies that check auth.uid() won't work.
-- We disable RLS and handle security in the application layer.

ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 2: Verify users table structure
-- ============================================
-- Check if onboarding_data column exists
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'onboarding_data'
    ) THEN
        ALTER TABLE public.users ADD COLUMN onboarding_data JSONB;
        RAISE NOTICE 'Added onboarding_data column';
    ELSE
        RAISE NOTICE 'onboarding_data column already exists';
    END IF;
END $$;

-- ============================================
-- STEP 3: Clean up old RLS policies
-- ============================================
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Allow user inserts" ON public.users;
DROP POLICY IF EXISTS "Allow user selects" ON public.users;
DROP POLICY IF EXISTS "Allow user updates" ON public.users;
DROP POLICY IF EXISTS "Allow all operations on users" ON public.users;

-- ============================================
-- STEP 4: Verify setup
-- ============================================
-- Check RLS status (should be disabled)
SELECT 
    schemaname, 
    tablename, 
    rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename = 'users';

-- Check table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;

-- Check for any remaining policies (should be empty)
SELECT 
    policyname, 
    cmd, 
    qual, 
    with_check
FROM pg_policies
WHERE tablename = 'users';

-- ============================================
-- STEP 5: Test query (optional)
-- ============================================
-- This should work without authentication
SELECT COUNT(*) as user_count FROM public.users;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$ 
BEGIN
    RAISE NOTICE '✅ Setup complete! RLS is disabled for users table.';
    RAISE NOTICE '✅ Firebase authentication will work with upsert operations.';
    RAISE NOTICE '✅ Test the onboarding flow now.';
END $$;
