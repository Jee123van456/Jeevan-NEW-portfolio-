"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CameraRig } from "../3d/CameraRig";

// --- Project 1: OmniRAG 9-Stage Pipeline ---
function OmniRagPipelineVisual() {
  const groupRef = useRef<THREE.Group>(null);
  const stages = [
    "DATA SOURCES",
    "INGESTION",
    "CHUNKING",
    "EMBEDDINGS",
    "VECTOR SEARCH",
    "RERANKING",
    "LLM",
    "AGENT",
    "ANSWER",
  ];

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {stages.map((_, i) => {
        const angle = (i / stages.length) * Math.PI * 2;
        const radius = 2.2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={i} position={[x, 0, z]}>
            <mesh>
              <boxGeometry args={[0.45, 0.45, 0.45]} />
              <meshStandardMaterial
                color={i === 8 ? "#ff5500" : "#ffffff"}
                wireframe
                emissive="#ff5500"
                emissiveIntensity={i === 8 ? 0.9 : 0.2}
              />
            </mesh>
          </group>
        );
      })}

      {/* Pulsing Central Vector Hub */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#ff5500" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// --- Project 2: Multi-Agent Autonomous Nodes ---
function MultiAgentNodesVisual() {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = ["PLANNER", "RESEARCHER", "CODER", "REVIEWER", "EXECUTOR"];

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((_, i) => {
        const angle = (i / nodes.length) * Math.PI * 2;
        const radius = 1.8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={i} position={[x, 0, z]}>
            <mesh>
              <octahedronGeometry args={[0.4, 0]} />
              <meshStandardMaterial
                color={i === 0 ? "#ff5500" : "#ffffff"}
                emissive="#ff4400"
                emissiveIntensity={0.6}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// --- Project 3: AI Voice Workflow Environment ---
function VoiceWorkflowVisual() {
  const groupRef = useRef<THREE.Group>(null);
  const waveRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (waveRef.current) {
      waveRef.current.children.forEach((child, idx) => {
        child.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 4 + idx) * 1.5;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Voice Waveform Bars */}
      <group ref={waveRef} position={[0, 0, 0]}>
        {[-1.2, -0.6, 0, 0.6, 1.2].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.15, 0.6, 0.15]} />
            <meshStandardMaterial color="#ff5500" emissive="#ff3300" emissiveIntensity={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// --- Project 4: Evals Dashboard 3D Floating Metrics ---
function EvalsDashboardVisual() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Metric Glass Panels */}
      {[-1, 0, 1].map((x, i) => (
        <mesh key={i} position={[x * 1.1, (i - 1) * 0.4, 0]}>
          <boxGeometry args={[0.8, 0.9, 0.1]} />
          <meshPhysicalMaterial
            color="#ff5500"
            transmission={0.85}
            opacity={0.7}
            transparent
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

export function Project3DVisualizer({ projectId }: { projectId: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-[220px] relative rounded-xl overflow-hidden bg-neutral-950/90 border border-neutral-800 flex items-center justify-center">
      {mounted && (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <CameraRig targetPosition={[0, 0, 5]} parallaxFactor={0.3} />
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 5, 5]} color="#ff5500" intensity={3} />

          {projectId.includes("omnirag") && <OmniRagPipelineVisual />}
          {projectId.includes("agent") && !projectId.includes("voice") && <MultiAgentNodesVisual />}
          {projectId.includes("voice") && <VoiceWorkflowVisual />}
          {projectId.includes("eval") && <EvalsDashboardVisual />}
          {!projectId.includes("omnirag") &&
            !projectId.includes("agent") &&
            !projectId.includes("voice") &&
            !projectId.includes("eval") && <OmniRagPipelineVisual />}
        </Canvas>
      )}
    </div>
  );
}
