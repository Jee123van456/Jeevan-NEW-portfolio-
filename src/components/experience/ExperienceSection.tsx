"use client";

import React from "react";
import { Briefcase, GraduationCap, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ExperienceSpatial3D } from "./ExperienceSpatial3D";

export const ExperienceSection: React.FC = () => {
  const events = PORTFOLIO_DATA.experienceTimeline;

  return (
    <section id="experience" className="py-24 lg:py-36 bg-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#ff5500]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="MILESTONES & JOURNEY"
          title="Experience & Education in 3D"
          subtitle="A track record of systems engineering, academic excellence, hackathon challenges, and AI application development."
        />

        {/* 3D SPATIAL TIMELINE VIEW */}
        <div className="my-12">
          <ExperienceSpatial3D />
        </div>

        <div className="max-w-4xl mx-auto mt-12 relative">
          {/* Vertical Timeline Bar */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 -translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {events.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <Reveal key={idx} delay={0.1 * idx}>
                  <div className={`flex flex-col sm:flex-row items-center gap-8 ${isEven ? "sm:flex-row-reverse" : ""}`}>
                    
                    {/* Content Card */}
                    <div className="w-full sm:w-1/2">
                      <GlassCard tilt={true} className="p-6 border-neutral-200/80 hover:border-[#ff5500]/40 transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/20">
                            {item.year}
                          </span>
                          <span className="text-xs font-mono text-neutral-400 uppercase">
                            {item.category}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-neutral-900 mb-1">
                          {item.role}
                        </h3>

                        <h4 className="text-xs font-mono font-semibold text-[#ff5500] mb-3">
                          {item.organization}
                        </h4>

                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                          {item.description}
                        </p>
                      </GlassCard>
                    </div>

                    {/* Timeline Center Node */}
                    <div className="w-10 h-10 rounded-full bg-[#ff5500] text-white border-4 border-white shadow-[0_0_15px_rgba(255,85,0,0.4)] flex items-center justify-center shrink-0 z-10">
                      {item.category === "education" ? (
                        <GraduationCap className="w-5 h-5" />
                      ) : item.category === "challenge" ? (
                        <Trophy className="w-5 h-5" />
                      ) : (
                        <Briefcase className="w-5 h-5" />
                      )}
                    </div>

                    {/* Spacer for desktop symmetry */}
                    <div className="hidden sm:block w-1/2" />

                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
