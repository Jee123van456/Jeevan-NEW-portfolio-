"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ComputationalArchitecture } from "./ComputationalArchitecture";
import { ParticleField } from "../3d/primitives/ParticleField";
import { CameraRig } from "../3d/CameraRig";

export function Hero3DScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[450px] lg:min-h-[600px] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#ff5500] animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[450px] lg:min-h-[600px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <CameraRig targetPosition={[0, 0, 7.5]} parallaxFactor={0.6} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-5, -5, -5]} color="#ff5500" intensity={2} />
          
          <ParticleField count={90} areaSize={18} color="#ff5500" speed={0.3} />
          <ComputationalArchitecture />
        </Suspense>
      </Canvas>
    </div>
  );
}
