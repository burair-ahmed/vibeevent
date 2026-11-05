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

          {/* Half of Central Golden Medallion */}
          <mesh position={[0.88, 0, 0.1]}>
            <cylinderGeometry args={[0.35, 0.35, 0.03, 32, 1, false, Math.PI / 2, Math.PI]} />
            <meshStandardMaterial
              color="#d4af37"
              emissive="#b45309"
              emissiveIntensity={leftHovered ? 0.6 : 0.2}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>

          {/* Polished Brass Pull Handle */}
          <mesh position={[0.72, 0, 0.16]}>
            <cylinderGeometry args={[0.028, 0.028, 0.75, 16]} />
            <meshStandardMaterial
              color="#fef08a"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
          <mesh position={[0.72, 0.32, 0.1]}>
            <cylinderGeometry args={[0.02, 0.02, 0.12, 12]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} />
          </mesh>
          <mesh position={[0.72, -0.32, 0.1]}>
            <cylinderGeometry args={[0.02, 0.02, 0.12, 12]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} />
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

          {/* Half of Central Golden Medallion */}
          <mesh position={[-0.88, 0, 0.1]}>
            <cylinderGeometry args={[0.35, 0.35, 0.03, 32, 1, false, -Math.PI / 2, Math.PI]} />
            <meshStandardMaterial
              color="#d4af37"
              emissive="#b45309"
              emissiveIntensity={rightHovered ? 0.6 : 0.2}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>

          {/* Polished Brass Pull Handle */}
          <mesh position={[-0.72, 0, 0.16]}>
            <cylinderGeometry args={[0.028, 0.028, 0.75, 16]} />
            <meshStandardMaterial
              color="#fef08a"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
          <mesh position={[-0.72, 0.32, 0.1]}>
            <cylinderGeometry args={[0.02, 0.02, 0.12, 12]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} />
          </mesh>
          <mesh position={[-0.72, -0.32, 0.1]}>
            <cylinderGeometry args={[0.02, 0.02, 0.12, 12]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
