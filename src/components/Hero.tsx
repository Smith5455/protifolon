import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Float, Torus, Icosahedron, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Astrolabe() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.x = t * 0.5;
    if (ring2Ref.current) ring2Ref.current.rotation.y = t * 0.3;
    if (ring3Ref.current) ring3Ref.current.rotation.z = t * 0.4;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Outer Ring */}
        <Torus ref={ring1Ref} args={[2.5, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
        </Torus>
        
        {/* Middle Ring */}
        <Torus ref={ring2Ref} args={[2, 0.05, 16, 100]} rotation={[0, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#E5C158" metalness={0.7} roughness={0.3} />
        </Torus>
        
        {/* Inner Ring */}
        <Torus ref={ring3Ref} args={[1.5, 0.05, 16, 100]} rotation={[0, 0, Math.PI / 3]}>
          <meshStandardMaterial color="#F3D57B" metalness={0.6} roughness={0.4} />
        </Torus>

        {/* Center Core */}
        <Icosahedron args={[0.5, 1]}>
          <MeshDistortMaterial
            color="#D4AF37"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.9}
            wireframe={true}
          />
        </Icosahedron>
        
        {/* Decorative Spheres */}
        <Sphere args={[0.1, 16, 16]} position={[2.5, 0, 0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </Sphere>
        <Sphere args={[0.1, 16, 16]} position={[-2.5, 0, 0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </Sphere>
      </Float>
    </group>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#F3D57B" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4A90E2" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Astrolabe />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pointer-events-none">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-gold-500/30 bg-space-900/50 backdrop-blur-sm">
          <p className="text-gold-400 text-xs sm:text-sm uppercase tracking-widest font-medium">
            Bhattadev University • Department of Physics
          </p>
        </div>
        
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl">
          Ancient Indian <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-amber-600">
            Astronomy
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto drop-shadow-md">
          Exploring the Universe through Indian Wisdom. A digital extension of the 2026 Wall Magazine.
        </p>

        <div className="mt-12 pointer-events-auto">
          <a
            href="#articles"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-space-900 bg-gold-400 hover:bg-gold-300 transition-colors duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
          >
            Explore the Cosmos
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-[30px] h-[50px] rounded-full border-2 border-slate-400/50 flex justify-center p-2">
          <div className="w-1 h-3 bg-gold-400 rounded-full animate-pulse" />
        </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-space-900 to-transparent z-0 pointer-events-none" />
    </section>
  );
}
