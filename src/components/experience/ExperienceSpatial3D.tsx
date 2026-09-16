"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CameraRig } from "../3d/CameraRig";

const EXPERIENCES = [
  {
    role: "AI & Software Engineering Specialist",
    period: "2024 - PRESENT",
    pos: [0, 1.2, 1] as [number, number, number],
  },
  {
    role: "MBA Candidate — IT & Business Analytics",
    period: "2024 - 2026",
    pos: [-1.2, 0, 0] as [number, number, number],
  },
  {
    role: "B.Tech Computer Science & Engineering",
    period: "2020 - 2024",
    pos: [1.2, -1.2, -1] as [number, number, number],
  },
];

function SpatialGlassSlab({
  pos,
  index,
  onHover,
}: {
  pos: [number, number, number];
  index: number;
  onHover: (idx: number | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y = pos[1] + Math.sin(state.clock.getElapsedTime() * 1.4 + index) * 0.1;
      groupRef.current.rotation.y += delta * 0.25 * (hovered ? 2 : 1);
    }
  });

  return (
    <group
      ref={groupRef}
      position={pos}
      onPointerOver={() => {
        setHovered(true);
        onHover(index);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      <mesh scale={hovered ? 1.25 : 1}>
        <boxGeometry args={[3.2, 1.4, 0.25]} />
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

      <lineSegments scale={hovered ? 1.25 : 1}>
        <edgesGeometry args={[new THREE.BoxGeometry(3.2, 1.4, 0.25)]} />
        <lineBasicMaterial color={hovered ? "#ffffff" : "#ff5500"} linewidth={2} />
      </lineSegments>
    </group>
  );
}

export function ExperienceSpatial3D() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-[400px] lg:h-[480px] relative rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-2xl flex items-center justify-center">
      {mounted && (
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <CameraRig targetPosition={[0, 0, 6]} parallaxFactor={0.4} />
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={3} color="#ff5500" />

          {EXPERIENCES.map((exp, idx) => (
            <SpatialGlassSlab
              key={exp.role}
              pos={exp.pos}
              index={idx}
              onHover={(i) => setActiveIndex(i)}
            />
          ))}
        </Canvas>
      )}

      <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
        <div className="bg-neutral-900/80 backdrop-blur-md border border-[#ff5500]/40 p-4 rounded-xl max-w-sm text-white">
          <span className="text-[10px] font-mono text-[#ff5500] uppercase font-bold block mb-1">
            VERTICAL 3D TIMELINE
          </span>
          <h4 className="text-sm font-bold">
            {activeIndex !== null ? EXPERIENCES[activeIndex].role : "Hover Glass Slabs in 3D Space"}
          </h4>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            {activeIndex !== null ? EXPERIENCES[activeIndex].period : "Spatial Depth Experience"}
          </p>
        </div>
      </div>
    </div>
  );
}
