import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import CrystalChandelier from './CrystalChandelier';

export default function GrandHall() {
  const neonRibsRef = useRef([]);

  // Column positions along both sides of the hall
  const columnPositions = useMemo(() => [
    { x: -7.5, z: 1.5 },
    { x: 7.5, z: 1.5 },
    { x: -7.5, z: -4 },
    { x: 7.5, z: -4 },
    { x: -7.5, z: -9.5 },
    { x: 7.5, z: -9.5 },
    { x: -7.5, z: -15 },
    { x: 7.5, z: -15 },
    { x: -7.5, z: -20.5 },
    { x: 7.5, z: -20.5 },
  ], []);

  // Ceiling vault rib arches
  const archPositions = useMemo(() => [
    1.5, -4, -9.5, -15, -20.5
  ], []);

  // Luxury Grand Crystal Chandeliers along the central runway under the vault arches
  const chandelierConfigs = useMemo(() => [
    {
      id: 'chandelier-entrance',
      position: [0, 0, 1.5],
      scale: 1.25,
      tiers: 'two',
      crystals: 'cascade',
      colorway: 'casino-gold',
      lightIntensity: 3.8,
      swaySpeed: 1.0,
      swayAmount: 1.05,
      seed: 0.5,
    },
    {
      id: 'chandelier-fore',
      position: [0, 0, -4.0],
      scale: 1.38,
      tiers: 'two',
      crystals: 'cascade',
      colorway: 'casino-gold',
      lightIntensity: 4.2,
      swaySpeed: 0.95,
      swayAmount: 1.1,
      seed: 1.2,
    },
    {
      id: 'chandelier-center',
      position: [0, 0, -9.5],
      scale: 1.62,
      tiers: 'three',
      crystals: 'cascade',
      colorway: 'casino-gold',
      lightIntensity: 5.0,
      swaySpeed: 0.78,
      swayAmount: 0.95,
      seed: 2.7,
    },
    {
      id: 'chandelier-stage',
      position: [0, 0, -15.0],
      scale: 1.38,
      tiers: 'two',
      crystals: 'cascade',
      colorway: 'casino-gold',
      lightIntensity: 4.2,
      swaySpeed: 0.88,
      swayAmount: 1.05,
      seed: 4.3,
    },
  ], []);

  // Subtle breathing pulse for the overhead neon arches
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    neonRibsRef.current.forEach((mesh, idx) => {
      if (mesh && mesh.material) {
        mesh.material.emissiveIntensity = 1.2 + Math.sin(time * 2 + idx * 0.4) * 0.4;
      }
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Reflective Dark Marble Floor — warmer charcoal with visible reflections */}
      <mesh position={[0, -0.01, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 28]} />
        <meshStandardMaterial
          color="#0e0f18"
          roughness={0.06}
          metalness={0.92}
        />
      </mesh>

      {/* Central Golden Runway / Promenade Inlay */}
      <mesh position={[0, 0.005, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 28]} />
        <meshStandardMaterial
          color="#12131e"
          roughness={0.1}
          metalness={0.75}
        />
      </mesh>

      {/* Runway Gold Border Strips */}
      <mesh position={[-2.12, 0.01, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.06, 28]} />
        <meshStandardMaterial color="#d4af37" emissive="#997819" emissiveIntensity={0.6} metalness={0.95} />
      </mesh>
      <mesh position={[2.12, 0.01, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.06, 28]} />
        <meshStandardMaterial color="#d4af37" emissive="#997819" emissiveIntensity={0.6} metalness={0.95} />
      </mesh>

      {/* Ambient Neon Floor Channel Guides (Dual-color Violet / Cyan) */}
      <mesh position={[-4.2, 0.015, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, 28]} />
        <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={2.0} />
      </mesh>
      <mesh position={[4.2, 0.015, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, 28]} />
        <meshStandardMaterial color="#22d3ee" emissive="#06b6d4" emissiveIntensity={2.0} />
      </mesh>

      {/* 2. Side Walls & Base Moldings — deep navy with subtle warmth */}
      <mesh position={[-8.8, 4, -10]}>
        <boxGeometry args={[0.4, 8.5, 28]} />
        <meshStandardMaterial color="#10122a" roughness={0.65} metalness={0.15} />
      </mesh>
      <mesh position={[8.8, 4, -10]}>
        <boxGeometry args={[0.4, 8.5, 28]} />
        <meshStandardMaterial color="#10122a" roughness={0.65} metalness={0.15} />
      </mesh>

      {/* 3. Vaulted Ceiling — deep indigo, not pure black */}
      <mesh position={[0, 8.2, -10]}>
        <boxGeometry args={[18, 0.5, 28]} />
        <meshStandardMaterial color="#0d0e22" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Modern Vault Rib Arches Overhead with Breathing Neon — alternating gold & violet */}
      {archPositions.map((zPos, i) => (
        <group key={`arch-${i}`} position={[0, 0, zPos]}>
          {/* Arch Beam */}
          <mesh position={[0, 7.8, 0]}>
            <boxGeometry args={[17.2, 0.28, 0.35]} />
            <meshStandardMaterial color="#181a30" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Neon Glow Strip running under the arch — alternate colors */}
          <mesh
            ref={(el) => (neonRibsRef.current[i] = el)}
            position={[0, 7.64, 0]}
          >
            <boxGeometry args={[16.8, 0.06, 0.1]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#fbbf24' : '#a78bfa'}
              emissive={i % 2 === 0 ? '#d4af37' : '#7c3aed'}
              emissiveIntensity={1.8}
            />
          </mesh>
        </group>
      ))}

      {/* 3b. Luxury Crystal Chandeliers along the Central Promenade */}
      {chandelierConfigs.map((config) => (
        <CrystalChandelier
          key={config.id}
          position={config.position}
          mountY={7.66}
          scale={config.scale}
          tiers={config.tiers}
          crystals={config.crystals}
          colorway={config.colorway}
          lightIntensity={config.lightIntensity}
          swaySpeed={config.swaySpeed}
          swayAmount={config.swayAmount}
          seed={config.seed}
        />
      ))}

      {/* 4. Flanking Cylindrical Architectural Columns with Gold Capitals */}
      {columnPositions.map((pos, i) => (
        <group key={`col-${i}`} position={[pos.x, 0, pos.z]}>
          {/* Main Round Column Shaft — richer deep slate blue */}
          <mesh position={[0, 4, 0]}>
            <cylinderGeometry args={[0.46, 0.52, 8, 32]} />
            <meshStandardMaterial color="#151829" metalness={0.55} roughness={0.3} />
          </mesh>
          {/* Column Base Tier 1 */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.65, 0.72, 0.4, 32]} />
            <meshStandardMaterial color="#1a1d32" metalness={0.7} roughness={0.25} />
          </mesh>
          {/* Gold Base Trim */}
          <mesh position={[0, 0.42, 0]}>
            <cylinderGeometry args={[0.54, 0.54, 0.06, 32]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Gold Capital at top */}
          <mesh position={[0, 7.7, 0]}>
            <cylinderGeometry args={[0.7, 0.54, 0.45, 32]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Vertical Neon Strip — left columns pink-rose, right columns teal-cyan */}
          <mesh position={[pos.x < 0 ? 0.48 : -0.48, 4, 0]}>
            <boxGeometry args={[0.035, 7.2, 0.09]} />
            <meshStandardMaterial
              color={pos.x < 0 ? '#f472b6' : '#22d3ee'}
              emissive={pos.x < 0 ? '#ec4899' : '#06b6d4'}
              emissiveIntensity={2.0}
            />
          </mesh>
        </group>
      ))}

      {/* 5. The Grand Stage & Kinetic Portal Core (z = -23.5) */}
      <group position={[0, 0, -23.5]}>
        {/* Back Wall — deep indigo-navy instead of black */}
        <mesh position={[0, 4, 0]}>
          <boxGeometry args={[18, 8.5, 0.5]} />
          <meshStandardMaterial color="#0a0c20" roughness={0.75} metalness={0.1} />
        </mesh>

        {/* Elevated VIP Main Stage — richer charcoal */}
        <mesh position={[0, 0.5, 2]}>
          <boxGeometry args={[10, 1.0, 4]} />
          <meshStandardMaterial color="#141628" metalness={0.8} roughness={0.15} />
        </mesh>
        {/* Stage Edge Gold Glow */}
        <mesh position={[0, 1.01, 3.98]}>
          <boxGeometry args={[9.9, 0.04, 0.06]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d4af37" emissiveIntensity={2.5} />
        </mesh>

        {/* Outer Kinetic Portal Halo Ring — brighter violet */}
        <mesh position={[0, 4.5, 0.4]}>
          <torusGeometry args={[3.2, 0.12, 16, 64]} />
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#7c3aed"
            emissiveIntensity={3.0}
          />
        </mesh>
        {/* Inner concentric gold ring */}
        <mesh position={[0, 4.5, 0.35]}>
          <torusGeometry args={[2.5, 0.06, 16, 64]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#d4af37"
            emissiveIntensity={2.5}
          />
        </mesh>

        {/* 3D Typographic Brand Emblem on Stage Wall */}
        <Text
          position={[0, 4.5, 0.45]}
          fontSize={0.85}
          color="#f4f4f5"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.2}
        >
          VIBE
        </Text>
      </group>
    </group>
  );
}
