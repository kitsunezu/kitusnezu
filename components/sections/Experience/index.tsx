"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import type { Experience as ExperienceType } from "@/types/profile";
import { Briefcase } from "lucide-react";

interface ExperienceProps {
  items: { company: string; title: string; location: string; startDate: string; endDate: string | null; description: string; highlights: string[] }[];
}

export function Experience({ items }: ExperienceProps) {
  const t = useTranslations("experience");

  return (
    <section className="min-h-screen py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
        >
          {t("heading")}
        </motion.h2>
        <div className="mt-12 space-y-12">
          {items.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-8 border-l-2 border-border hover:border-primary/60 transition-colors"
            >
              <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-4 ring-background">
                <Briefcase className="h-3 w-3 text-primary-foreground" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="text-xl font-semibold">{exp.company}</h3>
                <span className="text-sm text-muted-foreground">
                  {exp.startDate} — {exp.endDate ?? t("present")}
                </span>
              </div>
              <p className="mt-1 text-base font-medium text-primary/80">
                {exp.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {exp.location}
              </p>
              <p className="mt-3 text-muted-foreground">{exp.description}</p>
              {exp.highlights.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {exp.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="text-sm text-muted-foreground before:content-['▹'] before:mr-2 before:text-primary"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
