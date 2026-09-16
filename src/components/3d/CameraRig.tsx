"use client";

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  targetPosition?: [number, number, number];
  targetLookAt?: [number, number, number];
  parallaxFactor?: number;
  scrollFactor?: number;
}

export function CameraRig({
  targetPosition = [0, 0, 8],
  targetLookAt = [0, 0, 0],
  parallaxFactor = 0.5,
}: CameraRigProps) {
  const { camera, pointer } = useThree();
  const currentPos = useRef(new THREE.Vector3(...targetPosition));
  const currentLookAt = useRef(new THREE.Vector3(...targetLookAt));

  useFrame((_, delta) => {
    // Mouse Parallax Calculation (Subtle physical response with damping)
    const mouseX = pointer.x * parallaxFactor;
    const mouseY = pointer.y * parallaxFactor;

    const destX = targetPosition[0] + mouseX;
    const destY = targetPosition[1] + mouseY;
    const destZ = targetPosition[2];

    const destLookX = targetLookAt[0] + mouseX * 0.3;
    const destLookY = targetLookAt[1] + mouseY * 0.3;
    const destLookZ = targetLookAt[2];

    // Smooth Lerp (No sudden jumps)
    const damping = Math.min(1, delta * 3);
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, destX, damping);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, destY, damping);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, destZ, damping);

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, destLookX, damping);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, destLookY, damping);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, destLookZ, damping);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
