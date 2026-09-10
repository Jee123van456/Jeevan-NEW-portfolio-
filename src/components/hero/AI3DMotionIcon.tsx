"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import { Sparkles, Cpu, Layers, Activity } from "lucide-react";
import * as THREE from "three";

// 1. Interactive 3D AI Motion Icon Core (Rendered inside Three.js Canvas)
const AI3DIconScene: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const groupRef = useRef<THREE.Group>(null);
  const nucleusRef = useRef<THREE.Mesh>(null);
  const innerOctaRef = useRef<THREE.Mesh>(null);
  const gimbalRing1Ref = useRef<THREE.Mesh>(null);
  const gimbalRing2Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate particle positions once
  const [particlePositions] = useState(() => {
    const count = isMobile ? 35 : 60;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.2 + Math.random() * 0.8;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  });

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Smooth GPU Mouse Parallax
    if (groupRef.current) {
      const targetY = (state.mouse.x * Math.PI) / 6;
      const targetX = (-state.mouse.y * Math.PI) / 6;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        0.05
      );
    }

    // 1. Pulsating Inner Glowing Energy Core
    if (nucleusRef.current) {
      const pulse = 1 + Math.sin(t * 3.0) * 0.08;
      nucleusRef.current.scale.set(pulse, pulse, pulse);
    }

    // 2. Spinning Inner Crystalline Octahedron
    if (innerOctaRef.current) {
      innerOctaRef.current.rotation.x = t * 0.4;
      innerOctaRef.current.rotation.y = -t * 0.6;
    }

    // 3. Gimbal Ring 1 Rotation
    if (gimbalRing1Ref.current) {
      gimbalRing1Ref.current.rotation.z = t * 0.3;
      gimbalRing1Ref.current.rotation.x = Math.sin(t * 0.4) * 0.3;
    }

    // 4. Gimbal Ring 2 Rotation (Opposite axis)
    if (gimbalRing2Ref.current) {
      gimbalRing2Ref.current.rotation.y = -t * 0.4;
      gimbalRing2Ref.current.rotation.z = Math.cos(t * 0.3) * 0.3;
    }

    // 5. Particle Swarm Rotation
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.85 : 1.1}>
      {/* Lighting */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 8, 5]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-4, -4, -4]} intensity={1.8} color="#ff5500" />
      <pointLight position={[0, 0, 0]} intensity={3.5} color="#ff3300" />

      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        {/* Central Energy Nucleus */}
        <mesh ref={nucleusRef}>
          <sphereGeometry args={[0.75, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ff5500"
            emissiveIntensity={3.0}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Inner Crystalline Octahedron */}
        <mesh ref={innerOctaRef}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#0d0d0e"
            emissive="#ff4400"
            emissiveIntensity={1.2}
            wireframe
            roughness={0.2}
          />
        </mesh>

        {/* Outer Gimbal Ring 1 */}
        <mesh ref={gimbalRing1Ref} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.75, 0.04, 16, 100]} />
          <meshStandardMaterial
            color="#ffaa00"
            emissive="#ff5500"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Outer Gimbal Ring 2 */}
        <mesh ref={gimbalRing2Ref} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[2.15, 0.03, 16, 100]} />
          <meshStandardMaterial
            color="#0d0d0e"
            emissive="#ff3300"
            emissiveIntensity={0.5}
            wireframe
          />
        </mesh>

        {/* Orbiting Quantum Particles */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
          </bufferGeometry>

          <pointsMaterial
            size={0.07}
            color="#ff6600"
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </Float>
    </group>
  );
};

// 2. Main Glitch-Free 3D Motion Icon Container Component
export const AI3DMotionIcon: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col items-center justify-center p-2">
      {/* Soft Ambient Backdrop Glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#ff5500]/15 via-[#ffaa00]/10 to-[#ff5500]/15 rounded-3xl blur-2xl pointer-events-none -z-10" />

      {/* Main Glassmorphic Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full aspect-square max-w-[420px] rounded-3xl border border-[#ff5500]/20 bg-white/75 backdrop-blur-xl shadow-[0_20px_50px_rgba(255,85,0,0.07)] flex flex-col justify-between overflow-hidden p-6"
      >
        {/* Subtle Cybernetic Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ff5500_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* Top Telemetry Header Pill */}
        <div className="relative z-20 flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5500] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5500]"></span>
            </span>
            <span className="text-[11px] font-mono font-bold tracking-wider text-[#ff5500] uppercase">
              AI CORE // 60 FPS
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100/80 border border-neutral-200 text-[11px] font-mono text-neutral-600">
            <Activity className="w-3 h-3 text-[#ff5500] animate-pulse" />
            <span>REALTIME 3D</span>
          </div>
        </div>

        {/* Center 3D Three.js Viewport */}
        <div className="relative flex-1 w-full h-full flex items-center justify-center my-2">
          {mounted ? (
            <Canvas
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              style={{ background: "transparent" }}
              className="w-full h-full"
            >
              <PerspectiveCamera makeDefault position={[0, 0, 7.5]} fov={45} />
              <AI3DIconScene isMobile={isMobile} />
            </Canvas>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-[#ff5500]/30 border-t-[#ff5500] animate-spin" />
            </div>
          )}
        </div>

        {/* Bottom Floating Tech Badges */}
        <div className="relative z-20 flex items-center justify-between w-full text-[11px] font-mono">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 text-white shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>AGENTIC SYSTEM</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/90 border border-neutral-200/80 text-neutral-700 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>NEURAL GRAPH</span>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#ff5500]/50 pointer-events-none rounded-tl" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#ff5500]/50 pointer-events-none rounded-tr" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#ff5500]/50 pointer-events-none rounded-bl" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#ff5500]/50 pointer-events-none rounded-br" />
      </motion.div>
    </div>
  );
};

export default AI3DMotionIcon;
