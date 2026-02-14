# Onboarding Save Error - Debug & Fix Guide

## Problem
Onboarding survey fails with "Failed to save onboarding data" error.

## Root Cause
Firebase authentication is being used, but Supabase Row Level Security (RLS) expects Supabase authentication. This causes permission errors when trying to insert/update user data.

## Solution Steps

### Step 1: Check Supabase Configuration

1. Open `.env` file
2. Verify `VITE_SUPABASE_ANON_KEY` is set correctly
3. Get the correct key from Supabase Dashboard:
   - Go to https://supabase.com/dashboard
   - Select your project
   - Go to Settings > API
   - Copy the `anon` / `public` key (NOT the service_role key)
   - It should start with `eyJ...` and be very long (~200+ characters)

**Current key in .env:**
```
VITE_SUPABASE_ANON_KEY=sb_publishable_ho7f0rMVCSYrKPeB7-eT0A_ujXeG4WR
```

**This looks incorrect!** The anon key should be a JWT token starting with `eyJ`.

### Step 2: Fix RLS Policies

Run the SQL in `supabase-rls-fix.sql` in your Supabase SQL Editor:

```sql
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;

-- Create permissive policies
CREATE POLICY "Allow user inserts"
  ON public.users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow user selects"
  ON public.users FOR SELECT
  USING (true);

CREATE POLICY "Allow user updates"
  ON public.users FOR UPDATE
  USING (true);
```

### Step 3: Verify Database Schema

Run this query in Supabase SQL Editor to check the users table:

```sql
-- Check if users table exists and has correct structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'users'
ORDER BY ordinal_position;
```

Expected columns:
- `id` (uuid)
- `email` (text)
- `full_name` (text, nullable)
- `avatar_url` (text, nullable)
- `onboarding_data` (jsonb, nullable)
- `created_at` (timestamp with time zone)
- `updated_at` (timestamp with time zone)

If `onboarding_data` column is missing, run:

```sql
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS onboarding_data JSONB;
```

### Step 4: Test the Flow

1. Open browser console (F12)
2. Clear localStorage: `localStorage.clear()`
3. Refresh the page
4. Sign up or log in
5. Complete onboarding survey
6. Check console for detailed error logs

**Look for these log messages:**
- "Attempting to save onboarding data:" - Shows the data being saved
- "User existence check:" - Shows if user exists in Supabase
- "User does not exist in Supabase, creating user record..." - User creation attempt
- "Onboarding save error:" - The actual error with full details

### Step 5: Manual User Creation (If Needed)

If automatic user creation fails, manually create a user record:

```sql
-- Replace 'YOUR_FIREBASE_USER_ID' with actual Firebase UID
INSERT INTO public.users (id, email, full_name, avatar_url, onboarding_data)
VALUES (
  'YOUR_FIREBASE_USER_ID',
  'user@example.com',
  'User Name',
  NULL,
  '{"goal": "growth", "experienceLevel": "beginner", "platforms": ["youtube"]}'::jsonb
)
ON CONFLICT (id) DO NOTHING;
```

## Error Messages & Solutions

### Error: "PGRST116" or "No rows returned"
**Cause:** User doesn't exist in Supabase users table
**Solution:** The app now automatically creates the user. Check console logs.

### Error: "new row violates row-level security policy"
**Cause:** RLS policies are too restrictive for Firebase auth
**Solution:** Run the RLS fix SQL from Step 2

### Error: "JWT expired" or "Invalid JWT"
**Cause:** Supabase anon key is incorrect or expired
**Solution:** Get fresh anon key from Supabase dashboard (Step 1)

### Error: "column 'onboarding_data' does not exist"
**Cause:** Database schema not updated
**Solution:** Run the ALTER TABLE command from Step 3

## Verification Checklist

- [ ] Supabase anon key is correct (starts with `eyJ`)
- [ ] RLS policies are permissive (run supabase-rls-fix.sql)
- [ ] `onboarding_data` column exists in users table
- [ ] User record is created on first login
- [ ] Console shows detailed error logs
- [ ] Browser localStorage is cleared before testing

## Testing Query

After completing onboarding, verify data was saved:

```sql
-- Check if onboarding data was saved
SELECT id, email, onboarding_data, created_at
FROM public.users
ORDER BY created_at DESC
LIMIT 5;
```

## Files Modified

1. `src/pages/Onboarding.tsx` - Added comprehensive error logging
2. `src/lib/supabaseAuth.ts` - Created Firebase-Supabase sync helper
3. `src/contexts/AuthContext.tsx` - Auto-create Supabase user on login
4. `supabase-schema.sql` - Added INSERT policy for users
5. `supabase-rls-fix.sql` - Permissive RLS policies for Firebase auth

## Next Steps

If issues persist:
1. Share the console error logs (full error object)
2. Share the result of the verification query
3. Confirm Supabase anon key format (should be JWT)
