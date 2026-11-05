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
      {/* 1. Global subtle ambient illumination with slight midnight violet tint */}
      <ambientLight intensity={0.28} color="#14142b" />

      {/* 2. Exterior entrance architectural warm spotlights */}
      <spotLight
        position={[0, 9, 8]}
        target-position={[0, 2, 4]}
        angle={0.6}
        penumbra={0.7}
        intensity={entranceState === 'outside' ? 3.0 : 0.8}
        color="#fef3c7"
        distance={25}
      />
      <pointLight position={[-3.8, 4.2, 5.8]} intensity={1.4} color="#f59e0b" distance={11} />
      <pointLight position={[3.8, 4.2, 5.8]} intensity={1.4} color="#f59e0b" distance={11} />

      {/* 3. Threshold warm gold floodlight */}
      <pointLight
        ref={thresholdLightRef}
        position={[0, 3.2, 2.5]}
        intensity={entranceState === 'outside' ? 0.9 : 3.8}
        color="#fbbf24"
        distance={20}
      />

      {/* 4. Cool dramatic architectural fill lights inside the hall */}
      <directionalLight
        position={[6, 14, -8]}
        intensity={1.2}
        color="#c7d2fe"
      />
      <directionalLight
        position={[-6, 14, -14]}
        intensity={1.0}
        color="#e0e7ff"
      />

      {/* 5. Deep hall cool blue point light for color temperature depth */}
      <pointLight
        position={[0, 5, -16]}
        intensity={1.2}
        color="#818cf8"
        distance={18}
      />

      {/* 6. Atmospheric depth fog */}
      <fog attach="fog" args={['#050508', 5, 34]} />
    </>
  );
}
