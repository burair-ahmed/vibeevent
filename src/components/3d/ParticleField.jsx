import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField({ count = 180 }) {
  const pointsRef = useRef();

  // Create random initial positions, velocities, and per-particle colors
  const [positions, speeds, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const col = new Float32Array(count * 3);

    // Color palette: gold, cyan, rose-pink, violet, white
    const palette = [
      [1.0, 0.75, 0.15],   // Gold
      [0.13, 0.83, 0.93],  // Cyan
      [0.96, 0.45, 0.72],  // Rose-pink
      [0.66, 0.55, 0.98],  // Violet
      [1.0, 0.97, 0.92],   // Warm white
    ];

    for (let i = 0; i < count; i++) {
      // Spread inside the Grand Hall corridor
      pos[i * 3] = (Math.random() - 0.5) * 14;     // x (-7 to 7)
      pos[i * 3 + 1] = Math.random() * 6.5 + 0.5;   // y (0.5 to 7)
      pos[i * 3 + 2] = -Math.random() * 22 + 2;    // z (-20 to 2)

      spd[i] = 0.15 + Math.random() * 0.35; // gentle upward drift

      // Pick a random color from the palette
      const c = palette[Math.floor(Math.random() * palette.length)];
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
      // Drift upwards gently
      posArr[i * 3 + 1] += speeds[i] * delta * 0.8;
      // Soft gentle horizontal drift
      posArr[i * 3] += Math.sin(posArr[i * 3 + 1] * 2 + i) * 0.003;

      // Wrap around if reaches the top
      if (posArr[i * 3 + 1] > 7.2) {
        posArr[i * 3 + 1] = 0.5;
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
        size={0.07}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

