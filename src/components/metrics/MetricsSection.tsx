"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export const MetricsSection: React.FC = () => {
  const metrics = PORTFOLIO_DATA.metrics;

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, idx) => (
            <Reveal key={item.label} delay={0.1 * idx}>
              <GlassCard tilt={true} className="p-8 text-center border-neutral-200/80 hover:border-[#ff5500]/40 transition-all flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-mono text-orange-gradient mb-2"
                >
                  {item.number}
                </motion.div>

                <h3 className="text-xs font-mono font-bold tracking-wider text-neutral-800 uppercase mb-1">
                  {item.label}
                </h3>

                <p className="text-[11px] text-neutral-500 font-medium">
                  {item.sub}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
