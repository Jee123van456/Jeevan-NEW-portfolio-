"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TrajectoryProps {
  radiusX: number;
  radiusY: number;
  rotation: [number, number, number];
  speed: number;
  color: string;
  dashOffset?: number;
}

const TrajectoryRing: React.FC<TrajectoryProps> = ({
  radiusX,
  radiusY,
  rotation,
  speed,
  color,
}) => {
  const meshRef = useRef<THREE.LineLoop>(null);

  const points = React.useMemo(() => {
    const pts = [];
    const segments = 90;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          Math.cos(theta) * radiusX,
          Math.sin(theta) * radiusY,
          Math.sin(theta * 2) * 0.25 // slight 3D wave wobble
        )
      );
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radiusX, radiusY]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * speed;
    }
  });

  return (
    <group rotation={rotation}>
      <lineLoop ref={meshRef} geometry={points}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.5}
          linewidth={1.5}
          blending={THREE.AdditiveBlending}
        />
      </lineLoop>
    </group>
  );
};

export const DataTrajectories: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Trajectory 1: Steep vertical diagonal trajectory */}
      <TrajectoryRing
        radiusX={2.7}
        radiusY={3.1}
        rotation={[Math.PI / 3, Math.PI / 6, Math.PI / 4]}
        speed={0.15}
        color="#ff5500"
      />

      {/* Trajectory 2: Horizontal asymmetrical trajectory */}
      <TrajectoryRing
        radiusX={3.4}
        radiusY={2.6}
        rotation={[-Math.PI / 4, Math.PI / 3, -Math.PI / 6]}
        speed={-0.2}
        color="#ff7722"
      />

      {/* Trajectory 3: Outer deep depth trajectory */}
      {!isMobile && (
        <TrajectoryRing
          radiusX={3.8}
          radiusY={3.2}
          rotation={[Math.PI / 6, -Math.PI / 4, Math.PI / 2]}
          speed={0.1}
          color="#ffffff"
        />
      )}
    </group>
  );
};
