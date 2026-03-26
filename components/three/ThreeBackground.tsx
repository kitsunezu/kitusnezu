"use client";

import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const GlobalCanvas = dynamic(
  () => import("./GlobalCanvas").then((mod) => ({ default: mod.GlobalCanvas })),
  { ssr: false }
);

export function ThreeBackground() {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  // Respect user's motion preferences
  if (prefersReducedMotion) return null;

  return <GlobalCanvas />;
}
