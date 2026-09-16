"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpatialSystem3DCard } from "./SpatialSystems3D";

export const WhatIBuildSection: React.FC = () => {
  const systemsData: Array<{
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    type: "agentic" | "rag" | "multiagent" | "aiproducts";
  }> = [
    {
      title: "Agentic AI",
      subtitle: "AUTONOMOUS AGENTS",
      description:
        "Designing goal-oriented autonomous loop systems with tool execution, plan reflection, state persistence, and self-correcting error handlers.",
      tags: ["ReAct", "Tool Use", "Memory", "Planning", "State Graphs"],
      type: "agentic",
    },
    {
      title: "RAG Systems",
      subtitle: "RETRIEVAL PIPELINES",
      description:
        "Building end-to-end retrieval frameworks featuring hybrid dense/sparse vector search, contextual chunking, re-ranking models, and query expansion.",
      tags: ["Vector DB", "Embeddings", "Hybrid Search", "Reranking", "Chunking"],
      type: "rag",
    },
    {
      title: "Multi-Agent Graphs",
      subtitle: "ORCHESTRATION",
      description:
        "Orchestrating teams of domain-specialized agents with defined roles (Planner, Coder, Evaluator, Reviewer) and deterministic state machines.",
      tags: ["LangGraph", "Multi-Agent", "State Machine", "Parallel Execution"],
      type: "multiagent",
    },
    {
      title: "AI Products",
      subtitle: "FULL-STACK PRODUCTION",
      description:
        "Shipping production-grade AI web applications with high-concurrency microservices, real-time WebSockets, streaming responses, and responsive UIs.",
      tags: ["Next.js", "FastAPI", "WebSockets", "Docker", "Redis"],
      type: "aiproducts",
    },
  ];

  return (
    <section id="what-i-build" className="py-24 lg:py-32 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background glow & grid */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#ff5500]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="CAPABILITIES & DOMAINS"
          title="What I Build in 3D"
          subtitle="Interactive 3D spatial systems designed for production-grade AI and software engineering."
          dark={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {systemsData.map((sys, idx) => (
            <Reveal key={sys.title} delay={0.1 * idx}>
              <SpatialSystem3DCard
                title={sys.title}
                subtitle={sys.subtitle}
                description={sys.description}
                tags={sys.tags}
                type={sys.type}
                index={idx}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
