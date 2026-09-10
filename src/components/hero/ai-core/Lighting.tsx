"use client";

import React from "react";

export const Lighting: React.FC = () => {
  return (
    <>
      {/* Soft ambient light */}
      <ambientLight intensity={0.6} />

      {/* Main white key light */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.8}
        color="#ffffff"
      />

      {/* Strong orange rim light for high-tech edge glow */}
      <directionalLight
        position={[-6, -4, -5]}
        intensity={3.5}
        color="#ff5500"
      />

      {/* Core internal energy point light */}
      <pointLight
        position={[0, 0, 0]}
        intensity={4}
        distance={8}
        color="#ff6600"
      />

      {/* Secondary accent fill light */}
      <pointLight
        position={[4, -3, 3]}
        intensity={1.2}
        distance={10}
        color="#ffaa00"
      />
    </>
  );
};
