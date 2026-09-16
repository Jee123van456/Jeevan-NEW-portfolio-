"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DataStreamProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  speed?: number;
  pulseCount?: number;
}

export function DataStream({
  start,
  end,
  color = "#ff5500",
  speed = 1.5,
}: DataStreamProps) {
  const lineRef = useRef<THREE.Line>(null);
  const particleRef = useRef<THREE.Mesh>(null);

  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setFromPoints([startVec, endVec]);
    return geom;
  }, [startVec, endVec]);

  useFrame((state) => {
    if (particleRef.current) {
      const t = (state.clock.getElapsedTime() * speed) % 1;
      particleRef.current.position.lerpVectors(startVec, endVec, t);
    }
  });

  return (
    <group>
      {/* Dynamic Energy Line */}
      <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4, linewidth: 2 }))} />

      {/* Moving Signal Packet */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}
