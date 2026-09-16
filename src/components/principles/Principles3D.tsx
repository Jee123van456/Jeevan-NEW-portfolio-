"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { CameraRig } from "../3d/CameraRig";

const PRINCIPLES = [
  "I BUILD SYSTEMS.",
  "I THINK IN ARCHITECTURES.",
  "I EVALUATE AI.",
  "I SHIP.",
];

function PrinciplePhrase3D({
  phrase,
  index,
  onHover,
}: {
  phrase: string;
  index: number;
  onHover: (idx: number) => void;
}) {
  const textRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const pos: [number, number, number] = [0, (1.5 - index) * 1.4, (index - 1.5) * 0.8];

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = pos[1] + Math.sin(state.clock.getElapsedTime() * 1.5 + index) * 0.1;
      textRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5 + index) * 0.05;
    }
  });

  return (
    <group
      ref={textRef}
      position={pos}
      onPointerOver={() => {
        setHovered(true);
        onHover(index);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <Text
        fontSize={0.7}
        color={hovered ? "#ff5500" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
      >
        {phrase}
      </Text>
    </group>
  );
}

export function Principles3D() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-[450px] lg:h-[550px] relative rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-2xl flex items-center justify-center">
      {mounted && (
        <Canvas camera={{ position: [0, 0, 6.5], fov: 50 }}>
          <CameraRig targetPosition={[0, 0, 6.5]} parallaxFactor={0.6} />
          <ambientLight intensity={0.9} />
          <pointLight position={[10, 10, 10]} intensity={4} color="#ff5500" />

          {PRINCIPLES.map((p, idx) => (
            <PrinciplePhrase3D key={p} phrase={p} index={idx} onHover={(i) => setActiveIndex(i)} />
          ))}
        </Canvas>
      )}

      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
        <div className="bg-neutral-900/90 backdrop-blur-md border border-[#ff5500]/50 px-4 py-2 rounded-xl text-xs font-mono text-[#ff5500] font-bold">
          {PRINCIPLES[activeIndex]}
        </div>
        <div className="text-[10px] font-mono text-neutral-500">
          SPATIAL 3D PRINCIPLES
        </div>
      </div>
    </div>
  );
}
