# Onboarding Fix - Action Checklist

## ⚠️ CRITICAL: Do These First

### [ ] 1. Get Correct Supabase Anon Key
**Current key is WRONG!**

```env
# WRONG (current):
VITE_SUPABASE_ANON_KEY=sb_publishable_ho7f0rMVCSYrKPeB7-eT0A_ujXeG4WR

# CORRECT (should look like):
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5enB5d3BuZnZpZmZ0emhqdnhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjM2MDAsImV4cCI6MjAyNTM5OTYwMH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**How to get it:**
1. Go to: https://supabase.com/dashboard/project/hyzpywpnfvifftzhjvxo/settings/api
2. Copy the `anon` / `public` key
3. Update `.env` file
4. Restart server: `npm run dev`

See `GET_SUPABASE_KEY.md` for detailed instructions.

### [ ] 2. Run RLS Fix SQL
Open Supabase SQL Editor and run:

```sql
-- Drop existing policies
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

Or copy from `supabase-rls-fix.sql`

### [ ] 3. Verify Database Schema
Run this in Supabase SQL Editor:

```sql
-- Check if onboarding_data column exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name = 'onboarding_data';
```

If it returns no rows, run:
```sql
ALTER TABLE public.users ADD COLUMN onboarding_data JSONB;
```

## 🧪 Testing Steps

### [ ] 4. Clear Browser Data
```javascript
// In browser console (F12):
localStorage.clear();
sessionStorage.clear();
```

Then refresh the page.

### [ ] 5. Test Login Flow
1. Sign up or log in with Google/GitHub/Email
2. Watch browser console for logs:
   - "Syncing Firebase auth with Supabase"
   - "Creating Supabase user record for Firebase user"
   - "Supabase user created successfully"

### [ ] 6. Test Onboarding Flow
1. Complete all 3 onboarding steps
2. Click "Complete" button
3. Watch console for logs:
   - "Attempting to save onboarding data"
   - "User existence check"
   - "Onboarding data saved successfully"

### [ ] 7. Verify Data Saved
Run in Supabase SQL Editor:

```sql
SELECT id, email, onboarding_data, created_at
FROM public.users
ORDER BY created_at DESC
LIMIT 5;
```

You should see your user with onboarding_data populated.

## 🐛 If It Still Fails

### Check Console Logs
Look for error messages like:

```
Onboarding save error: {
  error: {...},
  message: "actual error message here",
  code: "error code"
}
```

### Common Errors & Solutions

**Error: "JWT expired" or "Invalid JWT"**
- Solution: Get fresh anon key from Supabase dashboard

**Error: "new row violates row-level security policy"**
- Solution: Run the RLS fix SQL (step 2)

**Error: "column 'onboarding_data' does not exist"**
- Solution: Run ALTER TABLE command (step 3)

**Error: "PGRST116" or "No rows returned"**
- This is normal! The app will auto-create the user.
- Check if "User record created successfully" appears in console

**Error: "Failed to create user record"**
- Check the detailed error in console
- Verify RLS policies are permissive
- Verify anon key is correct

## 📋 Verification Checklist

After completing all steps:

- [ ] Supabase anon key starts with `eyJ` and is 200+ chars
- [ ] RLS policies show "Allow user inserts/selects/updates"
- [ ] `onboarding_data` column exists in users table
- [ ] User record auto-created on first login
- [ ] Onboarding completes without errors
- [ ] Data visible in Supabase users table
- [ ] Console shows success logs (no errors)

## 📚 Reference Documents

- `ONBOARDING_FIX_SUMMARY.md` - What was changed
- `ONBOARDING_DEBUG_GUIDE.md` - Detailed debugging guide
- `GET_SUPABASE_KEY.md` - How to get correct key
- `supabase-rls-fix.sql` - SQL to run

## 🆘 Still Need Help?

If onboarding still fails after completing all steps:

1. Share the full console error log
2. Share the result of the verification SQL query
3. Confirm the anon key format (first 20 chars)
4. Share the RLS policies query result

I'll help debug further!
