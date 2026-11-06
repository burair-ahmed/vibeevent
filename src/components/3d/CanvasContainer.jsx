import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraController from './CameraController';
import EnvironmentLights from './EnvironmentLights';
import ExteriorEntrance from './ExteriorEntrance';
import GrandHall from './GrandHall';
import ParticleField from './ParticleField';
import ServicePod from './ServicePod';
import GroundHotspots from './GroundHotspots';
import { SERVICES_DATA } from '../../data/servicesData';
import { useExperienceStore } from '../../store/useExperienceStore';

export default function CanvasContainer() {
  const { entranceState } = useExperienceStore();

  return (
    <div className="absolute inset-0 w-full h-full bg-[#0a0b1a] overflow-hidden">
      <Canvas
        camera={{
          position: [0, 2, 11.5],
          fov: 50,
          near: 0.1,
          far: 60,
        }}
        dpr={[1, 1.75]} // Adaptive DPR for zero-lag mobile performance
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
      >
        <Suspense fallback={null}>
          <CameraController />
          <EnvironmentLights />

          {/* Exterior Entrance (Facade + Grand Opening Doors) */}
          <ExteriorEntrance />

          {/* The Grand Exhibition Hall (Floor, Vaults, Columns, Stage) */}
          <GrandHall />

          {/* Floating Atmospheric Gold Dust Bokeh */}
          <ParticleField count={160} />

          {/* 6 Interactive Service Pods */}
          {SERVICES_DATA.map((service) => (
            <ServicePod key={service.id} service={service} />
          ))}

          {/* Interactive Ground Teleport Hotspots */}
          <GroundHotspots />
        </Suspense>
      </Canvas>
    </div>
  );
}
