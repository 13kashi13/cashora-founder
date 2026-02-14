import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hyzpywpnfvifftzhjvxo.supabase.co';
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log('Supabase Config (2026):', {
  url: supabaseUrl,
  hasKey: !!supabasePublishableKey,
  keyLength: supabasePublishableKey?.length,
  keyFormat: supabasePublishableKey?.startsWith('sb_publishable_') ? '✅ Publishable Key (2026)' : 
             supabasePublishableKey?.startsWith('eyJ') ? '⚠️ Legacy JWT (pre-2026)' : '❌ Unknown',
});

if (!supabasePublishableKey) {
  console.error('❌ Supabase Publishable key is missing!');
  console.error('Add VITE_SUPABASE_ANON_KEY=sb_publishable_... to .env');
  console.error('Get it from: Supabase Dashboard → Settings → API → Publishable key');
}

// 2026 Format: Supabase uses "Publishable keys" (sb_publishable_...)
// This replaced the old "anon keys" (JWT format starting with eyJ...)
export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database types (you can generate these from Supabase CLI later)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      videos: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          video_url: string | null;
          thumbnail_url: string | null;
          status: 'draft' | 'processing' | 'completed' | 'failed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          video_url?: string | null;
          thumbnail_url?: string | null;
          status?: 'draft' | 'processing' | 'completed' | 'failed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          video_url?: string | null;
          thumbnail_url?: string | null;
          status?: 'draft' | 'processing' | 'completed' | 'failed';
          created_at?: string;
          updated_at?: string;
        };
      };
      platform_connections: {
        Row: {
          id: string;
          user_id: string;
          platform: 'youtube' | 'instagram' | 'tiktok' | 'linkedin' | 'twitter' | 'facebook';
          platform_user_id: string;
          platform_username: string;
          access_token: string;
          refresh_token: string | null;
          token_expires_at: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          platform: 'youtube' | 'instagram' | 'tiktok' | 'linkedin' | 'twitter' | 'facebook';
          platform_user_id: string;
          platform_username: string;
          access_token: string;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          platform?: 'youtube' | 'instagram' | 'tiktok' | 'linkedin' | 'twitter' | 'facebook';
          platform_user_id?: string;
          platform_username?: string;
          access_token?: string;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          video_id: string;
          platform: string;
          platform_post_id: string | null;
          status: 'scheduled' | 'posting' | 'posted' | 'failed';
          scheduled_at: string | null;
          posted_at: string | null;
          caption: string | null;
          error_message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          video_id: string;
          platform: string;
          platform_post_id?: string | null;
          status?: 'scheduled' | 'posting' | 'posted' | 'failed';
          scheduled_at?: string | null;
          posted_at?: string | null;
          caption?: string | null;
          error_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          video_id?: string;
          platform?: string;
          platform_post_id?: string | null;
          status?: 'scheduled' | 'posting' | 'posted' | 'failed';
          scheduled_at?: string | null;
          posted_at?: string | null;
          caption?: string | null;
          error_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
