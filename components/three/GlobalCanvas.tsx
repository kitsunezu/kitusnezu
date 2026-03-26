"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ParticleField } from "./ParticleField";
import { LowPolyBg } from "./LowPolyBg";
import { SkillOrbs } from "./SkillOrbs";

export function GlobalCanvas() {
  const progress = useScrollProgress();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        gl={{ antialias: !isMobile, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} />

          {/* Hero: particle star field */}
          <ParticleField
            opacity={Math.max(0, 1 - progress.about * 1.5)}
            count={isMobile ? 800 : 2000}
          />

          {/* About: low-poly geometric shapes */}
          <LowPolyBg
            opacity={Math.min(1, progress.about) * (1 - Math.max(0, progress.skills - 0.3))}
            visible={progress.about > 0.1 && progress.skills < 0.9}
          />

          {/* Skills: floating orbs */}
          <SkillOrbs
            opacity={Math.min(1, Math.max(0, progress.skills - 0.1) * 2)}
            visible={progress.skills > 0.1}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
