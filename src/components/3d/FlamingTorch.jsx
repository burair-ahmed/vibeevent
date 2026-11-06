import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Animated flaming torch with bracket, bowl, multi-layer flame, spark particles,
 * and a flickering point light.
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

  useFrame((state) => {
    const time = state.clock.getElapsedTime() + phase;

    // Animate flame particles
    if (flameParticlesRef.current) {
      const posArr = flameParticlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 1] += speeds[i] * 0.012;
        posArr[i * 3] += Math.sin(time * 8 + i * 1.7) * 0.003;
        posArr[i * 3 + 2] += Math.cos(time * 6 + i * 2.3) * 0.002;
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
        lightIntensity +
        Math.sin(time * 12) * 0.8 +
        Math.sin(time * 18.3) * 0.5 +
        Math.sin(time * 7.1) * 0.6;
    }
  });

  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
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

