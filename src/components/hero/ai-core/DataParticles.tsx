"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const DataParticles: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const pulseCount = isMobile ? 12 : 28;

  // Initialize trajectory paths for pulse particles
  const [particleData] = useState(() => {
    const pos = new Float32Array(pulseCount * 3);
    const speeds = new Float32Array(pulseCount);
    const angles = new Float32Array(pulseCount);
    const radii = new Float32Array(pulseCount);

    for (let i = 0; i < pulseCount; i++) {
      radii[i] = 1.8 + Math.random() * 1.2;
      angles[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.4 + Math.random() * 0.8;

      pos[i * 3] = radii[i] * Math.cos(angles[i]);
      pos[i * 3 + 1] = radii[i] * Math.sin(angles[i]);
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }

    return { pos, speeds, angles, radii };
  });

  useFrame((_, delta) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pulseCount; i++) {
        particleData.angles[i] += delta * particleData.speeds[i];
        positions[i * 3] = particleData.radii[i] * Math.cos(particleData.angles[i]);
        positions[i * 3 + 1] = particleData.radii[i] * Math.sin(particleData.angles[i]);
        positions[i * 3 + 2] = Math.sin(particleData.angles[i] * 2) * 0.8;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleData.pos, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.08 : 0.12}
        color="#ffffff"
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
