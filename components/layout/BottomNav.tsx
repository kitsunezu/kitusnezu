"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  Zap,
  FolderOpen,
  Mail,
} from "lucide-react";

const navItems = [
  { href: "/about", key: "about", Icon: User },
  { href: "/experience", key: "experience", Icon: Briefcase },
  { href: "/skills", key: "skills", Icon: Zap },
  { href: "/projects", key: "projects", Icon: FolderOpen },
  { href: "/contact", key: "contact", Icon: Mail },
] as const;

export function BottomNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-background/90 backdrop-blur-md">
      <div className="flex h-16 items-stretch">
        {navItems.map(({ href, key, Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={key}
              href={href}
              className="relative flex flex-1 flex-col items-center justify-center gap-0.5 transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-indicator"
                  className="absolute inset-x-1 top-0 h-0.5 rounded-b-full bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <Icon
                className={`h-5 w-5 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
                strokeWidth={isActive ? 2.5 : 1.75}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {t(key)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
