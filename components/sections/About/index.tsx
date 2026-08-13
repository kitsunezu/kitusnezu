"use client";

import { useTranslations } from "next-intl";
import { HomelabDiagram } from "@/components/sections/About/HomelabDiagram";

interface AboutProps {
  bio: string;
}

export function About({ bio }: AboutProps) {
  const t = useTranslations("about");

  return (
    <section className="min-h-screen py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {t("heading")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {bio}
          </p>
        </div>

        <div className="mt-14">
          <HomelabDiagram />
        </div>
      </div>
    </section>
  );
}
