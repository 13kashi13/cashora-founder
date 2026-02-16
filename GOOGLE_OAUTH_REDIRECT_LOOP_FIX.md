# Google OAuth Redirect Loop Fix - Production Issue

## Problem
- Click "Sign in with Google" → Shows "Redirecting..." → Returns to login page
- Works sometimes in Chrome Incognito
- Fails consistently in normal Chrome and Brave
- This indicates a **Supabase OAuth configuration issue**, not frontend code

## Root Cause Analysis

Since you're using **Supabase Auth** (not NextAuth), the issue is likely:
1. ❌ Incorrect redirect URLs in Supabase Dashboard
2. ❌ Google Cloud Console has wrong authorized redirect URI
3. ❌ Third-party cookies blocked in normal browsers
4. ❌ Domain mismatch (www vs non-www)

## Fix Checklist

### 1. Supabase Dashboard Configuration

**Go to**: https://supabase.com/dashboard/project/hyzpywpnfvifftzhjvxo/auth/url-configuration

**Verify these EXACT settings:**

#### Site URL
```
https://cashora.tech
```
⚠️ **NOT** `https://www.cashora.tech` (no www)

#### Redirect URLs (Add ALL of these)
```
https://cashora.tech/**
https://cashora.tech/dashboard
https://cashora.tech/login
https://cashora.tech/auth/callback
```

#### Additional Redirect URLs (Optional but recommended)
```
http://localhost:3000/**
http://localhost:5173/**
```
(For local development)

---

### 2. Google Cloud Console Configuration

**Go to**: https://console.cloud.google.com/apis/credentials

**Find your OAuth 2.0 Client ID** and verify:

#### Authorized JavaScript origins
```
https://cashora.tech
https://hyzpywpnfvifftzhjvxo.supabase.co
```

#### Authorized redirect URIs
```
https://hyzpywpnfvifftzhjvxo.supabase.co/auth/v1/callback
```

⚠️ **CRITICAL**: The redirect URI MUST be your Supabase project's auth callback URL, NOT your app's URL!

**Format**: `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`

---

### 3. Check Supabase Auth Providers

**Go to**: https://supabase.com/dashboard/project/hyzpywpnfvifftzhjvxo/auth/providers

**Google Provider Settings:**
- ✅ Enabled: YES
- ✅ Client ID: (from Google Cloud Console)
- ✅ Client Secret: (from Google Cloud Console)
- ✅ Authorized Client IDs: (leave empty unless using mobile)

---

### 4. Environment Variables (Already Fixed)

Your Cloudflare Pages environment variables should have:
```
VITE_SUPABASE_URL=https://hyzpywpnfvifftzhjvxo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
✅ This is already correct after our recent fix.

---

### 5. Third-Party Cookies Issue

**Why it works in Incognito but not normal browser:**
- Normal browsers may have third-party cookies blocked
- Incognito starts fresh without cookie restrictions

**Solution**: Supabase uses `localStorage` for session persistence, which should work even with third-party cookies blocked. However, the OAuth flow itself requires cookies during the redirect.

**Check in your code** (already implemented):
```typescript
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,        // ✅ Uses localStorage
    detectSessionInUrl: true,    // ✅ Detects OAuth callback
  },
});
```

---

### 6. Domain Consistency

**Current setup**: `cashora.tech` (no www)

**Verify**:
1. Your Cloudflare Pages project is set to `cashora.tech`
2. No automatic redirect from `www.cashora.tech` to `cashora.tech` (or vice versa)
3. All OAuth URLs use the same domain

**To check**: Visit both URLs and see if they redirect:
- https://cashora.tech → Should work
- https://www.cashora.tech → Should either work OR redirect to non-www

---

## Debugging Steps

### Step 1: Check Browser Console

1. Open https://cashora.tech/login
2. Open DevTools (F12) → Console tab
3. Click "Continue with Google"
4. Look for these logs:
   ```
   Starting Google OAuth...
   Google OAuth redirect initiated
   ```
5. After redirect back, look for:
   ```
   Auth state change: SIGNED_IN Session exists
   ```
   OR
   ```
   Auth state change: INITIAL_SESSION No session
   ```

### Step 2: Check Network Tab

1. Open DevTools (F12) → Network tab
2. Click "Continue with Google"
3. Look for these requests:
   - `POST https://hyzpywpnfvifftzhjvxo.supabase.co/auth/v1/authorize`
   - Redirect to `accounts.google.com`
   - Redirect back to `https://hyzpywpnfvifftzhjvxo.supabase.co/auth/v1/callback`
   - Final redirect to `https://cashora.tech/dashboard`

4. Check for errors:
   - ❌ 400 Bad Request → Wrong redirect URI
   - ❌ 401 Unauthorized → Wrong client ID/secret
   - ❌ 403 Forbidden → OAuth not enabled

### Step 3: Check Application Storage

1. Open DevTools (F12) → Application tab
2. Go to Local Storage → `https://cashora.tech`
3. Look for: `sb-hyzpywpnfvifftzhjvxo-auth-token`
4. If present, check if it's valid JSON with `access_token`

### Step 4: Use Auth Debug Page

1. Go to https://cashora.tech/auth-debug
2. Check all the information displayed
3. Look for errors in "Direct Supabase Calls" section

---

## Common Issues & Solutions

### Issue 1: "redirect_uri_mismatch" Error

**Symptom**: Google shows error page saying redirect URI doesn't match

**Solution**:
1. Go to Google Cloud Console
2. Update Authorized redirect URIs to:
   ```
   https://hyzpywpnfvifftzhjvxo.supabase.co/auth/v1/callback
   ```
3. Wait 5 minutes for changes to propagate
4. Try again

### Issue 2: Redirect Loop (No Error)

**Symptom**: Redirects to Google, then back to login, no error message

**Solution**:
1. Check Supabase Dashboard → Authentication → URL Configuration
2. Ensure Site URL is `https://cashora.tech`
3. Ensure Redirect URLs include `https://cashora.tech/**`
4. Clear browser cache and cookies
5. Try again

### Issue 3: Works in Incognito, Fails in Normal Browser

**Symptom**: Exactly as described

**Solution**:
1. Clear browser cache and cookies for `cashora.tech`
2. Clear browser cache and cookies for `supabase.co`
3. Disable browser extensions (especially ad blockers)
4. Check if third-party cookies are blocked:
   - Chrome: Settings → Privacy → Cookies → Allow all cookies (temporarily)
   - Brave: Settings → Shields → Cookies → Allow all cookies (temporarily)
5. Try again

### Issue 4: Session Not Persisting

**Symptom**: Login works but session is lost on refresh

**Solution**:
1. Check if `localStorage` is available:
   ```javascript
   console.log('localStorage available:', typeof localStorage !== 'undefined');
   ```
2. Check if session is being stored:
   ```javascript
   console.log('Stored session:', localStorage.getItem('sb-hyzpywpnfvifftzhjvxo-auth-token'));
   ```
3. Ensure `persistSession: true` in Supabase client config (already set)

---

## Exact Configuration Needed

### Supabase Dashboard

**URL Configuration** (https://supabase.com/dashboard/project/hyzpywpnfvifftzhjvxo/auth/url-configuration):
```
Site URL: https://cashora.tech

Redirect URLs:
- https://cashora.tech/**
- https://cashora.tech/dashboard
- http://localhost:3000/** (for development)
```

### Google Cloud Console

**OAuth 2.0 Client ID** (https://console.cloud.google.com/apis/credentials):
```
Authorized JavaScript origins:
- https://cashora.tech
- https://hyzpywpnfvifftzhjvxo.supabase.co

Authorized redirect URIs:
- https://hyzpywpnfvifftzhjvxo.supabase.co/auth/v1/callback
```

---

## Testing After Fix

1. **Clear everything**:
   ```
   - Clear browser cache
   - Clear cookies for cashora.tech
   - Clear cookies for supabase.co
   - Clear localStorage
   ```

2. **Test in normal Chrome**:
   ```
   1. Go to https://cashora.tech/login
   2. Open DevTools → Console
   3. Click "Continue with Google"
   4. Complete Google OAuth
   5. Should redirect to /dashboard
   6. Should see user info in sidebar
   ```

3. **Test session persistence**:
   ```
   1. After successful login
   2. Refresh the page
   3. Should remain logged in
   4. Should NOT redirect to /login
   ```

4. **Test in Brave**:
   ```
   Same steps as Chrome
   Should work consistently
   ```

---

## Next Steps

1. **Verify Supabase Dashboard settings** (most likely issue)
2. **Verify Google Cloud Console settings**
3. **Clear browser cache and cookies**
4. **Test again**
5. **If still failing, share**:
   - Screenshot of Supabase URL Configuration
   - Screenshot of Google Cloud Console OAuth settings
   - Browser console logs during OAuth flow
   - Network tab showing the redirect chain

---

## Quick Fix Commands

If you need to test locally with the correct configuration:

```bash
# Clear local storage in browser console
localStorage.clear();
sessionStorage.clear();

# Check current session
supabase.auth.getSession().then(console.log);

# Check auth state
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth event:', event, 'Session:', session);
});
```

---

## Support

If the issue persists after following all steps:
1. Go to https://cashora.tech/auth-debug
2. Take a screenshot
3. Share the console logs from the OAuth flow
4. Share the Network tab showing the redirect chain
