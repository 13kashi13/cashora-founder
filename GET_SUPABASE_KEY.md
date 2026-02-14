# How to Get Your Supabase Publishable Key (2024 Format)

## Current Key Format
Your `.env` file has:
```
VITE_SUPABASE_ANON_KEY=sb_publishable_ho7f0rMVCSYrKPeB7-eT0A_ujXeG4WR
```

This is the **CORRECT** format! Supabase updated their API key system in 2024.

## New Key Format (2024)
- Starts with `sb_publishable_`
- Shorter than the old JWT format
- Found under "Publishable key" in dashboard

## Steps to Verify Your Key

### 1. Go to Supabase Dashboard
Visit: https://supabase.com/dashboard

### 2. Select Your Project
Click on your project: `hyzpywpnfvifftzhjvxo`

### 3. Navigate to API Settings
- Click on the ⚙️ Settings icon in the left sidebar
- Click on "API" in the settings menu

### 4. Find the Publishable Key
Look for the section called "Project API keys"

You'll see:
- **Publishable key** - This is what you need! ✅ (starts with `sb_publishable_`)
- **Secret key** - DO NOT use this in frontend! ❌

### 5. Your Key is Already Correct!
The key in your `.env` file is already in the correct format:
```
sb_publishable_ho7f0rMVCSYrKPeB7-eT0A_ujXeG4WR
```

## If Onboarding Still Fails

The key is correct, so the issue is likely:

1. **RLS Policies** - Run the SQL in `supabase-rls-fix.sql`
2. **Database Schema** - Ensure `onboarding_data` column exists
3. **User Record** - User might not exist in Supabase (app auto-creates it)

Check browser console for detailed error logs that will show the exact issue.

## Security Note

✅ The `Publishable key` (sb_publishable_*) is safe to use in frontend code.

❌ NEVER use the `Secret key` in frontend code. It has full database access and should only be used in backend/server code.
