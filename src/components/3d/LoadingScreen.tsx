import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: 'rgba(5, 10, 10, 0.95)',
        backdropFilter: 'blur(20px)',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="inline-block mb-4"
        >
          <Loader2 className="w-12 h-12" style={{ color: '#7CFFB2' }} />
        </motion.div>
        
        <motion.h2
          className="text-2xl font-bold mb-2"
          style={{
            background: 'linear-gradient(90deg, #7CFFB2 0%, #5CE1E6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading 3D Experience
        </motion.h2>
        
        <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Initializing WebGL renderer...
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
