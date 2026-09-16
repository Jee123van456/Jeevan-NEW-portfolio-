"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ComputationalArchitecture() {
  const mainGroup = useRef<THREE.Group>(null);
  const outerCube = useRef<THREE.Group>(null);
  const midMatrix = useRef<THREE.Group>(null);
  const innerCore = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (mainGroup.current) {
      // Floating physical breath movement
      mainGroup.current.position.y = Math.sin(time * 0.8) * 0.15;
      mainGroup.current.rotation.y = time * 0.1;
    }

    if (outerCube.current) {
      outerCube.current.rotation.x = Math.sin(time * 0.4) * 0.1;
      outerCube.current.rotation.z = Math.cos(time * 0.3) * 0.1;
    }

    if (midMatrix.current) {
      midMatrix.current.rotation.y = -time * 0.25;
      midMatrix.current.rotation.x = time * 0.15;
    }

    if (innerCore.current) {
      const pulse = 1 + Math.sin(time * 2.5) * 0.12;
      innerCore.current.scale.setScalar(hovered ? pulse * 1.2 : pulse);
    }
  });

  return (
    <group
      ref={mainGroup}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Central Orange Point Light */}
      <pointLight color="#ff5500" intensity={hovered ? 8 : 4} distance={10} decay={2} />
      <ambientLight intensity={0.6} />

      {/* Layer 1: Outer Glass Boundary Box */}
      <group ref={outerCube}>
        <mesh>
          <boxGeometry args={[3.2, 3.2, 3.2]} />
          <meshPhysicalMaterial
            color="#ff5500"
            transmission={0.85}
            opacity={0.35}
            transparent
            roughness={0.15}
            metalness={0.1}
            ior={1.4}
            thickness={0.8}
            clearcoat={1}
          />
        </mesh>

        {/* Outer Frame Edges */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(3.2, 3.2, 3.2)]} />
          <lineBasicMaterial color="#ffffff" transparent opacity={0.7} linewidth={2} />
        </lineSegments>

        {/* Corner Node Spheres */}
        {[
          [-1.6, -1.6, -1.6],
          [-1.6, -1.6, 1.6],
          [-1.6, 1.6, -1.6],
          [-1.6, 1.6, 1.6],
          [1.6, -1.6, -1.6],
          [1.6, -1.6, 1.6],
          [1.6, 1.6, -1.6],
          [1.6, 1.6, 1.6],
        ].map(([x, y, z], idx) => (
          <mesh key={idx} position={[x, y, z]}>
            <boxGeometry args={[0.15, 0.15, 0.15]} />
            <meshStandardMaterial color="#ff5500" emissive="#ff3300" emissiveIntensity={0.8} />
          </mesh>
        ))}
      </group>

      {/* Layer 2: Nested Secondary Architectural Frame */}
      <group ref={midMatrix}>
        <mesh>
          <boxGeometry args={[2.2, 2.2, 2.2]} />
          <meshStandardMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={0.4}
            metalness={0.8}
          />
        </mesh>

        {/* Intersecting Spatial Data Planes */}
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <planeGeometry args={[2.6, 2.6]} />
          <meshBasicMaterial
            color="#ff6600"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
            wireframe
          />
        </mesh>
        <mesh rotation={[-Math.PI / 4, 0, Math.PI / 4]}>
          <planeGeometry args={[2.6, 2.6]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
            wireframe
          />
        </mesh>
      </group>

      {/* Layer 3: Inner Computational Prism Core */}
      <mesh ref={innerCore}>
        <octahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.9}
          emissive="#ff5500"
          emissiveIntensity={hovered ? 1.2 : 0.6}
        />
      </mesh>

      {/* Embedded Floating Data Micro-Nodes */}
      {Array.from({ length: 16 }).map((_, i) => {
        const phi = (i / 16) * Math.PI * 2;
        const radius = 1.2 + (i % 3) * 0.2;
        const x = Math.cos(phi) * radius;
        const y = Math.sin(phi * 2) * 0.5;
        const z = Math.sin(phi) * radius;
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#ff5500" : "#ffffff"} />
          </mesh>
        );
      })}
    </group>
  );
}
