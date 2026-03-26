"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

interface InteractiveStarsProps {
  count: number;
  isMobile: boolean;
  opacity: number;
}

export function InteractiveStars({ count, isMobile, opacity }: InteractiveStarsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile || typeof window === "undefined") return;
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [isMobile]);

  useFrame(() => {
    if (!groupRef.current || isMobile) return;
    // Smooth lerp toward mouse target
    smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.025;
    smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.025;
    groupRef.current.rotation.y = smoothRef.current.x * 0.15;
    groupRef.current.rotation.x = smoothRef.current.y * 0.08;
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef}>
      <Stars
        radius={80}
        depth={40}
        count={count}
        factor={3}
        saturation={0.6}
        fade
        speed={0.4}
      />
    </group>
  );
}
