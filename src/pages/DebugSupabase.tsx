import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const DebugSupabase = () => {
  const [status, setStatus] = useState<{
    envVars: {
      url?: string;
      hasKey: boolean;
      keyLength: number;
      keyPrefix: string;
    };
    connection: {
      status: string;
      error: string | null;
      data?: any;
    };
    auth: {
      status: string;
      error: string | null;
      hasSession?: boolean;
      user?: string | null;
    };
  }>({
    envVars: {
      hasKey: false,
      keyLength: 0,
      keyPrefix: '',
    },
    connection: {
      status: 'unknown',
      error: null,
    },
    auth: {
      status: 'unknown',
      error: null,
    },
  });

  useEffect(() => {
    const checkEverything = async () => {
      // Check environment variables
      const envVars = {
        url: import.meta.env.VITE_SUPABASE_URL,
        hasKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
        keyLength: import.meta.env.VITE_SUPABASE_ANON_KEY?.length || 0,
        keyPrefix: import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + '...',
        keyFormat: import.meta.env.VITE_SUPABASE_ANON_KEY?.startsWith('sb_publishable_') 
          ? '2026 Publishable Key' 
          : import.meta.env.VITE_SUPABASE_ANON_KEY?.startsWith('eyJ')
          ? 'Legacy JWT (pre-2026)'
          : 'Unknown',
      };

      // Check connection
      let connection: {
        status: string;
        error: string | null;
        data?: any;
      } = { status: 'unknown', error: null };
      try {
        const { data, error } = await supabase.from('users').select('count');
        connection = {
          status: error ? 'error' : 'success',
          error: error?.message || null,
          data: data,
        };
      } catch (err: any) {
        connection = {
          status: 'error',
          error: err.message,
          data: null,
        };
      }

      // Check auth
      let auth: {
        status: string;
        error: string | null;
        hasSession?: boolean;
        user?: string | null;
      } = { status: 'unknown', error: null };
      try {
        const { data, error } = await supabase.auth.getSession();
        auth = {
          status: error ? 'error' : 'success',
          error: error?.message || null,
          hasSession: !!data.session,
          user: data.session?.user?.email || null,
        };
      } catch (err: any) {
        auth = {
          status: 'error',
          error: err.message,
          hasSession: false,
        };
      }

      setStatus({ envVars, connection, auth });
    };

    checkEverything();
  }, []);

  return (
    <div className="min-h-screen bg-[#050a0a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 Supabase Debug Panel</h1>

        {/* Environment Variables */}
        <div className="mb-6 bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            1. Environment Variables (2026 Format)
          </h2>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">VITE_SUPABASE_URL:</span>
              <span className={status.envVars.url ? 'text-green-400' : 'text-red-400'}>
                {status.envVars.url || '❌ Missing'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">VITE_SUPABASE_ANON_KEY:</span>
              <span className={status.envVars.hasKey ? 'text-green-400' : 'text-red-400'}>
                {status.envVars.hasKey ? '✅ Present' : '❌ Missing'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Key Format:</span>
              <span className={
                status.envVars.keyFormat === '2026 Publishable Key' ? 'text-green-400' : 
                status.envVars.keyFormat === 'Legacy JWT (pre-2026)' ? 'text-yellow-400' : 
                'text-red-400'
              }>
                {status.envVars.keyFormat || 'Unknown'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Key Length:</span>
              <span className={status.envVars.keyLength > 30 ? 'text-green-400' : 'text-yellow-400'}>
                {status.envVars.keyLength} chars
                {status.envVars.keyLength < 30 && ' (⚠️ Seems too short)'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Key Preview:</span>
              <span className="text-gray-300">{status.envVars.keyPrefix}</span>
            </div>
          </div>
          {status.envVars.keyFormat === 'Legacy JWT (pre-2026)' && (
            <div className="mt-3 p-3 bg-yellow-950/30 border border-yellow-500/30 rounded">
              <p className="text-yellow-400 text-xs">
                ⚠️ You're using an old JWT format key. In 2026, Supabase uses Publishable keys (sb_publishable_...).
                Your key may still work, but consider updating to the new format.
              </p>
            </div>
          )}
        </div>

        {/* Database Connection */}
        <div className="mb-6 bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            2. Database Connection
          </h2>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span
                className={
                  status.connection.status === 'success'
                    ? 'text-green-400'
                    : status.connection.status === 'error'
                    ? 'text-red-400'
                    : 'text-yellow-400'
                }
              >
                {status.connection.status === 'success' && '✅ Connected'}
                {status.connection.status === 'error' && '❌ Failed'}
                {status.connection.status === 'unknown' && '⏳ Checking...'}
              </span>
            </div>
            {status.connection.error && (
              <div className="mt-2 p-3 bg-red-950/30 border border-red-500/30 rounded">
                <p className="text-red-400 text-xs">{status.connection.error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Auth Status */}
        <div className="mb-6 bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            3. Authentication
          </h2>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span
                className={
                  status.auth.status === 'success'
                    ? 'text-green-400'
                    : status.auth.status === 'error'
                    ? 'text-red-400'
                    : 'text-yellow-400'
                }
              >
                {status.auth.status === 'success' && '✅ Working'}
                {status.auth.status === 'error' && '❌ Failed'}
                {status.auth.status === 'unknown' && '⏳ Checking...'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Session:</span>
              <span className={status.auth.hasSession ? 'text-green-400' : 'text-gray-500'}>
                {status.auth.hasSession ? '✅ Logged in' : 'Not logged in'}
              </span>
            </div>
            {status.auth.user && (
              <div className="flex justify-between">
                <span className="text-gray-400">User:</span>
                <span className="text-gray-300">{status.auth.user}</span>
              </div>
            )}
            {status.auth.error && (
              <div className="mt-2 p-3 bg-red-950/30 border border-red-500/30 rounded">
                <p className="text-red-400 text-xs">{status.auth.error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Next Steps</h2>
          <div className="space-y-3 text-sm">
            {!status.envVars.hasKey && (
              <div className="p-3 bg-red-950/30 border border-red-500/30 rounded">
                <p className="text-red-400 font-semibold mb-2">❌ Missing Publishable Key</p>
                <p className="text-gray-300 text-xs">
                  1. Go to Supabase Dashboard → Settings → API
                  <br />
                  2. Copy the "Publishable key" (starts with sb_publishable_)
                  <br />
                  3. Add to .env: VITE_SUPABASE_ANON_KEY=sb_publishable_...
                  <br />
                  4. Restart dev server: npm run dev
                  <br />
                  <br />
                  Note: In 2026, Supabase uses "Publishable keys" not "anon keys"
                </p>
              </div>
            )}
            {status.envVars.keyLength < 30 && status.envVars.hasKey && (
              <div className="p-3 bg-yellow-950/30 border border-yellow-500/30 rounded">
                <p className="text-yellow-400 font-semibold mb-2">⚠️ Key Looks Incomplete</p>
                <p className="text-gray-300 text-xs">
                  Your Publishable key seems too short. Make sure you copied the COMPLETE key from
                  Supabase Dashboard → Settings → API.
                </p>
              </div>
            )}
            {status.connection.status === 'error' && (
              <div className="p-3 bg-red-950/30 border border-red-500/30 rounded">
                <p className="text-red-400 font-semibold mb-2">❌ Database Connection Failed</p>
                <p className="text-gray-300 text-xs">
                  Check if:
                  <br />
                  1. Your Supabase URL is correct
                  <br />
                  2. Your Publishable key (sb_publishable_...) is complete and valid
                  <br />
                  3. The users table exists (run SQL scripts)
                </p>
              </div>
            )}
            {status.connection.status === 'success' && status.auth.status === 'success' && (
              <div className="p-3 bg-green-950/30 border border-green-500/30 rounded">
                <p className="text-green-400 font-semibold mb-2">✅ Everything Looks Good!</p>
                <p className="text-gray-300">
                  Supabase is properly configured. You can now:
                  <br />
                  1. Run SQL scripts to set up database schema
                  <br />
                  2. Configure OAuth providers (Google, GitHub)
                  <br />
                  3. Test the login flow
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <a
            href="/"
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded transition-colors"
          >
            ← Back to Home
          </a>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
          >
            🔄 Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebugSupabase;
