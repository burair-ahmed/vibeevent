import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

export default function CameraController() {
  const { camera, size } = useThree();
  const { entranceState, finishDoorEntrance, cameraWaypoint, activeService, leftDoorOpen, rightDoorOpen } = useExperienceStore();
  
  // Target position and lookAt vectors
  const targetPos = useRef(new THREE.Vector3(0, 2, 11.5));
  const targetLookAt = useRef(new THREE.Vector3(0, 2, 4));
  const currentLookAt = useRef(new THREE.Vector3(0, 2, 4));
  
  // Mouse parallax offset
  const mouseOffset = useRef({ x: 0, y: 0 });

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

  // Track pointer movements for smooth ambient parallax
  useEffect(() => {
    const handlePointerMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseOffset.current = {
        x: normX * 0.45,
        y: normY * 0.25,
      };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Handle Entrance Door Dolly Sequence (when user explicitly triggers Enter or auto-timer)
  useEffect(() => {
    if (entranceState === 'opening') {
      sound.playDoorOpen();

      // Cinematic dolly forward through the door threshold
      const tl = gsap.timeline({
        onComplete: () => {
          finishDoorEntrance();
        }
      });

      // Sound whoosh halfway through threshold
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

      tl.to(targetLookAt.current, {
        x: 0,
        y: 2.0,
        z: -12,
        duration: 3.0,
        ease: 'power1.inOut',
      }, 0);
    }
  }, [entranceState, finishDoorEntrance]);

  // Handle Waypoint Navigation & Service Focusing
  useEffect(() => {
    if (entranceState !== 'inside') return;

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
      gsap.to(targetLookAt.current, {
        x: sx,
        y: sy + 1.2,
        z: sz,
        duration: 1.6,
        ease: 'power3.out',
      });
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
      gsap.to(targetLookAt.current, {
        x: 0,
        y: 2.0,
        z: -12,
        duration: 1.8,
        ease: 'power3.out',
      });
    } else if (cameraWaypoint === 'services') {
      gsap.to(targetPos.current, {
        x: 0,
        y: 2.8,
        z: -5.5,
        duration: 1.8,
        ease: 'power3.out',
      });
      gsap.to(targetLookAt.current, {
        x: 0,
        y: 1.5,
        z: -9,
        duration: 1.8,
        ease: 'power3.out',
      });
    } else if (cameraWaypoint === 'stage') {
      gsap.to(targetPos.current, {
        x: 0,
        y: 2.5,
        z: -9.5,
        duration: 2.0,
        ease: 'power3.out',
      });
      gsap.to(targetLookAt.current, {
        x: 0,
        y: 2.0,
        z: -16,
        duration: 2.0,
        ease: 'power3.out',
      });
    } else if (cameraWaypoint === 'entrance') {
      gsap.to(targetPos.current, {
        x: 0,
        y: 2.0,
        z: 11.5,
        duration: 2.0,
        ease: 'power3.out',
      });
      gsap.to(targetLookAt.current, {
        x: 0,
        y: 2.0,
        z: 4,
        duration: 2.0,
        ease: 'power3.out',
      });
    }
  }, [cameraWaypoint, activeService, entranceState]);

  // Continuous frame damping for buttery smooth 60fps tracking
  useFrame((_, delta) => {
    const lerpSpeed = Math.min(delta * 4, 0.15);

    // Apply soft mouse parallax
    const desiredX = targetPos.current.x + mouseOffset.current.x;
    const desiredY = targetPos.current.y + mouseOffset.current.y;
    const desiredZ = targetPos.current.z;

    camera.position.x += (desiredX - camera.position.x) * lerpSpeed;
    camera.position.y += (desiredY - camera.position.y) * lerpSpeed;
    camera.position.z += (desiredZ - camera.position.z) * lerpSpeed;

    currentLookAt.current.x += (targetLookAt.current.x - currentLookAt.current.x) * lerpSpeed;
    currentLookAt.current.y += (targetLookAt.current.y - currentLookAt.current.y) * lerpSpeed;
    currentLookAt.current.z += (targetLookAt.current.z - currentLookAt.current.z) * lerpSpeed;

    camera.lookAt(currentLookAt.current);
  });

  return null;
}
