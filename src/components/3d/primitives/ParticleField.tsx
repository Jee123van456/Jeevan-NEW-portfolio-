"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  areaSize?: number;
  color?: string;
  speed?: number;
}

export function ParticleField({
  count = 120,
  areaSize = 25,
  color = "#ff5500",
  speed = 0.2,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, opacityArray] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const opacities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * areaSize;
      pos[i * 3 + 1] = (Math.random() - 0.5) * areaSize;
      pos[i * 3 + 2] = (Math.random() - 0.5) * areaSize;

      opacities[i] = 0.2 + Math.random() * 0.7;
    }
    return [pos, opacities];
  }, [count, areaSize]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05 * speed;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
