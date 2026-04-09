"use client";

import { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// ─── Sky gradient + cloud shader ────────────────────────────────────────────

const RainSkySaterial = shaderMaterial(
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

    // simple hash + noise helpers
    vec2 hash2(vec2 p) {
      p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
      return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
    }
    float noise(vec2 p) {
      vec2 i = floor(p); vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
            dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
        mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
            dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x), u.y);
    }
    float fbm(vec2 p) {
      float v = 0.0; float a = 0.5;
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for (int i = 0; i < 5; i++) {
        v += a * noise(p); p = rot * p * 2.0 + vec2(100.0); a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv;

      // ── sky gradient: overcast rainy day ──────────────────────────────
      // top: cool blue-grey   bottom: pale misty white
      vec3 skyTop    = vec3(0.55, 0.65, 0.76);   // #8CA6C2
      vec3 skyBottom = vec3(0.86, 0.90, 0.95);   // #DBE6F2
      vec3 sky = mix(skyBottom, skyTop, pow(uv.y, 0.7));

      // ── cloud layer using FBM ─────────────────────────────────────────
      float t = uTime * 0.04;
      vec2  cloudUv = uv * vec2(2.8, 1.8) + vec2(t, 0.0);
      float cloud = fbm(cloudUv + fbm(cloudUv + vec2(0.3, 0.2)));
      // Shape clouds mostly in upper 60% of sky
      float cloudMask   = smoothstep(0.25, 0.75, uv.y);
      float cloudDensity = smoothstep(0.1, 0.55, cloud) * cloudMask;

      // Cloud colours: lighter wispy grey
      vec3 cloudLight = vec3(0.92, 0.94, 0.97);
      vec3 cloudDark  = vec3(0.68, 0.73, 0.80);
      vec3 cloudColour = mix(cloudDark, cloudLight, smoothstep(0.2, 0.6, cloud));

      vec3 colour = mix(sky, cloudColour, cloudDensity * 0.75);

      // ── lower-horizon mist ────────────────────────────────────────────
      float mist = smoothstep(0.25, 0.0, uv.y);
      colour = mix(colour, skyBottom, mist * 0.5);

      gl_FragColor = vec4(colour, uOpacity);
    }
  `
);

extend({ RainSkySaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    rainSkySaterial: {
      ref?: React.Ref<THREE.ShaderMaterial & { uTime: number; uOpacity: number }>;
      uTime?: number;
      uOpacity?: number;
      transparent?: boolean;
      depthWrite?: boolean;
    };
  }
}

type RainSkyMatRef = InstanceType<typeof RainSkySaterial>;

function SkyPlane({ opacity }: { opacity: number }) {
  const matRef = useRef<RainSkyMatRef>(null);

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uTime = clock.getElapsedTime();
      matRef.current.uOpacity = opacity;
    }
  });

  return (
    <mesh position={[0, 0, -2]}>
      <planeGeometry args={[26, 15]} />
      <rainSkySaterial ref={matRef} transparent depthWrite={false} />
    </mesh>
  );
}

// ─── Rain streaks (LineSegments) ─────────────────────────────────────────────

const WIND_X = -0.022;   // slight wind to the left
const STREAK = 0.22;     // streak length in world units

function RainLayer({
  count,
  speedBase,
  speedRange,
  opacity,
  zPos,
}: {
  count: number;
  speedBase: number;
  speedRange: number;
  opacity: number;
  zPos: number;
}) {
  const ref = useRef<THREE.LineSegments>(null);

  // Float32 arrays stored in refs so useFrame can mutate without triggering re-renders
  const state = useMemo(() => {
    const pos = new Float32Array(count * 6); // 2 pts × 3 coords per drop
    const vel = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 14;
      const z = zPos + (Math.random() - 0.5) * 0.4;
      const speed = speedBase + Math.random() * speedRange;

      pos[i * 6 + 0] = x;
      pos[i * 6 + 1] = y;
      pos[i * 6 + 2] = z;
      pos[i * 6 + 3] = x + WIND_X;
      pos[i * 6 + 4] = y - STREAK;
      pos[i * 6 + 5] = z;

      vel[i] = speed;
    }

    return { pos, vel };
  }, [count, speedBase, speedRange, zPos]);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const { vel } = state;

    for (let i = 0; i < count; i++) {
      const spd = vel[i];
      // move top vertex
      pos[i * 6 + 0] += WIND_X;
      pos[i * 6 + 1] -= spd;
      // move bottom vertex
      pos[i * 6 + 3] += WIND_X;
      pos[i * 6 + 4] -= spd;

      // reset when completely below screen
      if (pos[i * 6 + 4] < -8) {
        const nx = (Math.random() - 0.5) * 26;
        const ny = 8 + Math.random() * 3;
        pos[i * 6 + 0] = nx;
        pos[i * 6 + 1] = ny;
        pos[i * 6 + 3] = nx + WIND_X;
        pos[i * 6 + 4] = ny - STREAK;
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={ref} position={[0, 0, zPos]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[state.pos, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#6a93b5"
        transparent
        opacity={opacity}
      />
    </lineSegments>
  );
}

// ─── Mist overlay ────────────────────────────────────────────────────────────

const MistMaterial = shaderMaterial(
  { uTime: 0, uOpacity: 0.18 },
  /*glsl*/ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
  `,
  /*glsl*/ `
    uniform float uTime;
    uniform float uOpacity;
    varying vec2 vUv;
    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
    float noise(vec2 p){
      vec2 i=floor(p); vec2 f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
    }
    void main(){
      float t = uTime * 0.07;
      float n  = noise(vUv * 3.0 + vec2(t, t * 0.4));
      float n2 = noise(vUv * 6.0 - vec2(t * 0.8, 0.0));
      float mist = n * 0.6 + n2 * 0.4;
      float alpha = mist * uOpacity * smoothstep(0.35, 0.0, vUv.y);
      gl_FragColor = vec4(0.88, 0.92, 0.96, alpha);
    }
  `
);

extend({ MistMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    mistMaterial: {
      ref?: React.Ref<THREE.ShaderMaterial & { uTime: number; uOpacity: number }>;
      uTime?: number;
      uOpacity?: number;
      transparent?: boolean;
      depthWrite?: boolean;
    };
  }
}

type MistMatRef = InstanceType<typeof MistMaterial>;

function MistOverlay() {
  const matRef = useRef<MistMatRef>(null);

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uTime = clock.getElapsedTime();
    }
  });

  return (
    <mesh position={[0, -3, -1]}>
      <planeGeometry args={[26, 8]} />
      <mistMaterial ref={matRef} transparent depthWrite={false} />
    </mesh>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

export function RainyDayBackground({ opacity = 1 }: { opacity?: number }) {
  return (
    <>
      {/* Sky */}
      <SkyPlane opacity={opacity} />

      {/* Background rain layer (far, translucent) */}
      <RainLayer
        count={800}
        speedBase={0.04}
        speedRange={0.025}
        opacity={opacity * 0.30}
        zPos={-1.0}
      />

      {/* Foreground rain layer (close, more visible) */}
      <RainLayer
        count={600}
        speedBase={0.07}
        speedRange={0.04}
        opacity={opacity * 0.55}
        zPos={0.5}
      />

      {/* Ground mist */}
      <MistOverlay />
    </>
  );
}
