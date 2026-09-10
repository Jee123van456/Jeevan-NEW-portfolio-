"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Environment: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = isMobile ? 80 : 200;

  const [positions] = useState(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return pos;
  });

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.02;
      particlesRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <group>
      {/* Background Volumetric Particle Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.03 : 0.04}
          color="#ff5500"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Subtle depth grid ring backplate */}
      <mesh position={[0, 0, -4]} rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[3.5, 3.52, 64]} />
        <meshBasicMaterial color="#ff5500" transparent opacity={0.12} wireframe />
      </mesh>
    </group>
  );
};
