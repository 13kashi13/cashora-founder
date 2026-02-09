# Firebase Authentication Setup Guide

This guide will help you set up Google authentication for Cashora.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard (you can disable Google Analytics if you want)

## Step 2: Register Your Web App

1. In your Firebase project, click the **Web icon** (`</>`) to add a web app
2. Give your app a nickname (e.g., "Cashora Web")
3. Click "Register app"
4. Copy the configuration values shown

## Step 3: Configure Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Fill in the Firebase configuration values:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Step 4: Enable Google Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Click on **Google** provider
3. Toggle "Enable"
4. Select a support email
5. Click "Save"

## Step 5: Add Authorized Domains

1. In **Authentication** > **Settings** > **Authorized domains**
2. Add your domains:
   - `localhost` (already added by default)
   - Your production domain (e.g., `cashora.com`)

## Step 6: Test the Authentication

1. Restart your dev server: `npm run dev`
2. Navigate to `/login` or `/signup`
3. Click "Continue with Google"
4. Sign in with your Google account
5. You should be redirected to the home page with your profile shown in the navbar

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure your `.env` file exists and has the correct values
- Restart your dev server after creating/updating `.env`

### "Firebase: Error (auth/unauthorized-domain)"
- Add your domain to authorized domains in Firebase Console
- For local development, `localhost` should already be authorized

### "Firebase: Error (auth/popup-blocked)"
- Allow popups for your site in browser settings
- Or use redirect method instead of popup (requires code change)

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- For production, set environment variables in your hosting platform
- Firebase API keys are safe to expose in client-side code (they're restricted by domain)

## Next Steps

Once authentication is working:
- Customize the user profile display in `Navbar.tsx`
- Add protected routes that require authentication
- Store user data in Firestore
- Add email/password authentication
- Add GitHub authentication (similar to Google setup)
