"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, ShieldCheck, Cpu, Code2, Database, Network, LineChart, Server } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

const STEP_ICONS = [
  Code2,
  Database,
  Network,
  Cpu,
  ShieldCheck,
  Network,
  LineChart,
  Server,
];

export const ArchitectureSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = PORTFOLIO_DATA.architecturePipeline;

  return (
    <section className="py-24 lg:py-36 bg-neutral-900 text-white relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#ff5500]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="ENGINEERING LIFECYCLE"
          title="From Idea → Intelligence → Production"
          subtitle="Beyond standard API calls. A comprehensive systems-engineering lifecycle for reliable, scalable, and benchmarked AI applications."
          dark={true}
        />

        {/* Horizontal & Vertical Pipeline Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {steps.map((item, idx) => {
            const Icon = STEP_ICONS[idx % STEP_ICONS.length];
            const isActive = activeStep === idx;

            return (
              <Reveal key={item.step} delay={0.08 * idx}>
                <GlassCard
                  dark={true}
                  tilt={true}
                  onClick={() => setActiveStep(idx)}
                  className={`h-full group flex flex-col justify-between p-6 transition-all duration-300 border-white/10 ${
                    isActive ? "border-[#ff5500] shadow-[0_0_30px_rgba(255,85,0,0.3)] bg-white/10" : ""
                  }`}
                >
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-extrabold font-mono text-[#ff5500]">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-neutral-300 flex items-center justify-center group-hover:bg-[#ff5500] group-hover:text-white group-hover:border-[#ff5500] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ff5500] transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Flow Arrow */}
                  <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                    <span>STAGE_{item.step}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#ff5500] group-hover:translate-x-1 transition-transform" />
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
