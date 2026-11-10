import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Lightweight Atmospheric Gold Dust Bokeh
 * Optimized: minimal particle count (default 30) and zero heavy math per frame
 */
export default function ParticleField({ count = 30 }) {
  const pointsRef = useRef();

  // Create random initial positions, velocities, and per-particle colors
  const [positions, speeds, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const col = new Float32Array(count * 3);

    const palette = [
      [1.0, 0.85, 0.35], // Luxury warm gold
      [0.98, 0.95, 0.9],  // Soft champagne white
      [0.92, 0.68, 0.2],  // Amber gold
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;     // x (-6 to 6)
      pos[i * 3 + 1] = Math.random() * 6.0 + 1.0;  // y (1 to 7)
      pos[i * 3 + 2] = -Math.random() * 22 + 2;    // z (-20 to 2)

      spd[i] = 0.12 + Math.random() * 0.22; // gentle upward drift

      const c = palette[i % palette.length];
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }
    return [pos, spd, col];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posArr = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += speeds[i] * delta * 0.5;
      if (posArr[i * 3 + 1] > 7.0) {
        posArr[i * 3 + 1] = 0.8;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
