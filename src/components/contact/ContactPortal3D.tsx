"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CameraRig } from "../3d/CameraRig";

function SpatialPortalFrame() {
  const outerGroup = useRef<THREE.Group>(null);
  const leftDoor = useRef<THREE.Group>(null);
  const rightDoor = useRef<THREE.Group>(null);
  const coreLight = useRef<THREE.PointLight>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (outerGroup.current) {
      outerGroup.current.position.y = Math.sin(time * 0.8) * 0.1;
      outerGroup.current.rotation.y = Math.sin(time * 0.3) * 0.05;
    }

    if (leftDoor.current && rightDoor.current) {
      const openAngle = hovered ? 0.4 : 0.05;
      leftDoor.current.rotation.y = THREE.MathUtils.lerp(leftDoor.current.rotation.y, -openAngle, delta * 3);
      rightDoor.current.rotation.y = THREE.MathUtils.lerp(rightDoor.current.rotation.y, openAngle, delta * 3);
    }

    if (coreLight.current) {
      coreLight.current.intensity = 5 + Math.sin(time * 3) * 2;
    }
  });

  return (
    <group
      ref={outerGroup}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Internal Glowing Orange Portal Energy Source */}
      <pointLight ref={coreLight} color="#ff5500" intensity={6} distance={12} />

      {/* Portal Outer Architectural Rim Frame */}
      <mesh>
        <torusGeometry args={[2.5, 0.12, 16, 64]} />
        <meshStandardMaterial
          color="#ff5500"
          emissive="#ff3300"
          emissiveIntensity={1}
          metalness={0.9}
        />
      </mesh>

      {/* Left Portal Door Sieve */}
      <group ref={leftDoor} position={[-1.2, 0, 0]}>
        <mesh position={[0.6, 0, 0]}>
          <boxGeometry args={[1.2, 3.8, 0.1]} />
          <meshPhysicalMaterial
            color="#ff5500"
            transmission={0.8}
            opacity={0.5}
            transparent
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Right Portal Door Sieve */}
      <group ref={rightDoor} position={[1.2, 0, 0]}>
        <mesh position={[-0.6, 0, 0]}>
          <boxGeometry args={[1.2, 3.8, 0.1]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.8}
            opacity={0.5}
            transparent
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

export function ContactPortal3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-[400px] lg:h-[500px] relative rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-2xl flex items-center justify-center">
      {mounted && (
        <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }}>
          <CameraRig targetPosition={[0, 0, 6.5]} parallaxFactor={0.5} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />

          <SpatialPortalFrame />
        </Canvas>
      )}
    </div>
  );
}
