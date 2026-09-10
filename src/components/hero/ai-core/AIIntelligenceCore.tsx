"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

import { Lighting } from "./Lighting";
import { Environment } from "./Environment";
import { CoreGeometry } from "./CoreGeometry";
import { NeuralNetwork } from "./NeuralNetwork";
import { DataTrajectories } from "./DataTrajectories";
import { FloatingModules } from "./FloatingModules";
import { DataParticles } from "./DataParticles";

// Scene Content with Mouse Parallax & Idle Rotation
const MainSceneContent: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth subtle mouse parallax lerp
      const targetY = (state.mouse.x * Math.PI) / 8;
      const targetX = (-state.mouse.y * Math.PI) / 8;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.95 : 1.25}>
      <Lighting />
      <Environment isMobile={isMobile} />
      <CoreGeometry isMobile={isMobile} />
      <NeuralNetwork isMobile={isMobile} />
      <DataTrajectories isMobile={isMobile} />
      <FloatingModules isMobile={isMobile} />
      <DataParticles isMobile={isMobile} />
    </group>
  );
};

export const AIIntelligenceCore: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full h-full min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] relative flex items-center justify-center">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        className="w-full h-full"
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 0, isMobile ? 6.2 : 5.0]}
          fov={50}
        />
        <MainSceneContent isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default AIIntelligenceCore;
