"use client";

import React from "react";
import { motion } from "framer-motion";

export const Hero3DFallback: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[500px] sm:min-h-[600px] lg:min-h-[680px] xl:min-h-[740px] relative flex items-center justify-center">
      {/* Animated glowing ambient core fallback */}
      <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#ff5500] to-[#ff8800] opacity-25 blur-3xl animate-pulse" />

      <div className="relative w-80 h-80 sm:w-[420px] sm:h-[420px] flex items-center justify-center">
        {/* Outer Orbit Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-[#ff5500]/50"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-8 rounded-full border border-neutral-300/40"
        />

        {/* Center Geometric Core */}
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-52 h-52 rounded-3xl bg-gradient-to-tr from-[#ff5500] via-[#ff7700] to-neutral-900 border border-white/20 shadow-[0_0_60px_rgba(255,85,0,0.5)] flex flex-col items-center justify-center text-white font-mono font-bold text-center rotate-45"
        >
          <span className="-rotate-45 text-base tracking-wider text-white">AI CORE</span>
          <span className="-rotate-45 text-xs text-white/80 font-normal">NEURAL ENGINE</span>
        </motion.div>

        {/* Floating Glass Badges */}
        <div className="absolute -top-4 right-2 px-4 py-2 bg-[#0b0c0e]/90 shadow-lg border border-[#ff5500]/50 rounded-xl text-xs font-mono text-[#ff5500]">
          [LLM]
        </div>
        <div className="absolute bottom-2 -left-4 px-4 py-2 bg-[#0b0c0e]/90 shadow-lg border border-[#ff5500]/50 rounded-xl text-xs font-mono text-[#ff5500]">
          [RAG]
        </div>
        <div className="absolute top-1/2 -right-6 px-4 py-2 bg-[#0b0c0e]/90 shadow-lg border border-[#ff5500]/50 rounded-xl text-xs font-mono text-[#ff5500]">
          [AGENTS]
        </div>
        <div className="absolute top-1/3 -left-6 px-4 py-2 bg-[#0b0c0e]/90 shadow-lg border border-[#ff5500]/50 rounded-xl text-xs font-mono text-[#ff5500]">
          [TOOLS]
        </div>
        <div className="absolute -bottom-4 right-1/4 px-4 py-2 bg-[#0b0c0e]/90 shadow-lg border border-[#ff5500]/50 rounded-xl text-xs font-mono text-[#ff5500]">
          [REASONING]
        </div>
      </div>
    </div>
  );
};
