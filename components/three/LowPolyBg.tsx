"use client";

import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";

interface LowPolyBgProps {
  opacity: number;
  visible: boolean;
}

export function LowPolyBg({ opacity, visible }: LowPolyBgProps) {
  if (!visible || opacity <= 0.01) return null;

  return (
    <group position={[0, 0, -2]}>
      {/* Background ambient distort sphere */}
      <mesh position={[0, 0, -2]}>
        <sphereGeometry args={[3, 32, 32]} />
        <MeshDistortMaterial
          color="#6366f1"
          transparent
          opacity={opacity * 0.04}
          distort={0.6}
          speed={0.4}
          depthWrite={false}
        />
      </mesh>

      {/* Main icosahedron — glass crystal */}
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh position={[2.5, 0.5, 0]}>
          <icosahedronGeometry args={[1.2, 1]} />
          <MeshDistortMaterial
            color="#6366f1"
            wireframe
            transparent
            opacity={opacity * 0.45}
            distort={0.3}
            speed={0.5}
          />
        </mesh>
      </Float>

      {/* Secondary octahedron */}
      <Float speed={0.8} rotationIntensity={1.0} floatIntensity={1.2}>
        <mesh position={[-2.5, -0.5, -1]}>
          <octahedronGeometry args={[0.8, 0]} />
          <MeshWobbleMaterial
            color="#8b5cf6"
            wireframe
            transparent
            opacity={opacity * 0.35}
            factor={0.4}
            speed={0.6}
          />
        </mesh>
      </Float>

      {/* Small tetrahedron */}
      <Float speed={1.6} rotationIntensity={1.4} floatIntensity={0.6}>
        <mesh position={[0, 1.5, -0.5]}>
          <tetrahedronGeometry args={[0.5, 0]} />
          <MeshWobbleMaterial
            color="#a78bfa"
            wireframe
            transparent
            opacity={opacity * 0.4}
            factor={0.5}
            speed={0.8}
          />
        </mesh>
      </Float>

      {/* Floating dodecahedron */}
      <Float speed={0.6} rotationIntensity={0.8} floatIntensity={1.0}>
        <mesh position={[-1, -1.5, 0.5]}>
          <dodecahedronGeometry args={[0.6, 0]} />
          <MeshDistortMaterial
            color="#7c3aed"
            wireframe
            transparent
            opacity={opacity * 0.3}
            distort={0.25}
            speed={0.4}
          />
        </mesh>
      </Float>
    </group>
  );
}
