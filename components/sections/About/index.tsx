"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

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

        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-12"
        >
          <div className="overflow-hidden rounded-xl border border-border/50 shadow-lg">
            <Image
              src="/homelab.png"
              alt="Homelab infrastructure diagram"
              width={1080}
              height={607}
              className="w-full h-auto"
              priority={false}
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-muted-foreground/70">
            {t("homelab_caption")}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
