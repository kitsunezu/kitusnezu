"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface AboutProps {
  bio: string;
}

export function About({ bio }: AboutProps) {
  const t = useTranslations("about");

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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-lg leading-relaxed text-muted-foreground"
        >
          {bio}
        </motion.p>
      </div>
    </section>
  );
}
