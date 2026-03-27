"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useTheme } from "next-themes";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { InteractiveStars } from "./InteractiveStars";
import { SunBackground } from "./SunBackground";
import { LowPolyBg } from "./LowPolyBg";
import { SkillOrbs } from "./SkillOrbs";

export function GlobalCanvas() {
  const progress = useScrollProgress();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light"; // default to dark before theme resolves

  const heroOpacity = Math.max(0, 1 - progress.about * 1.5);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        gl={{ antialias: !isMobile, alpha: true, toneMapping: 0 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.0} />

          {/* Hero background — theme-aware */}
          {isDark ? (
            <InteractiveStars
              count={isMobile ? 1000 : 3000}
              isMobile={isMobile}
              opacity={heroOpacity}
            />
          ) : (
            <SunBackground opacity={heroOpacity} />
          )}

          {/* About: floating crystal wireframe geometry */}
          <LowPolyBg
            opacity={Math.min(1, progress.about) * (1 - Math.max(0, progress.skills - 0.3))}
            visible={progress.about > 0.1 && progress.skills < 0.9}
          />

          {/* Skills: glowing floating orbs with sparkles */}
          <SkillOrbs
            opacity={Math.min(1, Math.max(0, progress.skills - 0.1) * 2)}
            visible={progress.skills > 0.1}
            isMobile={isMobile}
          />

          {/* Post-processing: Bloom glow */}
          {!isMobile && (
            <EffectComposer>
              <Bloom
                luminanceThreshold={0.4}
                luminanceSmoothing={0.9}
                intensity={0.8}
                mipmapBlur
              />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
