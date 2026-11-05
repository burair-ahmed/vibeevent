import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

// Ground Hotspot positions across key places in the grand hall
export const HOTSPOTS_DATA = [
  { id: 'foyer', label: 'Grand Foyer', position: [0, 0.025, 1.2], cameraPos: [0, 2.0, 1.2] },
  { id: 'hall-center', label: 'Central Promenade', position: [0, 0.025, -4.5], cameraPos: [0, 2.1, -4.5] },
  { id: 'weddings-wing', label: 'Weddings Gallery', position: [-4.0, 0.025, -3.0], cameraPos: [-3.6, 2.1, -2.2] },
  { id: 'concerts-wing', label: 'Concerts & Arena', position: [4.0, 0.025, -3.0], cameraPos: [3.6, 2.1, -2.2] },
  { id: 'activations-hub', label: 'Brand Activations', position: [0, 0.025, -8.0], cameraPos: [0, 2.1, -7.0] },
  { id: 'corporate-zone', label: 'Corporate Pavilion', position: [-4.0, 0.025, -9.0], cameraPos: [-3.6, 2.1, -8.0] },
  { id: 'vip-lounge', label: 'VIP Lounge', position: [4.0, 0.025, -9.0], cameraPos: [3.6, 2.1, -8.0] },
  { id: 'stage-front', label: 'VIP Stage Promenade', position: [0, 0.025, -15.5], cameraPos: [0, 2.2, -14.5] },
  { id: 'stage-apex', label: 'Main Stage Center', position: [0, 1.025, -20.5], cameraPos: [0, 2.8, -19.5] },
];

function SingleHotspot({ hotspot }) {
  const { moveToHotspot } = useExperienceStore();
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef();
  const outerRingRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Concentric ripple animation
    if (outerRingRef.current) {
      const scale = 1 + (Math.sin(time * 3 + hotspot.position[0]) * 0.5 + 0.5) * 0.45;
      outerRingRef.current.scale.set(scale, scale, 1);
      if (outerRingRef.current.material) {
        outerRingRef.current.material.opacity = (hovered ? 0.9 : 0.4) * (1 - (scale - 1) / 0.45);
      }
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    sound.init();
    sound.playThresholdWhoosh();
    moveToHotspot(hotspot.cameraPos);
  };

  return (
    <group
      position={hotspot.position}
      onClick={handleClick}
      onPointerEnter={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        setHovered(true);
        sound.playPodHover();
      }}
      onPointerLeave={() => {
        document.body.style.cursor = 'default';
        setHovered(false);
      }}
    >
      {/* 1. Pulsing Ground Concentric Outer Ring */}
      <mesh
        ref={outerRingRef}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.42, 0.54, 32]} />
        <meshBasicMaterial
          color="#fbbf24"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Inner Golden Target Disc */}
      <mesh
        ref={ringRef}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={hovered ? 1.25 : 1.0}
      >
        <ringGeometry args={[0.18, 0.32, 32]} />
        <meshBasicMaterial
          color={hovered ? "#fef08a" : "#d4af37"}
          transparent
          opacity={hovered ? 0.95 : 0.75}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Center Glowing Target Core */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.1, 24]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </mesh>

      {/* 4. Floating Spatial Label with Drei Occlusion */}
      <Html
        position={[0, 0.45, 0]}
        center
        distanceFactor={10}
        occlude
        className="pointer-events-none select-none transition-all duration-300 transform"
        style={{
          transform: hovered ? 'scale(1.1) translateY(-3px)' : 'scale(1)',
          opacity: hovered ? 1 : 0.8,
        }}
      >
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel-gold border border-amber-500/30 shadow-xl backdrop-blur-md whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-100">
            {hotspot.label}
          </span>
        </div>
      </Html>
    </group>
  );
}

export default function GroundHotspots() {
  const { entranceState } = useExperienceStore();

  // Only render ground navigation hotspots when inside the hall
  if (entranceState !== 'inside') return null;

  return (
    <group>
      {HOTSPOTS_DATA.map((hotspot) => (
        <SingleHotspot key={hotspot.id} hotspot={hotspot} />
      ))}
    </group>
  );
}

