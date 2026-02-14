# 🔍 Blank Screen Debugging Guide

## Current Issue
Website shows blank screen after Supabase Auth migration.

## Step 1: Use Debug Page (Easiest)

1. Go to http://localhost:3000/debug
2. This page will automatically check:
   - Environment variables
   - Database connection
   - Authentication status
3. Follow the instructions shown on the debug page

If the debug page itself is blank, continue to Step 2.

## Step 2: Check Browser Console

1. Open your browser at http://localhost:3000
2. Press F12 or right-click → Inspect
3. Go to Console tab
4. Look for errors (red text)

### Common Errors to Look For:

#### Error: "Supabase Publishable key is missing"
**Cause**: `.env` file has incomplete or missing `VITE_SUPABASE_ANON_KEY`

**Fix (2026 Format)**:
```bash
# Your current key:
VITE_SUPABASE_ANON_KEY=sb_publishable_ho7f0rMVCSYrKPeB7-eT0A_ujXeG4WR

# Get the COMPLETE Publishable key from Supabase:
# 1. Go to: https://supabase.com/dashboard/project/hyzpywpnfvifftzhjvxo/settings/api
# 2. Copy the FULL "Publishable key" (starts with sb_publishable_)
# 3. Replace the value in .env
# 4. Restart dev server: npm run dev

# Note: In 2026, Supabase uses "Publishable keys" (sb_publishable_...)
# NOT the old "anon keys" (eyJ... JWT format)
```

#### Error: "Failed to fetch" or "Network error"
**Cause**: Supabase project URL is wrong or project doesn't exist

**Fix**:
```bash
# Verify your Supabase URL in .env:
VITE_SUPABASE_URL=https://hyzpywpnfvifftzhjvxo.supabase.co

# Check if this URL is correct:
# 1. Go to: https://supabase.com/dashboard
# 2. Click on your project
# 3. Go to Settings → API
# 4. Copy "Project URL"
# 5. Update .env if different
```

#### Error: "useAuth must be used within an AuthProvider"
**Cause**: Component is trying to use auth outside the provider

**Fix**: This should be fixed now with ErrorBoundary. If you see this, there's a component structure issue.

## Step 2: Check Network Tab

1. In browser DevTools, go to Network tab
2. Reload the page
3. Look for failed requests (red)

### What to Check:
- Are JavaScript files loading? (main.tsx, App.tsx, etc.)
- Are there 404 errors?
- Are there CORS errors?

## Step 3: Verify Environment Variables

Run this in your terminal:
```bash
# Check if .env is being read
cat .env | grep VITE_SUPABASE

# Should show:
# VITE_SUPABASE_URL=https://hyzpywpnfvifftzhjvxo.supabase.co
# VITE_SUPABASE_ANON_KEY=sb_publishable_...
```

**IMPORTANT**: After changing `.env`, you MUST restart the dev server:
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 4: Test Supabase Connection

Create a simple test to verify Supabase is working:

```typescript
// In browser console, paste this:
const { createClient } = await import('@supabase/supabase-js');
const supabase = createClient(
  'https://hyzpywpnfvifftzhjvxo.supabase.co',
  'YOUR_COMPLETE_ANON_KEY_HERE'
);
const { data, error } = await supabase.from('users').select('count');
console.log('Test result:', { data, error });
```

### Expected Results:
- ✅ Success: `{ data: [...], error: null }`
- ❌ Auth error: Your anon key is wrong
- ❌ Network error: URL is wrong or project doesn't exist
- ❌ Table error: Database schema not set up yet (run SQL scripts)

## Step 5: Common Fixes

### Fix 1: Complete Supabase Publishable Key (2026 Format)
```bash
# Edit .env
nano .env

# Update this line with COMPLETE Publishable key from Supabase dashboard:
VITE_SUPABASE_ANON_KEY=sb_publishable_YOUR_COMPLETE_KEY_HERE

# Note: Variable name is still VITE_SUPABASE_ANON_KEY for backwards compatibility,
# but the value should be the new Publishable key format (sb_publishable_...)

# Save and restart:
npm run dev
```

### Fix 2: Clear Browser Cache
```bash
# In browser:
# 1. Press Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
# 2. Select "Cached images and files"
# 3. Click "Clear data"
# 4. Reload page
```

### Fix 3: Clear Vite Cache
```bash
# Stop server, then:
rm -rf node_modules/.vite
npm run dev
```

### Fix 4: Reinstall Dependencies
```bash
# Stop server, then:
rm -rf node_modules
npm install
npm run dev
```

## Step 6: What You Should See

### In Browser Console (F12 → Console):
```
Supabase Config: {
  url: 'https://hyzpywpnfvifftzhjvxo.supabase.co',
  hasKey: true,
  keyLength: 50+,
  keyFormat: 'Publishable (2024)'
}
```

### On Screen:
- Landing page with CASHORA hero section
- Navbar with Login/Signup buttons
- Animated background

## Step 7: Still Blank?

If screen is still blank after all fixes:

1. **Check ErrorBoundary**: You should now see a red error message if something crashes
2. **Check main.tsx**: Make sure `document.getElementById("root")` exists
3. **Check index.html**: Make sure `<div id="root"></div>` exists
4. **Check for TypeScript errors**: Run `npm run build` to see compilation errors

## Next Steps After Fixing Blank Screen

Once the website loads:

1. ✅ Run SQL scripts in Supabase (see FINAL_SETUP_GUIDE.md)
2. ✅ Configure OAuth providers (Google, GitHub)
3. ✅ Test login flow
4. ✅ Test onboarding flow

## Quick Checklist

- [ ] Supabase anon key is COMPLETE (not truncated)
- [ ] Dev server restarted after .env changes
- [ ] Browser console shows no red errors
- [ ] Network tab shows no failed requests
- [ ] Supabase Config log shows `hasKey: true`
- [ ] ErrorBoundary shows error if something crashes

## Get Help

If still stuck, share:
1. Screenshot of browser console (F12 → Console)
2. Screenshot of Network tab (F12 → Network)
3. Output of: `cat .env | grep VITE_SUPABASE`
4. Output of: `npm run dev` (terminal output)
