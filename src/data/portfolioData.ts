export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  architectureNodes: { id: string; label: string; sub?: string }[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  type: 'rag' | 'multi-agent' | 'voice' | 'evals';
}

export interface SkillCategory {
  name: string;
  skills: { name: string; icon?: string; desc: string }[];
}

export interface TimelineEvent {
  year: string;
  role: string;
  organization: string;
  description: string;
  category: 'education' | 'projects' | 'challenge';
}

export interface TechNodeItem {
  name: string;
  category: 'core' | 'ai' | 'backend' | 'devops';
  description: string;
  orbitRadius: number; // For 3D layout
  speed: number;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Jeevan K",
    shortName: "JK",
    title: "AI Engineer • Software Engineer",
    tagline: "Building Intelligent Systems That Actually Work.",
    bio: "Computer Science graduate and MBA student specializing in Information Technology & Business Analytics. I build AI-powered products, agentic workflows, RAG systems, and production-ready software that turn complex problems into useful experiences.",
    status: "Currently building with AI • Agents • RAG • LLMs",
    email: "jeevanprakaskk@gmail.com",
    github: "https://github.com/Jee123van456",
    linkedin: "https://www.linkedin.com/in/jeevan-k-382146238/",
    location: "India",
  },
  
  whatIBuild: [
    {
      id: "agentic-ai",
      title: "AGENTIC AI",
      summary: "Autonomous systems that reason, use tools and execute multi-step workflows.",
      icon: "Bot",
      details: "Building reactive and proactive AI agents equipped with state memory, dynamic tool calling, planning loops, and robust error recovery mechanisms.",
    },
    {
      id: "rag-systems",
      title: "RAG SYSTEMS",
      summary: "Knowledge engines that retrieve, reason and generate grounded answers.",
      icon: "Database",
      details: "Developing end-to-end RAG pipelines featuring hybrid search, semantic chunking, vector index optimization, re-ranking, and hallucination guardrails.",
    },
    {
      id: "multi-agent-systems",
      title: "MULTI-AGENT SYSTEMS",
      summary: "Coordinated AI agents that divide complex tasks and collaborate seamlessly.",
      icon: "Network",
      details: "Engineering multi-agent orchestrations with clear role delegation, inter-agent messaging, shared memory contexts, and consensus protocols.",
    },
    {
      id: "ai-products",
      title: "AI PRODUCTS",
      summary: "Production-ready applications combining models, APIs, data and intuitive UX.",
      icon: "Cpu",
      details: "Deploying full-stack AI solutions with low-latency REST/gRPC endpoints, streaming responses, caching layers, and high-performance frontend interfaces.",
    },
  ],

  projects: [
    {
      id: "omnirag",
      title: "OMNIRAG — MULTI-SOURCE AGENTIC RAG",
      subtitle: "Enterprise Multi-Source Knowledge Engine",
      category: "Agentic RAG / Knowledge Systems",
      description: "An enterprise knowledge engine designed to ingest, retrieve and reason across multiple information sources while providing grounded answers and intelligent workflows.",
      longDescription: "OmniRAG solves the enterprise knowledge fragmentation problem by combining multi-source document loaders, advanced vector indexing, and autonomous agentic re-ranking. Rather than relying on simple semantic similarity, it evaluates context relevance, executes multi-step query expansion, and cites source origins with auditability.",
      problem: "Enterprise documents exist in silos (PDFs, SQL databases, API feeds). Standard RAG architectures suffer from context dilution, noisy retrievals, and factual hallucinations when querying heterogeneous domains.",
      solution: "Engineered an agentic RAG pipeline using a hybrid retriever (Dense Vector + BM25 Sparse Search), Cross-Encoder re-ranking, and a self-correcting agent loop that detects low-confidence responses and auto-refines search parameters.",
      architectureNodes: [
        { id: "1", label: "Data Sources", sub: "PDF, SQL, Web, APIs" },
        { id: "2", label: "Ingestion", sub: "Async Parsing" },
        { id: "3", label: "Chunking", sub: "Semantic Split" },
        { id: "4", label: "Embeddings", sub: "BGE / OpenAI" },
        { id: "5", label: "Vector Search", sub: "Qdrant / PGVector" },
        { id: "6", label: "Retrieval", sub: "Hybrid BM25 + Vector" },
        { id: "7", label: "Reranking", sub: "Cross-Encoder" },
        { id: "8", label: "LLM", sub: "Claude 3.5 / GPT-4" },
        { id: "9", label: "Agent", sub: "Verification Loop" },
        { id: "10", label: "Response", sub: "Grounded Output" }
      ],
      technologies: ["Python", "FastAPI", "LangChain", "LLMs", "Embeddings", "Vector Database", "PostgreSQL", "Redis", "Docker"],
      metrics: [
        { label: "Retrieval Precision", value: "94.2%" },
        { label: "Latency p95", value: "<480ms" },
        { label: "Hallucination Reduction", value: "88%" }
      ],
      githubUrl: "https://github.com/Jee123van456",
      demoUrl: "https://omnirag-demo.vercel.app",
      featured: true,
      type: "rag",
    },
    {
      id: "multi-agent-orchestrator",
      title: "MULTI-AGENT ORCHESTRATION PLATFORM",
      subtitle: "Autonomous Distributed Agent Network",
      category: "Multi-Agent Architecture",
      description: "An orchestration system where specialized AI agents collaborate to solve complex technical and analytical tasks.",
      longDescription: "A scalable multi-agent coordination graph that assigns sub-problems to specialized autonomous personas: Planner (deconstructs request), Researcher (fetches web/data context), Coder (generates code), Reviewer (audits syntax & safety), and Executor (runs unit sandboxes).",
      problem: "Monolithic LLM prompts fail on multi-faceted software tasks requiring planning, verification, and code execution.",
      solution: "Created a stateful graph-based agent architecture with distributed message queues, human-in-the-loop checkpoints, and dynamic fallback handlers.",
      architectureNodes: [
        { id: "a1", label: "Planner Agent", sub: "Task Decomposition" },
        { id: "a2", label: "Researcher Agent", sub: "Context Retrieval" },
        { id: "a3", label: "Coder Agent", sub: "Code Generation" },
        { id: "a4", label: "Reviewer Agent", sub: "Safety & Logic Audit" },
        { id: "a5", label: "Executor Agent", sub: "Sandbox Execution" }
      ],
      technologies: ["Python", "LangGraph", "FastAPI", "Redis Pub/Sub", "Docker Containers", "OpenAI API", "React"],
      metrics: [
        { label: "Task Success Rate", value: "91.8%" },
        { label: "Parallel Throughput", value: "5x Faster" },
        { label: "Token Efficiency", value: "+35%" }
      ],
      githubUrl: "https://github.com/Jee123van456",
      demoUrl: "https://multiagent-demo.vercel.app",
      featured: true,
      type: "multi-agent",
    },
    {
      id: "ai-voice-support",
      title: "AI VOICE SUPPORT AGENT",
      subtitle: "Hinglish Order Verification & Logistics Workflow",
      category: "Voice AI & Operational Automation",
      description: "An AI voice support system for food-delivery operations that handles noisy speech, Hinglish conversations, order verification, logistics workflows and human escalation.",
      longDescription: "Built specifically for high-velocity logistics and food-delivery operations, this low-latency voice agent parses code-switched Hinglish audio, queries real-time order states via REST webhooks, and manages automated driver escalation.",
      problem: "Standard voice bots fail on accent variations, background street noise, and code-mixed speech (Hinglish), causing driver frustration and order delays.",
      solution: "Implemented a streaming STT pipeline with custom acoustics context conditioning, fine-tuned Intent Classifier, and real-time WebSocket response streaming (<600ms latency).",
      architectureNodes: [
        { id: "v1", label: "Driver Call", sub: "Inbound Telephony" },
        { id: "v2", label: "Speech Recognition", sub: "Hinglish STT" },
        { id: "v3", label: "Intent Detection", sub: "NLU Classifier" },
        { id: "v4", label: "Order Lookup", sub: "Redis Cache & DB" },
        { id: "v5", label: "AI Decision", sub: "Policy Engine" },
        { id: "v6", label: "Logistics Action", sub: "Webhook Dispatch" },
        { id: "v7", label: "Response", sub: "Neural TTS" },
        { id: "v8", label: "Escalation", sub: "Human Override" }
      ],
      technologies: ["Python", "FastAPI", "WebSockets", "Deepgram STT", "ElevenLabs TTS", "Redis", "Twilio API"],
      metrics: [
        { label: "Audio Latency", value: "<550ms" },
        { label: "Hinglish Intent Accuracy", value: "92.5%" },
        { label: "Call Deflection", value: "74%" }
      ],
      githubUrl: "https://github.com/Jee123van456",
      demoUrl: "https://voice-agent-demo.vercel.app",
      featured: true,
      type: "voice",
    },
    {
      id: "evals-and-hardness",
      title: "EVALS & HARDNESS BENCHMARK DASHBOARD",
      subtitle: "LLM & Agent Reliability Framework",
      category: "AI Evaluation & Research",
      description: "A technical evaluation framework and interactive dashboard for benchmarking LLM output faithfulness, retrieval quality, tool selection accuracy, and agent robustness.",
      longDescription: "Production AI systems require continuous evaluation. This framework runs synthetic test suites against adversarial prompts ('hardness benchmarks') to quantify failure modes before code deployment.",
      problem: "LLM updates and prompt modifications frequently cause silent regressions in production agents without comprehensive continuous evaluation.",
      solution: "Built an automated evaluation harness utilizing Ragas metrics, G-Eval methodology, trajectory tracing, and real-time execution cost analytics.",
      architectureNodes: [
        { id: "e1", label: "Test Datasets", sub: "Adversarial & Hardness" },
        { id: "e2", label: "Agent Runner", sub: "Parallel Execution" },
        { id: "e3", label: "Metric Evaluator", sub: "Ragas / G-Eval" },
        { id: "e4", label: "Trace Store", sub: "LangSmith / Phoenix" },
        { id: "e5", label: "Analytics Dashboard", sub: "Next.js UI" }
      ],
      technologies: ["Python", "Next.js", "TypeScript", "Ragas", "LangSmith", "ClickHouse", "Tailwind CSS"],
      metrics: [
        { label: "Faithfulness Score", value: "0.94" },
        { label: "Retrieval Recall", value: "0.91" },
        { label: "Tool Accuracy", value: "98.5%" },
        { label: "Avg Latency", value: "320ms" }
      ],
      githubUrl: "https://github.com/Jee123van456",
      demoUrl: "https://evals-demo.vercel.app",
      featured: true,
      type: "evals",
    }
  ] as Project[],

  techUniverse: [
    { name: "Python", category: "core", description: "Primary language for AI engineering, agentic systems, RAG pipelines, and backend services.", orbitRadius: 2.2, speed: 0.35 },
    { name: "FastAPI", category: "backend", description: "High-performance asynchronous Python REST APIs and WebSocket server infrastructure.", orbitRadius: 2.8, speed: 0.28 },
    { name: "LangChain", category: "ai", description: "Framework for building context-aware LLM chains, agent state graphs, and document loaders.", orbitRadius: 3.4, speed: 0.22 },
    { name: "LLMs", category: "ai", description: "Integration and fine-tuning of state-of-the-art models (Claude 3.5, GPT-4, Llama 3, DeepSeek).", orbitRadius: 4.0, speed: 0.18 },
    { name: "RAG", category: "ai", description: "Retrieval-Augmented Generation using dense/sparse vector search and semantic re-ranking.", orbitRadius: 4.6, speed: 0.15 },
    { name: "Agents", category: "ai", description: "Autonomous multi-step reasoning agents equipped with dynamic tool calling and memory.", orbitRadius: 2.5, speed: 0.32 },
    { name: "Embeddings", category: "ai", description: "High-dimensional vector representations for semantic search and context matching.", orbitRadius: 3.1, speed: 0.25 },
    { name: "PostgreSQL", category: "backend", description: "Relational database with PGVector extension for hybrid transactional and vector queries.", orbitRadius: 3.7, speed: 0.20 },
    { name: "Redis", category: "backend", description: "In-memory cache for ultra-fast session storage, rate limiting, and pub/sub message queues.", orbitRadius: 4.3, speed: 0.16 },
    { name: "Docker", category: "devops", description: "Containerization of microservices, sandbox code execution, and reproducible environments.", orbitRadius: 4.9, speed: 0.12 },
    { name: "Java", category: "core", description: "Object-oriented software development and enterprise backend system integration.", orbitRadius: 3.0, speed: 0.27 },
    { name: "C++", category: "core", description: "Low-level system fundamentals, algorithm optimization, and data structures.", orbitRadius: 3.6, speed: 0.21 },
    { name: "Spring Boot", category: "backend", description: "Robust enterprise microservice framework for secure, scalable Java applications.", orbitRadius: 4.2, speed: 0.17 },
    { name: "React", category: "core", description: "Modern UI library for constructing modular, reactive, and accessible web interfaces.", orbitRadius: 2.6, speed: 0.30 },
    { name: "Next.js", category: "core", description: "Production React framework with SSR, App Router, edge API routes, and optimized assets.", orbitRadius: 3.3, speed: 0.24 },
    { name: "Kafka", category: "backend", description: "Distributed event streaming platform for real-time data pipelines and event-driven architectures.", orbitRadius: 4.5, speed: 0.14 },
    { name: "Git", category: "devops", description: "Distributed version control for collaborative engineering and clean git workflows.", orbitRadius: 2.9, speed: 0.26 },
    { name: "Vercel", category: "devops", description: "Optimized serverless deployment platform for high-speed web apps and edge functions.", orbitRadius: 3.8, speed: 0.19 },
  ] as TechNodeItem[],

  architecturePipeline: [
    { step: "01", title: "Problem Definition", desc: "Deconstruct business requirements into explicit AI and software boundaries." },
    { step: "02", title: "Data Ingestion", desc: "Ingest, clean, parse, and structure multi-format unstructured and SQL data." },
    { step: "03", title: "Retrieval & Indexing", desc: "Build hybrid dense/sparse vector indices with semantic chunking and re-ranking." },
    { step: "04", title: "Reasoning Layer", desc: "Design structured LLM prompts, JSON schema enforcement, and chain logic." },
    { step: "05", title: "Tool Execution", desc: "Equip agents with dynamic tool APIs, code execution sandboxes, and database webhooks." },
    { step: "06", title: "Multi-Agent Graph", desc: "Orchestrate specialized sub-agents with state memory and error recovery protocols." },
    { step: "07", title: "Continuous Evaluation", desc: "Benchmark outputs with quantitative evals (faithfulness, accuracy, latency, cost)." },
    { step: "08", title: "Production Deployment", desc: "Deploy resilient microservices with containerization, caching, and streaming APIs." },
  ],

  experienceTimeline: [
    {
      year: "2026",
      role: "MBA — Information Technology & Business Analytics",
      organization: "[ACADEMIC INSTITUTION]",
      description: "Mastering the bridge between advanced technology architecture, product management, and business data analytics.",
      category: "education"
    },
    {
      year: "2024 - Present",
      role: "AI & Software Engineering Projects",
      organization: "Independent Systems Building",
      description: "Architecting autonomous agentic networks, enterprise RAG knowledge engines, and AI microservices.",
      category: "projects"
    },
    {
      year: "2024",
      role: "B.Tech — Computer Science & Engineering",
      organization: "[CSE GRADUATE]",
      description: "Graduated with strong foundations in Data Structures, Algorithms, Operating Systems, Database Management, and Systems Programming.",
      category: "education"
    },
    {
      year: "2024",
      role: "AI Engineering Assessments & Challenges",
      organization: "Hackathons & Technical Benchmarks",
      description: "Participating in LLM hackathons and agentic system challenges to build production-grade prototypes under tight deadlines.",
      category: "challenge"
    }
  ] as TimelineEvent[],

  principles: [
    "I don't just build demos.",
    "I build systems.",
    "I design for scale.",
    "I evaluate AI.",
    "I think in architectures.",
    "I ship."
  ],

  metrics: [
    { number: "4+", label: "FEATURED AI SYSTEMS", sub: "Agentic RAG, Multi-Agent, Voice & Evals" },
    { number: "20+", label: "TECHNOLOGIES & FRAMEWORKS", sub: "Python, FastAPI, LangChain, R3F, Vector DBs" },
    { number: "10+", label: "PRODUCTION COMPONENTS", sub: "APIs, Pipelines, Vector Indices & Interfaces" },
    { number: "100%", label: "FOCUS ON RELIABILITY", sub: "Grounded Reasoning & Benchmark Verification" },
  ]
};
