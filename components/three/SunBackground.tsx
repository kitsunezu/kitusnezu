"use client";

import { RainyDayBackground } from "./RainyDayBackground";

export function SunBackground({ opacity }: { opacity: number }) {
  return <RainyDayBackground opacity={opacity} />;
}
