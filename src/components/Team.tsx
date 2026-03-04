import React, { useState, useRef, useEffect } from 'react';
import { Building2, MapPin, Scan, Play, Pause, SkipForward, SkipBack, Rocket, Navigation } from 'lucide-react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, OrbitControls, Html, Line, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';

// Team data arranged in a "Flight Path" through space
const teamData = [
  { id: 'g1', name: 'Dr. Professor Name', role: 'Faculty Guide', category: 'Guide', pos: [0, 0, 0], color: '#F59E0B', size: 1.2, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400', bio: 'Guiding the department with decades of experience in astrophysics and ancient sciences.' },
  { id: 'c1', name: 'Student Name 1', role: 'Lead Editor', category: 'Contributor', pos: [6, 2, -5], color: '#94A3B8', size: 0.6, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400', bio: 'Curated the articles on ancient astronomical instruments and timekeeping.' },
  { id: 'c2', name: 'Student Name 2', role: 'Design & Layout', category: 'Contributor', pos: [12, -2, -12], color: '#B45309', size: 0.6, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400', bio: 'Designed the physical wall magazine and conceptualized the digital experience.' },
  { id: 'c3', name: 'Student Name 3', role: 'Content Writer', category: 'Contributor', pos: [18, 4, -16], color: '#D97706', size: 0.6, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400', bio: 'Authored the sections on Aryabhata and Varahamihira.' },
  { id: 'c4', name: 'Student Name 4', role: 'Technical Lead', category: 'Contributor', pos: [24, -1, -22], color: '#E2E8F0', size: 0.6, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400', bio: 'Developed the interactive 3D models and website architecture.' },
  { id: 'c5', name: 'Student Name 5', role: 'Researcher', category: 'Contributor', pos: [30, 3, -28], color: '#94A3B8', size: 0.5, image: 'https://picsum.photos/seed/ast5/400/400', bio: 'Researched the mathematical models of ancient eclipses.' },
  { id: 'c6', name: 'Student Name 6', role: 'Data Analyst', category: 'Contributor', pos: [36, -3, -32], color: '#B45309', size: 0.5, image: 'https://picsum.photos/seed/ast6/400/400', bio: 'Analyzed historical star charts and mapped them to modern coordinates.' },
  { id: 'c7', name: 'Student Name 7', role: 'Illustrator', category: 'Contributor', pos: [42, 1, -38], color: '#D97706', size: 0.5, image: 'https://picsum.photos/seed/ast7/400/400', bio: 'Created custom illustrations for the Nakshatra section.' },
  { id: 'c8', name: 'Student Name 8', role: '3D Modeler', category: 'Contributor', pos: [48, 5, -42], color: '#E2E8F0', size: 0.5, image: 'https://picsum.photos/seed/ast8/400/400', bio: 'Modeled the ancient observatories in 3D.' },
  { id: 'c9', name: 'Student Name 9', role: 'Copy Editor', category: 'Contributor', pos: [54, -2, -48], color: '#94A3B8', size: 0.5, image: 'https://picsum.photos/seed/ast9/400/400', bio: 'Ensured all Sanskrit terms and historical dates were accurate.' },
  { id: 'c10', name: 'Student Name 10', role: 'UI Developer', category: 'Contributor', pos: [60, 2, -54], color: '#B45309', size: 0.5, image: 'https://picsum.photos/seed/ast10/400/400', bio: 'Helped build the interactive components of the website.' },
];

function CameraController({ activePos, isTouring, setIsTouring }: { activePos: number[], isTouring: boolean, setIsTouring: (v: boolean) => void }) {
  const controlsRef = useRef<any>();
  const { camera } = useThree();
  
  useFrame((state, delta) => {
    if (controlsRef.current && activePos) {
      // Smoothly move the camera target to the selected node
      const targetVec = new THREE.Vector3(...activePos);
      controlsRef.current.target.lerp(targetVec, 0.05);

      if (isTouring) {
        // In tour mode, fly the camera to a cinematic viewing angle relative to the target
        const idealPos = new THREE.Vector3(activePos[0] + 4, activePos[1] + 2, activePos[2] + 8);
        camera.position.lerp(idealPos, 0.03);
      }
    }
  });

  return (
    <OrbitControls 
      ref={controlsRef} 
      makeDefault 
      minDistance={2} 
      maxDistance={40} 
      enablePan={true}
      maxPolarAngle={Math.PI}
      onStart={() => {
        // If the user manually drags the camera, pause the auto-tour
        if (isTouring) setIsTouring(false);
      }}
    />
  );
}

function NetworkNode({ member, isActive, onClick }: any) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.02;
      ringRef.current.rotation.x += 0.01;
    }
  });

  return (
    <group position={member.pos as [number, number, number]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
        >
          <sphereGeometry args={[member.size, 32, 32]} />
          <meshStandardMaterial 
            color={member.color} 
            emissive={member.color} 
            emissiveIntensity={isActive ? 1 : (hovered ? 0.8 : 0.3)} 
            wireframe={member.category === 'Guide'} 
          />

          {/* Targeting Ring for Active Node */}
          {isActive && (
            <mesh ref={ringRef}>
              <torusGeometry args={[member.size + 0.4, 0.02, 16, 64]} />
              <meshBasicMaterial color="#D4AF37" transparent opacity={0.8} />
            </mesh>
          )}

          {/* Floating Name Label */}
          <Html distanceFactor={15} center zIndexRange={[100, 0]}>
            <div className={`transition-all duration-300 ${isActive || hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} pointer-events-none`}>
              <div className="bg-space-900/90 backdrop-blur-md border border-gold-500/50 text-white px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-gold-400 animate-pulse' : 'bg-slate-400'}`}></div>
                {member.name}
              </div>
            </div>
          </Html>
        </mesh>
      </Float>
    </group>
  );
}

function FlightPath() {
  // Create a continuous line connecting all members
  const points = teamData.map(m => new THREE.Vector3(...m.pos));
  return (
    <Line 
      points={points} 
      color="#D4AF37" 
      opacity={0.2} 
      transparent 
      lineWidth={2} 
    />
  );
}

function NetworkScene({ activeIndex, onNodeClick }: any) {
  return (
    <group>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={20} distance={50} color="#F59E0B" />
      
      <FlightPath />

      {/* Render Nodes */}
      {teamData.map((member, index) => (
        <NetworkNode 
          key={member.id} 
          member={member} 
          isActive={activeIndex === index} 
          onClick={() => onNodeClick(index)} 
        />
      ))}
    </group>
  );
}

export default function Team() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTouring, setIsTouring] = useState(true);
  
  const activeMember = teamData[activeIndex];

  // Auto-tour logic
  useEffect(() => {
    if (!isTouring) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % teamData.length);
    }, 6000); // Move to next person every 6 seconds
    
    return () => clearInterval(interval);
  }, [isTouring]);

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % teamData.length);
    setIsTouring(false);
  };

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + teamData.length) % teamData.length);
    setIsTouring(false);
  };

  const handleNodeClick = (index: number) => {
    setActiveIndex(index);
    setIsTouring(false);
  };

  return (
    <section id="team" className="py-24 bg-space-900 relative border-t border-space-700 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
            Constellation of <span className="text-gold-400">Minds</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Take a guided flight through our team network.
          </p>
        </div>

        {/* Institution Banner */}
        <div className="max-w-4xl mx-auto bg-space-800/80 backdrop-blur-md border border-gold-500/30 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(212,175,55,0.1)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/5 to-gold-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-space-900 border border-gold-500/50 flex items-center justify-center flex-shrink-0 shadow-inner">
              <Building2 className="w-8 h-8 text-gold-400" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-white mb-1">Department of Physics</h3>
              <p className="text-gold-400 font-medium tracking-wide">Bhattadev University</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-space-900/50 px-5 py-3 rounded-full border border-space-700">
            <MapPin className="w-5 h-5 text-slate-400" />
            <span className="text-slate-300 font-medium tracking-wider uppercase text-sm">Bajali, Assam</span>
          </div>
        </div>
      </div>

      {/* Game-like 3D Space Tour */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full h-[600px] lg:h-[750px] relative bg-[#030305] rounded-3xl overflow-hidden border border-space-700 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* Game HUD: Top Left */}
          <div className="absolute top-6 left-6 pointer-events-none z-20">
            <div className="flex items-center gap-2 mb-2">
              <Rocket className={`w-5 h-5 ${isTouring ? 'text-gold-400 animate-pulse' : 'text-slate-500'}`} />
              <h3 className={`font-mono text-sm tracking-widest ${isTouring ? 'text-gold-400' : 'text-slate-500'}`}>
                {isTouring ? 'AUTO-TOUR ACTIVE' : 'MANUAL OVERRIDE'}
              </h3>
            </div>
            <p className="text-slate-400 font-mono text-xs mb-1">DESTINATION: {activeIndex + 1} / {teamData.length}</p>
            <p className="text-slate-400 font-mono text-xs">SECTOR: {activeMember.category.toUpperCase()}</p>
          </div>

          {/* Game HUD: Bottom Left (Codex Entry) */}
          <div className="absolute bottom-24 left-6 right-6 md:right-auto md:w-[450px] z-20 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-space-900/80 backdrop-blur-xl border border-gold-500/40 rounded-2xl p-5 shadow-[0_0_30px_rgba(0,0,0,0.8)] pointer-events-auto"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-space-700 flex-shrink-0 relative">
                     <div className="absolute inset-0 bg-gold-500/10 mix-blend-overlay z-10"></div>
                     <img src={activeMember.image} alt={activeMember.name} className="w-full h-full object-cover grayscale contrast-125" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-gold-400 font-mono text-[10px] tracking-widest uppercase">ID: {activeMember.id}</h4>
                      <Navigation className="w-3 h-3 text-gold-500/50" />
                    </div>
                    <h2 className="text-white font-serif text-xl leading-tight mb-1">{activeMember.name}</h2>
                    <p className="text-slate-400 font-mono text-xs mb-2">{activeMember.role}</p>
                  </div>
                </div>
                <div className="w-full h-px bg-space-800 my-3"></div>
                <p className="text-slate-300 text-sm leading-relaxed">{activeMember.bio}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Game HUD: Bottom Center (Playback Controls) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 bg-space-900/90 backdrop-blur-md border border-space-700 px-6 py-3 rounded-full shadow-2xl">
            <button 
              onClick={handlePrev}
              className="text-slate-400 hover:text-white transition-colors p-2"
              title="Previous Destination"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => setIsTouring(!isTouring)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isTouring 
                  ? 'bg-gold-500/20 text-gold-400 border border-gold-500/50 shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                  : 'bg-space-800 text-white border border-space-600 hover:border-space-500'
              }`}
              title={isTouring ? "Pause Tour" : "Resume Tour"}
            >
              {isTouring ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
            </button>

            <button 
              onClick={handleNext}
              className="text-slate-400 hover:text-white transition-colors p-2"
              title="Next Destination"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* 3D Canvas */}
          <Canvas camera={{ position: [0, 5, 15], fov: 45 }}>
            <color attach="background" args={['#030305']} />
            <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />
            
            <NetworkScene activeIndex={activeIndex} onNodeClick={handleNodeClick} />
            
            <CameraController 
              activePos={activeMember.pos} 
              isTouring={isTouring} 
              setIsTouring={setIsTouring} 
            />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
