"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Principles3D } from "./Principles3D";

export const PrinciplesSection: React.FC = () => {
  const statements = [
    "I build systems.",
    "I design for scale.",
    "I evaluate AI.",
    "I care about reliability.",
    "I think in architectures.",
    "I ship.",
  ];

  return (
    <section className="py-28 lg:py-40 bg-[#0b0c0e] text-white relative overflow-hidden">
      {/* Intense dark background with orange ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#ff5500]/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Main Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/30 mb-8"
        >
          ENGINEERING PHILOSOPHY
        </motion.div>

        {/* Big Bold Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-12"
        >
          "I don't just build demos."
        </motion.h2>

        {/* 3D SPATIAL TYPOGRAPHY EXPERIENCE */}
        <div className="mb-14">
          <Principles3D />
        </div>

        {/* Grid of Big Animated Statements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {statements.map((stmt, idx) => (
            <motion.div
              key={stmt}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="p-8 rounded-3xl bg-neutral-900/90 border border-white/10 hover:border-[#ff5500] transition-all text-left flex flex-col justify-between group shadow-xl"
            >
              <div className="w-10 h-10 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500] flex items-center justify-center mb-6 group-hover:bg-[#ff5500] group-hover:text-white transition-colors">
                <Check className="w-5 h-5" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white group-hover:text-[#ff5500] transition-colors">
                {stmt}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
