# Supabase Quick Start 🚀

## ✅ What's Been Set Up

1. ✅ Supabase client installed (`@supabase/supabase-js`)
2. ✅ Supabase configuration file (`src/lib/supabase.ts`)
3. ✅ Supabase Auth Context (`src/contexts/SupabaseAuthContext.tsx`)
4. ✅ Data fetching hooks (`src/hooks/useSupabaseQuery.ts`)
5. ✅ Database schema with TypeScript types
6. ✅ Environment variables template

## 🎯 Next Steps

### 1. Create Supabase Project (5 minutes)

1. Go to https://app.supabase.com/
2. Click "New Project"
3. Fill in project details
4. Wait for project to be created

### 2. Add Environment Variables

Copy your Supabase credentials to `.env`:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Set Up Database Schema

1. Go to Supabase Dashboard → SQL Editor
2. Copy the SQL from `SUPABASE_SETUP.md`
3. Run the SQL to create tables

### 4. Update Your App to Use Supabase

#### Option A: Replace Firebase with Supabase

In `src/main.tsx`:

```tsx
import { SupabaseAuthProvider } from './contexts/SupabaseAuthContext';

// Replace AuthProvider with SupabaseAuthProvider
<SupabaseAuthProvider>
  <App />
</SupabaseAuthProvider>
```

#### Option B: Use Both (Recommended for Migration)

Keep Firebase for now, add Supabase gradually:

```tsx
import { AuthProvider } from './contexts/AuthContext';
import { SupabaseAuthProvider } from './contexts/SupabaseAuthContext';

<AuthProvider>
  <SupabaseAuthProvider>
    <App />
  </SupabaseAuthProvider>
</AuthProvider>
```

## 📖 Usage Examples

### Authentication

```tsx
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

function LoginPage() {
  const { signIn, signInWithGoogle } = useSupabaseAuth();

  const handleLogin = async (email: string, password: string) => {
    const { user, error } = await signIn(email, password);
    if (error) {
      console.error('Login failed:', error.message);
    } else {
      console.log('Logged in:', user);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await signInWithGoogle();
    if (error) console.error('Google login failed:', error.message);
  };

  return (
    <div>
      <button onClick={() => handleLogin('user@example.com', 'password')}>
        Login
      </button>
      <button onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </div>
  );
}
```

### Fetching Data

```tsx
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery';

function VideosList() {
  const { data: videos, loading, error } = useSupabaseQuery({
    table: 'videos',
    orderBy: { column: 'created_at', ascending: false },
    limit: 10,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {videos?.map((video) => (
        <div key={video.id}>{video.title}</div>
      ))}
    </div>
  );
}
```

### Creating Data

```tsx
import { useSupabaseMutation } from '@/hooks/useSupabaseQuery';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

function CreateVideo() {
  const { user } = useSupabaseAuth();
  const { insert, loading } = useSupabaseMutation();

  const handleCreate = async () => {
    const { data, error } = await insert('videos', {
      user_id: user?.id,
      title: 'My New Video',
      description: 'Video description',
      status: 'draft',
    });

    if (error) {
      console.error('Failed to create video:', error.message);
    } else {
      console.log('Video created:', data);
    }
  };

  return (
    <button onClick={handleCreate} disabled={loading}>
      {loading ? 'Creating...' : 'Create Video'}
    </button>
  );
}
```

### Updating Data

```tsx
const { update, loading } = useSupabaseMutation();

const handleUpdate = async (videoId: string) => {
  const { data, error } = await update('videos', videoId, {
    title: 'Updated Title',
    status: 'completed',
  });

  if (!error) {
    console.log('Video updated:', data);
  }
};
```

### Deleting Data

```tsx
const { remove, loading } = useSupabaseMutation();

const handleDelete = async (videoId: string) => {
  const { error } = await remove('videos', videoId);

  if (!error) {
    console.log('Video deleted');
  }
};
```

## 🔐 Row Level Security (RLS)

Supabase uses RLS to secure your data. The schema includes policies that:

- ✅ Users can only see their own data
- ✅ Users can only modify their own data
- ✅ Automatic user profile creation on signup
- ✅ Cascade deletes (deleting user deletes all their data)

## 📦 Storage (File Uploads)

### Upload a file

```tsx
import { supabase } from '@/lib/supabase';

const uploadVideo = async (file: File, userId: string) => {
  const fileName = `${userId}/${Date.now()}-${file.name}`;
  
  const { data, error } = await supabase.storage
    .from('videos')
    .upload(fileName, file);

  if (error) {
    console.error('Upload failed:', error.message);
    return null;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('videos')
    .getPublicUrl(fileName);

  return publicUrl;
};
```

## 🔄 Real-time Subscriptions

```tsx
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

function VideosList() {
  useEffect(() => {
    // Subscribe to new videos
    const subscription = supabase
      .channel('videos')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'videos' },
        (payload) => {
          console.log('New video:', payload.new);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <div>Videos List</div>;
}
```

## 🎨 Integration with Existing Pages

### Update Dashboard to use Supabase

```tsx
// src/pages/Dashboard.tsx
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery';

function Dashboard() {
  const { user } = useSupabaseAuth();
  
  const { data: videos } = useSupabaseQuery({
    table: 'videos',
    filter: { user_id: user?.id },
  });

  const { data: posts } = useSupabaseQuery({
    table: 'posts',
    filter: { user_id: user?.id },
  });

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <p>Total Videos: {videos?.length || 0}</p>
      <p>Total Posts: {posts?.length || 0}</p>
    </div>
  );
}
```

## 🆘 Troubleshooting

### "Missing Supabase environment variables"
- Check `.env` file exists
- Verify variable names start with `VITE_`
- Restart dev server after adding variables

### "Row Level Security policy violation"
- Check if user is authenticated
- Verify RLS policies are set up correctly
- Check if user_id matches authenticated user

### "Failed to fetch"
- Verify Supabase URL is correct
- Check if project is active in Supabase dashboard
- Verify network connection

## 📚 Resources

- [Full Setup Guide](./SUPABASE_SETUP.md)
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
