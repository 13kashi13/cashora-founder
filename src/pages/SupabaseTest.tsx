import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const SupabaseTest = () => {
  const { user, signUpWithEmail, signInWithEmail, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    setMessage('');
    try {
      await signUpWithEmail(email, password);
      setMessage(`Success! Check your email to confirm.`);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  const handleSignIn = async () => {
    setLoading(true);
    setMessage('');
    try {
      await signInWithEmail(email, password);
      setMessage(`Logged in! User: ${email}`);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setMessage('Signed out successfully');
  };

  const testConnection = async () => {
    setLoading(true);
    setMessage('Testing connection...');
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .limit(1);
      
      if (error) {
        setMessage(`Connection Error: ${error.message}`);
      } else {
        setMessage(`✅ Connection successful! Found ${data?.length || 0} users`);
      }
    } catch (err) {
      setMessage(`❌ Connection failed: ${err}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Supabase Test Page</h1>

        {/* Connection Test */}
        <div className="glass-card p-6 rounded-xl mb-6">
          <h2 className="text-2xl font-bold mb-4 text-white">1. Test Connection</h2>
          <button
            onClick={testConnection}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-[#7CFFB2] to-[#5CE1E6] text-black font-bold rounded-lg"
          >
            {loading ? 'Testing...' : 'Test Connection'}
          </button>
        </div>

        {/* User Status */}
        <div className="glass-card p-6 rounded-xl mb-6">
          <h2 className="text-2xl font-bold mb-4 text-white">2. Current User</h2>
          {user ? (
            <div className="space-y-2">
              <p className="text-green-400">✅ Logged in as: {user.email}</p>
              <p className="text-gray-400">User ID: {user.id}</p>
              <button
                onClick={handleSignOut}
                className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg mt-4"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <p className="text-gray-400">❌ Not logged in</p>
          )}
        </div>

        {/* Auth Test */}
        {!user && (
          <div className="glass-card p-6 rounded-xl mb-6">
            <h2 className="text-2xl font-bold mb-4 text-white">3. Test Authentication</h2>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white"
              />
              <div className="flex gap-4">
                <button
                  onClick={handleSignUp}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#7CFFB2] to-[#5CE1E6] text-black font-bold rounded-lg"
                >
                  {loading ? 'Loading...' : 'Sign Up'}
                </button>
                <button
                  onClick={handleSignIn}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-lg"
                >
                  {loading ? 'Loading...' : 'Sign In'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">Result:</h2>
            <p className="text-white whitespace-pre-wrap">{message}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="glass-card p-6 rounded-xl mt-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Instructions:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Click "Test Connection" to verify Supabase is connected</li>
            <li>Enter an email and password</li>
            <li>Click "Sign Up" to create a new account</li>
            <li>Check your email for confirmation link</li>
            <li>After confirming, use "Sign In" to log in</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SupabaseTest;
