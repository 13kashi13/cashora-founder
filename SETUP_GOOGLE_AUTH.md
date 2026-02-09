# 🚀 Quick Setup: Google Authentication

Get Google login working in 5 minutes!

## Step 1: Create Firebase Project (2 min)

1. Go to https://console.firebase.google.com/
2. Click **"Add project"**
3. Name it "Cashora" (or anything you want)
4. Disable Google Analytics (optional)
5. Click **"Create project"**

## Step 2: Add Web App (1 min)

1. Click the **Web icon** `</>` on the Firebase project homepage
2. App nickname: "Cashora Web"
3. Click **"Register app"**
4. **Copy the config values** (you'll need these next)

## Step 3: Create .env File (1 min)

Create a file named `.env` in your project root and paste:

```env
VITE_FIREBASE_API_KEY=paste-your-apiKey-here
VITE_FIREBASE_AUTH_DOMAIN=paste-your-authDomain-here
VITE_FIREBASE_PROJECT_ID=paste-your-projectId-here
VITE_FIREBASE_STORAGE_BUCKET=paste-your-storageBucket-here
VITE_FIREBASE_MESSAGING_SENDER_ID=paste-your-messagingSenderId-here
VITE_FIREBASE_APP_ID=paste-your-appId-here
```

Replace the values with what you copied from Firebase.

## Step 4: Enable Google Sign-In (1 min)

1. In Firebase Console, click **"Authentication"** in the left menu
2. Click **"Get started"** (if first time)
3. Click **"Sign-in method"** tab
4. Click **"Google"**
5. Toggle **"Enable"**
6. Select your email as support email
7. Click **"Save"**

## Step 5: Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## ✅ Test It!

1. Open http://localhost:5173/login
2. Click **"Continue with Google"**
3. Sign in with your Google account
4. You should see your profile in the navbar!

## 🎉 Done!

Your Google authentication is now fully functional!

---

## 📚 Need More Help?

- **Detailed guide**: See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
- **Technical docs**: See [AUTHENTICATION.md](./AUTHENTICATION.md)
- **Troubleshooting**: Check the troubleshooting section in FIREBASE_SETUP.md

## 🔒 Security Note

Never commit your `.env` file! It's already in `.gitignore` to keep your credentials safe.
