import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useExperienceStore, setExperienceState } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

// Map camera position (X, Z) → zone id
// (called inside useFrame — must NOT call hooks or trigger React renders directly)
let _lastZone = 'entrance';
function detectZone(x, z) {
  // If outside or right at entrance portal threshold
  if (z > 4.5) return 'entrance';

  // VIP Stage is at the far end of the grand hall (stage structure is at z = -21.5 to -23.5, viewpoint around z <= -14.0)
  if (z <= -14.0) return 'stage';

  // Service Pods are located along the left and right wings (x ≈ ±3.5 to ±5.5, z between -1.5 and -14.0)
  // or along the pods corridor
  const isLateralWing = Math.abs(x) > 2.2 && z <= -1.5 && z > -14.0;
  const isPodZRange = z <= -5.5 && z > -14.0;

  if (isLateralWing || isPodZRange) {
    return 'services';
  }

  // Otherwise, user is standing in the main central promenade of the Grand Hall (-5.5 < z <= 4.5 and near center)
  return 'hall';
}

export default function CameraController() {
  const { camera, size, gl } = useThree();
  const { entranceState, finishDoorEntrance, cameraWaypoint, activeService, customHotspotTarget, waypointVersion } = useExperienceStore();

  // Base camera position & look target vectors
  const targetPos = useRef(new THREE.Vector3(0, 2, 11.5));
  const currentLookAt = useRef(new THREE.Vector3(0, 2, 4));

  // Throttle the zone-proximity check to run every ~0.5s to avoid store thrashing
  const zoneCheckAccumulator = useRef(0);

  // 360-Degree Mouse Drag Orbit / Look Angles (Yaw = horizontal, Pitch = vertical)
  const yaw = useRef(0);   // horizontal angle in radians (-PI to PI, 360 degrees)
  const pitch = useRef(0); // vertical angle in radians (-PI/2 to PI/2)
  const targetYaw = useRef(0);
  const targetPitch = useRef(0);

  // Pointer drag state
  const isDragging = useRef(false);
  const previousPointer = useRef({ x: 0, y: 0 });

  // Adjust FOV for mobile / portrait aspect ratios
  useEffect(() => {
    const aspect = size.width / size.height;
    if (aspect < 1) {
      camera.fov = 68; // Wider FOV for vertical phone screens
    } else {
      camera.fov = 50;
    }
    camera.updateProjectionMatrix();
  }, [size, camera]);

  // Handle Full 360-degree Click & Drag Pointer Listeners
  useEffect(() => {
    const domElement = gl.domElement;

    const onPointerDown = (e) => {
      // Only start drag on the canvas itself — not on UI overlays (buttons, panels, etc.)
      if (e.target !== domElement) return;
      isDragging.current = true;
      previousPointer.current = { x: e.clientX, y: e.clientY };
      document.body.style.cursor = 'grabbing';
    };

    const onPointerMove = (e) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - previousPointer.current.x;
      const deltaY = e.clientY - previousPointer.current.y;
      previousPointer.current = { x: e.clientX, y: e.clientY };

      const sensitivity = 0.0035;

      // Full 360 horizontal rotation (yaw)
      targetYaw.current -= deltaX * sensitivity;

      // Vertical tilt (pitch) clamped to avoid upside-down flips
      targetPitch.current += deltaY * sensitivity;
      targetPitch.current = Math.max(-Math.PI / 2.6, Math.min(Math.PI / 2.6, targetPitch.current));
    };

    const onPointerUp = () => {
      isDragging.current = false;
      document.body.style.cursor = 'default';
    };

    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [gl]);

  // Handle Entrance Door Dolly Sequence (when user triggers Enter or auto-timer)
  useEffect(() => {
    if (entranceState === 'opening') {
      sound.playDoorOpen();

      // Reset yaw/pitch smoothly looking forward into the hall
      gsap.to(targetYaw, { current: 0, duration: 1.5, ease: 'power2.out' });
      gsap.to(targetPitch, { current: 0, duration: 1.5, ease: 'power2.out' });

      // Cinematic dolly forward through the door threshold
      const tl = gsap.timeline({
        onComplete: () => {
          finishDoorEntrance();
        }
      });

      setTimeout(() => {
        sound.playThresholdWhoosh();
      }, 900);

      tl.to(targetPos.current, {
        x: 0,
        y: 2.1,
        z: 3.5,
        duration: 1.2,
        ease: 'power2.in',
      })
        .to(targetPos.current, {
          x: 0,
          y: 2.2,
          z: -2.5,
          duration: 1.8,
          ease: 'power2.out',
        });
    }
  }, [entranceState, finishDoorEntrance]);

  // Handle Ground Hotspot Click Navigation (Smooth Camera Walk / Gliding)
  useEffect(() => {
    if (!customHotspotTarget) return;

    // Kill any in-progress waypoint tweens so hotspot wins cleanly
    gsap.killTweensOf(targetPos.current);
    gsap.killTweensOf(targetYaw);
    gsap.killTweensOf(targetPitch);

    const [tx, ty, tz] = customHotspotTarget;
    gsap.to(targetPos.current, {
      x: tx,
      y: ty,
      z: tz,
      duration: 1.6,
      ease: 'power3.out',
    });
  }, [customHotspotTarget]);

  // Handle Waypoint Navigation & Service Focusing
  useEffect(() => {
    if (entranceState !== 'inside') return;

    // If neither a waypoint nor a service is active, there's nothing to navigate to
    if (!cameraWaypoint && !activeService) return;

    // Kill any in-progress hotspot / previous tweens so waypoint wins cleanly
    gsap.killTweensOf(targetPos.current);
    gsap.killTweensOf(targetYaw);
    gsap.killTweensOf(targetPitch);

    if (activeService) {
      // Focus on active service pod
      const [sx, sy, sz] = activeService.position;
      gsap.to(targetPos.current, {
        x: sx * 0.6,
        y: 2.2,
        z: sz + 4.2,
        duration: 1.6,
        ease: 'power3.out',
      });

      // Calculate direction to service pod
      const diffX = sx - sx * 0.6;
      const diffZ = sz - (sz + 4.2);
      const angle = Math.atan2(-diffX, -diffZ);
      gsap.to(targetYaw, { current: angle, duration: 1.6, ease: 'power3.out' });
      gsap.to(targetPitch, { current: -0.05, duration: 1.6, ease: 'power3.out' });
      return;
    }

    if (cameraWaypoint === 'hall') {
      gsap.to(targetPos.current, {
        x: 0,
        y: 2.2,
        z: -2.5,
        duration: 1.8,
        ease: 'power3.out',
      });
      gsap.to(targetYaw, { current: 0, duration: 1.8, ease: 'power3.out' });
      gsap.to(targetPitch, { current: 0, duration: 1.8, ease: 'power3.out' });
    } else if (cameraWaypoint === 'services') {
      gsap.to(targetPos.current, {
        x: 0,
        y: 2.8,
        z: -5.5,
        duration: 1.8,
        ease: 'power3.out',
      });
      gsap.to(targetYaw, { current: 0, duration: 1.8, ease: 'power3.out' });
      gsap.to(targetPitch, { current: -0.15, duration: 1.8, ease: 'power3.out' });
    } else if (cameraWaypoint === 'stage') {
      gsap.to(targetPos.current, {
        x: 0,
        y: 2.2,
        z: -17.5,
        duration: 2.0,
        ease: 'power3.out',
      });
      gsap.to(targetYaw, { current: 0, duration: 2.0, ease: 'power3.out' });
      gsap.to(targetPitch, { current: 0, duration: 2.0, ease: 'power3.out' });
    } else if (cameraWaypoint === 'entrance') {
      gsap.to(targetPos.current, {
        x: 0,
        y: 2.0,
        z: 11.5,
        duration: 2.0,
        ease: 'power3.out',
      });
      gsap.to(targetYaw, { current: 0, duration: 2.0, ease: 'power3.out' });
      gsap.to(targetPitch, { current: 0, duration: 2.0, ease: 'power3.out' });
    }
  }, [cameraWaypoint, activeService, entranceState, waypointVersion]);

  // Frame update: interpolate camera position and compute 360-degree look direction
  useFrame((_, delta) => {
    const lerpSpeed = Math.min(delta * 8, 0.2);

    // Smoothly damp camera position
    camera.position.x += (targetPos.current.x - camera.position.x) * lerpSpeed;
    camera.position.y += (targetPos.current.y - camera.position.y) * lerpSpeed;
    camera.position.z += (targetPos.current.z - camera.position.z) * lerpSpeed;

    // Smoothly damp yaw (360-degree horizontal) and pitch (vertical)
    yaw.current += (targetYaw.current - yaw.current) * lerpSpeed;
    pitch.current += (targetPitch.current - pitch.current) * lerpSpeed;

    // Convert spherical yaw & pitch angles into 3D Cartesian forward vector
    const cosPitch = Math.cos(pitch.current);
    const forwardX = Math.sin(yaw.current) * cosPitch;
    const forwardY = Math.sin(pitch.current);
    const forwardZ = -Math.cos(yaw.current) * cosPitch;

    // Target point that the camera looks toward
    const lookTargetX = camera.position.x + forwardX * 10;
    const lookTargetY = camera.position.y + forwardY * 10;
    const lookTargetZ = camera.position.z + forwardZ * 10;

    currentLookAt.current.x += (lookTargetX - currentLookAt.current.x) * lerpSpeed;
    currentLookAt.current.y += (lookTargetY - currentLookAt.current.y) * lerpSpeed;
    currentLookAt.current.z += (lookTargetZ - currentLookAt.current.z) * lerpSpeed;

    camera.lookAt(currentLookAt.current);

    // ─── Proximity Zone Detection ─────────────────────────────────────────────
    // Throttle to once per 0.25s — maps camera position to the nearest named zone
    // and updates the store only when the zone actually changes (zero-waste updates)
    zoneCheckAccumulator.current += delta;
    if (zoneCheckAccumulator.current >= 0.25 && entranceState === 'inside') {
      zoneCheckAccumulator.current = 0;
      const zone = detectZone(camera.position.x, camera.position.z);
      if (zone !== _lastZone) {
        _lastZone = zone;
        setExperienceState({ activeZone: zone });
      }
    }
  });

  return null;
}
