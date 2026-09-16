"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Database, Network } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { Project3DVisualizer } from "./Project3DVisualizer";

// Evaluation Bar Component
const EvalMetricBar = ({ label, value, score }: { label: string; value: string; score: number }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center text-xs font-mono">
        <span className="text-neutral-300">{label}</span>
        <span className="text-[#ff5500] font-bold">{value}</span>
      </div>
      <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#ff5500] to-[#ff8800] rounded-full shadow-[0_0_10px_#ff5500]"
        />
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeHoverNode, setActiveHoverNode] = useState<string | null>(null);

  const projects = PORTFOLIO_DATA.projects;

  return (
    <section id="projects" className="py-24 lg:py-36 bg-[#0b0c0e] text-white relative overflow-hidden">
      {/* Ambient glowing background elements */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#ff5500]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#ff5500]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="PORTFOLIO OF SYSTEMS"
          title="Selected Systems in 3D"
          subtitle="Production-grade AI architectures, autonomous agents, and RAG knowledge engines engineered inside spatial 3D environments."
          dark={true}
        />

        <div className="flex flex-col gap-16 mt-12">
          
          {/* PROJECT 1: OMNIRAG (FEATURED SHOWCASE) */}
          {projects[0] && (
            <Reveal delay={0.1}>
              <GlassCard dark={true} tilt={false} className="relative overflow-hidden border-white/10 hover:border-[#ff5500]/40 transition-all p-8 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Info Column */}
                  <div className="lg:col-span-6 flex flex-col">
                    <span className="text-xs font-mono font-semibold tracking-wider text-[#ff5500] uppercase px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 w-fit mb-4">
                      {projects[0].category}
                    </span>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">
                      {projects[0].title}
                    </h3>

                    <p className="text-base text-neutral-300 leading-relaxed mb-6">
                      {projects[0].description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {projects[0].technologies.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 text-neutral-300 border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <MagneticButton
                      onClick={() => setSelectedProject(projects[0])}
                      variant="primary"
                      className="w-fit text-sm py-3 px-6"
                    >
                      View Case Study & Architecture
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </MagneticButton>
                  </div>

                  {/* 3D Visualizer & Interactive Architecture Nodes */}
                  <div className="lg:col-span-6 flex flex-col gap-4">
                    <Project3DVisualizer projectId={projects[0].id} />
                    
                    <div className="p-5 rounded-2xl bg-black/60 border border-white/10 shadow-inner">
                      <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2 text-xs font-mono text-[#ff5500]">
                          <Database className="w-4 h-4 animate-pulse" />
                          <span>9-STAGE RETRIEVAL FLOW</span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-500">REALTIME SIGNAL</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {projects[0].architectureNodes.map((node) => (
                          <motion.div
                            key={node.id}
                            onMouseEnter={() => setActiveHoverNode(node.id)}
                            onMouseLeave={() => setActiveHoverNode(null)}
                            whileHover={{ scale: 1.04 }}
                            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                              activeHoverNode === node.id
                                ? "bg-[#ff5500] text-white border-[#ff5500] shadow-[0_0_15px_rgba(255,85,0,0.5)]"
                                : "bg-white/5 text-neutral-300 border-white/10"
                            }`}
                          >
                            <span className="text-[11px] font-bold">{node.label}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </GlassCard>
            </Reveal>
          )}

          {/* PROJECT 2 & 3 GRID: MULTI-AGENT & VOICE AGENT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* PROJECT 2: MULTI-AGENT ORCHESTRATION PLATFORM */}
            {projects[1] && (
              <Reveal delay={0.2}>
                <GlassCard dark={true} className="h-full flex flex-col justify-between p-8 border-white/10 hover:border-[#ff5500]/40 transition-all">
                  <div>
                    <span className="text-xs font-mono text-[#ff5500] uppercase font-semibold tracking-wider mb-3 block">
                      {projects[1].category}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">
                      {projects[1].title}
                    </h3>

                    <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                      {projects[1].description}
                    </p>

                    <Project3DVisualizer projectId={projects[1].id} />

                    <div className="p-4 rounded-2xl bg-black/60 border border-white/10 my-6">
                      <span className="text-[10px] font-mono text-neutral-400 block mb-2">
                        AUTONOMOUS AGENT NODES
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {["Planner", "Researcher", "Coder", "Reviewer", "Executor"].map((agent, i) => (
                          <React.Fragment key={agent}>
                            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-[#ff5500]/15 text-[#ff7722] border border-[#ff5500]/30">
                              {agent}
                            </span>
                            {i < 4 && <Network className="w-3 h-3 text-neutral-600 shrink-0" />}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  <MagneticButton
                    onClick={() => setSelectedProject(projects[1])}
                    variant="outline"
                    className="w-full text-xs text-white border-white/20 hover:border-[#ff5500]"
                  >
                    View Agent Network Architecture
                  </MagneticButton>
                </GlassCard>
              </Reveal>
            )}

            {/* PROJECT 3: AI VOICE SUPPORT AGENT */}
            {projects[2] && (
              <Reveal delay={0.3}>
                <GlassCard dark={true} className="h-full flex flex-col justify-between p-8 border-white/10 hover:border-[#ff5500]/40 transition-all">
                  <div>
                    <span className="text-xs font-mono text-[#ff5500] uppercase font-semibold tracking-wider mb-3 block">
                      {projects[2].category}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">
                      {projects[2].title}
                    </h3>

                    <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                      {projects[2].description}
                    </p>

                    <Project3DVisualizer projectId={projects[2].id} />

                    <div className="flex flex-wrap gap-2 my-6">
                      {projects[2].technologies.slice(0, 5).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-neutral-400 border border-white/10">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <MagneticButton
                    onClick={() => setSelectedProject(projects[2])}
                    variant="outline"
                    className="w-full text-xs text-white border-white/20 hover:border-[#ff5500]"
                  >
                    View Voice Pipeline & Flow
                  </MagneticButton>
                </GlassCard>
              </Reveal>
            )}

          </div>

          {/* PROJECT 4: EVALS & HARDNESS BENCHMARK DASHBOARD */}
          {projects[3] && (
            <Reveal delay={0.4}>
              <GlassCard dark={true} className="p-8 lg:p-10 border-white/10 hover:border-[#ff5500]/40 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  <div className="lg:col-span-6 flex flex-col">
                    <span className="text-xs font-mono text-[#ff5500] uppercase font-semibold tracking-wider mb-3 block">
                      {projects[3].category}
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                      {projects[3].title}
                    </h3>

                    <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                      {projects[3].description}
                    </p>

                    <MagneticButton
                      onClick={() => setSelectedProject(projects[3])}
                      variant="primary"
                      className="w-fit text-xs py-3 px-6"
                    >
                      View Evaluation Dashboard Details
                    </MagneticButton>
                  </div>

                  {/* 3D Visualizer & Live Evaluation Dashboard */}
                  <div className="lg:col-span-6 flex flex-col gap-4">
                    <Project3DVisualizer projectId={projects[3].id} />
                    
                    <div className="p-5 rounded-2xl bg-black/60 border border-white/10 flex flex-col gap-3">
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-white/10 pb-2">
                        <span className="flex items-center gap-2 text-[#ff5500]">
                          <Activity className="w-4 h-4 animate-pulse" />
                          LIVE EVALUATION METRICS
                        </span>
                        <span>SCORE</span>
                      </div>

                      <EvalMetricBar label="Faithfulness Score" value="0.94" score={94} />
                      <EvalMetricBar label="Retrieval Quality" value="91.2%" score={91.2} />
                      <EvalMetricBar label="Tool Execution Success" value="98.5%" score={98.5} />
                    </div>
                  </div>

                </div>
              </GlassCard>
            </Reveal>
          )}

        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
