"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export const CoreGeometry: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const outerCoreRef = useRef<THREE.Mesh>(null);
  const innerNucleusRef = useRef<THREE.Mesh>(null);
  const facetCageRef = useRef<THREE.Mesh>(null);
  const energyOrbRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (outerCoreRef.current) {
      outerCoreRef.current.rotation.y = t * 0.15;
      outerCoreRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
    }

    if (facetCageRef.current) {
      facetCageRef.current.rotation.y = -t * 0.25;
      facetCageRef.current.rotation.x = t * 0.15;
    }

    if (innerNucleusRef.current) {
      innerNucleusRef.current.rotation.x = t * 0.3;
      innerNucleusRef.current.rotation.y = -t * 0.4;
    }

    if (energyOrbRef.current) {
      const pulse = 1 + Math.sin(t * 2.5) * 0.06;
      energyOrbRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group>
      {/* 1. Innermost High-Energy Glowing Pulse Sphere */}
      <mesh ref={energyOrbRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ff5500"
          emissiveIntensity={3.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* 2. Inner Dark Faceted Crystalline Nucleus */}
      <mesh ref={innerNucleusRef}>
        <icosahedronGeometry args={[1.35, 0]} />
        <meshStandardMaterial
          color="#0d0d0e"
          emissive="#ff3300"
          emissiveIntensity={1.0}
          roughness={0.15}
          metalness={0.95}
          wireframe
        />
      </mesh>

      {/* 3. Outer Distorted Glass Fluid Energy Shell */}
      <mesh ref={outerCoreRef}>
        <sphereGeometry args={[1.8, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
        <MeshDistortMaterial
          color="#ff5500"
          emissive="#ff4400"
          emissiveIntensity={0.8}
          roughness={0.12}
          metalness={0.88}
          distort={isMobile ? 0.2 : 0.3}
          speed={2.2}
          transparent
          opacity={0.78}
        />
      </mesh>

      {/* 4. External Faceted Geodesic Exoskeleton */}
      <mesh ref={facetCageRef}>
        <icosahedronGeometry args={[2.15, 1]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ff5500"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};
