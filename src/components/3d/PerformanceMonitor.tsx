import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';

const PerformanceMonitor = () => {
  const { gl, performance } = useThree();
  const fpsRef = useRef<number[]>([]);
  const lastTimeRef = useRef(performance.now());
  
  useFrame(() => {
    const now = performance.now();
    const delta = now - lastTimeRef.current;
    lastTimeRef.current = now;
    
    const fps = 1000 / delta;
    fpsRef.current.push(fps);
    
    // Keep only last 60 frames
    if (fpsRef.current.length > 60) {
      fpsRef.current.shift();
    }
    
    // Calculate average FPS
    const avgFps = fpsRef.current.reduce((a, b) => a + b, 0) / fpsRef.current.length;
    
    // Adaptive quality based on FPS
    if (avgFps < 30) {
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    } else if (avgFps > 50) {
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  });
  
  return (
    <>
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  );
};

export default PerformanceMonitor;
