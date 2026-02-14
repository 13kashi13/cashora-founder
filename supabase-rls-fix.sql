-- Fix RLS policies for Firebase authentication
-- Run this in Supabase SQL Editor

-- IMPORTANT: Since we're using Firebase auth (not Supabase auth),
-- we need to disable RLS or make policies permissive

-- Option 1: Disable RLS for users table (RECOMMENDED for Firebase auth)
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Option 2: If you want to keep RLS enabled, use permissive policies
-- Uncomment the lines below if you prefer this approach:

-- DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
-- DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
-- DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
-- DROP POLICY IF EXISTS "Allow user inserts" ON public.users;
-- DROP POLICY IF EXISTS "Allow user selects" ON public.users;
-- DROP POLICY IF EXISTS "Allow user updates" ON public.users;

-- CREATE POLICY "Allow all operations on users"
--   ON public.users FOR ALL
--   USING (true)
--   WITH CHECK (true);

-- Verify RLS status
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'users';

-- Verify no restrictive policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'users';
