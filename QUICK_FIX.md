# ⚡ Quick Fix - Blank Screen

## Problem
Website shows blank screen after running `npm run dev`

## Solution (30 seconds)

### 1. Go to Debug Page
```
http://localhost:3000/debug
```

### 2. Follow Instructions
The debug page will tell you exactly what's wrong and how to fix it.

## If Debug Page is Also Blank

Your Supabase Publishable key is incomplete or missing.

### Fix (2026 Format):
1. Open: https://supabase.com/dashboard/project/hyzpywpnfvifftzhjvxo/settings/api
2. Copy the COMPLETE "Publishable key" (starts with `sb_publishable_`)
3. Edit `.env`:
   ```bash
   # Variable name stays VITE_SUPABASE_ANON_KEY for backwards compatibility
   # But use the new Publishable key format (sb_publishable_...)
   VITE_SUPABASE_ANON_KEY=sb_publishable_YOUR_COMPLETE_KEY_HERE
   ```
4. Restart:
   ```bash
   npm run dev
   ```

Note: In 2026, Supabase uses "Publishable keys" instead of "anon keys"

## Check if Fixed
- ✅ Debug page loads and shows green checkmarks
- ✅ Home page loads at http://localhost:3000

## Still Broken?
See `BLANK_SCREEN_DEBUG.md` for detailed debugging steps.
