"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const GlobalCanvas = dynamic(
  () => import("./GlobalCanvas").then((mod) => ({ default: mod.GlobalCanvas })),
  { ssr: false }
);

export function ThreeBackground() {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const idleWindow = window as unknown as {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(
        () => setReady(true),
        { timeout: 1500 },
      );

      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(() => setReady(true), 500);
    return () => window.clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

  // Let navigation hydrate and prefetch before loading the large WebGL bundle.
  if (prefersReducedMotion || !ready) return null;

  return <GlobalCanvas />;
}
