import React, { useState, useRef } from 'react';
import { Compass, Moon, Sun } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Sphere, Ring, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';

// --- 3D SCENES ---

function NakshatrasScene() {
  const groupRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
      groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.05;
    }
    if (moonRef.current) {
      moonRef.current.position.x = Math.cos(t * 0.8) * 2.5;
      moonRef.current.position.z = Math.sin(t * 0.8) * 2.5;
    }
  });

  const nakshatras = Array.from({ length: 27 }).map((_, i) => {
    const angle = (i / 27) * Math.PI * 2;
    return [Math.cos(angle) * 3.5, 0, Math.sin(angle) * 3.5] as [number, number, number];
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#4A90E2" />
      
      {/* Earth Model */}
      <Sphere args={[0.8, 32, 32]}>
        <meshStandardMaterial color="#4A90E2" wireframe opacity={0.6} transparent />
      </Sphere>
      
      {/* Moon */}
      <Sphere ref={moonRef} args={[0.2, 16, 16]}>
        <meshStandardMaterial color="#E2E8F0" emissive="#E2E8F0" emissiveIntensity={0.2} />
      </Sphere>

      {/* Ecliptic Ring */}
      <Ring args={[3.48, 3.52, 64]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#D4AF37" opacity={0.3} transparent side={THREE.DoubleSide} />
      </Ring>

      {/* 27 Nakshatras */}
      {nakshatras.map((pos, i) => (
        <group key={i} position={pos}>
          <Sphere args={[0.08, 16, 16]}>
            <meshBasicMaterial color="#F3D57B" />
          </Sphere>
        </group>
      ))}
    </group>
  );
}

function EclipseScene() {
  const moonGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Swing the moon back and forth through the Earth's shadow
    if (moonGroupRef.current) {
      moonGroupRef.current.rotation.y = Math.sin(t * 0.5) * 0.8; 
    }
  });

  return (
    <group>
      <ambientLight intensity={0.02} />
      
      {/* Sun */}
      <Sphere args={[1.5, 32, 32]} position={[-8, 0, 0]}>
        <MeshDistortMaterial color="#F3D57B" emissive="#D4AF37" emissiveIntensity={2} distort={0.2} speed={2} />
      </Sphere>
      
      {/* Sunlight casting shadow */}
      <spotLight 
        position={[-8, 0, 0]} 
        angle={0.5} 
        penumbra={0.5} 
        intensity={80} 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
        shadow-bias={-0.0001}
      />

      {/* Earth */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#4A90E2" roughness={0.4} />
      </Sphere>

      {/* Moon System */}
      <group ref={moonGroupRef}>
        {/* Moon is positioned at x=3. When rotation.y=0, it's directly behind Earth (in shadow) */}
        <Sphere args={[0.3, 32, 32]} position={[3, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#A0A0A0" roughness={0.8} />
        </Sphere>
      </group>
    </group>
  );
}

function CyclesScene() {
  const earthSystemRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Earth orbits Sun
    if (earthSystemRef.current) {
      earthSystemRef.current.position.x = Math.cos(t * 0.4) * 3.5;
      earthSystemRef.current.position.z = Math.sin(t * 0.4) * 3.5;
    }
    // Moon orbits Earth
    if (moonRef.current) {
      moonRef.current.position.x = Math.cos(t * 3) * 0.8;
      moonRef.current.position.z = Math.sin(t * 3) * 0.8;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.2} />
      
      {/* Sun */}
      <Sphere args={[1, 32, 32]}>
        <MeshDistortMaterial color="#F3D57B" emissive="#D4AF37" emissiveIntensity={1.5} distort={0.1} speed={2} />
      </Sphere>
      <pointLight intensity={30} distance={20} color="#F3D57B" />

      {/* Earth Orbit Ring */}
      <Ring args={[3.48, 3.52, 64]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#ffffff" opacity={0.1} transparent side={THREE.DoubleSide} />
      </Ring>

      {/* Earth System */}
      <group ref={earthSystemRef}>
        {/* Earth */}
        <Sphere args={[0.3, 32, 32]}>
          <meshStandardMaterial color="#4A90E2" />
        </Sphere>
        
        {/* Moon Orbit Ring */}
        <Ring args={[0.78, 0.82, 32]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#ffffff" opacity={0.2} transparent side={THREE.DoubleSide} />
        </Ring>

        {/* Moon */}
        <Sphere ref={moonRef} args={[0.1, 16, 16]}>
          <meshStandardMaterial color="#A0A0A0" />
        </Sphere>
      </group>
    </group>
  );
}

// --- MAIN COMPONENT ---

const tabs = [
  {
    id: 'nakshatras',
    title: 'The 27 Nakshatras',
    icon: Compass,
    description: "The ecliptic was divided into 27 lunar mansions or Nakshatras, each covering 13°20'. This system allowed astronomers to precisely track the moon's position against the background stars, forming the basis of the Hindu calendar.",
    scene: <NakshatrasScene />
  },
  {
    id: 'eclipses',
    title: 'Eclipse Predictions',
    icon: Moon,
    description: "Aryabhata correctly identified that eclipses are caused by shadows cast by the Earth and Moon. Ancient texts provided complex mathematical formulas to predict the exact timing, duration, and magnitude of solar and lunar eclipses.",
    scene: <EclipseScene />
  },
  {
    id: 'cycles',
    title: 'Solar & Lunar Cycles',
    icon: Sun,
    description: "The lunisolar calendar synchronizes the lunar months with the solar year by adding an intercalary month (Adhik Maas) every 32.5 months. This ensured that festivals and agricultural activities aligned with the seasons.",
    scene: <CyclesScene />
  }
];

export default function StarCharts() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="starcharts" className="py-24 bg-space-800 relative border-t border-space-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
            Star Charts & <span className="text-gold-400">Constellations</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            How ancient Indians mapped the night sky and predicted celestial events.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column - Interactive Tabs */}
          <div className="lg:col-span-5 space-y-4">
            {tabs.map((tab, index) => {
              const isActive = activeTab === index;
              const Icon = tab.icon;
              
              return (
                <div 
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive 
                      ? 'bg-space-700 border-gold-500/50 shadow-[0_0_30px_rgba(212,175,55,0.1)]' 
                      : 'bg-space-900/50 border-space-700 hover:border-gold-500/30 hover:bg-space-800'
                  }`}
                >
                  <div className="flex gap-5">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isActive ? 'bg-gold-500/20 border border-gold-500/50 text-gold-400' : 'bg-space-800 border border-space-600 text-slate-400'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-serif font-bold mb-2 transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-slate-300'
                      }`}>
                        {tab.title}
                      </h3>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-slate-400 leading-relaxed overflow-hidden"
                          >
                            <span className="block pt-2">{tab.description}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column - 3D Canvas */}
          <div className="lg:col-span-7 relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-space-700 bg-space-900 shadow-2xl">
            <div className="absolute top-4 left-4 z-10 bg-space-900/80 backdrop-blur-md border border-space-700 px-4 py-2 rounded-full pointer-events-none">
              <p className="text-xs font-mono text-gold-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
                Interactive 3D Simulation
              </p>
            </div>
            
            <Canvas shadows camera={{ position: [0, 5, 8], fov: 45 }}>
              <color attach="background" args={['#05050A']} />
              <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
              
              <AnimatePresence mode="wait">
                <motion.group
                  key={activeTab}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {tabs[activeTab].scene}
                </motion.group>
              </AnimatePresence>
              
              <OrbitControls 
                enableZoom={true} 
                minDistance={3}
                maxDistance={15}
                enablePan={false} 
                autoRotate={activeTab === 0} 
                autoRotateSpeed={0.5} 
              />
            </Canvas>
            
            <div className="absolute bottom-4 right-4 z-10 pointer-events-none opacity-50">
              <p className="text-xs text-slate-400 font-mono">Drag to rotate • Scroll to zoom</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
