"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Database, Network, Cpu, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot,
  Database,
  Network,
  Cpu,
};

export const WhatIBuildSection: React.FC = () => {
  return (
    <section id="what-i-build" className="py-24 lg:py-32 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background glow & grid */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#ff5500]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="CAPABILITIES & DOMAINS"
          title="What I Build"
          subtitle="Engineering specialized AI components and full-stack software architectures designed for production environments."
          dark={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {PORTFOLIO_DATA.whatIBuild.map((item, idx) => {
            const Icon = (ICON_MAP as Record<string, React.ComponentType<{ className?: string }>>)[item.icon] || Bot;
            return (
              <Reveal key={item.id} delay={0.1 * idx}>
                <GlassCard dark={true} tilt={true} className="h-full group relative flex flex-col justify-between overflow-hidden">
                  {/* Subtle orange accent bar on top hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff5500] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Top Row: Icon & Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500] flex items-center justify-center group-hover:bg-[#ff5500] group-hover:text-white group-hover:shadow-[0_0_25px_rgba(255,85,0,0.5)] transition-all duration-300">
                        <Icon className="w-7 h-7" />
                      </div>

                      <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-[#ff5500] transition-colors">
                      {item.title}
                    </h3>

                    {/* Summary Quote */}
                    <p className="text-base text-neutral-300 font-medium leading-snug mb-4">
                      "{item.summary}"
                    </p>

                    {/* Detailed Spec */}
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {item.details}
                    </p>
                  </div>

                  {/* Micro Interaction Footer */}
                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white transition-colors">
                    <span>SYSTEM_MODULE</span>
                    <ArrowUpRight className="w-4 h-4 text-[#ff5500] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
