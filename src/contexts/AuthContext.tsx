import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '@/lib/firebase';
import { syncFirebaseAuthWithSupabase, ensureSupabaseUserExists } from '@/lib/supabaseAuth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if Firebase is configured
    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setUser(user);
        
        // Sync with Supabase
        await syncFirebaseAuthWithSupabase(user);
        
        // Ensure user exists in Supabase
        if (user) {
          try {
            await ensureSupabaseUserExists(user);
          } catch (error) {
            console.error('Failed to ensure Supabase user exists:', error);
          }
        }
        
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.warn('Firebase not configured:', error);
      setLoading(false);
      return () => {};
    }
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      
      // Provide helpful error messages
      if (error.code === 'auth/popup-blocked') {
        throw new Error('Popup was blocked. Please allow popups for this site.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in cancelled. Please try again.');
      } else if (error.code === 'auth/unauthorized-domain') {
        throw new Error('This domain is not authorized. Add localhost to Firebase authorized domains.');
      } else if (error.code === 'auth/invalid-api-key') {
        throw new Error('Invalid Firebase API key. Check your .env file.');
      } else if (error.code === 'auth/configuration-not-found') {
        throw new Error('Firebase not configured. Create a .env file with your Firebase credentials.');
      }
      
      throw error;
    }
  };

  const signInWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (error: any) {
      console.error('Error signing in with GitHub:', error);
      
      // Provide helpful error messages
      if (error.code === 'auth/popup-blocked') {
        throw new Error('Popup was blocked. Please allow popups for this site.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in cancelled. Please try again.');
      } else if (error.code === 'auth/unauthorized-domain') {
        throw new Error('This domain is not authorized. Add localhost to Firebase authorized domains.');
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        throw new Error('An account already exists with the same email. Try signing in with Google instead.');
      } else if (error.code === 'auth/operation-not-allowed') {
        throw new Error('GitHub sign-in is not enabled. Please check GITHUB_AUTH_QUICK_SETUP.md for setup instructions.');
      } else if (error.code === 'auth/invalid-credential') {
        throw new Error('GitHub authentication not configured. Please check GITHUB_AUTH_QUICK_SETUP.md for setup instructions.');
      }
      
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in with email:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing up with email:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithGithub,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
