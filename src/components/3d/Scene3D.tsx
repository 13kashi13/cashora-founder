import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Suspense, useState, useEffect } from 'react';
import ScrollCamera from './ScrollCamera';
import PhysicsSandbox from './PhysicsSandbox';
import MorphingVideoPanel from './MorphingVideoPanel';
import PortalTiles from './PortalTiles';
import PerformanceMonitor from './PerformanceMonitor';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import LoadingScreen from './LoadingScreen';
import { AnimatePresence } from 'framer-motion';

const Scene3D = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);
  const [dpr, setDpr] = useState(1);
  
  // Stabilize DPR to prevent flickering
  useEffect(() => {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    setDpr(pixelRatio);
  }, []);
  
  // Don't render 3D scene if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }
  
  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: true,
            // Prevent flickering in production
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false,
          }}
          dpr={dpr}
          camera={{ position: [0, 0, 10], fov: 50 }}
          frameloop="always"
          onCreated={({ gl }) => {
            // Stabilize canvas rendering
            gl.setClearColor('#050a0a', 1);
            // Hide loading screen after canvas is ready
            setTimeout(() => setIsLoading(false), 500);
          }}
        >
        <color attach="background" args={['#050a0a']} />
        
        <Suspense fallback={null}>
          <PerformanceMonitor />
          <ScrollControls pages={8} damping={0.1}>
            <ScrollCamera />
            
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#7CFFB2" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#5CE1E6" />
            
            <Physics gravity={[0, -9.81, 0]} timeStep="vary">
              <PhysicsSandbox />
            </Physics>
            
            <MorphingVideoPanel />
            <PortalTiles />
          </ScrollControls>
        </Suspense>

        <EffectComposer>
          <Bloom 
            intensity={0.5} 
            luminanceThreshold={0.9} 
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
    </>
  );
};

export default Scene3D;
