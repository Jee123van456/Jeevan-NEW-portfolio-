"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowRight, CheckCircle2, Cpu, Database, Terminal } from "lucide-react";
import { Project } from "@/data/portfolioData";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GithubIcon } from "@/components/ui/Icons";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Expanding Panel Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative z-10 w-full max-w-4xl bg-neutral-900 border border-white/10 rounded-3xl p-6 sm:p-10 text-white shadow-2xl overflow-hidden my-auto"
        >
          {/* Subtle Orange Glow Ambient */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff5500]/15 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Header Bar */}
          <div className="flex items-start justify-between gap-4 mb-6 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono font-semibold tracking-wider text-[#ff5500] uppercase px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 inline-block mb-3">
                {project.category}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                {project.title}
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base mt-1 font-medium">
                {project.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-6">
            
            {/* Left: Overview, Problem & Solution */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-mono font-semibold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#ff5500]" />
                  System Overview
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider mb-1">
                  The Problem
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#ff5500]/10 border border-[#ff5500]/30">
                <h4 className="text-xs font-mono font-semibold text-[#ff7722] uppercase tracking-wider mb-1">
                  Engineered Solution
                </h4>
                <p className="text-xs text-neutral-200 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Right: Architecture Flow & Metrics */}
            <div className="md:col-span-5 flex flex-col gap-6">
              {/* Metrics Card */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-xs font-mono font-semibold text-neutral-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#ff5500]" />
                    Benchmark Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-lg font-bold text-[#ff5500] font-mono">{m.value}</span>
                        <span className="text-[10px] text-neutral-400 font-mono uppercase">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h3 className="text-xs font-mono font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                  Technologies & Frameworks
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 text-neutral-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Architecture Pipeline Visualization */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-xs font-mono font-semibold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-[#ff5500]" />
              Data & Control Flow
            </h3>
            
            <div className="flex flex-wrap gap-2 items-center">
              {project.architectureNodes.map((node, i) => (
                <React.Fragment key={node.id}>
                  <div className="flex flex-col px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#ff5500]/50 transition-colors">
                    <span className="text-xs font-bold text-white">{node.label}</span>
                    {node.sub && <span className="text-[10px] text-[#ff5500] font-mono">{node.sub}</span>}
                  </div>
                  {i < project.architectureNodes.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <MagneticButton href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="outline" className="text-white border-white/20 hover:border-[#ff5500] text-xs">
                  <GithubIcon className="w-4 h-4" />
                  Source Code
                </MagneticButton>
              )}
              {project.demoUrl && (
                <MagneticButton href={project.demoUrl} target="_blank" rel="noopener noreferrer" variant="primary" className="text-xs">
                  <ExternalLink className="w-4 h-4" />
                  Live System Demo
                </MagneticButton>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              [CLOSE WINDOW]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
