"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  href,
  target,
  rel,
}) => {
  const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.25;
    const y = (e.clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-[#ff5500] text-white hover:bg-[#ff6611] shadow-[0_4px_20px_rgba(255,85,0,0.35)] hover:shadow-[0_8px_30px_rgba(255,85,0,0.5)] border border-transparent";
      case "secondary":
        return "bg-neutral-900 text-white hover:bg-black border border-neutral-800 shadow-md";
      case "outline":
        return "bg-transparent text-neutral-900 border border-neutral-300 hover:border-[#ff5500] hover:text-[#ff5500]";
      case "ghost":
        return "bg-transparent text-neutral-700 hover:text-[#ff5500]";
      default:
        return "";
    }
  };

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={buttonRef as any}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.5 }}
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm transition-all duration-200 cursor-pointer select-none active:scale-95 ${getVariantStyles()} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Tag>
  );
};
