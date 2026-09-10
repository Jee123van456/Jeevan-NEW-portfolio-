"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, Mail, Cpu, Bot, Database, Network, ShieldCheck } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export const HeroSection: React.FC = () => {
  const words = PORTFOLIO_DATA.personal.tagline.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 25, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-28 flex flex-col justify-center items-center overflow-hidden bg-grid-pattern text-center"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#ff5500]/12 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center z-10">
        
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/25 mb-8 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin text-[#ff5500]" />
          <span>{PORTFOLIO_DATA.personal.title}</span>
        </motion.div>

        {/* High-Impact Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-neutral-900 leading-[1.06] mb-8 max-w-4xl"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className={`inline-block mx-1.5 ${
                word.toLowerCase() === "intelligent" || word.toLowerCase() === "systems."
                  ? "text-orange-gradient"
                  : ""
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Bio Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-3xl mb-10 font-normal"
        >
          {PORTFOLIO_DATA.personal.bio}
        </motion.p>

        {/* Domain Highlights Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-10 text-xs font-mono"
        >
          {[
            { label: "AGENTIC AI", icon: Bot },
            { label: "RAG SYSTEMS", icon: Database },
            { label: "MULTI-AGENT GRAPHS", icon: Network },
            { label: "VOICE AGENTS", icon: Cpu },
            { label: "EVAL HARNESS", icon: ShieldCheck },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/80 border border-neutral-200/80 text-neutral-700 font-semibold shadow-xs"
              >
                <Icon className="w-3.5 h-3.5 text-[#ff5500]" />
                <span>{item.label}</span>
              </span>
            );
          })}
        </motion.div>

        {/* Primary Call To Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10 w-full sm:w-auto"
        >
          <MagneticButton
            href="#projects"
            onClick={() => {
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            variant="primary"
            className="py-4 px-8 text-base shadow-[0_12px_35px_rgba(255,85,0,0.35)]"
          >
            Explore Featured Systems
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </MagneticButton>

          <MagneticButton
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            variant="outline"
            className="py-4 px-8 text-base border-neutral-300 text-neutral-800 hover:border-[#ff5500] hover:text-[#ff5500]"
          >
            <Mail className="w-4 h-4 mr-2 text-[#ff5500]" />
            Let's Connect
          </MagneticButton>
        </motion.div>

        {/* Secondary Social Links & Availability */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 border border-neutral-200/80 transition-all duration-200 shadow-xs cursor-pointer"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4 text-[#ff5500]" />
            <span>GitHub</span>
          </a>

          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 border border-neutral-200/80 transition-all duration-200 shadow-xs cursor-pointer"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4 text-[#ff5500]" />
            <span>LinkedIn</span>
          </a>

          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-neutral-200/80 shadow-xs text-xs font-mono text-neutral-600">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5500] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff5500]"></span>
            </span>
            <span>{PORTFOLIO_DATA.personal.status}</span>
          </div>
        </motion.div>

        {/* Embedded Key Metrics Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-white/70 border border-neutral-200/80 shadow-xl backdrop-blur-lg text-center"
        >
          {PORTFOLIO_DATA.metrics.map((metric, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#ff5500] font-mono tracking-tight">
                {metric.number}
              </span>
              <span className="text-[11px] font-bold text-neutral-800 tracking-wider uppercase mt-1">
                {metric.label}
              </span>
              <span className="text-[10px] text-neutral-500 font-mono mt-0.5">
                {metric.sub}
              </span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 flex flex-col items-center gap-1 cursor-pointer"
        onClick={() => {
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-[#ff5500]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
