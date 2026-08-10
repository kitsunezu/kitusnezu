"use client";

import { useMemo } from "react";
import { Float, Sparkles } from "@react-three/drei";

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
  rotationIntensity: number;
  floatIntensity: number;
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

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export function SkillOrbs({ opacity, visible, isMobile }: SkillOrbsProps) {
  const orbs: OrbData[] = useMemo(() => {
    const count = isMobile ? 6 : 12;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const seed = i * 5 + count;
      const radius = 2.5 + pseudoRandom(seed) * 1.5;
      return {
        position: [
          Math.cos(angle) * radius,
          (pseudoRandom(seed + 1) - 0.5) * 3,
          Math.sin(angle) * radius - 3,
        ] as [number, number, number],
        color: ORB_COLORS[i % ORB_COLORS.length],
        radius: 0.12 + pseudoRandom(seed + 2) * 0.18,
        speed: 0.4 + pseudoRandom(seed + 3) * 0.8,
        rotationIntensity: 0.2 + pseudoRandom(seed + 4) * 0.4,
        floatIntensity: 0.6 + pseudoRandom(seed + 5) * 0.8,
      };
    });
  }, [isMobile]);

  if (!visible || opacity <= 0.01) return null;

  return (
    <group>
      <Sparkles
        count={isMobile ? 20 : 40}
        scale={9}
        size={0.5}
        speed={0.3}
        opacity={opacity * 0.7}
        color="#8b5cf6"
      />
      {orbs.map((orb, i) => (
        <Float
          key={i}
          speed={orb.speed}
          rotationIntensity={orb.rotationIntensity}
          floatIntensity={orb.floatIntensity}
        >
          <mesh position={orb.position}>
            <sphereGeometry args={[orb.radius, 16, 16]} />
            <meshStandardMaterial
              color={orb.color}
              transparent
              opacity={opacity * 0.75}
              emissive={orb.color}
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.5}
              toneMapped={false}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
