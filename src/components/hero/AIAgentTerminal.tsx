"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Cpu,
  Database,
  Network,
  Mic,
  Activity,
  Play,
  CheckCircle2,
  Sparkles,
  Layers,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

interface SystemDemo {
  id: string;
  name: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  metrics: { label: string; value: string }[];
  logs: { step: string; text: string; type: "info" | "success" | "warn" | "accent" }[];
  querySample: string;
  outputSample: string;
}

const SYSTEM_DEMOS: SystemDemo[] = [
  {
    id: "rag",
    name: "OmniRAG Knowledge Engine",
    badge: "HYBRID VECTOR + BM25",
    icon: Database,
    metrics: [
      { label: "Precision", value: "94.2%" },
      { label: "p95 Latency", value: "<480ms" },
      { label: "Hallucinations", value: "-88%" },
    ],
    querySample: "Extract Q3 financial revenue risks from unstructured PDF filings & SQL logs.",
    outputSample: "Context grounded from 4 sources. Rerank score: 0.98. Zero hallucinations detected.",
    logs: [
      { step: "01", text: "Parsing multi-source document embeddings (BGE-Large)...", type: "info" },
      { step: "02", text: "Executing Hybrid Search: Dense Vector + BM25 Sparse...", type: "accent" },
      { step: "03", text: "Cross-Encoder Reranking: 50 candidate chunks -> 5 top contexts...", type: "warn" },
      { step: "04", text: "Hallucination Check: Faithfulness score 0.98 verified.", type: "success" },
    ],
  },
  {
    id: "multi-agent",
    name: "Multi-Agent Graph",
    badge: "5 AUTONOMOUS NODES",
    icon: Network,
    metrics: [
      { label: "Task Success", value: "91.8%" },
      { label: "Parallel Speed", value: "5x Faster" },
      { label: "Tokens Saved", value: "+35%" },
    ],
    querySample: "Architect scalable microservices & auto-generate verified code sandboxes.",
    outputSample: "Planner, Researcher, Coder, Reviewer & Executor reached 100% consensus.",
    logs: [
      { step: "01", text: "Planner Agent: Deconstructed task into 4 sub-queries.", type: "info" },
      { step: "02", text: "Researcher Agent: Fetched documentation & API schema context.", type: "accent" },
      { step: "03", text: "Coder Agent: Generated async FastAPI + Redis Pub/Sub handler.", type: "warn" },
      { step: "04", text: "Reviewer & Executor: Passed sandbox unit tests cleanly.", type: "success" },
    ],
  },
  {
    id: "voice",
    name: "Hinglish Voice AI Agent",
    badge: "LOW-LATENCY STT/TTS",
    icon: Mic,
    metrics: [
      { label: "Audio Latency", value: "<550ms" },
      { label: "Intent Accuracy", value: "92.5%" },
      { label: "Call Deflection", value: "74%" },
    ],
    querySample: "Bhai mera order status update karo aur delivery location re-route kardo.",
    outputSample: "Intent parsed: Order_Status + Reroute_Address. Webhook dispatched.",
    logs: [
      { step: "01", text: "Deepgram Streaming STT: Ingesting code-switched Hinglish audio...", type: "info" },
      { step: "02", text: "NLU Classifier: Identified primary intent [ORDER_REROUTE].", type: "accent" },
      { step: "03", text: "Logistics API: Redis cache lookup hit. Dispatched update webhook.", type: "warn" },
      { step: "04", text: "Neural TTS: Streamed voice response in <550ms window.", type: "success" },
    ],
  },
  {
    id: "evals",
    name: "Evals & Hardness Harness",
    badge: "RAGAS & G-EVAL BENCHMARK",
    icon: ShieldCheck,
    metrics: [
      { label: "Faithfulness", value: "0.94" },
      { label: "Retrieval Recall", value: "0.91" },
      { label: "Tool Accuracy", value: "98.5%" },
    ],
    querySample: "Run adversarial prompt suite & synthetic regression benchmark.",
    outputSample: "Zero prompt regressions. Cost: $0.0042/eval run. Trajectory logged.",
    logs: [
      { step: "01", text: "Loading synthetic adversarial dataset (500 edge-case prompts)...", type: "info" },
      { step: "02", text: "Running parallel evaluation harness with G-Eval & Ragas...", type: "accent" },
      { step: "03", text: "Evaluating tool call accuracy & token expenditure metrics...", type: "warn" },
      { step: "04", text: "Benchmark complete: Faithfulness 0.94 | Recall 0.91.", type: "success" },
    ],
  },
];

export const AIAgentTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("rag");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentLogIndex, setCurrentLogIndex] = useState<number>(4);

  const activeDemo = SYSTEM_DEMOS.find((d) => d.id === activeTab) || SYSTEM_DEMOS[0];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setCurrentLogIndex(0);

    const interval = setInterval(() => {
      setCurrentLogIndex((prev) => {
        if (prev < activeDemo.logs.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsRunning(false);
          return prev;
        }
      });
    }, 450);
  };

  useEffect(() => {
    setCurrentLogIndex(activeDemo.logs.length);
    setIsRunning(false);
  }, [activeTab, activeDemo.logs.length]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Background Soft Glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#ff5500]/15 via-[#ffaa00]/10 to-[#ff3300]/15 rounded-3xl blur-2xl pointer-events-none -z-10" />

      {/* Main Terminal Glass Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-2xl border border-neutral-800/90 bg-neutral-950/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col p-5 sm:p-6 text-white font-mono"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-xs font-semibold text-neutral-400 ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>system_orchestrator.py</span>
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 text-[10px] text-[#ff5500] font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5500] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5500]"></span>
            </span>
            <span>SYSTEM ONLINE</span>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-neutral-900/90 border border-neutral-800/80 mb-5">
          {SYSTEM_DEMOS.map((demo) => {
            const Icon = demo.icon;
            const isActive = activeTab === demo.id;
            return (
              <button
                key={demo.id}
                onClick={() => setActiveTab(demo.id)}
                type="button"
                className={`py-2 px-2.5 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-[#ff5500] text-white shadow-[0_4px_15px_rgba(255,85,0,0.35)]"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{demo.id.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        {/* Active System Telemetry Overview */}
        <div className="flex items-center justify-between bg-neutral-900/60 border border-neutral-800/60 p-3 rounded-xl mb-4 text-xs">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#ff5500]" />
            <span className="font-bold text-neutral-200">{activeDemo.name}</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-800 text-[#ffaa00] border border-[#ffaa00]/20">
            {activeDemo.badge}
          </span>
        </div>

        {/* Query Input Simulation Box */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 mb-4 text-xs">
          <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#ff5500]" /> INPUT PROMPT QUERY
          </div>
          <p className="text-neutral-300 font-sans italic">"{activeDemo.querySample}"</p>
        </div>

        {/* Live Execution Logs Window */}
        <div className="bg-neutral-950 border border-neutral-800/90 rounded-xl p-3.5 mb-4 space-y-2 min-h-[140px] flex flex-col justify-between">
          <div className="space-y-2">
            {activeDemo.logs.slice(0, currentLogIndex).map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[11px] flex items-start gap-2 leading-relaxed"
              >
                <span className="text-neutral-600 font-bold shrink-0">[{log.step}]</span>
                <span
                  className={
                    log.type === "success"
                      ? "text-emerald-400 font-semibold"
                      : log.type === "warn"
                      ? "text-amber-300"
                      : log.type === "accent"
                      ? "text-[#ffaa00]"
                      : "text-neutral-300"
                  }
                >
                  {log.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Output Grounded Badge */}
          {currentLogIndex >= activeDemo.logs.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-emerald-400 font-sans font-semibold"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {activeDemo.outputSample}
              </span>
            </motion.div>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {activeDemo.metrics.map((m, i) => (
            <div
              key={i}
              className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80 flex flex-col items-center justify-center text-center"
            >
              <span className="text-[9px] text-neutral-400 uppercase tracking-wider">
                {m.label}
              </span>
              <span className="text-sm font-bold text-[#ffaa00] mt-0.5">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Run Simulation Action Button */}
        <button
          onClick={handleRunSimulation}
          disabled={isRunning}
          type="button"
          className="w-full py-2.5 px-4 rounded-xl bg-[#ff5500] hover:bg-[#ff6611] text-white font-mono font-bold tracking-wider text-xs uppercase flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(255,85,0,0.35)] cursor-pointer disabled:opacity-50"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
              <span>EXECUTING WORKFLOW LOGIC...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              <span>RUN REAL-TIME SYSTEM DEMO</span>
            </>
          )}
        </button>

        {/* Decorative Reticle Lines */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#ff5500]/40 pointer-events-none rounded-tl" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#ff5500]/40 pointer-events-none rounded-tr" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#ff5500]/40 pointer-events-none rounded-bl" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#ff5500]/40 pointer-events-none rounded-br" />
      </motion.div>
    </div>
  );
};

export default AIAgentTerminal;
