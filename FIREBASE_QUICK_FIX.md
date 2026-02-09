# 🔥 Firebase Quick Fix - Get Your Credentials

## What You Need to Do

You need to get 6 values from Firebase and put them in your `.env` file.

---

## 🎯 Step 1: Open Firebase Console

Click this link: **https://console.firebase.google.com/**

---

## 🎯 Step 2: Create/Select Project

### If you DON'T have a project:
1. Click **"Add project"**
2. Name it: **"Cashora"**
3. Click **Continue**
4. Disable Google Analytics (optional)
5. Click **"Create project"**
6. Wait 30 seconds
7. Click **"Continue"**

### If you HAVE a project:
1. Click on your existing project

---

## 🎯 Step 3: Add Web App

You'll see the Firebase project homepage.

1. Look for this icon: **`</>`** (Web icon)
2. Click it
3. App nickname: **"Cashora Web"**
4. **DON'T** check "Firebase Hosting"
5. Click **"Register app"**

---

## 🎯 Step 4: Copy Your Config

You'll see a screen with code like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdefghijklmnop",
  authDomain: "cashora-12345.firebaseapp.com",
  projectId: "cashora-12345",
  storageBucket: "cashora-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

**Copy these 6 values!**

---

## 🎯 Step 5: Update Your .env File

Open the `.env` file in your project and replace the values:

```env
VITE_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnop
VITE_FIREBASE_AUTH_DOMAIN=cashora-12345.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cashora-12345
VITE_FIREBASE_STORAGE_BUCKET=cashora-12345.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**Save the file!**

---

## 🎯 Step 6: Enable Google Sign-In

Back in Firebase Console:

1. Click **"Authentication"** in the left sidebar
2. Click **"Get started"** (if first time)
3. Click the **"Sign-in method"** tab at the top
4. You'll see a list of providers
5. Click on **"Google"**
6. Toggle the **"Enable"** switch
7. Select your email from the dropdown
8. Click **"Save"**

---

## 🎯 Step 7: Restart Your Dev Server

In your terminal:

1. Press **Ctrl+C** to stop the server
2. Run: **`npm run dev`**
3. Wait for it to start

---

## ✅ Step 8: Test It!

1. Open: **http://localhost:8080/login**
2. Click **"Continue with Google"**
3. Sign in with your Google account
4. You should be redirected to the homepage!

---

## 🐛 Common Errors & Fixes

### Error: "Firebase: Error (auth/invalid-api-key)"
- ❌ Your API key is wrong
- ✅ Copy the exact value from Firebase Console

### Error: "Firebase: Error (auth/configuration-not-found)"
- ❌ Your `.env` file isn't loaded
- ✅ Restart the dev server (Ctrl+C, then `npm run dev`)

### Error: "Firebase: Error (auth/unauthorized-domain)"
- ❌ localhost isn't authorized
- ✅ Go to Authentication > Settings > Authorized domains
- ✅ Make sure `localhost` is in the list

### Error: "Popup blocked"
- ❌ Your browser blocked the popup
- ✅ Allow popups for localhost in browser settings

---

## 📞 Still Having Issues?

Share the exact error message you're seeing and I'll help you fix it!

The error usually appears in:
- Browser console (F12 > Console tab)
- Toast notification on the page
- Terminal where dev server is running

---

## 🎉 Success Looks Like:

When it works, you'll see:
1. Google sign-in popup opens
2. You select your account
3. Popup closes
4. Toast says "Successfully signed in with Google!"
5. You're redirected to homepage
6. Your profile photo and name appear in the navbar

That's it! 🚀
