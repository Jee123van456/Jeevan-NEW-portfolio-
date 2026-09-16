"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CameraRig } from "../3d/CameraRig";

function Agentic3DVisual() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Orchestrator Node */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#ff5500" emissive="#ff4400" emissiveIntensity={0.8} />
      </mesh>

      {/* Orbiting Autonomous Agent Sub-nodes */}
      {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, i) => {
        const x = Math.cos(angle) * 1.4;
        const z = Math.sin(angle) * 1.4;
        return (
          <group key={i} position={[x, 0, z]}>
            <mesh>
              <octahedronGeometry args={[0.3, 0]} />
              <meshStandardMaterial color="#ffffff" wireframe />
            </mesh>
            <lineSegments>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([0, 0, 0, -x, 0, -z]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#ff5500" transparent opacity={0.6} />
            </lineSegments>
          </group>
        );
      })}
    </group>
  );
}

function Rag3DVisual() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Chunking Vector Vault Box */}
      <mesh>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshPhysicalMaterial
          color="#ff5500"
          transmission={0.85}
          opacity={0.4}
          transparent
          roughness={0.1}
          wireframe
        />
      </mesh>
      {/* Floating Document Data Sheets */}
      {[-0.4, 0, 0.4].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]} rotation={[0.2, idx * 0.4, 0]}>
          <planeGeometry args={[1.1, 0.7]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function MultiAgent3DVisual() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Multi-Agent Tetrahedron Lattice */}
      {[
        [0, 0.8, 0],
        [-0.8, -0.6, 0.5],
        [0.8, -0.6, 0.5],
        [0, -0.6, -0.8],
      ].map(([x, y, z], idx) => (
        <mesh key={idx} position={[x, y, z]}>
          <boxGeometry args={[0.35, 0.35, 0.35]} />
          <meshStandardMaterial color={idx === 0 ? "#ff5500" : "#ffffff"} emissive="#ff3300" emissiveIntensity={idx === 0 ? 0.9 : 0.2} />
        </mesh>
      ))}
    </group>
  );
}

function AiProducts3DVisual() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Assembling 3D UI Stack Layers */}
      {[0.5, 0, -0.5].map((z, idx) => (
        <mesh key={idx} position={[0, idx * 0.3 - 0.3, z * 0.5]} rotation={[-0.4, 0.4, 0]}>
          <planeGeometry args={[1.8, 1.1]} />
          <meshPhysicalMaterial
            color={idx === 1 ? "#ff5500" : "#ffffff"}
            transparent
            opacity={0.6 - idx * 0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export function SpatialSystem3DCard({
  title,
  subtitle,
  description,
  tags,
  type,
  index,
}: {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  type: "agentic" | "rag" | "multiagent" | "aiproducts";
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative p-6 sm:p-8 rounded-2xl border transition-all duration-500 overflow-hidden flex flex-col justify-between cursor-pointer ${
        hovered
          ? "border-[#ff5500] shadow-[0_15px_40px_rgba(255,85,0,0.2)] bg-neutral-900 text-white translate-y-[-6px]"
          : "border-neutral-200/90 bg-white text-neutral-900 shadow-lg"
      }`}
    >
      {/* Header Info */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-bold tracking-widest text-[#ff5500] uppercase">
            SYSTEM 0{index + 1}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/25">
            {subtitle}
          </span>
        </div>

        <h3 className={`text-2xl font-black mb-3 ${hovered ? "text-white" : "text-neutral-900"}`}>
          {title}
        </h3>

        <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${hovered ? "text-neutral-300" : "text-neutral-600"}`}>
          {description}
        </p>
      </div>

      {/* 3D Interactive Canvas Scene */}
      <div className="w-full h-[180px] my-2 relative rounded-xl overflow-hidden bg-neutral-950/80 border border-neutral-800 flex items-center justify-center">
        {mounted && (
          <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
            <CameraRig targetPosition={[0, 0, 4.5]} parallaxFactor={0.3} />
            <ambientLight intensity={0.8} />
            <pointLight position={[5, 5, 5]} color="#ff5500" intensity={3} />
            
            {type === "agentic" && <Agentic3DVisual />}
            {type === "rag" && <Rag3DVisual />}
            {type === "multiagent" && <MultiAgent3DVisual />}
            {type === "aiproducts" && <AiProducts3DVisual />}
          </Canvas>
        )}
      </div>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {tags.map((t) => (
          <span
            key={t}
            className={`text-[10px] font-mono px-2.5 py-1 rounded-md font-semibold ${
              hovered ? "bg-neutral-800 text-neutral-200 border border-neutral-700" : "bg-neutral-100 text-neutral-700 border border-neutral-200"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
