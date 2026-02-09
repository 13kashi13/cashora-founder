import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const PhysicsObject = ({ position, color, shape = 'box' }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <RigidBody position={position} colliders="cuboid">
      <mesh ref={meshRef} castShadow receiveShadow>
        {shape === 'box' ? (
          <boxGeometry args={[1, 1, 1]} />
        ) : (
          <sphereGeometry args={[0.5, 32, 32]} />
        )}
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </RigidBody>
  );
};

const PhysicsSandbox = () => {
  const objects = useMemo(() => [
    { position: [-3, 5, 0], color: '#7CFFB2', shape: 'box' },
    { position: [3, 8, 0], color: '#5CE1E6', shape: 'sphere' },
    { position: [0, 12, 0], color: '#A8FFE0', shape: 'box' },
    { position: [-2, 15, -2], color: '#7CFFB2', shape: 'sphere' },
    { position: [2, 18, 2], color: '#5CE1E6', shape: 'box' },
  ], []);
  
  return (
    <>
      {/* Ground plane */}
      <RigidBody type="fixed" position={[0, -5, 0]}>
        <CuboidCollider args={[20, 0.5, 20]} />
        <mesh receiveShadow>
          <boxGeometry args={[40, 1, 40]} />
          <meshStandardMaterial 
            color="#050a0a" 
            transparent 
            opacity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </RigidBody>
      
      {/* Physics objects */}
      {objects.map((obj, i) => (
        <PhysicsObject key={i} {...obj} />
      ))}
      
      {/* Invisible walls */}
      <RigidBody type="fixed" position={[10, 10, 0]}>
        <CuboidCollider args={[0.5, 20, 20]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-10, 10, 0]}>
        <CuboidCollider args={[0.5, 20, 20]} />
      </RigidBody>
    </>
  );
};

export default PhysicsSandbox;
