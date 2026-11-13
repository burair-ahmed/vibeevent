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
      {/* 1. Luminous ambient illumination — warm ivory base wash for white theme */}
      <ambientLight intensity={entranceState === 'outside' ? 0.55 : 0.72} color={entranceState === 'outside' ? '#2a1f4e' : '#fffcf7'} />

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

      {/* 4. Architectural soft white & champagne fill lights inside the hall */}
      <directionalLight
        position={[6, 14, -8]}
        intensity={1.8}
        color="#fffdfa"
      />
      <directionalLight
        position={[-6, 14, -14]}
        intensity={1.5}
        color="#ffffff"
      />

      {/* 5. Left wall warm champagne wash */}
      <pointLight
        position={[-8, 4, -6]}
        intensity={1.4}
        color="#fef3c7"
        distance={14}
      />
      {/* Right wall pearl white wash */}
      <pointLight
        position={[8, 4, -6]}
        intensity={1.4}
        color="#fdf4ff"
        distance={14}
      />

      {/* 6. Mid-hall warm golden accent */}
      <pointLight
        position={[0, 3, -6]}
        intensity={1.8}
        color="#fbbf24"
        distance={16}
      />

      {/* 7. Deep hall warm gold ambiance for stage */}
      <pointLight
        position={[0, 5, -16]}
        intensity={1.8}
        color="#fde047"
        distance={20}
      />

      {/* 8. Stage warm accent */}
      <pointLight
        position={[0, 3, -22]}
        intensity={2.2}
        color="#fbbf24"
        distance={12}
      />

      {/* 9. Overhead broad hemisphere fill — soft sky white & champagne floor bounce */}
      <hemisphereLight
        args={[
          entranceState === 'outside' ? '#312e81' : '#ffffff',
          entranceState === 'outside' ? '#1e1b4b' : '#fef3c7',
          entranceState === 'outside' ? 0.4 : 0.65,
        ]}
      />

      {/* 10. Atmospheric depth fog */}
      <fog
        attach="fog"
        args={[
          entranceState === 'outside' ? '#0c0a1a' : '#f8f8fb',
          entranceState === 'outside' ? 8 : 22,
          entranceState === 'outside' ? 40 : 65,
        ]}
      />
    </>
  );
}
