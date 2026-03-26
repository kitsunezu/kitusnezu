"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, GitBranch } from "lucide-react";

interface ProjectItem {
  name: string;
  description: string;
  url?: string;
  sourceUrl?: string;
  tags: string[];
}

interface ProjectsProps {
  items: ProjectItem[];
}

export function Projects({ items }: ProjectsProps) {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 bg-muted/30">
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
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.url && (
                      <Button
                        size="sm"
                        variant="outline"
                        render={<a href={project.url} target="_blank" rel="noopener noreferrer" />}
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        {t("view_live")}
                      </Button>
                    )}
                    {project.sourceUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        render={<a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" />}
                      >
                        <GitBranch className="mr-1 h-3 w-3" />
                        {t("view_source")}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
