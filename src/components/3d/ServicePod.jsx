import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

export default function ServicePod({ service }) {
  const { setActiveService, activeService } = useExperienceStore();
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  const kineticRef = useRef();
  const spotlightRef = useRef();
  const groundRingRef = useRef();

  const isSelected = activeService?.id === service.id;

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Kinetic centerpiece levitation & rotation
    if (kineticRef.current) {
      kineticRef.current.rotation.y += delta * (hovered ? 1.4 : 0.5);
      kineticRef.current.position.y = 1.35 + Math.sin(time * 2.2 + service.position[0]) * 0.08;
    }

    // Ground glow ring breathing pulse
    if (groundRingRef.current && groundRingRef.current.material) {
      const baseOpacity = hovered || isSelected ? 0.95 : 0.4;
      groundRingRef.current.material.opacity = baseOpacity + Math.sin(time * 3) * 0.12;
    }

    // Smooth hover scale damping
    if (groupRef.current) {
      const targetScale = hovered || isSelected ? 1.08 : 1.0;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
    }
  });

  const handlePointerEnter = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    setHovered(true);
    sound.playPodHover();
  };

  const handlePointerLeave = () => {
    document.body.style.cursor = 'default';
    setHovered(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setActiveService(service);
    sound.playPodSelect();
  };

  return (
    <group
      ref={groupRef}
      position={service.position}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {/* 1. Ground Ambient Glow Ring with Breathing Pulse */}
      <mesh ref={groundRingRef} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.48, 36]} />
        <meshBasicMaterial
          color={service.accentColor}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* 2. Plinth / Pedestal Base (Tiered luxury plinth) */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[1.2, 1.3, 0.3, 32]} />
        <meshStandardMaterial
          color="#101118"
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>
      {/* Golden Metallic Rim */}
      <mesh position={[0, 0.31, 0]}>
        <cylinderGeometry args={[1.18, 1.2, 0.04, 32]} />
        <meshStandardMaterial
          color={service.accentColor}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.95, 1.1, 0.45, 32]} />
        <meshStandardMaterial
          color="#0a0b12"
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>

      {/* Illuminated Glass Cylinder top cap */}
      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.1, 32]} />
        <meshStandardMaterial
          color={service.accentColor}
          emissive={service.accentColor}
          emissiveIntensity={hovered || isSelected ? 1.4 : 0.5}
          roughness={0.1}
          metalness={0.5}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* 3. The Kinetic Service Centerpiece */}
      <group ref={kineticRef} position={[0, 1.35, 0]}>
        {service.id === 'weddings' && (
          <group>
            <mesh>
              <torusGeometry args={[0.42, 0.04, 16, 32]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.15} />
            </mesh>
            <mesh rotation={[Math.PI / 4, 0, 0]}>
              <torusGeometry args={[0.32, 0.03, 16, 32]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.9} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <octahedronGeometry args={[0.18, 0]} />
              <meshStandardMaterial color="#fff" emissive="#fde68a" emissiveIntensity={0.8} />
            </mesh>
          </group>
        )}

        {service.id === 'corporate' && (
          <group>
            <mesh rotation={[0, Math.PI / 4, 0]}>
              <octahedronGeometry args={[0.45, 0]} />
              <meshStandardMaterial
                color="#3b82f6"
                emissive="#2563eb"
                emissiveIntensity={0.7}
                metalness={0.85}
                roughness={0.15}
              />
            </mesh>
            <mesh>
              <torusGeometry args={[0.55, 0.02, 16, 32]} />
              <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={1.5} />
            </mesh>
          </group>
        )}

        {service.id === 'concerts' && (
          <group>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.35, 0.35, 0.12, 6]} />
              <meshStandardMaterial color="#1f2937" metalness={0.9} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <dodecahedronGeometry args={[0.38, 0]} />
              <meshStandardMaterial
                color="#ec4899"
                emissive="#db2777"
                emissiveIntensity={1.5}
              />
            </mesh>
            <mesh position={[0, 0.3, 0]} rotation={[0.4, 0, 0]}>
              <coneGeometry args={[0.1, 0.4, 16, 1, true]} />
              <meshBasicMaterial color="#f472b6" wireframe transparent opacity={0.6} />
            </mesh>
          </group>
        )}

        {service.id === 'vip-parties' && (
          <group>
            <mesh>
              <torusKnotGeometry args={[0.26, 0.07, 48, 8]} />
              <meshStandardMaterial
                color="#8b5cf6"
                emissive="#7c3aed"
                emissiveIntensity={0.8}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </group>
        )}

        {service.id === 'brand-activations' && (
          <group>
            <mesh rotation={[0.4, 0.4, 0]}>
              <boxGeometry args={[0.48, 0.48, 0.48]} />
              <meshStandardMaterial
                color="#06b6d4"
                emissive="#0891b2"
                emissiveIntensity={1.0}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            <mesh rotation={[-0.4, 0.4, 0]}>
              <boxGeometry args={[0.56, 0.56, 0.56]} />
              <meshBasicMaterial color="#67e8f9" wireframe transparent opacity={0.5} />
            </mesh>
          </group>
        )}

        {service.id === 'production' && (
          <group>
            <mesh>
              <icosahedronGeometry args={[0.4, 1]} />
              <meshStandardMaterial
                color="#10b981"
                emissive="#059669"
                emissiveIntensity={0.9}
                metalness={0.7}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.58, 0.02, 16, 32]} />
              <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={1.8} />
            </mesh>
          </group>
        )}
      </group>

      {/* 4. Local Spotlight on Pedestal */}
      <spotLight
        ref={spotlightRef}
        position={[0, 4.5, 0]}
        target-position={[0, 0.8, 0]}
        angle={0.4}
        penumbra={0.6}
        intensity={hovered || isSelected ? 3.2 : 1.3}
        color={service.accentColor}
        distance={7}
      />

      {/* 5. Redesigned Premium 3D Floating Card Badge */}
      <Html
        position={[0, 2.45, 0]}
        center
        distanceFactor={11}
        className="pointer-events-none select-none transition-all duration-300 transform"
        style={{
          transform: hovered || isSelected ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
          opacity: hovered || isSelected ? 1 : 0.88,
        }}
      >
        <div className="flex flex-col items-center">
          <div
            className="px-4 py-2 rounded-2xl glass-panel-gold border shadow-2xl flex flex-col items-center text-center backdrop-blur-xl"
            style={{ borderColor: hovered || isSelected ? service.accentColor : 'rgba(255,255,255,0.15)' }}
          >
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: service.accentColor }}
              />
              <span className="font-cinzel text-xs font-bold text-zinc-100 whitespace-nowrap tracking-wide">
                {service.shortTitle}
              </span>
            </div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-zinc-400">
              {service.category}
            </div>
          </div>
          <div className="text-[8px] tracking-[0.25em] text-amber-300/80 mt-1 uppercase font-semibold">
            ✦ Inspect Station
          </div>
        </div>
      </Html>
    </group>
  );
}
