"use client";

import React, { useRef } from "react";
import { Float, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ModuleData {
  text: string;
  sub: string;
  position: [number, number, number];
  speed: number;
}

const MODULES: ModuleData[] = [
  { text: "LLM", sub: "REASONING ENGINE", position: [0, 2.25, 0.4], speed: 1.8 },
  { text: "RAG", sub: "HYBRID RETRIEVAL", position: [-2.6, 1.0, 0.6], speed: 2.2 },
  { text: "AGENTS", sub: "MULTI-AGENT GRAPH", position: [2.6, 1.0, -0.4], speed: 1.5 },
  { text: "TOOLS", sub: "DYNAMIC EXECUTION", position: [0, -2.25, 0.6], speed: 2.0 },
  { text: "REASONING", sub: "CHAIN OF THOUGHT", position: [-2.3, -1.15, -0.5], speed: 1.7 },
  { text: "MEMORY", sub: "STATE PERSISTENCE", position: [2.3, -1.15, 0.5], speed: 1.6 },
  { text: "API", sub: "STREAMING MICROSERVICE", position: [2.2, 2.0, -0.6], speed: 2.1 },
  { text: "RETRIEVAL", sub: "VECTOR SEARCH", position: [-2.2, 2.0, 0.3], speed: 1.9 },
];

export const FloatingModules: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const activeModules = isMobile ? MODULES.slice(0, 4) : MODULES;

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {activeModules.map((mod) => (
        <Float
          key={mod.text}
          speed={mod.speed}
          rotationIntensity={0.3}
          floatIntensity={0.8}
          position={mod.position}
        >
          <Html center distanceFactor={7.5} transform className="pointer-events-none select-none">
            <div className="group relative flex flex-col items-center justify-center px-3.5 py-2 rounded-2xl bg-[#0b0c0e]/90 text-white border border-[#ff5500]/50 backdrop-blur-xl shadow-[0_0_20px_rgba(255,85,0,0.3)] whitespace-nowrap">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-pulse shrink-0" />
                <span className="font-mono font-extrabold text-xs tracking-wider text-[#ff5500]">
                  [{mod.text}]
                </span>
              </div>
              <span className="text-[9px] font-mono text-neutral-300 font-semibold tracking-widest uppercase mt-0.5">
                {mod.sub}
              </span>
            </div>
          </Html>
        </Float>
      ))}
    </group>
  );
};
