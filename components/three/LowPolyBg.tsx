"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LowPolyBgProps {
  opacity: number;
  visible: boolean;
}

export function LowPolyBg({ opacity, visible }: LowPolyBgProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.08;
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.15;
  });

  if (!visible || opacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {/* Main icosahedron */}
      <mesh position={[2.5, 0.5, 0]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={opacity * 0.4}
        />
      </mesh>

      {/* Secondary octahedron */}
      <mesh position={[-2.5, -0.5, -1]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={opacity * 0.3}
        />
      </mesh>

      {/* Small tetrahedron */}
      <mesh position={[0, 1.5, -0.5]}>
        <tetrahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#a78bfa"
          wireframe
          transparent
          opacity={opacity * 0.35}
        />
      </mesh>

      {/* Floating dodecahedron */}
      <mesh position={[-1, -1.5, 0.5]}>
        <dodecahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#7c3aed"
          wireframe
          transparent
          opacity={opacity * 0.25}
        />
      </mesh>
    </group>
  );
}
