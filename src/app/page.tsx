"use client";

import React, { useState } from "react";
import { LoadingScreen } from "@/components/loading/LoadingScreen";
import { Navbar } from "@/components/navbar/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { WhatIBuildSection } from "@/components/what-i-build/WhatIBuildSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { TechUniverse } from "@/components/tech-universe/TechUniverse";
import { ArchitectureSection } from "@/components/architecture/ArchitectureSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { PrinciplesSection } from "@/components/principles/PrinciplesSection";
import { MetricsSection } from "@/components/metrics/MetricsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <main className="min-h-screen bg-[#fafafa] text-[#0d0d0e] selection:bg-[#ff5500] selection:text-white">
      {/* Loading Screen */}
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <HeroSection />
      <AboutSection />
      <WhatIBuildSection />
      <ProjectsSection />
      <TechUniverse />
      <ArchitectureSection />
      <ExperienceSection />
      <PrinciplesSection />
      <MetricsSection />
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
