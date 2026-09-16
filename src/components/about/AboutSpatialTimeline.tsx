"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CameraRig } from "../3d/CameraRig";

const MILESTONES = [
  {
    year: "2024",
    title: "B.Tech CSE Graduate",
    subtitle: "Solid Foundations in Data Structures, Algorithms & Distributed Systems",
    pos: [-3.5, 0.5, 0] as [number, number, number],
  },
  {
    year: "2026",
    title: "MBA Candidate",
    subtitle: "Technology Strategy, System Economics & Product Management",
    pos: [0, -0.2, 1.2] as [number, number, number],
  },
  {
    year: "NOW",
    title: "AI / Software Engineer",
    subtitle: "Building Autonomous Agents, RAG Pipelines & Enterprise Intelligence",
    pos: [3.5, 0.6, 2.2] as [number, number, number],
  },
];

function SpatialMilestoneNode({
  position,
  index,
}: {
  position: [number, number, number];
  index: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.getElapsedTime() * 1.5 + index * 1.2) * 0.12;
      meshRef.current.rotation.y += delta * 0.3 * (hovered ? 2 : 1);
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* 3D Floating Glass Slab Platform */}
      <mesh>
        <boxGeometry args={[2.2, 1.3, 0.2]} />
        <meshPhysicalMaterial
          color={hovered ? "#ff5500" : "#ffffff"}
          transmission={0.85}
          opacity={0.9}
          transparent
          roughness={0.1}
          metalness={0.2}
          clearcoat={1}
        />
      </mesh>

      {/* Orange Border Accent */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(2.2, 1.3, 0.2)]} />
        <lineBasicMaterial color={hovered ? "#ffffff" : "#ff5500"} linewidth={2} />
      </lineSegments>

      {/* Internal Pulsing Core */}
      <mesh position={[0, 0, 0.12]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ff5500" emissive="#ff3300" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function ConnectingLightTrails() {
  const lineGeometry = React.useMemo(() => {
    const points = MILESTONES.map((m) => new THREE.Vector3(...m.pos));
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 64, 0.04, 8, false);
  }, []);

  return (
    <mesh geometry={lineGeometry}>
      <meshBasicMaterial color="#ff5500" transparent opacity={0.6} wireframe />
    </mesh>
  );
}

export function AboutSpatialTimeline() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-[400px] lg:h-[480px] relative rounded-2xl bg-neutral-950/90 border border-neutral-800 overflow-hidden shadow-2xl flex items-center justify-center">
      {mounted && (
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
          <CameraRig targetPosition={[0, 0, 7]} parallaxFactor={0.4} />
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#ff5500" />

          <ConnectingLightTrails />

          {MILESTONES.map((m, idx) => (
            <SpatialMilestoneNode key={idx} position={m.pos} index={idx} />
          ))}
        </Canvas>
      )}

      {/* 2D Overlay Badges mapping to 3D Nodes for maximum readability */}
      <div className="absolute inset-0 pointer-events-none p-6 flex flex-col lg:flex-row justify-between items-center text-white">
        {MILESTONES.map((m, idx) => (
          <div
            key={idx}
            className="bg-neutral-900/80 backdrop-blur-md border border-[#ff5500]/40 p-4 rounded-xl max-w-[240px] text-center shadow-lg"
          >
            <span className="text-xs font-mono font-bold text-[#ff5500] px-2 py-0.5 rounded bg-[#ff5500]/10 border border-[#ff5500]/30 inline-block mb-1">
              {m.year}
            </span>
            <h4 className="text-sm font-bold text-white">{m.title}</h4>
            <p className="text-[11px] text-neutral-400 mt-1 leading-snug">{m.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
