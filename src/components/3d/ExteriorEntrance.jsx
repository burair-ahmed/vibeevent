import DoorModel from './DoorModel';
import FlamingTorch from './FlamingTorch';

export default function ExteriorEntrance() {
  return (
    <group position={[0, 0, 0]}>
      {/* Outer Door Frame Structure */}
      {/* Left Column / Jamb */}
      <mesh position={[-2.15, 2.3, 4]}>
        <boxGeometry args={[0.55, 4.8, 0.45]} />
        <meshStandardMaterial color="#141628" roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Right Column / Jamb */}
      <mesh position={[2.15, 2.3, 4]}>
        <boxGeometry args={[0.55, 4.8, 0.45]} />
        <meshStandardMaterial color="#141628" roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Top Lintel Arch */}
      <mesh position={[0, 4.85, 4]}>
        <boxGeometry args={[4.85, 0.65, 0.5]} />
        <meshStandardMaterial color="#141628" roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Top Gold Trim */}
      <mesh position={[0, 5.2, 4.05]}>
        <boxGeometry args={[5.0, 0.08, 0.55]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Exterior Facade Walls — deep navy */}
      <mesh position={[-5.5, 3.5, 4]}>
        <boxGeometry args={[6.2, 7.5, 0.3]} />
        <meshStandardMaterial color="#0c0e1e" roughness={0.7} />
      </mesh>
      <mesh position={[5.5, 3.5, 4]}>
        <boxGeometry args={[6.2, 7.5, 0.3]} />
        <meshStandardMaterial color="#0c0e1e" roughness={0.7} />
      </mesh>
      <mesh position={[0, 6.4, 4]}>
        <boxGeometry args={[5.2, 2.5, 0.3]} />
        <meshStandardMaterial color="#0c0e1e" roughness={0.7} />
      </mesh>

      {/* Grand Architectural Pillars */}
      {/* Left Pillar */}
      <group position={[-2.8, 2.4, 4.3]}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.26, 4.8, 24]} />
          <meshStandardMaterial color="#1a1d32" metalness={0.4} roughness={0.3} />
        </mesh>
        {/* Golden Column Capital */}
        <mesh position={[0, 2.4, 0]}>
          <cylinderGeometry args={[0.32, 0.24, 0.2, 24]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Golden Sconce Uplight */}
        <mesh position={[0, 1.2, 0.22]}>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* Right Pillar */}
      <group position={[2.8, 2.4, 4.3]}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.26, 4.8, 24]} />
          <meshStandardMaterial color="#1a1d32" metalness={0.4} roughness={0.3} />
        </mesh>
        {/* Golden Column Capital */}
        <mesh position={[0, 2.4, 0]}>
          <cylinderGeometry args={[0.32, 0.24, 0.2, 24]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Golden Sconce Uplight */}
        <mesh position={[0, 1.2, 0.22]}>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* ═══ Flaming Torches — mounted on the door jambs (inside face) ═══ */}
      <FlamingTorch position={[-2.45, 2.8, 4.22]} />
      <FlamingTorch position={[2.45, 2.8, 4.22]} />

      {/* ═══ Exterior Torches — outside the gate on the pillar fronts ═══ */}
      {/* Left pillar outer torch — facing the courtyard */}
      <FlamingTorch position={[-2.8, 3.6, 4.55]} rotationY={0} lightIntensity={3.5} lightDistance={9} />
      {/* Right pillar outer torch */}
      <FlamingTorch position={[2.8, 3.6, 4.55]} rotationY={0} lightIntensity={3.5} lightDistance={9} />
      {/* Far-left facade torch */}
      <FlamingTorch position={[-5.5, 3.2, 4.2]} rotationY={0} lightIntensity={2.8} lightDistance={7} />
      {/* Far-right facade torch */}
      <FlamingTorch position={[5.5, 3.2, 4.2]} rotationY={0} lightIntensity={2.8} lightDistance={7} />

      {/* Grand Entrance Steps */}
      <mesh position={[0, -0.1, 5.2]}>
        <boxGeometry args={[6.5, 0.2, 2.4]} />
        <meshStandardMaterial color="#181a2e" roughness={0.25} metalness={0.3} />
      </mesh>
      <mesh position={[0, -0.3, 6.8]}>
        <boxGeometry args={[7.5, 0.2, 1.8]} />
        <meshStandardMaterial color="#14162a" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Exterior Courtyard Ground */}
      <mesh position={[0, -0.5, 12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 14]} />
        <meshStandardMaterial color="#0a0c18" roughness={0.6} metalness={0.15} />
      </mesh>

      {/* The Opening Double Doors */}
      <DoorModel />
    </group>
  );
}

