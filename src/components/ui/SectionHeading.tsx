"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  dark = false,
  align = "left",
  className = "",
}) => {
  const alignmentClass =
    align === "center"
      ? "text-center items-center"
      : align === "right"
      ? "text-right items-end"
      : "text-left items-start";

  return (
    <div className={`flex flex-col mb-12 sm:mb-16 ${alignmentClass} ${className}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/20 mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-pulse" />
          {eyebrow}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
          dark ? "text-white" : "text-neutral-900"
        }`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-4 text-base sm:text-lg max-w-2xl leading-relaxed ${
            dark ? "text-neutral-400" : "text-neutral-600"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
