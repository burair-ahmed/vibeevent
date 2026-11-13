import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

// Ground Hotspot positions across key places in the grand hall (INTERIOR)
export const HOTSPOTS_DATA = [
  { id: 'foyer', position: [0, 0.028, 1.2], cameraPos: [0, 2.0, 1.2] },
  { id: 'hall-center', position: [0, 0.028, -4.5], cameraPos: [0, 2.1, -4.5] },
  { id: 'weddings-wing', position: [-3.8, 0.025, -3.5], cameraPos: [-3.4, 2.1, -2.5] },
  { id: 'concerts-wing', position: [3.8, 0.025, -3.5], cameraPos: [3.4, 2.1, -2.5] },
  { id: 'hall-midway', position: [0, 0.028, -9.5], cameraPos: [0, 2.1, -9.5] },
  { id: 'corporate-zone', position: [-3.8, 0.025, -9.5], cameraPos: [-3.4, 2.1, -8.5] },
  { id: 'vip-lounge', position: [3.8, 0.025, -9.5], cameraPos: [3.4, 2.1, -8.5] },
  { id: 'activations-wing', position: [-3.8, 0.025, -15.5], cameraPos: [-3.4, 2.1, -14.5] },
  { id: 'production-wing', position: [3.8, 0.025, -15.5], cameraPos: [3.4, 2.1, -14.5] },
  { id: 'stage-front', position: [0, 0.028, -18.5], cameraPos: [0, 2.2, -17.5] },
  { id: 'stage-apex', position: [0, 1.025, -20.5], cameraPos: [0, 2.8, -19.5] },
];

// Ground Hotspot positions OUTSIDE the entrance (courtyard / approach)
export const EXTERIOR_HOTSPOTS_DATA = [
  { id: 'ext-gate-front', position: [0, -0.07, 6.5], cameraPos: [0, 2.0, 6.5] },
  { id: 'ext-left-wing', position: [-3.8, -0.45, 8.5], cameraPos: [-3.5, 1.8, 8.5] },
  { id: 'ext-right-wing', position: [3.8, -0.45, 8.5], cameraPos: [3.5, 1.8, 8.5] },
  { id: 'ext-courtyard-center', position: [0, -0.45, 11.0], cameraPos: [0, 1.8, 11.0] },
  { id: 'ext-far-left', position: [-5.5, -0.45, 12.5], cameraPos: [-5.0, 1.8, 12.0] },
  { id: 'ext-far-right', position: [5.5, -0.45, 12.5], cameraPos: [5.0, 1.8, 12.0] },
];

function SingleHotspot({ hotspot, isExterior = false }) {
  const { moveToHotspot } = useExperienceStore();
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef();
  const outerRingRef = useRef();

  // Hotspot accent colors — sleek luxury black theme
  const accentColor = '#000000';
  const accentColorHover = '#18181b';
  const accentColorBase = '#09090b';

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Concentric ripple animation
    if (outerRingRef.current) {
      const scale = 1 + (Math.sin(time * 3 + hotspot.position[0]) * 0.5 + 0.5) * 0.45;
      outerRingRef.current.scale.set(scale, scale, 1);
      if (outerRingRef.current.material) {
        outerRingRef.current.material.opacity = (hovered ? 0.75 : 0.35) * (1 - (scale - 1) / 0.45);
      }
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    sound.init();
    sound.playThresholdWhoosh();
    moveToHotspot(hotspot.cameraPos, { keepState: isExterior });
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
      {/* 1. Pulsing Ground Concentric Outer Ring — sleek black */}
      <mesh
        ref={outerRingRef}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.38, 0.5, 32]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Inner Black Target Disc */}
      <mesh
        ref={ringRef}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={hovered ? 1.25 : 1.0}
      >
        <ringGeometry args={[0.16, 0.28, 32]} />
        <meshBasicMaterial
          color={hovered ? accentColorHover : accentColorBase}
          transparent
          opacity={hovered ? 0.95 : 0.75}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Center Target Core — solid black */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.07, 24]} />
        <meshBasicMaterial
          color={hovered ? '#18181b' : '#000000'}
          transparent
          opacity={hovered ? 1.0 : 0.85}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function GroundHotspots() {
  const { entranceState } = useExperienceStore();

  return (
    <group>
      {/* Interior hotspots — only when inside */}
      {entranceState === 'inside' &&
        HOTSPOTS_DATA.map((hotspot) => (
          <SingleHotspot key={hotspot.id} hotspot={hotspot} />
        ))
      }

      {/* Exterior hotspots — only when outside (before entering) */}
      {entranceState === 'outside' &&
        EXTERIOR_HOTSPOTS_DATA.map((hotspot) => (
          <SingleHotspot key={hotspot.id} hotspot={hotspot} isExterior />
        ))
      }
    </group>
  );
}
