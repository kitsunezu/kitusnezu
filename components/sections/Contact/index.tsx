"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ContactProps {
  email: string;
  sns: { platform: string; url: string; label: string }[];
}

export function Contact({ email, sns }: ContactProps) {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 bg-muted/30">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {t("heading")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-lg text-muted-foreground"
        >
          {t("description")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            render={<a href={`mailto:${email}`} />}
          >
            <Mail className="mr-2 h-4 w-4" />
            {email}
          </Button>
          <Button size="lg" variant="outline" onClick={copyEmail}>
            {copied ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {t("copy_email")}
          </Button>
        </motion.div>
        {sns.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex items-center justify-center gap-4"
          >
            {sns.map((s) => (
              <Button
                key={s.platform}
                variant="ghost"
                size="sm"
                render={<a href={s.url} target="_blank" rel="noopener noreferrer" />}
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                {s.label}
              </Button>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
