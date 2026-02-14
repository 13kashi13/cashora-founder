-- Proper RLS Setup for Supabase Auth
-- Run this in Supabase SQL Editor

-- ============================================
-- STEP 1: Enable RLS on users table
-- ============================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 2: Drop old policies
-- ============================================
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Allow user inserts" ON public.users;
DROP POLICY IF EXISTS "Allow user selects" ON public.users;
DROP POLICY IF EXISTS "Allow user updates" ON public.users;
DROP POLICY IF EXISTS "Allow all operations on users" ON public.users;

-- ============================================
-- STEP 3: Create proper RLS policies
-- ============================================

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

-- Allow users to insert their own profile (for first-time signup)
CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================
-- STEP 4: Verify setup
-- ============================================

-- Check RLS is enabled
SELECT schemaname, tablename, rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename = 'users';

-- Check policies
SELECT policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'users';

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$ 
BEGIN
    RAISE NOTICE '✅ RLS enabled with proper Supabase auth policies!';
    RAISE NOTICE '✅ Users can only access their own data.';
    RAISE NOTICE '✅ Test the onboarding flow now.';
END $$;
