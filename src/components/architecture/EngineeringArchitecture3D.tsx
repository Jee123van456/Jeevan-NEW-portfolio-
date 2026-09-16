"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { CameraRig } from "../3d/CameraRig";

const STAGES = [
  "1. IDEA",
  "2. DATA",
  "3. RETRIEVAL",
  "4. REASONING",
  "5. TOOLS",
  "6. AGENTS",
  "7. EVALUATION",
  "8. DEPLOYMENT",
];

function Stage3DModule({
  label,
  index,
  total,
  onHover,
}: {
  label: string;
  index: number;
  total: number;
  onHover: (idx: number | null) => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const x = (index - (total - 1) / 2) * 1.8;
  const y = Math.sin(index * 0.7) * 0.4;
  const z = (index % 2) * 0.5;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3 * (hovered ? 2 : 1);
      meshRef.current.position.y = y + Math.sin(state.clock.getElapsedTime() * 1.5 + index) * 0.08;
    }
  });

  return (
    <group
      ref={meshRef}
      position={[x, y, z]}
      onPointerOver={() => {
        setHovered(true);
        onHover(index);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      <mesh scale={hovered ? 1.2 : 1}>
        <boxGeometry args={[1.4, 1.2, 0.4]} />
        <meshPhysicalMaterial
          color={hovered ? "#ff5500" : "#ffffff"}
          transmission={0.8}
          opacity={0.9}
          transparent
          roughness={0.1}
          metalness={0.2}
          clearcoat={1}
        />
      </mesh>

      <lineSegments scale={hovered ? 1.2 : 1}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.4, 1.2, 0.4)]} />
        <lineBasicMaterial color={hovered ? "#ffffff" : "#ff5500"} linewidth={2} />
      </lineSegments>

      <Text
        position={[0, 0, 0.25]}
        fontSize={0.18}
        color={hovered ? "#ffffff" : "#0d0d0e"}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

export function EngineeringArchitecture3D() {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-[450px] lg:h-[520px] relative rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-2xl flex items-center justify-center">
      {mounted && (
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <CameraRig targetPosition={[0, 0, 8]} parallaxFactor={0.5} />
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={3} color="#ff5500" />

          {STAGES.map((stage, idx) => (
            <Stage3DModule
              key={stage}
              label={stage}
              index={idx}
              total={STAGES.length}
              onHover={(i) => setActiveStage(i)}
            />
          ))}
        </Canvas>
      )}

      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
        <div className="bg-neutral-900/90 backdrop-blur-md border border-[#ff5500]/40 px-4 py-2 rounded-xl text-xs font-mono text-white">
          <span>ACTIVE STAGE: </span>
          <span className="font-bold text-[#ff5500]">
            {activeStage !== null ? STAGES[activeStage] : "HOVER STAGE MODULE"}
          </span>
        </div>
        <div className="text-[10px] font-mono text-neutral-500 hidden sm:block">
          FROM IDEA → INTELLIGENCE → PRODUCTION
        </div>
      </div>
    </div>
  );
}
