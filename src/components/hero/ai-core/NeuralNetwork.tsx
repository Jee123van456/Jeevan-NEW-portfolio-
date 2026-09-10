"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const NeuralNetwork: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);

  const nodeCount = isMobile ? 24 : 45;

  // Generate node positions in a sphere around the core
  const { nodePositions, linePositions } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const nodeCoords = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.2 + Math.random() * 1.0;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      nodes.push(new THREE.Vector3(x, y, z));
      nodeCoords[i * 3] = x;
      nodeCoords[i * 3 + 1] = y;
      nodeCoords[i * 3 + 2] = z;
    }

    // Connect nodes within a maximum distance to form clean neural branches
    const lineCoords: number[] = [];
    const maxDist = 2.6;

    for (let i = 0; i < nodes.length; i++) {
      let connections = 0;
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < maxDist && connections < 3) {
          lineCoords.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
          connections++;
        }
      }
    }

    return {
      nodePositions: nodeCoords,
      linePositions: new Float32Array(lineCoords),
    };
  }, [nodeCount]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Neural Nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.08 : 0.1}
          color="#ff5500"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Neural Line Connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};
