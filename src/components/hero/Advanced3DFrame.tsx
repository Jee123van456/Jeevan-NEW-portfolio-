"use client";

import React, { useState, useRef, MouseEvent } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, RefreshCw, Cpu, Layers, Box } from "lucide-react";
import { Hero3DFallback } from "./Hero3DFallback";

// Dynamic import for R3F 3D Core Canvas
const DynamicHero3DCore = dynamic(() => import("./Hero3DCore"), {
  ssr: false,
  loading: () => <Hero3DFallback />,
});

export const Advanced3DFrame: React.FC = () => {
  // Outer static wrapper ref for glitch-free bounding rect calculations
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  // Framer Motion spring-based mouse motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics spring configurations (moderate tilt range: -12 to 12 degrees)
  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);

  // Dynamic light spotlight radial gradient position inside the frame
  const spotlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, 80]), springConfig);
  const spotlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, 80]), springConfig);

  // Glitch-free Mouse Movement Handler measured on outer static wrapper
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Calculate mouse position relative to static wrapper center (-0.5 to 0.5)
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);

    setCoords({
      x: Math.round(normX * 100),
      y: Math.round(normY * 100),
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    setCoords({ x: 0, y: 0 });
  };

  const handleResetScene = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResetKey((prev) => prev + 1);
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center p-2 sm:p-4 select-none cursor-pointer"
      style={{ perspective: 1200 }}
    >
      {/* Soft Ambient Background Aura */}
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
          opacity: isHovered ? 0.7 : 0.4,
        }}
        transition={{ duration: 0.4 }}
        className="absolute -inset-3 bg-gradient-to-tr from-[#ff5500]/20 via-[#ffaa00]/15 to-[#ff5500]/10 rounded-3xl blur-2xl pointer-events-none -z-10"
      />

      {/* Main 3D Motion Frame Chassis */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered ? 1.015 : 1,
        }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-2xl min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] rounded-3xl border border-[#ff5500]/20 bg-white/85 backdrop-blur-xl shadow-[0_20px_50px_rgba(255,85,0,0.08)] flex flex-col justify-between"
      >
        {/* Dynamic Light Spotlight Follower Overlay */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 0.8 : 0.3,
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) =>
                `radial-gradient(550px circle at ${x}% ${y}%, rgba(255,85,0,0.08), transparent 75%)`
            ),
          }}
        />

        {/* High-Tech HUD Header Bar */}
        <div className="relative z-20 flex items-center justify-between px-5 py-3.5 border-b border-neutral-200/80 bg-white/90 rounded-t-3xl backdrop-blur-md">
          {/* Status Badge & Title */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5500] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5500]"></span>
              </span>
              <span className="text-[11px] font-mono font-bold tracking-wider text-[#ff5500] uppercase">
                3D NEURAL CORE
              </span>
            </div>
            <span className="hidden sm:inline-block w-px h-3 bg-neutral-300" />
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-600 font-medium">
              <Cpu className="w-3.5 h-3.5 text-[#ff5500]" />
              INTERACTIVE VIEWPORT
            </span>
          </div>

          {/* Telemetry Coords & Actions */}
          <div className="flex items-center gap-3">
            {/* Live Coords Tracker */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 font-mono text-[11px] text-neutral-700 font-medium">
              <span className="text-[#ff5500] font-bold">X:</span>
              <span className="w-6 text-right font-mono">{coords.x}</span>
              <span className="text-[#ff5500] font-bold">Y:</span>
              <span className="w-6 text-right font-mono">{coords.y}</span>
            </div>

            {/* Reset Scene Button */}
            <button
              onClick={handleResetScene}
              className="p-1.5 rounded-full bg-neutral-100 hover:bg-[#ff5500] hover:text-white border border-neutral-200 text-neutral-600 transition-all cursor-pointer"
              title="Reset 3D Core View"
              aria-label="Reset 3D View"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Inner 3D Viewport / Canvas Container */}
        <div className="relative flex-1 w-full h-full flex items-center justify-center min-h-[360px] sm:min-h-[420px] lg:min-h-[460px]">
          {/* Subtle Light Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#ff5500_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none rounded-2xl" />

          {/* R3F 3D Canvas */}
          <div key={resetKey} className="w-full h-full relative z-10">
            <DynamicHero3DCore />
          </div>

          {/* Floating Feature Watermark Badge */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-neutral-200/80 shadow-xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5500] animate-pulse" />
            <span className="text-[11px] font-mono text-neutral-700 font-semibold tracking-wide">
              AI ENGINE MATRIX
            </span>
          </div>
        </div>

        {/* High-Tech HUD Footer Bar */}
        <div className="relative z-20 flex items-center justify-between px-5 py-3 border-t border-neutral-200/80 bg-white/90 rounded-b-3xl backdrop-blur-md text-[11px] font-mono text-neutral-600">
          <div className="flex items-center gap-2 font-medium">
            <Layers className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>DEPTH: PARALLAX 3D</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-medium text-neutral-700">
              <Box className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>THREE.JS R3F</span>
            </div>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#ff5500]/60 pointer-events-none z-30 rounded-tl" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#ff5500]/60 pointer-events-none z-30 rounded-tr" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#ff5500]/60 pointer-events-none z-30 rounded-bl" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#ff5500]/60 pointer-events-none z-30 rounded-br" />
      </motion.div>
    </div>
  );
};

export default Advanced3DFrame;
