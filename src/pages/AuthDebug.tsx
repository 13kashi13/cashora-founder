import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';

const AuthDebug = () => {
  const { user, session, loading } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        // Check user
        const { data: userData, error: userError } = await supabase.auth.getUser();

        // Get URL info
        const urlHash = window.location.hash;
        const urlSearch = window.location.search;
        const hasAccessToken = urlHash.includes('access_token');
        const hasCode = urlSearch.includes('code=');

        setDebugInfo({
          contextUser: user ? 'Exists' : 'Null',
          contextSession: session ? 'Exists' : 'Null',
          contextLoading: loading,
          sessionData: sessionData.session ? 'Exists' : 'Null',
          sessionError: sessionError?.message || 'None',
          userData: userData.user ? 'Exists' : 'Null',
          userError: userError?.message || 'None',
          urlHash: urlHash || 'Empty',
          urlSearch: urlSearch || 'Empty',
          hasAccessToken,
          hasCode,
          supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
          hasSupabaseKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
          keyLength: import.meta.env.VITE_SUPABASE_ANON_KEY?.length || 0,
          keyPrefix: import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) || 'Missing',
        });
      } catch (err: any) {
        setDebugInfo({
          error: err.message,
          stack: err.stack,
        });
      }
    };

    checkAuth();
  }, [user, session, loading]);

  return (
    <div className="min-h-screen bg-[#050a0a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#7CFFB2]">Auth Debug</h1>
          <Link to="/" className="text-[#7CFFB2] hover:underline">
            Back to Home
          </Link>
        </div>

        <div className="space-y-6">
          {/* Context State */}
          <div className="bg-white/5 rounded-lg p-6 border border-[#7CFFB2]/20">
            <h2 className="text-xl font-bold mb-4 text-[#7CFFB2]">Auth Context State</h2>
            <div className="space-y-2 font-mono text-sm">
              <div>User: <span className="text-[#5CE1E6]">{debugInfo.contextUser}</span></div>
              <div>Session: <span className="text-[#5CE1E6]">{debugInfo.contextSession}</span></div>
              <div>Loading: <span className="text-[#5CE1E6]">{String(debugInfo.contextLoading)}</span></div>
            </div>
          </div>

          {/* Direct Supabase Calls */}
          <div className="bg-white/5 rounded-lg p-6 border border-[#7CFFB2]/20">
            <h2 className="text-xl font-bold mb-4 text-[#7CFFB2]">Direct Supabase Calls</h2>
            <div className="space-y-2 font-mono text-sm">
              <div>Session Data: <span className="text-[#5CE1E6]">{debugInfo.sessionData}</span></div>
              <div>Session Error: <span className="text-red-400">{debugInfo.sessionError}</span></div>
              <div>User Data: <span className="text-[#5CE1E6]">{debugInfo.userData}</span></div>
              <div>User Error: <span className="text-red-400">{debugInfo.userError}</span></div>
            </div>
          </div>

          {/* URL Info */}
          <div className="bg-white/5 rounded-lg p-6 border border-[#7CFFB2]/20">
            <h2 className="text-xl font-bold mb-4 text-[#7CFFB2]">URL Information</h2>
            <div className="space-y-2 font-mono text-sm">
              <div>Hash: <span className="text-[#5CE1E6] break-all">{debugInfo.urlHash}</span></div>
              <div>Search: <span className="text-[#5CE1E6] break-all">{debugInfo.urlSearch}</span></div>
              <div>Has Access Token: <span className="text-[#5CE1E6]">{String(debugInfo.hasAccessToken)}</span></div>
              <div>Has Code: <span className="text-[#5CE1E6]">{String(debugInfo.hasCode)}</span></div>
            </div>
          </div>

          {/* Config */}
          <div className="bg-white/5 rounded-lg p-6 border border-[#7CFFB2]/20">
            <h2 className="text-xl font-bold mb-4 text-[#7CFFB2]">Supabase Configuration</h2>
            <div className="space-y-2 font-mono text-sm">
              <div>URL: <span className="text-[#5CE1E6]">{debugInfo.supabaseUrl}</span></div>
              <div>Has Key: <span className="text-[#5CE1E6]">{String(debugInfo.hasSupabaseKey)}</span></div>
              <div>Key Length: <span className="text-[#5CE1E6]">{debugInfo.keyLength}</span></div>
              <div>Key Prefix: <span className="text-[#5CE1E6]">{debugInfo.keyPrefix}</span></div>
            </div>
          </div>

          {/* User Details */}
          {user && (
            <div className="bg-white/5 rounded-lg p-6 border border-[#7CFFB2]/20">
              <h2 className="text-xl font-bold mb-4 text-[#7CFFB2]">User Details</h2>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          )}

          {/* Session Details */}
          {session && (
            <div className="bg-white/5 rounded-lg p-6 border border-[#7CFFB2]/20">
              <h2 className="text-xl font-bold mb-4 text-[#7CFFB2]">Session Details</h2>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          )}

          {/* Actions */}
          <div className="bg-white/5 rounded-lg p-6 border border-[#7CFFB2]/20">
            <h2 className="text-xl font-bold mb-4 text-[#7CFFB2]">Actions</h2>
            <div className="space-x-4">
              <Link to="/login">
                <button className="px-4 py-2 bg-[#7CFFB2] text-black rounded-lg hover:bg-[#5CE1E6]">
                  Go to Login
                </button>
              </Link>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
              >
                Reload Page
              </button>
              <button 
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location.reload();
                }}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
              >
                Clear Storage & Reload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthDebug;
