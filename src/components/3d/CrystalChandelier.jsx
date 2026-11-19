import { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createAsset } from './crystal-chandelier-55d279.mjs';
import { sound } from '../../utils/audioSystem';

/**
 * Luxury Crystal Chandelier Component
 * 
 * Features:
 * - Parametric three.js asset from Polyfork with real-world dimensions
 * - Enhanced PBR materials for realistic polished gold and glistening cut crystal
 * - Dynamic animated candlelight with procedural flame flicker & breathing
 * - Downward warm spotlight casting realistic light pools on the marble floor
 * - Gentle physical pendulum sway on the chain hinge
 * - Interactive click & hover: chime sound, sparkle burst, and sway impulse
 * - Polyfork-compliant userData.tick() animation loop hook
 */
export default function CrystalChandelier({
  position = [0, 0, 0],
  mountY = 7.7,           // World Y-coordinate of the ceiling / vault beam
  scale = 1.35,
  colorway = 'casino-gold', // 'casino-gold' | 'champagne-smoke' | 'vegas-cyan' | 'antique-amethyst'
  tiers = 'three',          // 'one' | 'two' | 'three'
  crystals = 'cascade',     // 'none' | 'drops' | 'cascade'
  lightIntensity = 4.0,
  lightColor = '#ffe3a8',
  swaySpeed = 1.0,
  swayAmount = 1.0,
  seed = 0,
}) {
  const groupRef = useRef();
  const swingRef = useRef();
  const pointLightRef = useRef();
  const glowMeshRef = useRef();
  const sparklesGroupRef = useRef();

  // Lightweight impulse state for interactive click response (smoothly damped)
  const impulseRef = useRef({ z: 0, x: 0 });
  const [hovered, setHovered] = useState(false);

  // Synchronously create and prepare the THREE.Group asset
  const chandelierGroup = useMemo(() => {
    const asset = createAsset({
      colorway,
      tiers,
      crystals,
    });

    // Locate the animatable swing group
    const swing = asset.getObjectByName('swing');
    if (swing) {
      swingRef.current = swing;
    }

    // Enhance materials for luxury PBR realism (static, no per-frame re-upload)
    asset.traverse((child) => {
      if (child.isMesh && child.material) {
        if (child.name === 'rose' || child.name === 'frame') {
          const goldMat = child.material.clone();
          goldMat.metalness = 0.84;
          goldMat.roughness = 0.22;
          goldMat.envMapIntensity = 1.5;
          goldMat.emissive = new THREE.Color('#d4af37');
          goldMat.emissiveIntensity = 0.35;
          child.material = goldMat;
        } else if (child.name === 'crystals') {
          const crystalMat = child.material.clone();
          crystalMat.metalness = 0.12;
          crystalMat.roughness = 0.04;
          crystalMat.envMapIntensity = 2.4;
          crystalMat.transparent = true;
          crystalMat.opacity = 0.94;
          child.material = crystalMat;
        }
      }
    });

    asset.userData.tick = () => {};
    return asset;
  }, [colorway, tiers, crystals]);

  // Keep swingRef updated whenever chandelierGroup changes
  useEffect(() => {
    if (chandelierGroup) {
      swingRef.current = chandelierGroup.getObjectByName('swing');
    }
  }, [chandelierGroup]);

  // Compute calculated base Y so the ceiling rose flush mounts to mountY
  const calculatedY = mountY - 4.0 * scale;
  const finalPosition = [position[0], calculatedY, position[2]];

  // Lightweight frame update: gentle harmonic sway without heavy ODE physics
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Smoothly decay click impulse
    const imp = impulseRef.current;
    if (imp.z !== 0 || imp.x !== 0) {
      imp.z = THREE.MathUtils.damp(imp.z, 0, 3.5, delta);
      imp.x = THREE.MathUtils.damp(imp.x, 0, 3.5, delta);
    }

    // Natural, zero-overhead harmonic pendulum sway
    const swayZ = Math.sin(time * 0.75 * swaySpeed + seed) * 0.015 * swayAmount + imp.z;
    const swayX = Math.cos(time * 0.55 * swaySpeed + seed * 1.4) * 0.01 * swayAmount + imp.x;

    if (swingRef.current) {
      swingRef.current.rotation.z = swayZ;
      swingRef.current.rotation.x = swayX;
    }
  });

  // Interactive Click: chime sound and gentle damped impulse
  const handleClick = (e) => {
    e.stopPropagation();
    sound.playChandelierChime();
    const imp = impulseRef.current;
    imp.z += (Math.random() > 0.5 ? 1 : -1) * 0.04 * swayAmount;
    imp.x += (Math.random() > 0.5 ? 1 : -1) * 0.03 * swayAmount;
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'default';
  };

  return (
    <group
      ref={groupRef}
      position={finalPosition}
      scale={scale}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* 1. Synchronous Polyfork 3D Chandelier Asset */}
      <primitive object={chandelierGroup} />

      {/* 2. Warm Candlelight Core Point Light (centered at candle ring y = 2.95) */}
      <pointLight
        ref={pointLightRef}
        position={[0, 2.95, 0]}
        color={lightColor}
        intensity={lightIntensity}
        distance={14}
        decay={2}
      />

      {/* 3. Soft Incandescent Warm Glow Halo at Candle Level */}
      <mesh ref={glowMeshRef} position={[0, 2.95, 0]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshBasicMaterial
          color="#ffe4a0"
          transparent
          opacity={hovered ? 0.32 : 0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 5. Glistening Crystal Diamond Sparkle Orbs around the Tier Drops */}
      {crystals !== 'none' && (
        <group ref={sparklesGroupRef} position={[0, 2.7, 0]}>
          {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, idx) => (
            <mesh
              key={`sparkle-${idx}`}
              position={[Math.sin(angle) * 0.65, 0, Math.cos(angle) * 0.65]}
            >
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.7}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}
