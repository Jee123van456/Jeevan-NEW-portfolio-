"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Code2, Cpu, Database, Server } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { PORTFOLIO_DATA, TechNodeItem } from "@/data/portfolioData";

export const TechUniverse: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<TechNodeItem | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Smooth orbital rotation loop
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      if (!isPaused) {
        setRotationAngle((prev) => (prev + 0.25) % 360);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const techNodes = PORTFOLIO_DATA.techUniverse;

  // Categorized Skills for Mobile & Tablet Grid
  const categorizedSkills = [
    {
      category: "AI & Agent Frameworks",
      icon: Cpu,
      skills: ["LangChain", "LLMs", "RAG", "Agents", "Embeddings"],
    },
    {
      category: "Core Programming",
      icon: Code2,
      skills: ["Python", "Java", "C++", "React", "Next.js"],
    },
    {
      category: "Backend & Databases",
      icon: Database,
      skills: ["FastAPI", "Spring Boot", "PostgreSQL", "Redis", "Kafka"],
    },
    {
      category: "DevOps & Infrastructure",
      icon: Server,
      skills: ["Docker", "Git", "Vercel"],
    },
  ];

  return (
    <section id="tech-universe" className="py-20 sm:py-24 lg:py-36 bg-white relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#ff5500]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="TECHNICAL SPECTRUM"
          title="Technology Universe"
          subtitle="Explore the complete spectrum of AI models, backend systems, vector databases, cloud, and software tools I build with daily."
          align="center"
        />

        {/* DESKTOP 3D ORBITAL CANVAS (md+ screens) */}
        <div className="hidden md:flex relative w-full max-w-4xl mx-auto aspect-square max-h-[580px] lg:max-h-[640px] items-center justify-center my-8">
          
          {/* Concentric Orbit Ring Lines */}
          {[120, 200, 280, 360, 440].map((radius, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-neutral-200/80 pointer-events-none"
              style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
              }}
            />
          ))}

          {/* CENTER NODE: JEEVAN */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#ff5500] to-[#ff8800] text-white flex flex-col items-center justify-center font-extrabold text-sm sm:text-base shadow-[0_0_50px_rgba(255,85,0,0.5)] border-4 border-white cursor-pointer select-none"
          >
            <Sparkles className="w-5 h-5 mb-0.5 animate-pulse text-white" />
            <span>JEEVAN</span>
            <span className="text-[9px] font-mono text-white/90 font-normal">CORE</span>
          </motion.div>

          {/* Orbiting Tech Nodes */}
          {techNodes.map((tech, index) => {
            const orbitRadii = [120, 200, 280, 360, 440];
            const radius = orbitRadii[index % orbitRadii.length];
            const baseAngle = (index * (360 / techNodes.length)) % 360;
            const currentAngle = (baseAngle + rotationAngle * (tech.speed * 1.5)) * (Math.PI / 180);

            const x = Math.cos(currentAngle) * radius;
            const y = Math.sin(currentAngle) * radius;

            const isSelected = hoveredTech?.name === tech.name;

            return (
              <motion.div
                key={tech.name}
                onMouseEnter={() => {
                  setHoveredTech(tech);
                  setIsPaused(true);
                }}
                onMouseLeave={() => {
                  setHoveredTech(null);
                  setIsPaused(false);
                }}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className={`absolute z-20 px-3.5 py-2 rounded-full font-mono text-xs font-bold transition-all duration-200 cursor-pointer select-none flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#ff5500] text-white scale-125 z-40 shadow-[0_0_25px_rgba(255,85,0,0.6)] border-2 border-white"
                    : "bg-white/90 text-neutral-800 border border-neutral-200 shadow-md hover:border-[#ff5500] hover:text-[#ff5500]"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]" />
                {tech.name}
              </motion.div>
            );
          })}

          {/* Tooltip Overlay Card when Node Hovered */}
          <AnimatePresence>
            {hoveredTech && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-4 z-50 max-w-sm w-full"
              >
                <GlassCard dark={true} className="p-4 sm:p-5 border-[#ff5500]/50 shadow-2xl text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#ff5500] uppercase tracking-wider">
                      {hoveredTech.category}
                    </span>
                    <span className="text-[#ff5500]">|</span>
                    <span className="text-base font-bold text-white">{hoveredTech.name}</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                    {hoveredTech.description}
                  </p>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MOBILE & TABLET RESPONSIVE MATRIX GRID (< md screens) */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {categorizedSkills.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <GlassCard key={idx} className="p-5 border-neutral-200/80">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/20 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 font-mono">
                    {cat.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-neutral-100 text-neutral-800 border border-neutral-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>

        <p className="text-center text-xs font-mono text-neutral-400 mt-6">
          [PAIRS RIGOROUS SOFTWARE ENGINEERING WITH PRODUCTION AI SYSTEMS]
        </p>
      </div>
    </section>
  );
};
