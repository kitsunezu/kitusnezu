"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  name: string;
  title: string;
}

export function Hero({ name, title }: HeroProps) {
  const t = useTranslations("hero");
  const [displayedName, setDisplayedName] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    setDisplayedName("");
    setTypingDone(false);
    let index = 0;
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        index++;
        setDisplayedName(name.slice(0, index));
        if (index >= name.length) {
          clearInterval(interval);
          setTypingDone(true);
        }
      }, 80);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(startTimer);
  }, [name]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-4 sm:px-6"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg text-muted-foreground"
        >
          {t("greeting")}
        </motion.p>
        <h1 className="mt-2 text-5xl font-bold tracking-tight sm:text-7xl">
          {displayedName}
          <motion.span
            animate={typingDone ? { opacity: 0 } : { opacity: [1, 0, 1] }}
            transition={
              typingDone
                ? { duration: 0.3, delay: 1.5 }
                : { repeat: Infinity, duration: 0.8, ease: "linear" }
            }
            className="ml-1 inline-block"
          >
            |
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-2xl font-medium text-primary/80 sm:text-3xl"
        >
          {title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          {t("subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" nativeButton={false} render={<Link href="/projects" />}>
            <ArrowRight className="mr-2 h-4 w-4" />
            {t("cta_primary")}
          </Button>
          <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/contact" />}>
            <Mail className="mr-2 h-4 w-4" />
            {t("cta_secondary")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
