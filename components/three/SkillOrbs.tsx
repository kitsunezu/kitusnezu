"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SkillOrbsProps {
  opacity: number;
  visible: boolean;
  isMobile: boolean;
}

interface OrbData {
  position: [number, number, number];
  color: string;
  radius: number;
  speed: number;
  offset: number;
}

const ORB_COLORS = [
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#ec4899", // pink
];

export function SkillOrbs({ opacity, visible, isMobile }: SkillOrbsProps) {
  const groupRef = useRef<THREE.Group>(null);

  const orbs: OrbData[] = useMemo(() => {
    const count = isMobile ? 6 : 12;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.5 + Math.random() * 1.5;
      return {
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 3,
          Math.sin(angle) * radius - 3,
        ] as [number, number, number],
        color: ORB_COLORS[i % ORB_COLORS.length],
        radius: 0.12 + Math.random() * 0.18,
        speed: 0.3 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
      };
    });
  }, [isMobile]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.05;
  });

  if (!visible || opacity <= 0.01) return null;

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <FloatingOrb key={i} data={orb} opacity={opacity} />
      ))}
    </group>
  );
}

function FloatingOrb({ data, opacity }: { data: OrbData; opacity: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    // Gentle floating
    meshRef.current.position.y =
      data.position[1] + Math.sin(t * data.speed + data.offset) * 0.4;
    meshRef.current.position.x =
      data.position[0] + Math.cos(t * data.speed * 0.7 + data.offset) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={data.position}>
      <sphereGeometry args={[data.radius, 16, 16]} />
      <meshStandardMaterial
        color={data.color}
        transparent
        opacity={opacity * 0.7}
        emissive={data.color}
        emissiveIntensity={0.3}
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  );
}
