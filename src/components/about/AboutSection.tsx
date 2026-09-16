"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Cpu } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { AboutSpatialTimeline } from "./AboutSpatialTimeline";

export const AboutSection: React.FC = () => {
  const milestones = [
    {
      year: "2024",
      title: "CSE Graduate",
      sub: "B.Tech Computer Science & Engineering",
      desc: "Deep algorithmic foundations, data structures, backend architecture, and operating systems.",
      icon: GraduationCap,
    },
    {
      year: "2026",
      title: "MBA — IT & Business Analytics",
      sub: "Information Technology & Analytics",
      desc: "Bridging complex technical AI architectures with strategic business value, product strategy, and data modeling.",
      icon: Briefcase,
    },
    {
      year: "Present",
      title: "AI / Software Engineering",
      sub: "Agentic Systems & RAG Infrastructure",
      desc: "Architecting autonomous agents, hybrid vector retrieval, multi-agent frameworks, and high-concurrency microservices.",
      icon: Cpu,
      current: true,
    },
  ];

  const focusPills = [
    "AI Engineering",
    "Agentic AI",
    "LLM Applications",
    "Retrieval-Augmented Generation",
    "Multi-Agent Systems",
    "Backend Engineering",
    "REST & WebSockets APIs",
    "Data & Intelligent Automation",
  ];

  return (
    <section id="about" className="py-24 lg:py-32 relative bg-white overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#ff5500]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="ABOUT JEEVAN K"
          title="Engineering at the intersection of AI and software."
          subtitle="A Computer Science graduate and MBA student specializing in Information Technology & Business Analytics, building intelligent applications with modern AI and software engineering technologies."
        />

        {/* 3D Spatial Timeline Feature */}
        <div className="mt-12 mb-14">
          <Reveal delay={0.1}>
            <div className="mb-4">
              <span className="text-xs font-mono font-semibold text-[#ff5500] tracking-widest uppercase">
                3D SPATIAL JOURNEY
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
                Evolution & Milestones in 3D Space
              </h3>
            </div>
            <AboutSpatialTimeline />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Storytelling & Focus Pills */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Reveal delay={0.1}>
              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
                I believe the most powerful AI systems are not just raw prompts or static demos — they are <span className="font-semibold text-neutral-900">robustly engineered products</span> combining deterministic software architecture with adaptive model intelligence.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
                My background pairs rigorous computer science logic with business analytics insight. This allows me to architect end-to-end solutions — from custom RAG vector indices and autonomous agent loops down to low-latency APIs and resilient microservices.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-4">
                <span className="text-xs font-mono font-semibold tracking-wider text-neutral-400 uppercase mb-4 block">
                  CORE TECHNICAL SPECTRUM
                </span>
                <div className="flex flex-wrap gap-2">
                  {focusPills.map((pill) => (
                    <motion.span
                      key={pill}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 border border-neutral-200 hover:border-[#ff5500] hover:text-[#ff5500] transition-colors cursor-default"
                    >
                      {pill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Visual Storytelling Cards */}
          <div className="lg:col-span-6 relative">
            <div className="flex flex-col gap-6 relative">
              {/* Connecting line */}
              <div className="absolute left-[29px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-neutral-200 via-[#ff5500] to-neutral-200 -z-10" />

              {milestones.map((m, idx) => {
                const Icon = m.icon;
                return (
                  <Reveal key={m.year} delay={0.15 * idx}>
                    <GlassCard
                      tilt={true}
                      className={`relative flex items-start gap-5 ${
                        m.current
                          ? "border-[#ff5500]/40 shadow-[0_10px_30px_rgba(255,85,0,0.1)] bg-white/90"
                          : "border-neutral-200/80"
                      }`}
                    >
                      {/* Icon Circle */}
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          m.current
                            ? "bg-[#ff5500] text-white shadow-[0_0_20px_rgba(255,85,0,0.4)]"
                            : "bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-1">
                          <span
                            className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                              m.current
                                ? "bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/30"
                                : "bg-neutral-100 text-neutral-600"
                            }`}
                          >
                            {m.year}
                          </span>
                          <span className="text-xs text-neutral-400 font-medium">
                            {m.sub}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-neutral-900 mb-1">
                          {m.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    </GlassCard>
                  </Reveal>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
