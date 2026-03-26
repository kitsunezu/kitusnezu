"use client";

import { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const AuroraMaterial = shaderMaterial(
  { uTime: 0, uOpacity: 1.0 },
  /* vertex */
  /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* fragment */
  /*glsl*/ `
    uniform float uTime;
    uniform float uOpacity;
    varying vec2 vUv;

    // --- FBM helpers ---
    vec2 hash2(vec2 p) {
      p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
      return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
    }
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
            dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
        mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
            dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x),
        u.y);
    }
    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      vec2  shift = vec2(100.0);
      mat2  rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p  = rot * p * 2.0 + shift;
        a *= 0.5;
      }
      return v;
    }
    // --- palette ---
    // indigo  #6366f1  → vec3(0.388, 0.400, 0.945)
    // violet  #8b5cf6  → vec3(0.545, 0.361, 0.965)
    // cyan    #06b6d4  → vec3(0.024, 0.714, 0.831)

    void main() {
      vec2 uv = vUv;
      float t = uTime * 0.18;

      // Warp UV with fbm
      vec2 q = vec2(fbm(uv + t * 0.4), fbm(uv + vec2(1.0)));
      vec2 r = vec2(fbm(uv + 1.0 * q + vec2(1.7, 9.2) + t * 0.15),
                    fbm(uv + 1.0 * q + vec2(8.3, 2.8) + t * 0.20));
      float f = fbm(uv + r);

      // Blend three aurora colours
      vec3 col = mix(
        vec3(0.388, 0.400, 0.945),   // indigo
        vec3(0.545, 0.361, 0.965),   // violet
        clamp(f * 2.0, 0.0, 1.0)
      );
      col = mix(col, vec3(0.024, 0.714, 0.831), clamp(length(q), 0.0, 1.0));

      // Soft vertical fade—brighter in upper half
      float fade = smoothstep(0.0, 0.6, uv.y) * smoothstep(1.0, 0.4, uv.y);
      float alpha = (f * 0.5 + 0.3) * fade * 0.22 * uOpacity;

      gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.22));
    }
  `
);

extend({ AuroraMaterial });

// Augment ThreeElements so JSX recognises <auroraMaterial>
declare module "@react-three/fiber" {
  interface ThreeElements {
    auroraMaterial: {
      ref?: React.Ref<THREE.ShaderMaterial & { uTime: number; uOpacity: number }>;
      uTime?: number;
      uOpacity?: number;
      transparent?: boolean;
      depthWrite?: boolean;
      blending?: THREE.Blending;
      side?: THREE.Side;
    };
  }
}

interface AuroraBackgroundProps {
  opacity: number;
}

export function AuroraBackground({ opacity }: AuroraBackgroundProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial & {
      uTime: number;
      uOpacity: number;
    };
    mat.uTime = state.clock.elapsedTime;
    mat.uOpacity = opacity;
  });

  if (opacity <= 0.01) return null;

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <planeGeometry args={[22, 14]} />
      <auroraMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
