"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, ArrowRight, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-28 lg:py-40 bg-[#0b0c0e] text-white relative overflow-hidden">
      {/* Animated glowing 3D orange orb behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff5500]/15 rounded-full blur-[180px] pointer-events-none animate-pulse" />
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/30 mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          START A PROJECT
        </motion.div>

        {/* Large Product Scene Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4"
        >
          Have a difficult problem?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-2xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed mb-12"
        >
          Let's build something intelligent.
        </motion.p>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto text-left"
        >
          {/* Email Card */}
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#ff5500]/60 hover:bg-white/[0.07] transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 group-hover:text-[#ff5500]">
                Email
              </span>
            </div>
            <div>
              <p className="text-xs text-neutral-400 font-mono mb-1">Direct Email</p>
              <p className="text-sm font-semibold text-white group-hover:text-[#ff5500] transition-colors break-all">
                {PORTFOLIO_DATA.personal.email}
              </p>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#ff5500]/60 hover:bg-white/[0.07] transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 group-hover:text-[#ff5500]">
                LinkedIn
              </span>
            </div>
            <div>
              <p className="text-xs text-neutral-400 font-mono mb-1">Professional Profile</p>
              <p className="text-sm font-semibold text-white group-hover:text-[#ff5500] transition-colors break-all">
                linkedin.com/in/jeevan-k-382146238
              </p>
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#ff5500]/60 hover:bg-white/[0.07] transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <GithubIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 group-hover:text-[#ff5500]">
                GitHub
              </span>
            </div>
            <div>
              <p className="text-xs text-neutral-400 font-mono mb-1">Code & Projects</p>
              <p className="text-sm font-semibold text-white group-hover:text-[#ff5500] transition-colors break-all">
                github.com/Jee123van456
              </p>
            </div>
          </a>
        </motion.div>

        {/* Primary Action Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <MagneticButton
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            variant="primary"
            className="py-4 px-9 text-base shadow-[0_10px_40px_rgba(255,85,0,0.5)]"
          >
            Start a Conversation
            <ArrowRight className="w-5 h-5 ml-1" />
          </MagneticButton>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-medium text-sm bg-white/5 border border-white/10 hover:border-[#ff5500] hover:text-[#ff5500] transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-mono">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Email Address</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Social Links Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex items-center justify-center gap-6 pt-12 border-t border-white/10"
        >
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-[#ff5500] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
            aria-label="GitHub"
          >
            <GithubIcon className="w-5 h-5" />
          </a>

          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-[#ff5500] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>

          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="p-3.5 rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-[#ff5500] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};
