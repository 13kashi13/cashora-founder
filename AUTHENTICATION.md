# Authentication Features

Cashora now includes fully functional Google authentication powered by Firebase!

## ✨ Features

- **Google Sign-In**: One-click authentication with Google accounts
- **Email/Password**: Traditional email and password authentication
- **Persistent Sessions**: Stay logged in across page refreshes
- **User Profile Display**: Shows user name and photo in navbar when logged in
- **Secure Logout**: Clean sign-out functionality
- **Beautiful UI**: Glassy, premium design matching the Cashora aesthetic

## 🚀 Quick Start

### 1. Install Dependencies (Already Done)
```bash
npm install firebase
```

### 2. Set Up Firebase

Follow the detailed guide in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) to:
- Create a Firebase project
- Get your configuration values
- Enable Google authentication
- Set up environment variables

### 3. Configure Environment

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 4. Start the App

```bash
npm run dev
```

## 🎯 How It Works

### Login Page (`/login`)
- Google sign-in button (fully functional)
- GitHub sign-in button (UI ready, needs implementation)
- Email/password form (fully functional)
- Loading states and error handling
- Success notifications

### Signup Page (`/signup`)
- Same social login options
- Email/password registration
- Full name field
- Automatic redirect after signup

### Navbar
- Shows Login/Signup buttons when logged out
- Shows user profile (photo + name) when logged in
- Logout button with confirmation toast
- Smooth animations and glassy styling

## 🔧 Technical Details

### Files Created/Modified

**New Files:**
- `src/lib/firebase.ts` - Firebase configuration and initialization
- `src/contexts/AuthContext.tsx` - Authentication context and hooks
- `.env.example` - Template for environment variables
- `FIREBASE_SETUP.md` - Detailed setup instructions
- `AUTHENTICATION.md` - This file

**Modified Files:**
- `src/App.tsx` - Added AuthProvider wrapper
- `src/pages/Login.tsx` - Added functional authentication
- `src/pages/Signup.tsx` - Added functional authentication
- `src/components/Navbar.tsx` - Added user profile and logout
- `.gitignore` - Added .env files

### Authentication Flow

1. User clicks "Continue with Google"
2. Firebase opens Google sign-in popup
3. User selects Google account
4. Firebase returns user credentials
5. App stores user in context
6. User is redirected to home page
7. Navbar shows user profile

### State Management

The `AuthContext` provides:
- `user` - Current user object (null if not logged in)
- `loading` - Loading state during auth operations
- `signInWithGoogle()` - Google authentication
- `signInWithEmail()` - Email/password login
- `signUpWithEmail()` - Email/password registration
- `signOut()` - Logout function

### Using Auth in Components

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, signInWithGoogle, signOut } = useAuth();
  
  if (user) {
    return <div>Welcome, {user.displayName}!</div>;
  }
  
  return <button onClick={signInWithGoogle}>Sign In</button>;
}
```

## 🎨 UI Features

- **Loading States**: Buttons show "Signing in..." during authentication
- **Disabled States**: Forms are disabled during loading
- **Error Handling**: Toast notifications for errors
- **Success Messages**: Confirmation toasts on successful auth
- **Smooth Animations**: Framer Motion animations throughout
- **Glassy Design**: Consistent with Cashora's premium aesthetic

## 🔐 Security

- Environment variables keep Firebase config secure
- `.env` files are gitignored
- Firebase handles all authentication securely
- No passwords stored in your code
- Domain restrictions in Firebase Console

## 📱 Next Steps

To add more features:

1. **Protected Routes**: Redirect unauthenticated users
2. **User Profiles**: Store additional user data in Firestore
3. **GitHub Auth**: Implement GitHub provider (similar to Google)
4. **Password Reset**: Add forgot password functionality
5. **Email Verification**: Require email verification for new accounts
6. **Profile Editing**: Let users update their profile

## 🐛 Troubleshooting

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for common issues and solutions.

## 💡 Demo Mode

The app will run without Firebase configuration, but authentication won't work. You'll see demo values in the Firebase config. To enable authentication, follow the setup guide.
