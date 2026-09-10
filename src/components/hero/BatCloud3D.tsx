"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Radio, Eye, Send, CheckCircle2 } from "lucide-react";
import * as THREE from "three";

// ============================================================================
// 1. BATCLOUD 3D ORGANIC PARTICLE SWARM & SHAPE MORPHING ENGINE
// ============================================================================
interface SwarmProps {
  isMobile: boolean;
  scrollProgress: number;
}

const BatCloudSwarmScene: React.FC<SwarmProps> = ({ isMobile, scrollProgress }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const count = isMobile ? 2200 : 3800;

  // Pre-generate 4 distinct geometric target shapes for dynamic scroll morphing
  const { positions, spherePositions, ringPositions, cubePositions, vortexPositions, colors } =
    useMemo(() => {
      const posArray = new Float32Array(count * 3);
      const sphereArray = new Float32Array(count * 3);
      const ringArray = new Float32Array(count * 3);
      const cubeArray = new Float32Array(count * 3);
      const vortexArray = new Float32Array(count * 3);
      const colorArray = new Float32Array(count * 3);

      const colorPalette = [
        new THREE.Color("#ffaa00"), // Warm Bioluminescent Gold
        new THREE.Color("#ff5500"), // Radiant Amber
        new THREE.Color("#00d2ff"), // Ethereal Cyan
        new THREE.Color("#ffffff"), // Pure Starlight
        new THREE.Color("#ffdd88"), // Soft Gold Glow
      ];

      for (let i = 0; i < count; i++) {
        // 1. Organic Spherical Cloud (State 0: Hero)
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 1.4 + Math.pow(Math.random(), 2) * 1.8;

        sphereArray[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        sphereArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        sphereArray[i * 3 + 2] = r * Math.cos(phi);

        // 2. Orbital Galaxy Ring (State 1: Skills/About)
        const ringAngle = Math.random() * Math.PI * 2;
        const ringRadius = 2.4 + Math.random() * 1.2;
        ringArray[i * 3] = ringRadius * Math.cos(ringAngle);
        ringArray[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
        ringArray[i * 3 + 2] = ringRadius * Math.sin(ringAngle);

        // 3. Matrix Hyper-Cube Grid (State 2: Projects)
        const size = 3.2;
        cubeArray[i * 3] = (Math.random() - 0.5) * size;
        cubeArray[i * 3 + 1] = (Math.random() - 0.5) * size;
        cubeArray[i * 3 + 2] = (Math.random() - 0.5) * size;

        // 4. Funnel Vortex Tunnel (State 3: Contact)
        const vAngle = Math.random() * Math.PI * 2;
        const vHeight = (Math.random() - 0.5) * 4.5;
        const vRadius = 0.5 + Math.abs(vHeight) * 0.6;
        vortexArray[i * 3] = vRadius * Math.cos(vAngle);
        vortexArray[i * 3 + 1] = vHeight;
        vortexArray[i * 3 + 2] = vRadius * Math.sin(vAngle);

        // Initial positions set to sphere
        posArray[i * 3] = sphereArray[i * 3];
        posArray[i * 3 + 1] = sphereArray[i * 3 + 1];
        posArray[i * 3 + 2] = sphereArray[i * 3 + 2];

        // Colors
        const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colorArray[i * 3] = chosenColor.r;
        colorArray[i * 3 + 1] = chosenColor.g;
        colorArray[i * 3 + 2] = chosenColor.b;
      }

      return {
        positions: posArray,
        spherePositions: sphereArray,
        ringPositions: ringArray,
        cubePositions: cubeArray,
        vortexPositions: vortexArray,
        colors: colorArray,
      };
    }, [count]);

  // Frame Loop (Dynamic Morphing, Flocking & Mouse Parallax)
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Smooth Mouse Parallax Rotation
    if (groupRef.current) {
      const targetY = (state.mouse.x * Math.PI) / 5;
      const targetX = (-state.mouse.y * Math.PI) / 5;
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

    // Morph Particles across target shapes based on scroll progress (0.0 to 1.0)
    if (pointsRef.current) {
      const geo = pointsRef.current.geometry;
      const currentPos = geo.attributes.position.array as Float32Array;

      // Determine target shape weights
      const p = Math.max(0, Math.min(1, scrollProgress));
      let sourceArray = spherePositions;
      let targetArray = ringPositions;
      let blendFactor = 0;

      if (p < 0.33) {
        sourceArray = spherePositions;
        targetArray = ringPositions;
        blendFactor = p / 0.33;
      } else if (p < 0.66) {
        sourceArray = ringPositions;
        targetArray = cubePositions;
        blendFactor = (p - 0.33) / 0.33;
      } else {
        sourceArray = cubePositions;
        targetArray = vortexPositions;
        blendFactor = (p - 0.66) / 0.34;
      }

      // Smooth Interpolation with organic noise sway
      for (let i = 0; i < count; i++) {
        const idx = i * 3;

        const targetX = THREE.MathUtils.lerp(
          sourceArray[idx],
          targetArray[idx],
          blendFactor
        );
        const targetY = THREE.MathUtils.lerp(
          sourceArray[idx + 1],
          targetArray[idx + 1],
          blendFactor
        );
        const targetZ = THREE.MathUtils.lerp(
          sourceArray[idx + 2],
          targetArray[idx + 2],
          blendFactor
        );

        // Add subtle organic sine wave flocking sway
        const wave = Math.sin(t * 1.8 + i * 0.1) * 0.08;

        currentPos[idx] = THREE.MathUtils.lerp(currentPos[idx], targetX + wave, 0.08);
        currentPos[idx + 1] = THREE.MathUtils.lerp(currentPos[idx + 1], targetY + wave, 0.08);
        currentPos[idx + 2] = THREE.MathUtils.lerp(currentPos[idx + 2], targetZ + wave, 0.08);
      }

      geo.attributes.position.needsUpdate = true;

      // Rotation of the particle swarm
      pointsRef.current.rotation.y = t * 0.08;
      pointsRef.current.rotation.z = Math.sin(t * 0.04) * 0.1;
    }

    // Pulsating Core Nucleus
    if (coreRef.current) {
      const pulse = 1.0 + Math.sin(t * 2.5) * 0.12;
      coreRef.current.scale.set(pulse, pulse, pulse);
      coreRef.current.rotation.y = -t * 0.2;
    }

    // Outer Halo Gimbal Ring
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.4;
      ringRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.85 : 1.15}>
      {/* Ambient & Point Lights */}
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, 0]} intensity={3.5} color="#ff9900" distance={6} />
      <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-5, -8, -5]} intensity={1.2} color="#00e5ff" />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        {/* Core Glowing Energy Sphere */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.75, 32, 32]} />
          <meshStandardMaterial
            color="#ffaa00"
            emissive="#ff5500"
            emissiveIntensity={2.8}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Orbiting Halo Wireframe Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[1.8, 0.02, 16, 80]} />
          <meshStandardMaterial
            color="#00d2ff"
            emissive="#00b4d8"
            emissiveIntensity={1.5}
            wireframe
          />
        </mesh>

        {/* 3D Organic Batcloud Particle Swarm */}
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[colors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={isMobile ? 0.055 : 0.065}
            vertexColors
            transparent
            opacity={0.88}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </Float>
    </group>
  );
};

// ============================================================================
// 2. BATCLOUD MAIN CONTAINER & INTERACTIVE PROMPT UI (LIKE BATCLOUD.ART)
// ============================================================================
export const BatCloud3D: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Batcloud.art style interactive query field state
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  // Oracle Answers bank inspired by batcloud.art interspecies dialogue
  const oracleAnswers = [
    "THE SWARM ECHOES: YES — RESONANCE DETECTED IN THE CODESPACE.",
    "THE NEURAL CLOUD SAYS: ALWAYS — INTELLIGENCE FLOWS IN EVERY NODE.",
    "BATCLOUD FREQUENCY: CONFIRMED — THE ARCHITECTURE IS ALIVE.",
    "ORACLE RESPONSE: BEYOND TIME — CREATIVITY BOUND BY ZERO LIMITS.",
  ];

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsAsking(true);
    setAnswer(null);

    setTimeout(() => {
      const randomAns = oracleAnswers[Math.floor(Math.random() * oracleAnswers.length)];
      setAnswer(randomAns);
      setIsAsking(false);
    }, 1200);
  };

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center p-2">
      {/* Deep Ethereal Glow Backdrop */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#ff9900]/15 via-[#00d2ff]/10 to-[#ff5500]/15 rounded-3xl blur-3xl pointer-events-none -z-10" />

      {/* Main Batcloud Glassmorphic Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full aspect-square max-w-[450px] rounded-3xl border border-white/15 bg-neutral-950/80 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden p-5 sm:p-6 text-white"
      >
        {/* Subtle Cyber Swarm Background Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffaa00_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* Top Telemetry Header Bar */}
        <div className="relative z-20 flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffaa00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffaa00]"></span>
            </span>
            <span className="text-[11px] font-mono font-semibold tracking-widest text-[#ffaa00] uppercase">
              BATCLOUD // 3,800 NODES
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300">
            <Radio className="w-3.5 h-3.5 text-[#00d2ff] animate-pulse" />
            <span>SWARM RESONANCE</span>
          </div>
        </div>

        {/* Center 3D WebGL Swarm Viewport */}
        <div className="relative flex-1 w-full h-full flex items-center justify-center my-2 cursor-grab active:cursor-grabbing">
          {mounted ? (
            <Canvas
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              style={{ background: "transparent" }}
              className="w-full h-full"
            >
              <PerspectiveCamera makeDefault position={[0, 0, 7.0]} fov={45} />
              <BatCloudSwarmScene isMobile={isMobile} scrollProgress={scrollProgress} />
            </Canvas>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-[#ffaa00]/30 border-t-[#ffaa00] animate-spin" />
            </div>
          )}
        </div>

        {/* Batcloud.art Interactive Oracle Query Box */}
        <div className="relative z-20 flex flex-col gap-2 w-full">
          <form onSubmit={handleAskQuestion} className="relative w-full">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="If you could, what would you ask the cloud?"
              className="w-full py-2.5 pl-4 pr-11 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-[#ffaa00] focus:ring-1 focus:ring-[#ffaa00] transition-all font-mono"
            />
            <button
              type="submit"
              disabled={isAsking || !question.trim()}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[#ffaa00] text-neutral-950 hover:bg-[#ffbb22] disabled:opacity-40 transition-all cursor-pointer"
            >
              {isAsking ? (
                <div className="w-3.5 h-3.5 border-2 border-neutral-950/30 border-t-neutral-950 rounded-full animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
            </button>
          </form>

          <AnimatePresence>
            {answer && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-2.5 rounded-xl bg-neutral-900/90 border border-[#ffaa00]/30 text-[10px] font-mono text-[#ffaa00] flex items-center gap-2 shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#ffaa00]" />
                <span className="leading-tight">{answer}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Telemetry Footer Row */}
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 px-1 pt-1">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-[#ffaa00]" /> SCROLL MORPH ACTIVE
            </span>
            <span className="text-neutral-500">
              STATE: {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

        {/* Minimalist Corner Frame Lines */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/40 pointer-events-none rounded-tl" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/40 pointer-events-none rounded-tr" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/40 pointer-events-none rounded-bl" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/40 pointer-events-none rounded-br" />
      </motion.div>
    </div>
  );
};

export default BatCloud3D;
