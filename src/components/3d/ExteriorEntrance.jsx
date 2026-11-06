import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import DoorModel from './DoorModel';

/* ── Animated Flaming Torch ─────────────────────────────────────────── */
function FlamingTorch({ position, mirror = false }) {
  const flameParticlesRef = useRef();
  const flickerLightRef = useRef();

  // 24 small flame particles
  const particleCount = 24;
  const [basePositions, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.12;
      pos[i * 3 + 1] = Math.random() * 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
      spd[i] = 0.6 + Math.random() * 0.9;
    }
    return [pos, spd];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Animate flame particles
    if (flameParticlesRef.current) {
      const posArr = flameParticlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        // Rise upwards
        posArr[i * 3 + 1] += speeds[i] * 0.012;
        // Horizontal flutter
        posArr[i * 3] += Math.sin(time * 8 + i * 1.7) * 0.003;
        posArr[i * 3 + 2] += Math.cos(time * 6 + i * 2.3) * 0.002;
        // Reset when too high
        if (posArr[i * 3 + 1] > 0.65) {
          posArr[i * 3] = (Math.random() - 0.5) * 0.12;
          posArr[i * 3 + 1] = 0;
          posArr[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
        }
      }
      flameParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Flicker the point light
    if (flickerLightRef.current) {
      flickerLightRef.current.intensity =
        3.5 + Math.sin(time * 12) * 0.8 + Math.sin(time * 18.3) * 0.5 + Math.sin(time * 7.1) * 0.6;
    }
  });

  return (
    <group position={position}>
      {/* Wall mounting bracket */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.08, 0.12, 0.25]} />
        <meshStandardMaterial color="#8B6914" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Angled arm extending outward */}
      <mesh position={[0, 0.18, 0.18]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.03, 0.45, 12]} />
        <meshStandardMaterial color="#8B6914" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Torch bowl / cradle */}
      <mesh position={[0, 0.38, 0.32]}>
        <cylinderGeometry args={[0.1, 0.06, 0.14, 16, 1, true]} />
        <meshStandardMaterial color="#6B4F1A" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Bowl rim ring */}
      <mesh position={[0, 0.45, 0.32]}>
        <torusGeometry args={[0.1, 0.015, 8, 24]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Inner flame core glow — hot white-yellow emissive sphere */}
      <mesh position={[0, 0.52, 0.32]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial
          color="#fff7ed"
          emissive="#fbbf24"
          emissiveIntensity={4.0}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Mid flame orange-amber envelope */}
      <mesh position={[0, 0.58, 0.32]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial
          color="#fb923c"
          emissive="#ea580c"
          emissiveIntensity={3.0}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Outer flame glow haze */}
      <mesh position={[0, 0.55, 0.32]}>
        <sphereGeometry args={[0.14, 10, 10]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Rising flame spark particles */}
      <points ref={flameParticlesRef} position={[0, 0.46, 0.32]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[basePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#fcd34d"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Dynamic flickering point light — warm fire glow */}
      <pointLight
        ref={flickerLightRef}
        position={[0, 0.6, 0.32]}
        color="#ff9f43"
        intensity={3.5}
        distance={8}
        decay={2}
      />
    </group>
  );
}

export default function ExteriorEntrance() {
  return (
    <group position={[0, 0, 0]}>
      {/* Outer Door Frame Structure */}
      {/* Left Column / Jamb */}
      <mesh position={[-2.15, 2.3, 4]}>
        <boxGeometry args={[0.55, 4.8, 0.45]} />
        <meshStandardMaterial color="#141628" roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Right Column / Jamb */}
      <mesh position={[2.15, 2.3, 4]}>
        <boxGeometry args={[0.55, 4.8, 0.45]} />
        <meshStandardMaterial color="#141628" roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Top Lintel Arch */}
      <mesh position={[0, 4.85, 4]}>
        <boxGeometry args={[4.85, 0.65, 0.5]} />
        <meshStandardMaterial color="#141628" roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Top Gold Trim */}
      <mesh position={[0, 5.2, 4.05]}>
        <boxGeometry args={[5.0, 0.08, 0.55]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Exterior Facade Walls — deep navy */}
      <mesh position={[-5.5, 3.5, 4]}>
        <boxGeometry args={[6.2, 7.5, 0.3]} />
        <meshStandardMaterial color="#0c0e1e" roughness={0.7} />
      </mesh>
      <mesh position={[5.5, 3.5, 4]}>
        <boxGeometry args={[6.2, 7.5, 0.3]} />
        <meshStandardMaterial color="#0c0e1e" roughness={0.7} />
      </mesh>
      <mesh position={[0, 6.4, 4]}>
        <boxGeometry args={[5.2, 2.5, 0.3]} />
        <meshStandardMaterial color="#0c0e1e" roughness={0.7} />
      </mesh>

      {/* Grand Architectural Pillars */}
      {/* Left Pillar */}
      <group position={[-2.8, 2.4, 4.3]}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.26, 4.8, 24]} />
          <meshStandardMaterial color="#1a1d32" metalness={0.4} roughness={0.3} />
        </mesh>
        {/* Golden Column Capital */}
        <mesh position={[0, 2.4, 0]}>
          <cylinderGeometry args={[0.32, 0.24, 0.2, 24]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Golden Sconce Uplight */}
        <mesh position={[0, 1.2, 0.22]}>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* Right Pillar */}
      <group position={[2.8, 2.4, 4.3]}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.26, 4.8, 24]} />
          <meshStandardMaterial color="#1a1d32" metalness={0.4} roughness={0.3} />
        </mesh>
        {/* Golden Column Capital */}
        <mesh position={[0, 2.4, 0]}>
          <cylinderGeometry args={[0.32, 0.24, 0.2, 24]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Golden Sconce Uplight */}
        <mesh position={[0, 1.2, 0.22]}>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* ═══ Flaming Torches — mounted on the door jambs ═══ */}
      {/* Left torch — mounted on the inside face of the left jamb */}
      <FlamingTorch position={[-2.45, 2.8, 4.22]} />
      {/* Right torch — mounted on the inside face of the right jamb */}
      <FlamingTorch position={[2.45, 2.8, 4.22]} mirror />

      {/* Grand Entrance Steps */}
      <mesh position={[0, -0.1, 5.2]}>
        <boxGeometry args={[6.5, 0.2, 2.4]} />
        <meshStandardMaterial color="#181a2e" roughness={0.25} metalness={0.3} />
      </mesh>
      <mesh position={[0, -0.3, 6.8]}>
        <boxGeometry args={[7.5, 0.2, 1.8]} />
        <meshStandardMaterial color="#14162a" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Exterior Courtyard Ground */}
      <mesh position={[0, -0.5, 12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 14]} />
        <meshStandardMaterial color="#0a0c18" roughness={0.6} metalness={0.15} />
      </mesh>

      {/* The Opening Double Doors */}
      <DoorModel />
    </group>
  );
}

