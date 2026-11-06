import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useExperienceStore } from '../../store/useExperienceStore';

export default function EnvironmentLights() {
  const { entranceState } = useExperienceStore();
  const thresholdLightRef = useRef();

  // Subtle breathing pulse on the threshold light to give the scene kinetic life
  useFrame((state) => {
    if (thresholdLightRef.current) {
      const time = state.clock.getElapsedTime();
      const baseIntensity = entranceState === 'outside' ? 0.9 : 3.8;
      thresholdLightRef.current.intensity = baseIntensity + Math.sin(time * 2.5) * 0.35;
    }
  });

  return (
    <>
      {/* 1. Richer ambient illumination — warm indigo-violet base wash */}
      <ambientLight intensity={0.55} color="#2a1f4e" />

      {/* 2. Exterior entrance architectural warm spotlights — brighter */}
      <spotLight
        position={[0, 9, 8]}
        target-position={[0, 2, 4]}
        angle={0.7}
        penumbra={0.6}
        intensity={entranceState === 'outside' ? 5.0 : 1.5}
        color="#fef3c7"
        distance={28}
      />
      <pointLight position={[-3.8, 4.2, 5.8]} intensity={2.8} color="#f59e0b" distance={13} />
      <pointLight position={[3.8, 4.2, 5.8]} intensity={2.8} color="#f59e0b" distance={13} />

      {/* Extra entrance fill — low warm wash on steps and courtyard */}
      <pointLight position={[0, 1.5, 7]} intensity={2.2} color="#fde68a" distance={10} />
      <spotLight
        position={[0, 6, 10]}
        target-position={[0, 0, 6]}
        angle={0.8}
        penumbra={0.8}
        intensity={entranceState === 'outside' ? 3.0 : 0.5}
        color="#e0c496"
        distance={18}
      />

      {/* 3. Threshold warm gold floodlight */}
      <pointLight
        ref={thresholdLightRef}
        position={[0, 3.2, 2.5]}
        intensity={entranceState === 'outside' ? 1.2 : 4.5}
        color="#fbbf24"
        distance={22}
      />

      {/* 4. Cool dramatic architectural fill lights inside the hall — brighter */}
      <directionalLight
        position={[6, 14, -8]}
        intensity={2.0}
        color="#c7d2fe"
      />
      <directionalLight
        position={[-6, 14, -14]}
        intensity={1.6}
        color="#e0e7ff"
      />

      {/* 5. Left wall warm-rose wash for color variety */}
      <pointLight
        position={[-8, 4, -6]}
        intensity={1.8}
        color="#f472b6"
        distance={14}
      />
      {/* Right wall teal-cyan wash */}
      <pointLight
        position={[8, 4, -6]}
        intensity={1.8}
        color="#22d3ee"
        distance={14}
      />

      {/* 6. Mid-hall warm amber fill to balance the cool top lights */}
      <pointLight
        position={[0, 3, -6]}
        intensity={2.0}
        color="#fbbf24"
        distance={16}
      />

      {/* 7. Deep hall violet-indigo point light for stage drama */}
      <pointLight
        position={[0, 5, -16]}
        intensity={2.0}
        color="#a78bfa"
        distance={20}
      />

      {/* 8. Stage warm accent to counterbalance the violet */}
      <pointLight
        position={[0, 3, -22]}
        intensity={2.2}
        color="#fb923c"
        distance={12}
      />

      {/* 9. Overhead broad hemisphere fill for a soft brighter ambient look */}
      <hemisphereLight
        args={['#312e81', '#1e1b4b', 0.4]}
      />

      {/* 10. Atmospheric depth fog — lighter & pulled further back */}
      <fog attach="fog" args={['#0c0a1a', 8, 40]} />
    </>
  );
}
