"use client";

import React from "react";
import { Code2, Cpu, Database, Server } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { TechUniverse3D } from "./TechUniverse3D";

export const TechUniverse: React.FC = () => {
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
          title="3D Technology Universe"
          subtitle="Explore the interactive 3D spatial cloud of AI frameworks, backend microservices, vector databases, cloud, and tools."
          align="center"
        />

        {/* 3D TECHNOLOGY SPATIAL UNIVERSE */}
        <div className="my-10">
          <TechUniverse3D />
        </div>

        {/* MOBILE & TABLET RESPONSIVE MATRIX GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
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

        <p className="text-center text-xs font-mono text-neutral-400 mt-8">
          [PAIRS RIGOROUS SOFTWARE ENGINEERING WITH PRODUCTION AI SYSTEMS]
        </p>
      </div>
    </section>
  );
};
