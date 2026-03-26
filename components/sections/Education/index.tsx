"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

interface EducationItem {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description?: string;
}

interface EducationProps {
  items: EducationItem[];
}

export function Education({ items }: EducationProps) {
  const t = useTranslations("education");

  return (
    <section id="education" className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {t("heading")}
        </motion.h2>
        <div className="mt-12 space-y-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative pl-8 border-l-2 border-border"
            >
              <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <GraduationCap className="h-3 w-3 text-primary-foreground" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="text-xl font-semibold">{item.school}</h3>
                <span className="text-sm text-muted-foreground">
                  {item.startDate} — {item.endDate}
                </span>
              </div>
              <p className="mt-1 text-base font-medium text-primary/80">
                {item.degree}
              </p>
              {item.description && (
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
