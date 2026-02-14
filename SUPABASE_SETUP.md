# Supabase Setup Guide

## 🚀 Quick Setup

### 1. Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Click "New Project"
3. Fill in:
   - **Name**: cashora (or your preferred name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project" (takes ~2 minutes)

### 2. Get API Credentials

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. Copy these values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

### 3. Update Environment Variables

Add to your `.env` file:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 📊 Database Schema Setup

### Run these SQL commands in Supabase SQL Editor

Go to **SQL Editor** in Supabase Dashboard and run:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Videos table
CREATE TABLE public.videos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  status TEXT CHECK (status IN ('draft', 'processing', 'completed', 'failed')) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own videos"
  ON public.videos FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own videos"
  ON public.videos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own videos"
  ON public.videos FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own videos"
  ON public.videos FOR DELETE
  USING (auth.uid() = user_id);

-- Platform connections table
CREATE TABLE public.platform_connections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT CHECK (platform IN ('youtube', 'instagram', 'tiktok', 'linkedin', 'twitter', 'facebook')) NOT NULL,
  platform_user_id TEXT NOT NULL,
  platform_username TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, platform)
);

ALTER TABLE public.platform_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own connections"
  ON public.platform_connections FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own connections"
  ON public.platform_connections FOR ALL
  USING (auth.uid() = user_id);

-- Posts table
CREATE TABLE public.posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  video_id UUID REFERENCES public.videos(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL,
  platform_post_id TEXT,
  status TEXT CHECK (status IN ('scheduled', 'posting', 'posted', 'failed')) DEFAULT 'scheduled',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  posted_at TIMESTAMP WITH TIME ZONE,
  caption TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own posts"
  ON public.posts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own posts"
  ON public.posts FOR ALL
  USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON public.videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_platform_connections_updated_at BEFORE UPDATE ON public.platform_connections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 🔐 Authentication Setup

### Enable Email Authentication

1. Go to **Authentication** > **Providers**
2. **Email** should be enabled by default
3. Configure email templates if needed

### Enable OAuth Providers (Optional)

#### Google OAuth
1. Go to **Authentication** > **Providers**
2. Enable **Google**
3. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
4. Add authorized redirect URL: `https://your-project-id.supabase.co/auth/v1/callback`

#### GitHub OAuth
1. Enable **GitHub** provider
2. Add GitHub OAuth App credentials
3. Configure callback URL

## 📦 Storage Setup (for video uploads)

### Create Storage Buckets

1. Go to **Storage** in Supabase Dashboard
2. Click **New bucket**
3. Create these buckets:
   - **videos** (for video files)
   - **thumbnails** (for video thumbnails)
   - **avatars** (for user profile pictures)

### Set Bucket Policies

For each bucket, add these policies:

```sql
-- Allow authenticated users to upload
CREATE POLICY "Users can upload own files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'videos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to read their own files
CREATE POLICY "Users can view own files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'videos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow public read for thumbnails
CREATE POLICY "Public can view thumbnails"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'thumbnails');
```

## 🧪 Test Connection

Run this in your browser console after starting the app:

```javascript
import { supabase } from './src/lib/supabase';

// Test connection
const { data, error } = await supabase.from('users').select('*').limit(1);
console.log('Supabase connection:', error ? 'Failed' : 'Success');
```

## 📚 Next Steps

1. ✅ Install Supabase client: `npm install @supabase/supabase-js`
2. ✅ Create Supabase project
3. ✅ Add environment variables
4. ✅ Run database schema SQL
5. ✅ Set up storage buckets
6. ✅ Configure authentication providers
7. 🔄 Update AuthContext to use Supabase
8. 🔄 Implement data fetching hooks
9. 🔄 Add file upload functionality

## 🔗 Useful Links

- [Supabase Dashboard](https://app.supabase.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## 🆘 Troubleshooting

### Connection Issues
- Verify environment variables are correct
- Check if Supabase project is active
- Ensure anon key is the public key, not service role key

### Authentication Issues
- Check email confirmation settings
- Verify redirect URLs are configured
- Check browser console for errors

### Database Issues
- Verify RLS policies are set correctly
- Check if tables exist in SQL Editor
- Ensure user has proper permissions
