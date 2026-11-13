import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
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

  // Procedural woven royal velvet carpet texture & pile bump map
  const { carpetTexture, carpetBumpMap } = useMemo(() => {
    // 1. Color texture with rich velvet crimson & woven fiber variation
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Rich deep ruby-crimson base
    ctx.fillStyle = '#8e1222';
    ctx.fillRect(0, 0, 256, 256);

    const imgData = ctx.getImageData(0, 0, 256, 256);
    const data = imgData.data;

    // 2. High-frequency bump map canvas for authentic velvet pile micro-depth
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 128;
    bumpCanvas.height = 128;
    const bumpCtx = bumpCanvas.getContext('2d');
    const bumpImgData = bumpCtx.createImageData(128, 128);
    const bumpData = bumpImgData.data;

    for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 256; x++) {
        const idx = (y * 256 + x) * 4;
        // Fine cross-stitch weave modulation
        const weave = Math.sin(x * 0.7) * Math.cos(y * 0.7) * 14;
        const noise = (Math.random() - 0.5) * 22;
        const variation = weave + noise;

        // Royal velvet red: base RGB (144, 18, 34)
        data[idx] = Math.min(255, Math.max(0, 142 + variation * 0.95)); // R
        data[idx + 1] = Math.min(255, Math.max(0, 18 + variation * 0.25)); // G
        data[idx + 2] = Math.min(255, Math.max(0, 32 + variation * 0.35)); // B
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Generate fiber pile noise for bump map
    for (let i = 0; i < 128 * 128; i++) {
      const bIdx = i * 4;
      const bVal = Math.min(255, Math.max(0, 128 + Math.floor((Math.random() - 0.5) * 85)));
      bumpData[bIdx] = bVal;
      bumpData[bIdx + 1] = bVal;
      bumpData[bIdx + 2] = bVal;
      bumpData[bIdx + 3] = 255;
    }
    bumpCtx.putImageData(bumpImgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 112); // repeats seamlessly across 4.2m x 28m runner

    const bump = new THREE.CanvasTexture(bumpCanvas);
    bump.wrapS = THREE.RepeatWrapping;
    bump.wrapT = THREE.RepeatWrapping;
    bump.repeat.set(24, 168);

    return { carpetTexture: texture, carpetBumpMap: bump };
  }, []);

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
      {/* 1. Reflective White Marble Floor — luxury gallery marble with delicate reflections */}
      <mesh position={[0, -0.01, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 28]} />
        <meshStandardMaterial
          color="#f4f5f8"
          roughness={0.06}
          metalness={0.18}
        />
      </mesh>

      {/* Central Royal Red Velvet Carpet Runner */}
      <mesh position={[0, 0.008, -10]}>
        <boxGeometry args={[4.2, 0.016, 28]} />
        <meshStandardMaterial
          map={carpetTexture}
          bumpMap={carpetBumpMap}
          bumpScale={0.035}
          roughness={0.94}
          metalness={0.02}
        />
      </mesh>

      {/* Runway Gold Border Strips — elevated ABOVE the red carpet */}
      <mesh position={[-2.08, 0.022, -10]}>
        <boxGeometry args={[0.08, 0.012, 28]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#b3883a"
          emissiveIntensity={0.55}
          metalness={0.96}
          roughness={0.15}
        />
      </mesh>
      <mesh position={[2.08, 0.022, -10]}>
        <boxGeometry args={[0.08, 0.012, 28]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#b3883a"
          emissiveIntensity={0.55}
          metalness={0.96}
          roughness={0.15}
        />
      </mesh>

      {/* Gold End Threshold Bars Capping the Carpet Ends */}
      <mesh position={[0, 0.022, 3.98]}>
        <boxGeometry args={[4.24, 0.012, 0.08]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#b3883a"
          emissiveIntensity={0.55}
          metalness={0.96}
          roughness={0.15}
        />
      </mesh>
      <mesh position={[0, 0.022, -23.98]}>
        <boxGeometry args={[4.24, 0.012, 0.08]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#b3883a"
          emissiveIntensity={0.55}
          metalness={0.96}
          roughness={0.15}
        />
      </mesh>

      {/* Ambient Gold Recessed Floor Channel Guides */}
      <mesh position={[-4.2, 0.015, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, 28]} />
        <meshStandardMaterial color="#fbbf24" emissive="#d4af37" emissiveIntensity={1.8} />
      </mesh>
      <mesh position={[4.2, 0.015, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, 28]} />
        <meshStandardMaterial color="#fbbf24" emissive="#d4af37" emissiveIntensity={1.8} />
      </mesh>

      {/* 2. Side Walls & Base Moldings — pristine architectural white theme */}
      <mesh position={[-8.8, 4, -10]}>
        <boxGeometry args={[0.4, 8.5, 28]} />
        <meshStandardMaterial color="#fafafc" roughness={0.35} metalness={0.04} />
      </mesh>
      <mesh position={[8.8, 4, -10]}>
        <boxGeometry args={[0.4, 8.5, 28]} />
        <meshStandardMaterial color="#fafafc" roughness={0.35} metalness={0.04} />
      </mesh>

      {/* Architectural Gold Baseboard Trim along the white walls */}
      <mesh position={[-8.55, 0.16, -10]}>
        <boxGeometry args={[0.12, 0.32, 28]} />
        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.18} />
      </mesh>
      <mesh position={[8.55, 0.16, -10]}>
        <boxGeometry args={[0.12, 0.32, 28]} />
        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.18} />
      </mesh>

      {/* Architectural Upper Crown Molding along the white walls */}
      <mesh position={[-8.55, 7.8, -10]}>
        <boxGeometry args={[0.12, 0.25, 28]} />
        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.18} />
      </mesh>
      <mesh position={[8.55, 7.8, -10]}>
        <boxGeometry args={[0.12, 0.25, 28]} />
        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.18} />
      </mesh>

      {/* 3. Vaulted Ceiling — alabaster white */}
      <mesh position={[0, 8.2, -10]}>
        <boxGeometry args={[18, 0.5, 28]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.5} metalness={0.05} />
      </mesh>

      {/* Modern Vault Rib Arches Overhead — white beams with radiant gold illumination */}
      {archPositions.map((zPos, i) => (
        <group key={`arch-${i}`} position={[0, 0, zPos]}>
          {/* Arch Beam */}
          <mesh position={[0, 7.8, 0]}>
            <boxGeometry args={[17.2, 0.28, 0.35]} />
            <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.25} />
          </mesh>
          {/* Neon Glow Strip running under the arch — warm gold & champagne */}
          <mesh
            ref={(el) => (neonRibsRef.current[i] = el)}
            position={[0, 7.64, 0]}
          >
            <boxGeometry args={[16.8, 0.06, 0.1]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#fbbf24' : '#fde68a'}
              emissive={i % 2 === 0 ? '#d4af37' : '#f59e0b'}
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

      {/* 4. Flanking Cylindrical Architectural Columns: Off-White with 2 Golden Rings at bottom */}
      {columnPositions.map((pos, i) => (
        <group key={`col-${i}`} position={[pos.x, 0, pos.z]}>
          {/* Main Round Column Shaft — elegant off-white marble / alabaster */}
          <mesh position={[0, 4.05, 0]}>
            <cylinderGeometry args={[0.46, 0.50, 6.9, 36]} />
            <meshStandardMaterial color="#f5f2ec" metalness={0.08} roughness={0.22} />
          </mesh>

          {/* Column Base Pedestal Tier (Floor Plinth) — off-white marble */}
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.70, 0.76, 0.24, 36]} />
            <meshStandardMaterial color="#f2eee6" metalness={0.08} roughness={0.25} />
          </mesh>

          {/* GOLDEN RING 1 (Bottom Ring) */}
          <mesh position={[0, 0.28, 0]}>
            <cylinderGeometry args={[0.65, 0.65, 0.09, 36]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#b45309"
              emissiveIntensity={0.25}
              metalness={0.96}
              roughness={0.14}
            />
          </mesh>
          <mesh position={[0, 0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.62, 0.045, 16, 36]} />
            <meshStandardMaterial color="#d4af37" metalness={0.96} roughness={0.14} />
          </mesh>

          {/* Off-White Column Collar (Spacer between the 2 golden rings) */}
          <mesh position={[0, 0.42, 0]}>
            <cylinderGeometry args={[0.56, 0.60, 0.18, 36]} />
            <meshStandardMaterial color="#f5f2ec" metalness={0.08} roughness={0.22} />
          </mesh>

          {/* GOLDEN RING 2 (Upper Ring) */}
          <mesh position={[0, 0.56, 0]}>
            <cylinderGeometry args={[0.55, 0.55, 0.08, 36]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#b45309"
              emissiveIntensity={0.25}
              metalness={0.96}
              roughness={0.14}
            />
          </mesh>
          <mesh position={[0, 0.56, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.52, 0.04, 16, 36]} />
            <meshStandardMaterial color="#d4af37" metalness={0.96} roughness={0.14} />
          </mesh>

          {/* Golden Capital at top */}
          <mesh position={[0, 7.7, 0]}>
            <cylinderGeometry args={[0.7, 0.52, 0.42, 36]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.18} />
          </mesh>

          {/* Vertical Architectural Fluting — elegant warm gold accent */}
          <mesh position={[pos.x < 0 ? 0.47 : -0.47, 4.05, 0]}>
            <boxGeometry args={[0.03, 6.7, 0.07]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#d4af37"
              emissiveIntensity={0.7}
              metalness={0.9}
            />
          </mesh>
        </group>
      ))}

      {/* 5. The Grand Stage & Kinetic Portal Core (z = -23.5) */}
      <group position={[0, 0, -23.5]}>
        {/* Back Wall — pristine white architectural gallery wall */}
        <mesh position={[0, 4, 0]}>
          <boxGeometry args={[18, 8.5, 0.5]} />
          <meshStandardMaterial color="#fafafc" roughness={0.35} metalness={0.04} />
        </mesh>

        {/* Elevated VIP Main Stage — pristine white marble */}
        <mesh position={[0, 0.5, 2]}>
          <boxGeometry args={[10, 1.0, 4]} />
          <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.12} />
        </mesh>
        {/* Stage Edge Gold Glow */}
        <mesh position={[0, 1.01, 3.98]}>
          <boxGeometry args={[9.9, 0.04, 0.06]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d4af37" emissiveIntensity={2.5} />
        </mesh>

        {/* Outer Kinetic Portal Halo Ring — radiant luxury gold */}
        <mesh position={[0, 4.5, 0.4]}>
          <torusGeometry args={[3.2, 0.12, 16, 64]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#d4af37"
            emissiveIntensity={2.8}
          />
        </mesh>
        {/* Inner concentric gold ring */}
        <mesh position={[0, 4.5, 0.35]}>
          <torusGeometry args={[2.5, 0.06, 16, 64]} />
          <meshStandardMaterial
            color="#fde68a"
            emissive="#f59e0b"
            emissiveIntensity={2.2}
          />
        </mesh>

        {/* 3D Typographic Brand Emblem on Stage Wall — polished metallic gold */}
        <Text
          position={[0, 4.5, 0.45]}
          fontSize={0.85}
          color="#d4af37"
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
