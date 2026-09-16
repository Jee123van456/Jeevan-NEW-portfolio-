"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            if (onCompleteRef.current) onCompleteRef.current();
          }, 200);
          return 100;
        }
        return prev + 25;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  if (isDone) return null;

  return (
    <AnimatePresence mode="wait">
      {!isDone && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: progress >= 100 ? 0 : 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
          style={{ pointerEvents: progress >= 100 ? "none" : "auto" }}
          className="fixed inset-0 z-[10000] bg-[#0b0c0e] text-white flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Subtle glowing ambient orb behind */}
          <div className="absolute w-72 h-72 rounded-full bg-[#ff5500]/15 blur-3xl animate-pulse" />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
            {/* 3D abstract animated loading icon */}
            <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#ff5500]"
              />
              <motion.div
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-6 rounded-full bg-[#ff5500] shadow-[0_0_25px_#ff5500]"
              />
            </div>

            {/* Brand Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg sm:text-xl font-bold tracking-widest text-center uppercase"
            >
              Jeevan K <span className="text-[#ff5500] font-normal mx-1.5">/</span> AI Engineer
            </motion.h1>

            <p className="text-xs text-neutral-400 mt-2 font-mono tracking-wider uppercase">
              Initializing Agent Core Systems
            </p>

            {/* Progress bar container */}
            <div className="w-full bg-neutral-800/80 h-1.5 rounded-full mt-6 overflow-hidden border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ff5500] to-[#ff8800] rounded-full shadow-[0_0_12px_#ff5500]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Progress Percentage */}
            <div className="w-full flex justify-between items-center mt-2 text-xs font-mono text-neutral-500">
              <span>SYSTEMS_READY</span>
              <span className="text-[#ff5500] font-semibold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

