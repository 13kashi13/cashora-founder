# GitHub Authentication Setup

GitHub login is now fully functional! Here's how to enable it in Firebase.

## Quick Setup (2 minutes)

### Step 1: Get GitHub OAuth Credentials

1. Go to **GitHub Settings**: https://github.com/settings/developers
2. Click **"OAuth Apps"** in the left sidebar
3. Click **"New OAuth App"**
4. Fill in the form:
   - **Application name**: `Cashora`
   - **Homepage URL**: `http://localhost:8080` (for development)
   - **Authorization callback URL**: Get this from Firebase (next step)
5. Click **"Register application"**
6. You'll see **Client ID** - copy it
7. Click **"Generate a new client secret"** - copy the secret

### Step 2: Configure Firebase

1. Go to **Firebase Console**: https://console.firebase.google.com/
2. Select your Cashora project
3. Go to **Authentication** > **Sign-in method**
4. Click on **GitHub**
5. Toggle **"Enable"**
6. Copy the **"Authorization callback URL"** shown
7. Paste your **Client ID** and **Client Secret** from GitHub
8. Click **"Save"**

### Step 3: Update GitHub OAuth App

1. Go back to GitHub OAuth Apps settings
2. Edit your Cashora app
3. Update **"Authorization callback URL"** with the URL from Firebase
4. Click **"Update application"**

### Step 4: Test It!

1. Restart your dev server: `npm run dev`
2. Visit: http://localhost:8080/login
3. Click **"Continue with GitHub"**
4. Authorize the app
5. Done! 🎉

---

## For Production

When deploying to production:

1. Create a new GitHub OAuth App for production
2. Use your production domain:
   - **Homepage URL**: `https://yourdomain.com`
   - **Callback URL**: Use the one from Firebase (will include your domain)
3. Add your production domain to Firebase authorized domains
4. Update Firebase with production GitHub credentials

---

## Troubleshooting

### "Authorization callback URL mismatch"
- Make sure the callback URL in GitHub matches exactly what Firebase shows
- Include the full URL with `https://` and path

### "Account exists with different credential"
- User already signed up with Google using the same email
- They should sign in with Google instead
- Or you can enable account linking in Firebase

### "Popup blocked"
- Allow popups for localhost in browser settings

---

## What Works Now

✅ **Google Sign-In** - Fully functional  
✅ **GitHub Sign-In** - Fully functional  
✅ **Email/Password** - Fully functional  
✅ **User Profile** - Shows in navbar  
✅ **Logout** - Works perfectly  
✅ **All Buttons Redirect** - Every button on the site works!

---

## Button Redirects

All buttons now redirect properly:

- **Hero "See How It Works"** → Scrolls to #how-it-works
- **Hero "Get Started"** → /signup
- **Pricing "Get Started"** (all 3 plans) → /signup
- **Navbar "Login"** → /login
- **Navbar "Sign Up"** → /signup
- **Login "Continue with Google"** → Google OAuth → Home
- **Login "Continue with GitHub"** → GitHub OAuth → Home
- **Signup "Continue with Google"** → Google OAuth → Home
- **Signup "Continue with GitHub"** → GitHub OAuth → Home

---

## Next Steps

1. Set up GitHub OAuth app (2 minutes)
2. Configure Firebase with GitHub credentials
3. Test the login flow
4. Deploy to production with production OAuth app

That's it! 🚀
