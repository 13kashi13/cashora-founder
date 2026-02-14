# Final Setup Guide - Clean Architecture

## ⚠️ WEBSITE SHOWING BLANK SCREEN?

**See BLANK_SCREEN_DEBUG.md for detailed debugging steps.**

Most common cause: Incomplete Supabase Publishable key in `.env`

Quick fix (2026 Format):
1. Go to https://supabase.com/dashboard/project/hyzpywpnfvifftzhjvxo/settings/api
2. Copy the COMPLETE "Publishable key" (starts with `sb_publishable_`)
3. Update `VITE_SUPABASE_ANON_KEY` in `.env` (variable name stays the same)
4. Restart dev server: `npm run dev`

Note: In 2026, Supabase uses "Publishable keys" (sb_publishable_...) instead of "anon keys"

---

## ✅ What's Done

### 1. Supabase Auth (Not Firebase)
- Full migration to Supabase authentication
- Google, GitHub, Email/Password support
- Proper session management

### 2. Clean Database Schema
- No more JSON blobs!
- Proper columns: `goal`, `experience_level`, `selected_platforms`
- Type-safe with CHECK constraints

### 3. Proper RLS Policies
- Uses `auth.uid()` correctly
- Users can only access their own data
- Secure by default

## 🚀 Setup Steps (5 minutes)

### Step 1: Add Onboarding Columns
Run `supabase-add-onboarding-columns.sql` in Supabase SQL Editor:

```sql
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS goal TEXT 
CHECK (goal IN ('growth', 'monetization', 'both'));

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS experience_level TEXT 
CHECK (experience_level IN ('beginner', 'intermediate', 'advanced'));

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS selected_platforms TEXT[];

ALTER TABLE public.users 
DROP COLUMN IF EXISTS onboarding_data;
```

### Step 2: Enable RLS
Run `supabase-rls-proper.sql` in Supabase SQL Editor:

```sql
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);
```

### Step 3: Configure OAuth (Optional but Recommended)

#### Google OAuth:
1. Go to: https://supabase.com/dashboard/project/hyzpywpnfvifftzhjvxo/auth/providers
2. Enable Google
3. Add credentials from Google Cloud Console
4. Redirect URI: `https://hyzpywpnfvifftzhjvxo.supabase.co/auth/v1/callback`

#### GitHub OAuth:
1. Same page, enable GitHub
2. Add credentials from GitHub Settings
3. Callback URL: `https://hyzpywpnfvifftzhjvxo.supabase.co/auth/v1/callback`

### Step 4: Test!
1. Clear browser: `localStorage.clear()`
2. Go to http://localhost:3000
3. Sign up with Google/GitHub/Email
4. Complete onboarding (3 steps)
5. Check Supabase:

```sql
SELECT id, email, goal, experience_level, selected_platforms, created_at
FROM public.users
ORDER BY created_at DESC
LIMIT 5;
```

## 📊 Database Schema

### users table:
```sql
id                  UUID PRIMARY KEY (references auth.users)
email               TEXT UNIQUE NOT NULL
full_name           TEXT
avatar_url          TEXT
goal                TEXT ('growth', 'monetization', 'both')
experience_level    TEXT ('beginner', 'intermediate', 'advanced')
selected_platforms  TEXT[] (array of platform names)
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

### videos table:
```sql
id              UUID PRIMARY KEY
user_id         UUID (references users.id)
title           TEXT NOT NULL
status          TEXT ('draft', 'generating', 'ready', 'posted', 'failed')
views           INTEGER
likes           INTEGER
shares          INTEGER
revenue         DECIMAL
duration        INTEGER (seconds)
thumbnail_url   TEXT
created_at      TIMESTAMP
```

### posts table:
```sql
id                  UUID PRIMARY KEY
user_id             UUID (references users.id)
video_id            UUID (references videos.id)
platform            TEXT
status              TEXT ('scheduled', 'posting', 'posted', 'failed')
views               INTEGER
likes               INTEGER
shares              INTEGER
comments            INTEGER
engagement_rate     DECIMAL
posted_at           TIMESTAMP
```

## 🎯 How It Works

### Onboarding Flow:
1. User signs up → Supabase creates auth user
2. User completes survey → App saves to:
   - `goal` column
   - `experience_level` column
   - `selected_platforms` array
3. RLS checks `auth.uid() = id` ✅
4. Data saved securely!

### Dashboard Queries:
```typescript
// Fetch user's videos
const { data } = await supabase
  .from('videos')
  .select('*')
  .eq('user_id', user.id); // RLS auto-filters!

// Fetch user's posts
const { data } = await supabase
  .from('posts')
  .select('*')
  .eq('user_id', user.id);
```

### Analytics:
- Reads from `selected_platforms` array
- Filters analytics by user's chosen platforms
- Aggregates views, likes, shares from posts
- Calculates revenue ($1 per 1000 views)

### Recommendations:
- Reads `goal` and `experience_level`
- Generates personalized suggestions
- Based on real performance data

## ✅ Success Criteria

After setup, you should see:

### In Browser Console:
```
Supabase Config: { keyFormat: "Publishable (2024)" }
Attempting to save onboarding data: {
  goal: "growth",
  experience_level: "beginner",
  selected_platforms: ["youtube", "tiktok"]
}
Onboarding data saved successfully!
```

### In Supabase:
```sql
SELECT * FROM users WHERE id = 'your-user-id';

-- Should show:
-- goal: 'growth'
-- experience_level: 'beginner'
-- selected_platforms: ['youtube', 'tiktok']
```

## 🎉 You're Done!

This is real backend wiring now - no more mocks!

- ✅ Supabase Auth (not Firebase)
- ✅ Clean column-based schema (not JSON)
- ✅ Proper RLS security
- ✅ Type-safe with CHECK constraints
- ✅ Real data flowing through the app

Next: Create test videos and see real analytics!
