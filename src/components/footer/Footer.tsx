"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-neutral-400 py-10 border-t border-white/10 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#ff5500] text-white font-bold text-xs flex items-center justify-center">
            JK
          </div>
          <div className="flex flex-col text-left">
            <span className="text-white font-bold tracking-tight">JEEVAN K</span>
            <span className="text-[10px] text-[#ff5500]">AI ENGINEER</span>
          </div>
        </div>

        {/* Center: Quote */}
        <div className="text-neutral-400 text-center">
          Built with curiosity + code.
        </div>

        {/* Right: Copyright & Links */}
        <div className="flex items-center gap-6">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hover:text-[#ff5500] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff5500] rounded-xs px-1"
          >
            GitHub
          </a>
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="hover:text-[#ff5500] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff5500] rounded-xs px-1"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            aria-label="Send Email to Jeevan K"
            className="hover:text-[#ff5500] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff5500] rounded-xs px-1"
          >
            Email
          </a>
          <span className="text-neutral-500">© 2026 Jeevan K</span>
        </div>

      </div>
    </footer>
  );
};
