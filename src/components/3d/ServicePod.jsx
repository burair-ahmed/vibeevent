import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

// Preload all 6 service GLTF models
useGLTF.preload('/wedding.glb');
useGLTF.preload('/concert.glb');
useGLTF.preload('/corporate.glb');
useGLTF.preload('/birthday.glb');
useGLTF.preload('/vipevent.glb');
useGLTF.preload('/brand-activation.glb');

// Reusable component that reliably places any model flat and flush on top of the plinth
function ExhibitModel({ url, scale = 1.0, fallbackMinY = -0.35 }) {
  const { scene } = useGLTF(url);
  const { clone, bottomOffset } = useMemo(() => {
    const cloned = scene.clone(true);
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // Compute bounding box in local space to precisely align model's bottom with the plinth surface
    const box = new THREE.Box3().setFromObject(cloned);
    const minY = isFinite(box.min.y) ? box.min.y : fallbackMinY;
    const offset = -minY * scale;

    return { clone: cloned, bottomOffset: offset };
  }, [scene, scale, fallbackMinY]);

  return <primitive object={clone} scale={scale} position={[0, bottomOffset, 0]} />;
}

export default function ServicePod({ service }) {
  const { setActiveService, activeService, cameraWaypoint } = useExperienceStore();
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  const turntableRef = useRef();
  const groundRingRef = useRef();
  const badgeHtmlRef = useRef();

  const isSelected = activeService?.id === service.id;

  // 16 architectural vertical fluted gold pilasters for the plinth shaft
  const flutes = useMemo(() => {
    const count = 16;
    const radius = 0.69;
    const items = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      items.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        rotationY: -angle,
      });
    }
    return items;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Face smoothly towards the user's camera position only (no constant spinning)
    if (turntableRef.current) {
      const dx = state.camera.position.x - service.position[0];
      const dz = state.camera.position.z - service.position[2];
      const targetAngle = Math.atan2(dx, dz);

      // Smooth shortest-arc rotation towards the user's POV
      let diff = targetAngle - turntableRef.current.rotation.y;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      turntableRef.current.rotation.y += diff * Math.min(delta * 4.5, 1.0);
    }

    // Ground glow ring breathing pulse
    if (groundRingRef.current && groundRingRef.current.material) {
      const baseOpacity = hovered || isSelected ? 0.85 : 0.35;
      groundRingRef.current.material.opacity = baseOpacity + Math.sin(time * 3) * 0.12;
    }

    // Smooth hover scale damping (subtle elegant elevation)
    if (groupRef.current) {
      const targetScale = hovered || isSelected ? 1.04 : 1.0;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
    }

    // Rock-solid visibility control for the exhibition plaque
    if (badgeHtmlRef.current) {
      const insideHall = state.camera.position.z <= 2.2 && cameraWaypoint !== 'entrance';
      const drawerClosed = !activeService;
      const shouldBeVisible = insideHall && drawerClosed;
      badgeHtmlRef.current.style.display = shouldBeVisible ? 'flex' : 'none';
    }
  });

  const handlePointerEnter = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    setHovered(true);
    sound.playPodHover();
  };

  const handlePointerLeave = () => {
    document.body.style.cursor = 'default';
    setHovered(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setActiveService(service);
    sound.playPodSelect();
  };

  return (
    <group
      ref={groupRef}
      position={service.position}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {/* ─── 1. GROUND AMBIENT HALO & GOLDEN BASE FOOTPRINT ───────────────────── */}
      {/* Floor Breathing Accent Ring */}
      <mesh ref={groundRingRef} position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.02, 1.25, 48]} />
        <meshBasicMaterial
          color={service.accentColor}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Solid Polished Brass Floor Bevel Ring */}
      <mesh position={[0, 0.015, 0]}>
        <cylinderGeometry args={[0.96, 1.00, 0.03, 48]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.96}
          roughness={0.15}
        />
      </mesh>

      {/* ─── 2. FANCY ARCHITECTURAL PLINTH / PEDESTAL ─────────────────────────── */}
      {/* Tier 1: Broad Lower Plinth Base — Pristine Carrara Alabaster Marble */}
      <mesh position={[0, 0.055, 0]}>
        <cylinderGeometry args={[0.88, 0.96, 0.11, 48]} />
        <meshStandardMaterial
          color="#fbfbfd"
          roughness={0.16}
          metalness={0.06}
        />
      </mesh>

      {/* Heavy 24K Gold Transitional Torus Moulding */}
      <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.88, 0.026, 16, 48]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#b3883a"
          emissiveIntensity={0.35}
          metalness={0.96}
          roughness={0.14}
        />
      </mesh>

      {/* Tier 2: Mid Classical Step Plinth */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.78, 0.86, 0.08, 48]} />
        <meshStandardMaterial
          color="#f7f7fa"
          roughness={0.18}
          metalness={0.05}
        />
      </mesh>

      {/* Inset Gold Fillet Ring */}
      <mesh position={[0, 0.185, 0]}>
        <cylinderGeometry args={[0.70, 0.78, 0.025, 48]} />
        <meshStandardMaterial
          color="#fbbf24"
          metalness={0.94}
          roughness={0.16}
        />
      </mesh>

      {/* Tier 3: Plinth Shaft — Fluted Alabaster Column Body with 16 Gold Ribs */}
      <mesh position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.68, 0.70, 0.54, 48]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.18}
          metalness={0.04}
        />
      </mesh>

      {/* 16 Fluted Architectural Gold Ribs */}
      {flutes.map((f, i) => (
        <mesh
          key={`flute-${i}`}
          position={[f.x, 0.46, f.z]}
          rotation={[0, f.rotationY, 0]}
        >
          <cylinderGeometry args={[0.016, 0.016, 0.52, 12]} />
          <meshStandardMaterial
            color="#d4af37"
            emissive="#b3883a"
            emissiveIntensity={hovered || isSelected ? 0.5 : 0.2}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
      ))}

      {/* Tier 4: Upper Plinth Capital Moulding */}
      <mesh position={[0, 0.77, 0]}>
        <cylinderGeometry args={[0.79, 0.70, 0.08, 48]} />
        <meshStandardMaterial
          color="#fbfbfd"
          roughness={0.16}
          metalness={0.06}
        />
      </mesh>

      {/* Recessed Accent Light Channel beneath top cornice */}
      <mesh position={[0, 0.80, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.02, 48]} />
        <meshStandardMaterial
          color={service.accentColor}
          emissive={service.accentColor}
          emissiveIntensity={hovered || isSelected ? 2.4 : 0.9}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Gold Cornice Trim Ring */}
      <mesh position={[0, 0.815, 0]}>
        <cylinderGeometry args={[0.81, 0.79, 0.03, 48]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.96}
          roughness={0.14}
        />
      </mesh>

      {/* Tier 5: Top Exhibition Deck Tabletop Slab */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.82, 0.80, 0.045, 48]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.12}
          metalness={0.12}
        />
      </mesh>

      {/* Polished Gold Top Bevel Lip Torus */}
      <mesh position={[0, 0.875, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.80, 0.02, 16, 48]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.96}
          roughness={0.14}
        />
      </mesh>

      {/* Inlaid Turntable Showcase Presentation Disc (Matte Velvet / Obsidian Table) */}
      <mesh position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.76, 0.76, 0.012, 48]} />
        <meshStandardMaterial
          color="#12131b"
          roughness={0.35}
          metalness={0.55}
        />
      </mesh>

      {/* Golden Inlay Accent Ring inside the turntable plate */}
      <mesh position={[0, 0.886, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.68, 0.70, 48]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#b3883a"
          emissiveIntensity={0.4}
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* ─── 3. MODELS PLACED DIRECTLY ON TOP OF THE PLINTH (Y = 0.886) ──────── */}
      <group ref={turntableRef} position={[0, 0.886, 0]}>
        {service.id === 'weddings' && (
          <ExhibitModel url="/wedding.glb" scale={1.05} fallbackMinY={-0.477} />
        )}

        {service.id === 'corporate' && (
          <ExhibitModel url="/corporate.glb" scale={1.25} fallbackMinY={-0.285} />
        )}

        {service.id === 'concerts' && (
          <ExhibitModel url="/concert.glb" scale={1.5} fallbackMinY={-0.219} />
        )}

        {service.id === 'vip-parties' && (
          <ExhibitModel url="/vipevent.glb" scale={1.25} fallbackMinY={-0.337} />
        )}

        {service.id === 'brand-activations' && (
          <ExhibitModel url="/brand-activation.glb" scale={1.25} fallbackMinY={-0.328} />
        )}

        {(service.id === 'birthdays' || service.id === 'production') && (
          <ExhibitModel url="/birthday.glb" scale={1.2} fallbackMinY={-0.353} />
        )}
      </group>

      {/* ─── 4. LIGHTING: GALLERY SPOTLIGHT & ACCENT LIGHTS ──────────────────── */}
      {/* Dedicated Gallery Framing Spotlight onto Model */}
      <pointLight
        position={[0, 2.3, 0]}
        intensity={hovered || isSelected ? 3.8 : 1.8}
        color="#fffcf2"
        distance={5}
      />

      {/* Subtle Under-Model Ambient Uplight from Plinth Top */}
      <pointLight
        position={[0, 0.95, 0]}
        intensity={hovered || isSelected ? 2.2 : 0.9}
        color={service.accentColor}
        distance={2.8}
      />

      {/* ─── 5. FRONT EXHIBITION MUSEUM PLAQUE ─────────────────────────────────── */}
      <group position={[0, 0.46, 0.98]} rotation={[-0.22, 0, 0]}>
        {/* Support Strut / Bracket from Plinth */}
        <mesh position={[0, -0.16, -0.05]} rotation={[0.42, 0, 0]}>
          <boxGeometry args={[0.07, 0.20, 0.03]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.18} />
        </mesh>

        {/* Plaque Dark Lacquered Backplate */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.82, 0.26, 0.024]} />
          <meshStandardMaterial color="#0c0d14" roughness={0.2} metalness={0.85} />
        </mesh>

        {/* Polished Gold Outer Frame Bevel */}
        <mesh position={[0, 0, 0.008]}>
          <boxGeometry args={[0.84, 0.28, 0.008]} />
          <meshStandardMaterial
            color={hovered || isSelected ? service.accentColor : '#d4af37'}
            metalness={0.96}
            roughness={0.15}
          />
        </mesh>

        {/* Top Edge Glowing Jewel Accent Line */}
        <mesh position={[0, 0.135, 0.015]}>
          <boxGeometry args={[0.78, 0.016, 0.02]} />
          <meshStandardMaterial
            color={service.accentColor}
            emissive={service.accentColor}
            emissiveIntensity={hovered || isSelected ? 2.0 : 0.8}
          />
        </mesh>
      </group>

      {/* ─── 6. INTERACTIVE 2D BADGE ON FRONT PLAQUE ───────────────────────────── */}
      <Html
        position={[0, 0.48, 1.05]}
        center
        distanceFactor={10}
        className="pointer-events-none select-none transition-all duration-300 transform"
        style={{
          transform: hovered || isSelected ? 'scale(1.06) translateY(-2px)' : 'scale(1)',
          opacity: hovered || isSelected ? 1 : 0.95,
        }}
      >
        <div ref={badgeHtmlRef} className="flex flex-col items-center">
          <div
            className="px-3.5 py-1.5 rounded-xl border shadow-2xl flex items-center gap-2.5 backdrop-blur-xl transition-all duration-200"
            style={{
              backgroundColor: 'rgba(10, 11, 18, 0.94)',
              borderColor: hovered || isSelected ? service.accentColor : 'rgba(212, 175, 55, 0.45)',
              boxShadow: hovered || isSelected
                ? `0 0 24px ${service.accentColor}55, 0 8px 20px rgba(0,0,0,0.8)`
                : '0 8px 24px rgba(0,0,0,0.7)',
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse"
              style={{
                backgroundColor: service.accentColor,
                boxShadow: `0 0 10px ${service.accentColor}`
              }}
            />
            <div className="flex flex-col text-left">
              <span className="font-cinzel text-xs font-bold text-zinc-100 whitespace-nowrap tracking-wider leading-tight">
                {service.shortTitle}
              </span>
              <span className="text-[8px] uppercase tracking-[0.22em] text-zinc-400 leading-tight">
                {service.category}
              </span>
            </div>
            <span
              className="text-[10px] font-mono pl-1 transition-transform duration-200"
              style={{ color: service.accentColor }}
            >
              ✦
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
}
