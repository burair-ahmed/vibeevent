import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

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
      {/* 1. Reflective Mirror-like Black Marble Floor */}
      <mesh position={[0, -0.01, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 28]} />
        <meshStandardMaterial
          color="#040508"
          roughness={0.04}
          metalness={0.96}
        />
      </mesh>

      {/* Central Golden Runway / Promenade Inlay */}
      <mesh position={[0, 0.005, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 28]} />
        <meshStandardMaterial
          color="#090a12"
          roughness={0.12}
          metalness={0.7}
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

      {/* Ambient Neon Floor Channel Guides (Soft Violet/Cyan) */}
      <mesh position={[-4.2, 0.015, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.03, 28]} />
        <meshStandardMaterial color="#818cf8" emissive="#6366f1" emissiveIntensity={1.4} />
      </mesh>
      <mesh position={[4.2, 0.015, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.03, 28]} />
        <meshStandardMaterial color="#818cf8" emissive="#6366f1" emissiveIntensity={1.4} />
      </mesh>

      {/* 2. Side Walls & Base Moldings */}
      <mesh position={[-8.8, 4, -10]}>
        <boxGeometry args={[0.4, 8.5, 28]} />
        <meshStandardMaterial color="#06070c" roughness={0.75} />
      </mesh>
      <mesh position={[8.8, 4, -10]}>
        <boxGeometry args={[0.4, 8.5, 28]} />
        <meshStandardMaterial color="#06070c" roughness={0.75} />
      </mesh>

      {/* 3. Vaulted Ceiling */}
      <mesh position={[0, 8.2, -10]}>
        <boxGeometry args={[18, 0.5, 28]} />
        <meshStandardMaterial color="#040407" roughness={0.85} />
      </mesh>

      {/* Modern Vault Rib Arches Overhead with Breathing Gold Neon */}
      {archPositions.map((zPos, i) => (
        <group key={`arch-${i}`} position={[0, 0, zPos]}>
          {/* Arch Beam */}
          <mesh position={[0, 7.8, 0]}>
            <boxGeometry args={[17.2, 0.28, 0.35]} />
            <meshStandardMaterial color="#0f1018" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Neon Glow Strip running under the arch */}
          <mesh
            ref={(el) => (neonRibsRef.current[i] = el)}
            position={[0, 7.64, 0]}
          >
            <boxGeometry args={[16.8, 0.05, 0.08]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#d4af37"
              emissiveIntensity={1.3}
            />
          </mesh>
        </group>
      ))}

      {/* 4. Flanking Cylindrical Architectural Columns with Gold Capitals */}
      {columnPositions.map((pos, i) => (
        <group key={`col-${i}`} position={[pos.x, 0, pos.z]}>
          {/* Main Round Column Shaft */}
          <mesh position={[0, 4, 0]}>
            <cylinderGeometry args={[0.46, 0.52, 8, 32]} />
            <meshStandardMaterial color="#0c0d14" metalness={0.5} roughness={0.35} />
          </mesh>
          {/* Column Base Tier 1 */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.65, 0.72, 0.4, 32]} />
            <meshStandardMaterial color="#11131c" metalness={0.7} roughness={0.25} />
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
          {/* Vertical Cyan Neon Strip Facing Interior */}
          <mesh position={[pos.x < 0 ? 0.48 : -0.48, 4, 0]}>
            <boxGeometry args={[0.03, 7.2, 0.08]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      ))}

      {/* 5. The Grand Stage & Kinetic Portal Core (z = -23.5) */}
      <group position={[0, 0, -23.5]}>
        {/* Back Wall */}
        <mesh position={[0, 4, 0]}>
          <boxGeometry args={[18, 8.5, 0.5]} />
          <meshStandardMaterial color="#030406" roughness={0.9} />
        </mesh>

        {/* Elevated VIP Main Stage */}
        <mesh position={[0, 0.5, 2]}>
          <boxGeometry args={[10, 1.0, 4]} />
          <meshStandardMaterial color="#0c0d14" metalness={0.8} roughness={0.15} />
        </mesh>
        {/* Stage Edge Gold Glow */}
        <mesh position={[0, 1.01, 3.98]}>
          <boxGeometry args={[9.9, 0.04, 0.06]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d4af37" emissiveIntensity={2.2} />
        </mesh>

        {/* Outer Kinetic Portal Halo Ring */}
        <mesh position={[0, 4.5, 0.4]}>
          <torusGeometry args={[3.2, 0.12, 16, 64]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#6366f1"
            emissiveIntensity={2.5}
          />
        </mesh>
        {/* Inner concentric gold ring */}
        <mesh position={[0, 4.5, 0.35]}>
          <torusGeometry args={[2.5, 0.06, 16, 64]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#d4af37"
            emissiveIntensity={2.0}
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
