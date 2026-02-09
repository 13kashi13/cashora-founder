import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uScroll;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    vec3 pos = position;
    
    // Morphing effect based on scroll
    float wave = sin(pos.x * 2.0 + uTime) * cos(pos.y * 2.0 + uTime) * 0.3;
    pos.z += wave * (1.0 - uScroll);
    
    // Twist effect
    float angle = uScroll * 3.14159;
    float s = sin(angle * pos.y);
    float c = cos(angle * pos.y);
    mat2 rotation = mat2(c, -s, s, c);
    pos.xz = rotation * pos.xz;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uScroll;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  
  void main() {
    // Animated gradient
    vec2 uv = vUv;
    float pattern = sin(uv.x * 10.0 + uTime) * cos(uv.y * 10.0 + uTime);
    
    // Color mixing based on scroll
    vec3 color = mix(uColor1, uColor2, uv.y + pattern * 0.2);
    
    // Glow effect
    float glow = 1.0 - length(uv - 0.5) * 2.0;
    glow = pow(glow, 2.0) * uScroll;
    
    color += glow * 0.5;
    
    // Scanline effect
    float scanline = sin(uv.y * 100.0 + uTime * 2.0) * 0.05;
    color += scanline;
    
    gl_FragColor = vec4(color, 0.8);
  }
`;

const MorphingVideoPanel = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColor1: { value: new THREE.Color('#7CFFB2') },
      uColor2: { value: new THREE.Color('#5CE1E6') },
    }),
    []
  );
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.elapsedTime;
      uniforms.uScroll.value = THREE.MathUtils.lerp(
        uniforms.uScroll.value,
        scroll.offset,
        delta * 2
      );
      
      // Position based on scroll
      meshRef.current.position.y = scroll.offset * 10;
      meshRef.current.rotation.y = scroll.offset * Math.PI;
    }
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[8, 4.5, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default MorphingVideoPanel;
