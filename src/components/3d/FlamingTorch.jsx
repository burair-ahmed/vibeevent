import { useRef, useMemo, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Interactive animated flaming torch — click to toggle fire on/off
 * with a smooth ignite / extinguish animation.
 *
 * @param {Object}  props
 * @param {Array}   props.position  - [x, y, z] world position
 * @param {number}  [props.scale]   - uniform scale (default 1)
 * @param {number}  [props.rotationY] - Y-axis rotation so the arm faces the right direction
 * @param {number}  [props.lightIntensity] - base intensity of the flicker light (default 3.5)
 * @param {number}  [props.lightDistance]  - reach of the flicker light (default 8)
 */
export default function FlamingTorch({
  position,
  scale = 1,
  rotationY = 0,
  lightIntensity = 3.5,
  lightDistance = 8,
}) {
  const flameParticlesRef = useRef();
  const flickerLightRef = useRef();
  const flameCoreRef = useRef();
  const flameMidRef = useRef();
  const flameOuterRef = useRef();
  const groupRef = useRef();

  // Toggle state: true = lit, false = extinguished
  const [lit, setLit] = useState(true);

  // Smooth transition factor animated in useFrame (0 = off, 1 = fully lit)
  const flameFactor = useRef(1);

  // Click handler — toggle the fire
  const handleClick = useCallback((e) => {
    e.stopPropagation();
    setLit((prev) => !prev);
  }, []);

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

  // Unique phase offset so torches don't flicker in sync
  const phase = useMemo(() => Math.random() * 100, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime() + phase;

    // --- Smooth transition: lerp flameFactor toward target (lit ? 1 : 0) ---
    const target = lit ? 1 : 0;
    // Different speeds for ignite vs extinguish (extinguish is a bit faster)
    const speed = lit ? 2.5 : 3.5;
    flameFactor.current += (target - flameFactor.current) * Math.min(delta * speed, 1);
    // Clamp to avoid floating-point jitter
    if (Math.abs(flameFactor.current - target) < 0.001) flameFactor.current = target;

    const f = flameFactor.current; // 0..1 blend factor

    // --- Animate flame particles (speed & reset scaled by factor) ---
    if (flameParticlesRef.current) {
      const posArr = flameParticlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        // Particles still rise but much slower when extinguishing, allowing them to drift up and vanish
        posArr[i * 3 + 1] += speeds[i] * 0.012 * (f * 0.9 + 0.1);
        posArr[i * 3] += Math.sin(time * 8 + i * 1.7) * 0.003 * f;
        posArr[i * 3 + 2] += Math.cos(time * 6 + i * 2.3) * 0.002 * f;

        // Reset height — when off, particles collapse quickly to 0
        const resetHeight = 0.65 * f + 0.05 * (1 - f);
        if (posArr[i * 3 + 1] > resetHeight) {
          if (f > 0.05) {
            posArr[i * 3] = (Math.random() - 0.5) * 0.12 * f;
            posArr[i * 3 + 1] = 0;
            posArr[i * 3 + 2] = (Math.random() - 0.5) * 0.12 * f;
          } else {
            // When fully off, park particles at origin (invisible)
            posArr[i * 3] = 0;
            posArr[i * 3 + 1] = 0;
            posArr[i * 3 + 2] = 0;
          }
        }
      }
      flameParticlesRef.current.geometry.attributes.position.needsUpdate = true;

      // Fade particle material opacity
      const pMat = flameParticlesRef.current.material;
      if (pMat) pMat.opacity = 0.85 * f;
    }

    // --- Scale & fade the flame meshes ---
    const flameScale = Math.max(f, 0.001); // avoid zero-scale warnings
    if (flameCoreRef.current) {
      flameCoreRef.current.scale.setScalar(flameScale);
      flameCoreRef.current.material.opacity = 0.95 * f;
      flameCoreRef.current.material.emissiveIntensity = 4.0 * f;
    }
    if (flameMidRef.current) {
      flameMidRef.current.scale.setScalar(flameScale);
      flameMidRef.current.material.opacity = 0.7 * f;
      flameMidRef.current.material.emissiveIntensity = 3.0 * f;
    }
    if (flameOuterRef.current) {
      flameOuterRef.current.scale.setScalar(flameScale * 1.1); // slight overshoot for glow
      flameOuterRef.current.material.opacity = 0.2 * f;
    }

    // --- Flicker the point light (intensity drops to 0 when off) ---
    if (flickerLightRef.current) {
      const flicker =
        Math.sin(time * 12) * 0.8 +
        Math.sin(time * 18.3) * 0.5 +
        Math.sin(time * 7.1) * 0.6;
      flickerLightRef.current.intensity = (lightIntensity + flicker) * f;
      flickerLightRef.current.distance = lightDistance * f;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* Clickable hit area — invisible box around the torch for easy clicking */}
      <mesh
        position={[0, 0.35, 0.2]}
        onClick={handleClick}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <boxGeometry args={[0.4, 0.9, 0.5]} />
        <meshBasicMaterial visible={false} />
      </mesh>

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

      {/* Inner flame core glow */}
      <mesh ref={flameCoreRef} position={[0, 0.52, 0.32]}>
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
      <mesh ref={flameMidRef} position={[0, 0.58, 0.32]}>
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
      <mesh ref={flameOuterRef} position={[0, 0.55, 0.32]}>
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

      {/* Dynamic flickering point light */}
      <pointLight
        ref={flickerLightRef}
        position={[0, 0.6, 0.32]}
        color="#ff9f43"
        intensity={lightIntensity}
        distance={lightDistance}
        decay={2}
      />
    </group>
  );
}
