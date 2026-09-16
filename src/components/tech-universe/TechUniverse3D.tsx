"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { CameraRig } from "../3d/CameraRig";

const TECH_ITEMS = [
  { name: "Python", category: "AI Engineering & Automation", desc: "Core language for ML models, LangChain, PyTorch & FastAPI", pos: [-3.8, 1.8, -1] as [number, number, number] },
  { name: "TypeScript", category: "Frontend & Fullstack", desc: "Strict type safety across full-stack Next.js applications", pos: [-1.8, 2.2, 1] as [number, number, number] },
  { name: "React", category: "UI Architecture", desc: "Component architecture, hooks, state machines, R3F", pos: [0.5, 2.0, -0.5] as [number, number, number] },
  { name: "Next.js", category: "Fullstack Framework", desc: "Server Components, App Router, SSR, API routes", pos: [2.8, 1.9, 0.8] as [number, number, number] },
  { name: "FastAPI", category: "Backend Microservices", desc: "High-performance async python REST APIs", pos: [4.2, 0.4, -1.2] as [number, number, number] },
  { name: "Java", category: "Enterprise Backend", desc: "OOP, concurrency, robust backend services", pos: [-4.2, -0.2, 0.5] as [number, number, number] },
  { name: "Spring Boot", category: "Enterprise Framework", desc: "Scalable Java microservices, dependency injection", pos: [-2.4, -0.8, -1.5] as [number, number, number] },
  { name: "PostgreSQL", category: "Relational Database", desc: "ACID transactions, pgvector similarity search", pos: [0.2, -1.2, 1.2] as [number, number, number] },
  { name: "Redis", category: "In-Memory Cache", desc: "Session storage, rate limiting, message queue", pos: [2.5, -0.9, -0.8] as [number, number, number] },
  { name: "Docker", category: "Containerization", desc: "Containerized deployments & multi-service compose", pos: [4.0, -1.8, 0.5] as [number, number, number] },
  { name: "Kafka", category: "Event Streaming", desc: "High-throughput real-time message streaming", pos: [-3.5, -2.2, 1.0] as [number, number, number] },
  { name: "LangChain", category: "AI Framework", desc: "Agent loops, prompt templates, tool integration", pos: [-1.2, -2.5, -0.4] as [number, number, number] },
  { name: "LLMs", category: "Model Integration", desc: "OpenAI GPT-4o, Anthropic Claude, Llama 3 models", pos: [1.2, -2.4, 0.4] as [number, number, number] },
  { name: "RAG", category: "Knowledge Retrieval", desc: "Vector indexing, chunking & hybrid search", pos: [3.2, -2.6, -1.0] as [number, number, number] },
  { name: "Agents", category: "Autonomous Systems", desc: "Multi-agent coordination & tool execution", pos: [0, 0, 1.8] as [number, number, number] },
  { name: "Git", category: "Version Control", desc: "Branching workflows, rebase, code review", pos: [-2.2, 0.4, 1.5] as [number, number, number] },
  { name: "GitHub", category: "DevOps & CI/CD", desc: "GitHub Actions, automated test suites", pos: [1.8, 0.6, -1.8] as [number, number, number] },
  { name: "Vercel", category: "Cloud Deployment", desc: "Global edge deployment & analytics", pos: [-0.6, 0.8, -2.2] as [number, number, number] },
];

function SpatialTechNode({
  name,
  pos,
  index,
  onSelect,
}: {
  name: string;
  pos: [number, number, number];
  index: number;
  onSelect: (item: typeof TECH_ITEMS[0] | null) => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        pos[1] + Math.sin(state.clock.getElapsedTime() * 1.2 + index * 0.8) * 0.15;
      meshRef.current.rotation.y += delta * 0.2 * (hovered ? 2 : 1);
    }
  });

  return (
    <group
      ref={meshRef}
      position={pos}
      onPointerOver={() => {
        setHovered(true);
        onSelect(TECH_ITEMS[index]);
      }}
      onPointerOut={() => {
        setHovered(false);
        onSelect(null);
      }}
    >
      <mesh scale={hovered ? 1.35 : 1}>
        <boxGeometry args={[1.5, 0.55, 0.2]} />
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

      <lineSegments scale={hovered ? 1.35 : 1}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.5, 0.55, 0.2)]} />
        <lineBasicMaterial color={hovered ? "#ffffff" : "#ff5500"} linewidth={2} />
      </lineSegments>

      <Text
        position={[0, 0, 0.12]}
        fontSize={0.22}
        color={hovered ? "#ffffff" : "#0d0d0e"}
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
}

export function TechUniverse3D() {
  const [activeItem, setActiveItem] = useState<typeof TECH_ITEMS[0] | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-[500px] lg:h-[580px] relative rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-2xl flex items-center justify-center">
      {mounted && (
        <Canvas camera={{ position: [0, 0, 7.5], fov: 50 }}>
          <CameraRig targetPosition={[0, 0, 7.5]} parallaxFactor={0.5} />
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={3} color="#ff5500" />

          {TECH_ITEMS.map((item, idx) => (
            <SpatialTechNode
              key={item.name}
              name={item.name}
              pos={item.pos}
              index={idx}
              onSelect={(selected) => setActiveItem(selected)}
            />
          ))}
        </Canvas>
      )}

      {/* Floating Info Badge on Hover */}
      {activeItem ? (
        <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:max-w-md bg-neutral-900/90 backdrop-blur-xl border border-[#ff5500] p-5 rounded-2xl shadow-2xl text-white pointer-events-none transition-all duration-300">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-ping" />
            <span className="text-xs font-mono font-bold text-[#ff5500] uppercase">
              {activeItem.category}
            </span>
          </div>
          <h4 className="text-xl font-extrabold">{activeItem.name}</h4>
          <p className="text-xs text-neutral-300 mt-1 leading-relaxed">{activeItem.desc}</p>
        </div>
      ) : (
        <div className="absolute bottom-6 left-6 text-xs font-mono text-neutral-500 pointer-events-none">
          HOVER ANY 3D NODE TO INSPECT TECH SPEC
        </div>
      )}
    </div>
  );
}
