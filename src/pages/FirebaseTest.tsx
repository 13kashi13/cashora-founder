import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { auth } from "@/lib/firebase";

const FirebaseTest = () => {
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  const checks = [
    {
      name: "API Key",
      value: config.apiKey,
      valid: config.apiKey && config.apiKey !== "demo-api-key" && config.apiKey.startsWith("AIza"),
    },
    {
      name: "Auth Domain",
      value: config.authDomain,
      valid: config.authDomain && config.authDomain.includes("firebaseapp.com"),
    },
    {
      name: "Project ID",
      value: config.projectId,
      valid: config.projectId && config.projectId !== "demo-project",
    },
    {
      name: "Storage Bucket",
      value: config.storageBucket,
      valid: config.storageBucket && config.storageBucket.includes("appspot.com"),
    },
    {
      name: "Messaging Sender ID",
      value: config.messagingSenderId,
      valid: config.messagingSenderId && config.messagingSenderId !== "123456789",
    },
    {
      name: "App ID",
      value: config.appId,
      valid: config.appId && config.appId.includes(":web:"),
    },
  ];

  const allValid = checks.every((check) => check.valid);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        className="w-full max-w-2xl backdrop-blur-2xl rounded-3xl p-8"
        style={{
          background: 'rgba(5, 10, 10, 0.6)',
          border: '1px solid rgba(124, 255, 178, 0.3)',
          boxShadow: '0 0 60px rgba(124, 255, 178, 0.15)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{
          background: 'linear-gradient(90deg, #7CFFB2 0%, #5CE1E6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Firebase Configuration Test
        </h1>
        <p className="text-sm mb-8" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Check if your Firebase credentials are configured correctly
        </p>

        <div className="space-y-4 mb-8">
          {checks.map((check) => (
            <div
              key={check.name}
              className="flex items-start gap-3 p-4 rounded-xl backdrop-blur-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${check.valid ? 'rgba(124, 255, 178, 0.3)' : 'rgba(255, 100, 100, 0.3)'}`,
              }}
            >
              {check.valid ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#7CFFB2' }} />
              ) : (
                <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#ff6464' }} />
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium mb-1" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  {check.name}
                </div>
                <div
                  className="text-sm font-mono break-all"
                  style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                >
                  {check.value || "Not set"}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="p-4 rounded-xl mb-6"
          style={{
            background: allValid ? 'rgba(124, 255, 178, 0.1)' : 'rgba(255, 200, 100, 0.1)',
            border: `1px solid ${allValid ? 'rgba(124, 255, 178, 0.3)' : 'rgba(255, 200, 100, 0.3)'}`,
          }}
        >
          <div className="flex items-start gap-3">
            {allValid ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#7CFFB2' }} />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#ffc864' }} />
            )}
            <div>
              <div className="font-semibold mb-1" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                {allValid ? "✅ Configuration looks good!" : "⚠️ Configuration incomplete"}
              </div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {allValid
                  ? "Your Firebase credentials are configured. Try logging in!"
                  : "Please update your .env file with real Firebase credentials."}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link to="/login" className="flex-1">
            <motion.button
              className="w-full py-3 rounded-xl font-semibold"
              style={{
                background: 'linear-gradient(90deg, #1ED760, #5CE1E6)',
                color: '#000',
                boxShadow: '0 0 30px rgba(30, 215, 96, 0.4)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Go to Login
            </motion.button>
          </Link>
          <Link to="/" className="flex-1">
            <motion.button
              className="w-full py-3 rounded-xl font-semibold"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(124, 255, 178, 0.3)',
                color: 'rgba(124, 255, 178, 0.9)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Go Home
            </motion.button>
          </Link>
        </div>

        <div className="mt-6 text-center text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          Need help? Check <span style={{ color: '#7CFFB2' }}>FIREBASE_QUICK_FIX.md</span>
        </div>
      </motion.div>
    </div>
  );
};

export default FirebaseTest;
