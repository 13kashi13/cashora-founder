import { supabase } from './supabase';
import { User as FirebaseUser } from 'firebase/auth';

/**
 * Sync Firebase authentication with Supabase
 * This creates a custom JWT token for Supabase using Firebase user ID
 */
export async function syncFirebaseAuthWithSupabase(firebaseUser: FirebaseUser | null) {
  if (!firebaseUser) {
    // Sign out from Supabase if Firebase user is null
    await supabase.auth.signOut();
    return;
  }

  try {
    // Get Firebase ID token
    const idToken = await firebaseUser.getIdToken();
    
    console.log('Syncing Firebase auth with Supabase:', {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
    });

    // For now, we'll use a workaround: set the user ID in localStorage
    // and use it in Supabase queries
    localStorage.setItem('firebase_user_id', firebaseUser.uid);
    localStorage.setItem('firebase_user_email', firebaseUser.email || '');
    
  } catch (error) {
    console.error('Error syncing Firebase auth with Supabase:', error);
  }
}

/**
 * Get the current Firebase user ID for Supabase queries
 */
export function getFirebaseUserId(): string | null {
  return localStorage.getItem('firebase_user_id');
}

/**
 * Ensure user exists in Supabase users table
 */
export async function ensureSupabaseUserExists(firebaseUser: FirebaseUser) {
  try {
    const userId = firebaseUser.uid;
    
    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (fetchError && fetchError.code === 'PGRST116') {
      // User doesn't exist, create it
      console.log('Creating Supabase user record for Firebase user:', userId);
      
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: firebaseUser.email || '',
          full_name: firebaseUser.displayName || null,
          avatar_url: firebaseUser.photoURL || null,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Failed to create Supabase user:', insertError);
        throw insertError;
      }

      console.log('Supabase user created successfully:', newUser);
      return newUser;
    }

    return existingUser;
  } catch (error) {
    console.error('Error ensuring Supabase user exists:', error);
    throw error;
  }
}
