"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SpatialGlassBoxProps {
  size?: number;
  color?: string;
  wireframeColor?: string;
  rotationSpeed?: number;
  hovered?: boolean;
}

export function SpatialGlassBox({
  size = 2,
  color = "#ff5500",
  wireframeColor = "#ffffff",
  rotationSpeed = 0.2,
  hovered = false,
}: SpatialGlassBoxProps) {
  const outerGroup = useRef<THREE.Group>(null);
  const innerMesh = useRef<THREE.Mesh>(null);
  const coreMesh = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (outerGroup.current) {
      outerGroup.current.rotation.y += delta * rotationSpeed * (hovered ? 1.5 : 1.0);
      outerGroup.current.rotation.x += delta * (rotationSpeed * 0.5);
    }
    if (innerMesh.current) {
      innerMesh.current.rotation.y -= delta * rotationSpeed * 1.2;
    }
    if (coreMesh.current) {
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.08;
      coreMesh.current.scale.setScalar(scale);
    }
  });

  const halfSize = size / 2;

  return (
    <group ref={outerGroup}>
      {/* Outer Wireframe Glass Framework */}
      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshPhysicalMaterial
          color={color}
          transmission={0.9}
          opacity={0.3}
          transparent
          roughness={0.1}
          metalness={0.1}
          ior={1.5}
          thickness={0.5}
          specularIntensity={1}
          clearcoat={1}
        />
      </mesh>

      {/* Structural Frame Lines */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(size, size, size)]} />
        <lineBasicMaterial color={wireframeColor} transparent opacity={0.6} linewidth={1.5} />
      </lineSegments>

      {/* Outer Glow Corner Nodes */}
      {[
        [-1, -1, -1],
        [-1, -1, 1],
        [-1, 1, -1],
        [-1, 1, 1],
        [1, -1, -1],
        [1, -1, 1],
        [1, 1, -1],
        [1, 1, 1],
      ].map(([x, y, z], index) => (
        <mesh key={index} position={[x * halfSize, y * halfSize, z * halfSize]}>
          <sphereGeometry args={[size * 0.04, 12, 12]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}

      {/* Inner Rotating Sub-cube */}
      <mesh ref={innerMesh}>
        <boxGeometry args={[size * 0.65, size * 0.65, size * 0.65]} />
        <meshStandardMaterial
          color="#ff7722"
          wireframe
          transparent
          opacity={0.5}
          emissive="#ff4400"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Core Glowing Energy Matrix */}
      <mesh ref={coreMesh}>
        <octahedronGeometry args={[size * 0.35, 0]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}
