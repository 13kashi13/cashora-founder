# 🔥 GitHub Authentication - Quick Setup (2 minutes)

GitHub sign-in needs OAuth credentials. Here's how to set it up:

---

## Step 1: Create GitHub OAuth App (1 minute)

1. Go to: **https://github.com/settings/developers**
2. Click **"OAuth Apps"** in left sidebar
3. Click **"New OAuth App"** button
4. Fill in the form:

```
Application name: Cashora
Homepage URL: http://localhost:8080
Authorization callback URL: https://cashora-d509a.firebaseapp.com/__/auth/handler
```

5. Click **"Register application"**
6. You'll see your **Client ID** - copy it
7. Click **"Generate a new client secret"** - copy the secret

---

## Step 2: Add to Firebase (1 minute)

1. Go to: **https://console.firebase.google.com/**
2. Select your **cashora-d509a** project
3. Click **Authentication** in left menu
4. Click **Sign-in method** tab
5. Find **GitHub** in the list
6. Click on it
7. Toggle **"Enable"** to ON
8. Paste your **Client ID** from GitHub
9. Paste your **Client Secret** from GitHub
10. Click **"Save"**

---

## Step 3: Test It!

1. Go to: http://localhost:8080/login
2. Click **"Continue with GitHub"**
3. Authorize the app
4. Done! 🎉

---

## For Production

When you deploy to production (e.g., cashora.com):

1. Create a **new** GitHub OAuth App for production
2. Use your production domain:
   ```
   Homepage URL: https://cashora.com
   Authorization callback URL: https://cashora-d509a.firebaseapp.com/__/auth/handler
   ```
3. Update Firebase with production credentials

---

## Common Issues

### "Authorization callback URL mismatch"
- Make sure callback URL is exactly: `https://cashora-d509a.firebaseapp.com/__/auth/handler`
- Include `https://` and the full path

### "This application is not configured"
- GitHub OAuth app not created yet
- Or credentials not added to Firebase

### "Account exists with different credential"
- You already signed up with Google using the same email
- Sign in with Google instead
- Or enable account linking in Firebase

---

## Why Google Works But GitHub Doesn't

**Google** is enabled by default in Firebase (just needs to be toggled on)

**GitHub** requires:
1. Creating an OAuth app on GitHub
2. Getting Client ID and Secret
3. Adding them to Firebase

That's why Google works immediately but GitHub needs this extra setup!

---

## Quick Check

To see if GitHub is configured:

1. Go to Firebase Console
2. Authentication > Sign-in method
3. Look at GitHub row
4. If it says "Enabled" with credentials filled in = ✅ Ready
5. If it says "Disabled" or no credentials = ❌ Needs setup

---

**Once you complete these steps, GitHub sign-in will work perfectly!** 🚀
