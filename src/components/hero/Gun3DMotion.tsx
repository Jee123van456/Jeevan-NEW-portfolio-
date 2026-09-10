"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import { Crosshair, Zap, ShieldAlert, Disc, Flame } from "lucide-react";
import * as THREE from "three";

// Interface for flying plasma bolts
interface PlasmaBolt {
  id: number;
  position: [number, number, number];
  velocity: [number, number, number];
  scale: number;
  life: number;
  maxLife: number;
}

// Interface for ejected shell casings
interface ShellCasing {
  id: number;
  position: [number, number, number];
  velocity: [number, number, number];
  rotation: [number, number, number];
  rotVelocity: [number, number, number];
  life: number;
}

interface TacticalGunProps {
  isMobile: boolean;
  triggerFireSignal: number;
  onFire: () => void;
}

// ============================================================================
// 1. PROCEDURAL MATTE-BLACK CYBER GUN MODEL WITH FIRE & RECOIL DYNAMICS
// ============================================================================
const TacticalGunScene: React.FC<TacticalGunProps> = ({
  isMobile,
  triggerFireSignal,
  onFire,
}) => {
  const mainGroupRef = useRef<THREE.Group>(null);
  const recoilSlideRef = useRef<THREE.Group>(null);
  const muzzleFlashLightRef = useRef<THREE.PointLight>(null);
  const muzzleFlashMeshRef = useRef<THREE.Mesh>(null);
  const laserBeamRef = useRef<THREE.Mesh>(null);

  // Recoil & state refs
  const recoilProgress = useRef(0);
  const flashIntensity = useRef(0);
  const lastSignalRef = useRef(triggerFireSignal);

  // Dynamic projectiles & shell casing particles
  const [bolts, setBolts] = useState<PlasmaBolt[]>([]);
  const [shells, setShells] = useState<ShellCasing[]>([]);

  // Function to fire weapon inside Three.js scene
  const executeShot = useCallback(() => {
    // 1. Kick recoil
    recoilProgress.current = 1.0;
    flashIntensity.current = 1.0;

    // 2. Spawn Plasma Bolt traveling forward (-Z axis direction relative to gun barrel)
    const boltId = Math.random();
    setBolts((prev) => [
      ...prev.slice(-15), // keep max 15 active
      {
        id: boltId,
        position: [0, 0.42, 2.2], // Barrel tip position
        velocity: [
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          18.0, // Speed moving forward out of screen towards user/view
        ],
        scale: 1.0,
        life: 0,
        maxLife: 0.8,
      },
    ]);

    // 3. Eject brass shell casing sideways
    const shellId = Math.random();
    setShells((prev) => [
      ...prev.slice(-10),
      {
        id: shellId,
        position: [0.35, 0.45, 0.2], // Ejection port
        velocity: [
          1.8 + Math.random() * 0.8, // Rightwards
          1.2 + Math.random() * 0.6, // Upwards arc
          -0.5 + Math.random() * 0.5,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        rotVelocity: [
          Math.random() * 15,
          Math.random() * 15,
          Math.random() * 15,
        ],
        life: 0,
      },
    ]);

    onFire();
  }, [onFire]);

  // Watch signal from parent triggers (scroll or button click)
  useEffect(() => {
    if (triggerFireSignal !== lastSignalRef.current) {
      lastSignalRef.current = triggerFireSignal;
      executeShot();
    }
  }, [triggerFireSignal, executeShot]);

  // Frame Loop (Animation & Physics Update)
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Smooth Mouse Aiming Parallax (Tracking Cursor in 3D)
    if (mainGroupRef.current) {
      const targetRotationY = (state.mouse.x * Math.PI) / 7;
      const targetRotationX = (-state.mouse.y * Math.PI) / 9;

      mainGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        mainGroupRef.current.rotation.y,
        targetRotationY,
        0.08
      );
      mainGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        mainGroupRef.current.rotation.x,
        targetRotationX,
        0.08
      );

      // Subtle breathing float motion
      mainGroupRef.current.position.y = Math.sin(t * 1.5) * 0.05;
    }

    // Recoil Kickback Interpolation
    if (recoilSlideRef.current) {
      if (recoilProgress.current > 0.001) {
        recoilProgress.current = THREE.MathUtils.lerp(
          recoilProgress.current,
          0,
          0.22
        );
      } else {
        recoilProgress.current = 0;
      }

      // Slide moves backward on Z, barrel tilts slightly up on X
      const kickZ = -recoilProgress.current * 0.38;
      const kickTiltX = recoilProgress.current * 0.12;

      recoilSlideRef.current.position.z = kickZ;
      recoilSlideRef.current.rotation.x = kickTiltX;
    }

    // Muzzle Flash decay
    if (flashIntensity.current > 0.01) {
      flashIntensity.current = THREE.MathUtils.lerp(
        flashIntensity.current,
        0,
        0.3
      );
    } else {
      flashIntensity.current = 0;
    }

    if (muzzleFlashLightRef.current) {
      muzzleFlashLightRef.current.intensity = flashIntensity.current * 18.0;
    }
    if (muzzleFlashMeshRef.current) {
      const s = flashIntensity.current * 1.4;
      muzzleFlashMeshRef.current.scale.set(s, s, s);
    }

    // Pulsate Tactical Laser Pointer Intensity
    if (laserBeamRef.current) {
      const mat = laserBeamRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.4 + Math.sin(t * 8) * 0.15 + flashIntensity.current * 0.5;
      }
    }

    // Update Plasma Bolts Physics
    if (bolts.length > 0) {
      setBolts((prevBolts) =>
        prevBolts
          .map((b) => ({
            ...b,
            position: [
              b.position[0] + b.velocity[0] * delta,
              b.position[1] + b.velocity[1] * delta,
              b.position[2] + b.velocity[2] * delta,
            ] as [number, number, number],
            life: b.life + delta,
          }))
          .filter((b) => b.life < b.maxLife && b.position[2] < 20)
      );
    }

    // Update Ejected Shell Casings Physics (Gravity + Arc)
    if (shells.length > 0) {
      setShells((prevShells) =>
        prevShells
          .map((s) => ({
            ...s,
            position: [
              s.position[0] + s.velocity[0] * delta,
              s.position[1] + s.velocity[1] * delta,
              s.position[2] + s.velocity[2] * delta,
            ] as [number, number, number],
            velocity: [
              s.velocity[0] * 0.96,
              s.velocity[1] - 9.8 * delta, // Gravity drop
              s.velocity[2],
            ] as [number, number, number],
            rotation: [
              s.rotation[0] + s.rotVelocity[0] * delta,
              s.rotation[1] + s.rotVelocity[1] * delta,
              s.rotation[2] + s.rotVelocity[2] * delta,
            ] as [number, number, number],
            life: s.life + delta,
          }))
          .filter((s) => s.life < 1.2 && s.position[1] > -5)
      );
    }
  });

  // Reusable High-End Matte Black & Titanium Materials
  const matteBlackMat = (
    <meshStandardMaterial
      color="#0a0a0d"
      roughness={0.28}
      metalness={0.82}
      envMapIntensity={1.2}
    />
  );
  const gunmetalMat = (
    <meshStandardMaterial
      color="#1e2029"
      roughness={0.2}
      metalness={0.92}
    />
  );
  const carbonGripMat = (
    <meshStandardMaterial
      color="#070709"
      roughness={0.65}
      metalness={0.2}
    />
  );
  const orangeNeonMat = (
    <meshStandardMaterial
      color="#ff5500"
      emissive="#ff4400"
      emissiveIntensity={2.5}
      roughness={0.1}
    />
  );

  return (
    <group
      ref={mainGroupRef}
      scale={isMobile ? 0.9 : 1.15}
      position={[0, -0.2, 0]}
      rotation={[0.1, -0.4, 0]} // Angled isometric view showing 3D gun profile
    >
      {/* Dynamic Studio Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 10, 8]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-6, -4, -5]} intensity={1.2} color="#445566" />
      <pointLight position={[0, 2, 2]} intensity={2.0} color="#ff5500" />

      {/* Muzzle Flash Point Light */}
      <pointLight
        ref={muzzleFlashLightRef}
        position={[0, 0.42, 2.3]}
        color="#ff7700"
        distance={8}
        decay={2}
      />

      {/* ================================================================ */}
      {/* GUN BASE CHASSIS & LOWER RECEIVER */}
      {/* ================================================================ */}

      {/* Main Body Chassis */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.55, 0.55, 2.2]} />
        {matteBlackMat}
      </mesh>

      {/* Lower Tactical Frame Bevel */}
      <mesh position={[0, -0.15, 0.2]}>
        <boxGeometry args={[0.5, 0.35, 1.8]} />
        {gunmetalMat}
      </mesh>

      {/* Ergonomic Carbon Fiber Pistol Grip */}
      <group position={[0, -0.75, -0.5]} rotation={[0.45, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.45, 1.1, 0.5]} />
          {carbonGripMat}
        </mesh>
        {/* Grip Accent Glow Plate */}
        <mesh position={[0, -0.2, 0.26]}>
          <boxGeometry args={[0.3, 0.6, 0.04]} />
          {orangeNeonMat}
        </mesh>
      </group>

      {/* Trigger Guard Loop */}
      <mesh position={[0, -0.45, 0.2]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.26, 0.04, 8, 24, Math.PI]} />
        {gunmetalMat}
      </mesh>

      {/* Tactical Trigger */}
      <mesh position={[0, -0.38, 0.25]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.08, 0.22, 0.05]} />
        {orangeNeonMat}
      </mesh>

      {/* Extended High-Tech Ammo Magazine */}
      <mesh position={[0, -0.85, 0.05]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.4, 0.9, 0.42]} />
        {matteBlackMat}
      </mesh>
      {/* Magazine Baseplate */}
      <mesh position={[0, -1.3, 0.1]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.46, 0.12, 0.5]} />
        {orangeNeonMat}
      </mesh>

      {/* ================================================================ */}
      {/* RECOILING SLIDE & BARREL ASSEMBLY (ANIMATED ON SHOT) */}
      {/* ================================================================ */}
      <group ref={recoilSlideRef}>
        {/* Upper Tactical Slide */}
        <mesh position={[0, 0.42, 0]}>
          <boxGeometry args={[0.52, 0.42, 2.5]} />
          {matteBlackMat}
        </mesh>

        {/* Top Picatinny Rail Slots */}
        <mesh position={[0, 0.66, 0]}>
          <boxGeometry args={[0.35, 0.08, 2.3]} />
          {gunmetalMat}
        </mesh>

        {/* Side Heat Ventilation Ribs (Glowing Orange Coils inside) */}
        <mesh position={[0.27, 0.42, 0.3]}>
          <boxGeometry args={[0.04, 0.16, 0.9]} />
          {orangeNeonMat}
        </mesh>
        <mesh position={[-0.27, 0.42, 0.3]}>
          <boxGeometry args={[0.04, 0.16, 0.9]} />
          {orangeNeonMat}
        </mesh>

        {/* Heavy Tactical Outer Barrel */}
        <mesh position={[0, 0.42, 1.4]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.18, 1.2, 24]} />
          {gunmetalMat}
        </mesh>

        {/* Fluted Muzzle Brake at Barrel Tip */}
        <mesh position={[0, 0.42, 2.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.2, 0.35, 16]} />
          {matteBlackMat}
        </mesh>

        {/* Holographic Scope / Optical Reflex Sight */}
        <group position={[0, 0.85, -0.3]}>
          {/* Scope Mount Base */}
          <mesh>
            <boxGeometry args={[0.42, 0.18, 0.7]} />
            {gunmetalMat}
          </mesh>
          {/* Scope Glass Housing */}
          <mesh position={[0, 0.22, 0]}>
            <boxGeometry args={[0.36, 0.32, 0.65]} />
            {matteBlackMat}
          </mesh>
          {/* Glowing Red Reticle Glass Lens */}
          <mesh position={[0, 0.22, 0.31]}>
            <planeGeometry args={[0.28, 0.24]} />
            <meshBasicMaterial color="#ff3300" transparent opacity={0.85} />
          </mesh>
        </group>

        {/* Undermounted Tactical Laser Sight Module */}
        <group position={[0, -0.05, 1.1]}>
          <mesh>
            <boxGeometry args={[0.3, 0.22, 0.6]} />
            {gunmetalMat}
          </mesh>
          {/* Laser Emitter Tip */}
          <mesh position={[0, 0, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.08, 16]} />
            {orangeNeonMat}
          </mesh>
          {/* Volumetric Laser Target Beam */}
          <mesh
            ref={laserBeamRef}
            position={[0, 0, 8.3]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.02, 0.08, 16, 12]} />
            <meshBasicMaterial
              color="#ff2200"
              transparent
              opacity={0.5}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      </group>

      {/* ================================================================ */}
      {/* MUZZLE FLASH FX MESH & SPARKS */}
      {/* ================================================================ */}
      <mesh ref={muzzleFlashMeshRef} position={[0, 0.42, 2.3]} scale={[0, 0, 0]}>
        <dodecahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial
          color="#ff7700"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ================================================================ */}
      {/* DYNAMIC FLYING PLASMA BOLTS PROJECTILES */}
      {/* ================================================================ */}
      {bolts.map((b) => (
        <group key={b.id} position={b.position}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.04, 1.2, 12]} />
            <meshBasicMaterial
              color="#ff6600"
              transparent
              opacity={0.95}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <pointLight color="#ff4400" intensity={6} distance={4} />
        </group>
      ))}

      {/* ================================================================ */}
      {/* DYNAMIC EJECTED BRASS SHELL CASINGS */}
      {/* ================================================================ */}
      {shells.map((s) => (
        <mesh key={s.id} position={s.position} rotation={s.rotation}>
          <cylinderGeometry args={[0.05, 0.05, 0.22, 12]} />
          <meshStandardMaterial
            color="#ffaa22"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
      ))}
    </group>
  );
};

// ============================================================================
// 2. MAIN CONTAINER COMPONENT WITH SCROLL DETECTOR & HUD OVERLAY
// ============================================================================
export const Gun3DMotion: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Stats & Firing triggers
  const [fireSignal, setFireSignal] = useState(0);
  const [shotsFired, setShotsFired] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [isFiringActive, setIsFiringActive] = useState(false);

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Trigger firing
  const triggerFire = useCallback(() => {
    setFireSignal((prev) => prev + 1);
  }, []);

  const handleShotFired = useCallback(() => {
    setShotsFired((prev) => prev + 1);
    setIsFiringActive(true);

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsFiringActive(false);
    }, 400);
  }, []);

  // Detect Scroll & Fire Gun on Scroll Delta
  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    let accumulatedScroll = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;

      setScrollSpeed(Math.round(delta * 2));

      accumulatedScroll += delta;

      // Fire weapon every time user scrolls ~45px
      if (accumulatedScroll >= 45) {
        accumulatedScroll = 0;
        triggerFire();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [triggerFire]);

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center p-2">
      {/* Dynamic Red/Orange Ambient Lighting Backdrop Glow */}
      <div
        className={`absolute -inset-4 bg-gradient-to-tr from-[#ff3300]/20 via-[#ff6600]/15 to-[#ff0033]/20 rounded-3xl blur-3xl pointer-events-none -z-10 transition-opacity duration-300 ${
          isFiringActive ? "opacity-100 scale-105" : "opacity-60"
        }`}
      />

      {/* Main Tactical Glassmorphic Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full aspect-square max-w-[460px] rounded-3xl border border-neutral-800/80 bg-neutral-950/90 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden p-5 sm:p-6 text-white"
      >
        {/* Hexagonal Tactical Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ff5500_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

        {/* Top HUD Telemetry Bar */}
        <div className="relative z-20 flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-[#ff5500]/40">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5500] ${
                  isFiringActive ? "opacity-100 scale-150" : "opacity-75"
                }`}
              ></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5500]"></span>
            </span>
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#ff5500] uppercase">
              CYBER GUN // 3D SCROLL FIRE
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-[11px] font-mono text-neutral-300">
            <Crosshair className="w-3.5 h-3.5 text-[#ff5500] animate-spin" />
            <span>AIM: MOUSE / SCROLL</span>
          </div>
        </div>

        {/* Center 3D R3F Viewport */}
        <div className="relative flex-1 w-full h-full flex items-center justify-center my-1 cursor-crosshair">
          {mounted ? (
            <Canvas
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              style={{ background: "transparent" }}
              className="w-full h-full"
            >
              <PerspectiveCamera makeDefault position={[0, 0, 6.2]} fov={45} />
              <TacticalGunScene
                isMobile={isMobile}
                triggerFireSignal={fireSignal}
                onFire={handleShotFired}
              />
            </Canvas>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-[#ff5500]/30 border-t-[#ff5500] animate-spin" />
            </div>
          )}
        </div>

        {/* Bottom Tactical HUD Telemetry Footer */}
        <div className="relative z-20 flex flex-col gap-3 w-full text-[11px] font-mono">
          {/* Status Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 w-full">
            <div className="p-2 rounded-xl bg-neutral-900/90 border border-neutral-800/80 flex flex-col items-center justify-center">
              <span className="text-[9px] text-neutral-500 uppercase tracking-wider">
                SHOTS FIRED
              </span>
              <span className="text-sm font-bold font-mono text-[#ff5500]">
                {shotsFired}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-neutral-900/90 border border-neutral-800/80 flex flex-col items-center justify-center">
              <span className="text-[9px] text-neutral-500 uppercase tracking-wider">
                SCROLL SPEED
              </span>
              <span className="text-sm font-bold font-mono text-neutral-200">
                {scrollSpeed} <span className="text-[9px] text-neutral-500">PX/S</span>
              </span>
            </div>

            <div className="p-2 rounded-xl bg-neutral-900/90 border border-neutral-800/80 flex flex-col items-center justify-center">
              <span className="text-[9px] text-neutral-500 uppercase tracking-wider">
                WEAPON STATUS
              </span>
              <span className="text-[11px] font-bold font-mono text-emerald-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-400" /> READY
              </span>
            </div>
          </div>

          {/* Interactive Trigger Button */}
          <button
            onClick={triggerFire}
            type="button"
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ff3300] to-[#ff6600] text-white font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(255,51,0,0.4)] cursor-pointer"
          >
            <Flame className="w-4 h-4 text-amber-200 animate-pulse" />
            <span>CLICK TO FIRE OR SCROLL PAGE</span>
          </button>
        </div>

        {/* Tactical Corner Reticle Accents */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#ff5500] pointer-events-none rounded-tl" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#ff5500] pointer-events-none rounded-tr" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#ff5500] pointer-events-none rounded-bl" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#ff5500] pointer-events-none rounded-br" />
      </motion.div>
    </div>
  );
};

export default Gun3DMotion;
