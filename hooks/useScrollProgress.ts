"use client";

import { useState, useEffect, useCallback } from "react";

interface SectionProgress {
  hero: number;
  about: number;
  skills: number;
}

export function useScrollProgress(): SectionProgress {
  const [progress, setProgress] = useState<SectionProgress>({
    hero: 1,
    about: 0,
    skills: 0,
  });

  const calculate = useCallback(() => {
    const sections = {
      hero: document.getElementById("hero"),
      about: document.getElementById("about"),
      skills: document.getElementById("skills"),
    };

    const viewportH = window.innerHeight;
    const next: SectionProgress = { hero: 0, about: 0, skills: 0 };

    for (const [key, el] of Object.entries(sections)) {
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      // 0 = fully below viewport, 1 = fully visible/above
      const ratio = 1 - Math.max(0, Math.min(1, rect.top / viewportH));
      next[key as keyof SectionProgress] = ratio;
    }

    setProgress(next);
  }, []);

  useEffect(() => {
    calculate();
    window.addEventListener("scroll", calculate, { passive: true });
    window.addEventListener("resize", calculate, { passive: true });
    return () => {
      window.removeEventListener("scroll", calculate);
      window.removeEventListener("resize", calculate);
    };
  }, [calculate]);

  return progress;
}
