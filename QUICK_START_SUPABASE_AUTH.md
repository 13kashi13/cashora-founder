# Quick Start - Supabase Auth Setup

## ⚡ 3 Steps to Get Running

### Step 1: Run RLS SQL (2 minutes)
1. Open Supabase SQL Editor: https://supabase.com/dashboard/project/hyzpywpnfvifftzhjvxo/sql
2. Copy and paste entire contents of `supabase-rls-proper.sql`
3. Click "Run"
4. Verify success message

### Step 2: Enable OAuth Providers (5 minutes)

#### For Google:
1. Go to: https://supabase.com/dashboard/project/hyzpywpnfvifftzhjvxo/auth/providers
2. Find "Google" and click "Enable"
3. You'll need Google OAuth credentials:
   - Go to https://console.cloud.google.com/apis/credentials
   - Create OAuth 2.0 Client ID
   - Add redirect URI: `https://hyzpywpnfvifftzhjvxo.supabase.co/auth/v1/callback`
   - Copy Client ID and Secret to Supabase

#### For GitHub:
1. Same page, find "GitHub" and click "Enable"
2. You'll need GitHub OAuth app:
   - Go to https://github.com/settings/developers
   - New OAuth App
   - Add callback URL: `https://hyzpywpnfvifftzhjvxo.supabase.co/auth/v1/callback`
   - Copy Client ID and Secret to Supabase

#### For Email/Password:
Already enabled by default! ✅

### Step 3: Test It! (1 minute)
1. Clear browser: `localStorage.clear()`
2. Refresh page
3. Click "Get Started"
4. Sign up with Google/GitHub/Email
5. Complete onboarding
6. Check console for success logs

## ✅ What to Expect

### Console Logs (Success):
```
Supabase Config: { keyFormat: "Publishable (2024)" }
Attempting to save onboarding data: { userId: "...", formData: {...} }
Onboarding data saved successfully: { id: "...", onboarding_data: {...} }
```

### In Supabase:
```sql
SELECT * FROM public.users ORDER BY created_at DESC LIMIT 1;
```
Should show your user with onboarding_data!

## 🚨 Common Issues

**"OAuth provider not configured"**
→ Enable Google/GitHub in Supabase Dashboard

**"new row violates row-level security policy"**
→ Run `supabase-rls-proper.sql` again

**"Email confirmation required"**
→ Disable in: Supabase → Auth → Settings → Email Confirmations

## 🎉 Done!

Your app now uses Supabase Auth with proper RLS security!

Next: Create test videos and see real data in dashboard.
