import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

export default function DoorModel() {
  const { leftDoorOpen, rightDoorOpen, toggleLeftDoor, toggleRightDoor } = useExperienceStore();
  const leftPivotRef = useRef();
  const rightPivotRef = useRef();
  const currentLeftAngle = useRef(0);
  const currentRightAngle = useRef(0);
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

  useFrame((_, delta) => {
    // Left door angle: open = 1.45 rad (~85 deg), closed = 0
    const targetLeft = leftDoorOpen ? 1.45 : 0;
    // Right door angle: open = 1.45 rad (~85 deg), closed = 0
    const targetRight = rightDoorOpen ? 1.45 : 0;

    currentLeftAngle.current = THREE.MathUtils.damp(
      currentLeftAngle.current,
      targetLeft,
      5.0,
      delta
    );

    currentRightAngle.current = THREE.MathUtils.damp(
      currentRightAngle.current,
      targetRight,
      5.0,
      delta
    );

    if (leftPivotRef.current) {
      leftPivotRef.current.rotation.y = -currentLeftAngle.current;
    }
    if (rightPivotRef.current) {
      rightPivotRef.current.rotation.y = currentRightAngle.current;
    }
  });

  const handleLeftClick = (e) => {
    e.stopPropagation();
    sound.init();
    sound.playDoorOpen();
    toggleLeftDoor();
  };

  const handleRightClick = (e) => {
    e.stopPropagation();
    sound.init();
    sound.playDoorOpen();
    toggleRightDoor();
  };

  return (
    <group position={[0, 0, 4]}>
      {/* LEFT DOOR (Hinged at x = -1.85) */}
      <group
        ref={leftPivotRef}
        position={[-1.85, 0, 0]}
        onClick={handleLeftClick}
        onPointerEnter={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setLeftHovered(true);
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'default';
          setLeftHovered(false);
        }}
      >
        {/* Door Leaf (offset so hinge is at the edge) */}
        <group position={[0.92, 2.3, 0]}>
          {/* Main Door Slab (Ebonized Wood) */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.82, 4.6, 0.12]} />
            <meshStandardMaterial
              color={leftHovered ? "#222330" : "#13141b"}
              roughness={0.35}
              metalness={0.25}
            />
          </mesh>

          {/* Ornamental Gold Inlay Border */}
          <mesh position={[0, 0, 0.07]}>
            <boxGeometry args={[1.6, 4.3, 0.02]} />
            <meshStandardMaterial
              color={leftHovered ? "#fde047" : "#997819"}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, 0, 0.08]}>
            <boxGeometry args={[1.44, 4.14, 0.02]} />
            <meshStandardMaterial
              color="#0d0e14"
              roughness={0.5}
            />
          </mesh>

          {/* Inner Panels */}
          <mesh position={[0, 1.1, 0.09]}>
            <boxGeometry args={[1.2, 1.6, 0.02]} />
            <meshStandardMaterial color="#181922" roughness={0.6} />
          </mesh>
          <mesh position={[0, -1.1, 0.09]}>
            <boxGeometry args={[1.2, 1.6, 0.02]} />
            <meshStandardMaterial color="#181922" roughness={0.6} />
          </mesh>

          {/* Gold Meeting Edge Trim / Astragal */}
          <mesh position={[0.90, 0, 0.075]}>
            <boxGeometry args={[0.03, 4.4, 0.015]} />
            <meshStandardMaterial
              color="#d4af37"
              metalness={0.9}
              roughness={0.25}
            />
          </mesh>

          {/* Luxury Lock Escutcheon Plate */}
          <mesh position={[0.72, 0, 0.08]}>
            <boxGeometry args={[0.12, 1.1, 0.015]} />
            <meshStandardMaterial
              color={leftHovered ? "#1c1e28" : "#0e0f16"}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          {/* Gold Escutcheon Border Trim */}
          <mesh position={[0.72, 0, 0.088]}>
            <boxGeometry args={[0.10, 1.08, 0.005]} />
            <meshStandardMaterial
              color="#d4af37"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>

          {/* ── Vertical Luxury Architectural Pull Bar ── */}
          {/* Main Vertical Bar (0.85m tall) */}
          <mesh position={[0.72, 0, 0.14]}>
            <cylinderGeometry args={[0.024, 0.024, 0.85, 24]} />
            <meshStandardMaterial
              color="#fef08a"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
          {/* Top Standoff Pin */}
          <mesh position={[0.72, 0.35, 0.11]}>
            <cylinderGeometry args={[0.018, 0.018, 0.06, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Bottom Standoff Pin */}
          <mesh position={[0.72, -0.35, 0.11]}>
            <cylinderGeometry args={[0.018, 0.018, 0.06, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Top Decorative Finial Cap */}
          <mesh position={[0.72, 0.44, 0.14]}>
            <sphereGeometry args={[0.028, 16, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Bottom Decorative Finial Cap */}
          <mesh position={[0.72, -0.44, 0.14]}>
            <sphereGeometry args={[0.028, 16, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>
      </group>

      {/* RIGHT DOOR (Hinged at x = +1.85) */}
      <group
        ref={rightPivotRef}
        position={[1.85, 0, 0]}
        onClick={handleRightClick}
        onPointerEnter={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setRightHovered(true);
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'default';
          setRightHovered(false);
        }}
      >
        {/* Door Leaf (offset so hinge is at the edge) */}
        <group position={[-0.92, 2.3, 0]}>
          {/* Main Door Slab (Ebonized Wood) */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.82, 4.6, 0.12]} />
            <meshStandardMaterial
              color={rightHovered ? "#222330" : "#13141b"}
              roughness={0.35}
              metalness={0.25}
            />
          </mesh>

          {/* Ornamental Gold Inlay Border */}
          <mesh position={[0, 0, 0.07]}>
            <boxGeometry args={[1.6, 4.3, 0.02]} />
            <meshStandardMaterial
              color={rightHovered ? "#fde047" : "#997819"}
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, 0, 0.08]}>
            <boxGeometry args={[1.44, 4.14, 0.02]} />
            <meshStandardMaterial
              color="#0d0e14"
              roughness={0.5}
            />
          </mesh>

          {/* Inner Panels */}
          <mesh position={[0, 1.1, 0.09]}>
            <boxGeometry args={[1.2, 1.6, 0.02]} />
            <meshStandardMaterial color="#181922" roughness={0.6} />
          </mesh>
          <mesh position={[0, -1.1, 0.09]}>
            <boxGeometry args={[1.2, 1.6, 0.02]} />
            <meshStandardMaterial color="#181922" roughness={0.6} />
          </mesh>

          {/* Gold Meeting Edge Trim / Astragal */}
          <mesh position={[-0.90, 0, 0.075]}>
            <boxGeometry args={[0.03, 4.4, 0.015]} />
            <meshStandardMaterial
              color="#d4af37"
              metalness={0.9}
              roughness={0.25}
            />
          </mesh>

          {/* Luxury Lock Escutcheon Plate */}
          <mesh position={[-0.72, 0, 0.08]}>
            <boxGeometry args={[0.12, 1.1, 0.015]} />
            <meshStandardMaterial
              color={rightHovered ? "#1c1e28" : "#0e0f16"}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          {/* Gold Escutcheon Border Trim */}
          <mesh position={[-0.72, 0, 0.088]}>
            <boxGeometry args={[0.10, 1.08, 0.005]} />
            <meshStandardMaterial
              color="#d4af37"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>

          {/* ── Vertical Luxury Architectural Pull Bar ── */}
          {/* Main Vertical Bar (0.85m tall) */}
          <mesh position={[-0.72, 0, 0.14]}>
            <cylinderGeometry args={[0.024, 0.024, 0.85, 24]} />
            <meshStandardMaterial
              color="#fef08a"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
          {/* Top Standoff Pin */}
          <mesh position={[-0.72, 0.35, 0.11]}>
            <cylinderGeometry args={[0.018, 0.018, 0.06, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Bottom Standoff Pin */}
          <mesh position={[-0.72, -0.35, 0.11]}>
            <cylinderGeometry args={[0.018, 0.018, 0.06, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Top Decorative Finial Cap */}
          <mesh position={[-0.72, 0.44, 0.14]}>
            <sphereGeometry args={[0.028, 16, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Bottom Decorative Finial Cap */}
          <mesh position={[-0.72, -0.44, 0.14]}>
            <sphereGeometry args={[0.028, 16, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
