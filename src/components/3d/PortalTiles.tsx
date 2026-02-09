import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, RenderTexture, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const PortalScene = ({ index }: { index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  
  const colors = ['#7CFFB2', '#5CE1E6', '#A8FFE0'];
  const color = colors[index % colors.length];
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </>
  );
};

const PortalTile = ({ position, index }: { position: [number, number, number]; index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();
  const { gl } = useThree();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      const scrollOffset = scroll.offset;
      const targetY = position[1] + scrollOffset * 5;
      
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY,
        delta * 2
      );
      
      // Subtle rotation
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime + index) * 0.1;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial>
        <RenderTexture attach="map" anisotropy={gl.capabilities.getMaxAnisotropy()}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <PortalScene index={index} />
        </RenderTexture>
      </meshStandardMaterial>
    </mesh>
  );
};

const PortalTiles = () => {
  const tiles = useMemo(() => [
    { position: [-6, 10, -3] as [number, number, number], index: 0 },
    { position: [6, 15, -3] as [number, number, number], index: 1 },
    { position: [-6, 25, -3] as [number, number, number], index: 2 },
    { position: [6, 30, -3] as [number, number, number], index: 3 },
  ], []);
  
  return (
    <>
      {tiles.map((tile, i) => (
        <PortalTile key={i} {...tile} />
      ))}
    </>
  );
};

export default PortalTiles;
