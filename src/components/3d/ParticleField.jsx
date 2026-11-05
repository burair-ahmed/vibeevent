import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField({ count = 180 }) {
  const pointsRef = useRef();

  // Create random initial positions and velocities
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread inside the Grand Hall corridor
      pos[i * 3] = (Math.random() - 0.5) * 14;     // x (-7 to 7)
      pos[i * 3 + 1] = Math.random() * 6.5 + 0.5;   // y (0.5 to 7)
      pos[i * 3 + 2] = -Math.random() * 22 + 2;    // z (-20 to 2)

      spd[i] = 0.15 + Math.random() * 0.35; // gentle upward drift
    }
    return [pos, spd];
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
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color="#fbbf24"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

