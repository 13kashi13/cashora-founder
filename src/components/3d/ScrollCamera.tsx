import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const ScrollCamera = () => {
  const { camera } = useThree();
  const scroll = useScroll();
  const lastScrollRef = useRef(0);
  const velocityRef = useRef(0);
  
  useFrame((state, delta) => {
    const scrollOffset = scroll.offset;
    const scrollDelta = scrollOffset - lastScrollRef.current;
    lastScrollRef.current = scrollOffset;
    
    // Smooth velocity calculation
    velocityRef.current = THREE.MathUtils.lerp(
      velocityRef.current,
      scrollDelta / delta,
      0.1
    );
    
    // Map scroll to camera position with easing
    const targetZ = 10 - scrollOffset * 50;
    const targetY = scrollOffset * 20 - 10;
    const targetX = Math.sin(scrollOffset * Math.PI * 2) * 5;
    
    // Smooth camera movement
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 2);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 2);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 2);
    
    // Look at target with smooth rotation
    const lookAtTarget = new THREE.Vector3(
      Math.sin(scrollOffset * Math.PI) * 3,
      scrollOffset * 15 - 5,
      0
    );
    
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(10).add(camera.position);
    
    currentLookAt.lerp(lookAtTarget, delta * 2);
    camera.lookAt(currentLookAt);
    
    // Add subtle camera shake based on velocity
    camera.position.x += Math.sin(state.clock.elapsedTime * 10) * velocityRef.current * 0.1;
    camera.position.y += Math.cos(state.clock.elapsedTime * 10) * velocityRef.current * 0.1;
  });
  
  return null;
};

export default ScrollCamera;
