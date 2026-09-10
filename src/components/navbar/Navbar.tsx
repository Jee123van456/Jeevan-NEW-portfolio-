"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "What I Build", href: "#what-i-build" },
  { label: "Projects", href: "#projects" },
  { label: "Tech Stack", href: "#tech-universe" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section tracking
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between transition-all duration-300 w-full max-w-6xl rounded-full px-4 sm:px-6 py-2.5 sm:py-3 ${
            isScrolled
              ? "glass-pill bg-white/80 border-black/10 shadow-lg shadow-black/5"
              : "bg-white/60 backdrop-blur-md border border-black/5"
          }`}
        >
          {/* Logo [JK] */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white font-bold text-sm flex items-center justify-center transition-all duration-300 group-hover:bg-[#ff5500] group-hover:shadow-[0_0_15px_rgba(255,85,0,0.5)]">
              JK
            </div>
            <div className="flex flex-col text-left hidden sm:flex">
              <span className="text-xs font-bold tracking-tight text-neutral-900">JEEVAN K</span>
              <span className="text-[10px] text-[#ff5500] font-semibold tracking-wider uppercase">
                AI ENGINEER
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 bg-neutral-100/70 p-1.5 rounded-full border border-neutral-200/50">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                    isActive ? "text-[#ff5500] font-semibold" : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white rounded-full shadow-xs border border-neutral-200/80 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right CTA & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <MagneticButton
              href="#contact"
              onClick={() => scrollToSection("#contact")}
              variant="primary"
              className="py-2 px-4 text-xs font-medium hidden sm:inline-flex"
            >
              Let's Build
              <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-neutral-100 text-neutral-800 hover:bg-neutral-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Fullscreen Animated Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-neutral-950/95 backdrop-blur-2xl text-white flex flex-col justify-between p-8 pt-24 md:hidden"
          >
            <div className="flex flex-col gap-6 items-start">
              <span className="text-xs font-mono text-[#ff5500] tracking-widest uppercase">
                NAVIGATION
              </span>

              {NAV_LINKS.map((link, idx) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-bold text-left hover:text-[#ff5500] transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            <div className="flex flex-col gap-4 border-t border-neutral-800 pt-6">
              <MagneticButton
                href="#contact"
                onClick={() => scrollToSection("#contact")}
                variant="primary"
                className="w-full py-3.5 text-center"
              >
                Let's Build Something Intelligent
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </MagneticButton>

              <div className="text-xs text-neutral-400 font-mono text-center">
                JEEVAN K • AI & SOFTWARE ENGINEER
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
