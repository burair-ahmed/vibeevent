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
  const materialsRef = useRef({ gold: null, crystal: null });

  // ── Pendulum physics state ──────────────────────────────────────────────────
  // Each axis: angle (rad), angular velocity (rad/s)
  // The chandelier hangs from a fixed ceiling point like a physical pendulum.
  //   α = -(g/L)·sin(θ) - damping·ω + turbulence
  // We use a lightweight Euler integration at frame-rate for responsiveness.
  const pendulumRef = useRef({
    // Z-axis pendulum (side-to-side)
    zAngle: 0,
    zVel: 0,
    // X-axis pendulum (front-to-back)
    xAngle: 0,
    xVel: 0,
  });
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

    // Enhance materials for luxury PBR realism
    asset.traverse((child) => {
      if (child.isMesh && child.material) {
        if (child.name === 'rose' || child.name === 'frame') {
          // Rich polished gold metal with warm specular reflection
          const goldMat = child.material.clone();
          goldMat.metalness = 0.84;
          goldMat.roughness = 0.22;
          goldMat.envMapIntensity = 1.5;
          goldMat.emissive = new THREE.Color('#d4af37');
          goldMat.emissiveIntensity = 0.35;
          child.material = goldMat;
          materialsRef.current.gold = goldMat;
        } else if (child.name === 'crystals') {
          // Glistening refractive cut crystal with high specular highlights
          const crystalMat = child.material.clone();
          crystalMat.metalness = 0.12;
          crystalMat.roughness = 0.04;
          crystalMat.envMapIntensity = 2.4;
          crystalMat.transparent = true;
          crystalMat.opacity = 0.94;
          child.material = crystalMat;
          materialsRef.current.crystal = crystalMat;
        }
      }
    });

    // Polyfork tick is a no-op — swing is driven by the pendulum ODE in useFrame
    asset.userData.tick = () => {};

    return asset;
  }, [colorway, tiers, crystals, swaySpeed, swayAmount, seed]);

  // Keep swingRef updated whenever chandelierGroup changes
  useEffect(() => {
    if (chandelierGroup) {
      swingRef.current = chandelierGroup.getObjectByName('swing');
    }
  }, [chandelierGroup]);

  // Compute calculated base Y so the ceiling rose flush mounts to mountY
  // In the model, the ceiling rose sits at local y = 4.0.
  // When scaled by `scale`, local y = 4.0 corresponds to 4.0 * scale.
  // Thus group Y = mountY - 4.0 * scale.
  const calculatedY = mountY - 4.0 * scale;
  const finalPosition = [position[0], calculatedY, position[2]];

  // Track last time for delta-time integration
  const lastTimeRef = useRef(0);

  // Frame update: animated candlelight flickering, breathing, and physical pendulum sway
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Clamp dt to avoid physics blow-up on tab-hidden resume
    const dt = Math.min(time - lastTimeRef.current, 0.05);
    lastTimeRef.current = time;

    // ── 1. True Damped Pendulum Physics ────────────────────────────────────
    // Physical parameters — tune here for feel
    const G_OVER_L  = 1.6 * swaySpeed * swaySpeed; // effective gravity/length  (higher = faster)
    const DAMPING   = 0.18;                          // angular damping coefficient (energy loss per second)
    const MAX_ANGLE = 0.12 * swayAmount;             // hard clamp so it never swings wildly

    // Slow Perlin-like air-current turbulence (layered sines, non-repeating phases)
    const turbZ =
      Math.sin(time * 0.31 * swaySpeed + seed * 2.1) * 0.00018 * swayAmount +
      Math.sin(time * 0.73 * swaySpeed + seed * 5.3) * 0.00009 * swayAmount;
    const turbX =
      Math.cos(time * 0.27 * swaySpeed + seed * 3.7) * 0.00014 * swayAmount +
      Math.cos(time * 0.59 * swaySpeed + seed * 7.1) * 0.00007 * swayAmount;

    const p = pendulumRef.current;

    // Euler integration — Z axis
    const zAcc = -G_OVER_L * Math.sin(p.zAngle) - DAMPING * p.zVel + turbZ / dt;
    p.zVel += zAcc * dt;
    p.zAngle += p.zVel * dt;
    p.zAngle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, p.zAngle));

    // Euler integration — X axis
    const xAcc = -G_OVER_L * Math.sin(p.xAngle) - DAMPING * p.xVel + turbX / dt;
    p.xVel += xAcc * dt;
    p.xAngle += p.xVel * dt;
    p.xAngle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, p.xAngle));

    const swing = swingRef.current || chandelierGroup.getObjectByName('swing');
    if (swing) {
      swing.rotation.z = p.zAngle;
      swing.rotation.x = p.xAngle;
    }

    // 2. Multi-frequency Procedural Candlelight Flame Flicker
    // Layer high-speed flame flutter + medium breathing + slow warmth pulse
    const microFlicker =
      Math.sin(time * 16.0 + seed * 3.1) * 0.08 +
      Math.cos(time * 26.5 + seed * 5.7) * 0.05 +
      Math.sin(time * 43.0 + seed * 8.9) * 0.03;
    const breathing = Math.sin(time * 2.2 + seed) * 0.16;
    const hoverBoost = hovered ? 0.35 : 0.0;
    const totalFlicker = 1.0 + microFlicker + breathing + hoverBoost;

    // Apply to central candlelight
    if (pointLightRef.current) {
      pointLightRef.current.intensity = lightIntensity * totalFlicker;
    }

    // Subtle glow core expansion
    if (glowMeshRef.current) {
      const glowScale = 1.0 + (microFlicker + breathing) * 0.2 + (hovered ? 0.25 : 0);
      glowMeshRef.current.scale.set(glowScale, glowScale, glowScale);
    }

    // Modulate gold frame emissive glow with the candlelight flicker
    if (materialsRef.current.gold) {
      materialsRef.current.gold.emissiveIntensity = 0.35 + breathing * 0.15 + (hovered ? 0.3 : 0);
    }

    // Slowly rotate sparkling crystal glints
    if (sparklesGroupRef.current) {
      sparklesGroupRef.current.rotation.y = time * 0.35;
    }
  });

  // Interactive Click: chime sound and angular-velocity impulse into pendulum
  const handleClick = (e) => {
    e.stopPropagation();
    sound.playChandelierChime();
    // Kick angular velocity — the pendulum physics will carry it naturally
    const p = pendulumRef.current;
    p.zVel += (Math.random() > 0.5 ? 1 : -1) * 0.22 * swayAmount;
    p.xVel += (Math.random() > 0.5 ? 1 : -1) * 0.16 * swayAmount;
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
