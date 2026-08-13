"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link, { useLinkStatus } from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navItems = [
  { href: "/about", key: "about" },
  { href: "/experience", key: "experience" },
  { href: "/skills", key: "skills" },
  { href: "/projects", key: "projects" },
  { href: "/contact", key: "contact" },
] as const;

function NavItem({ label, active }: { label: string; active: boolean }) {
  const { pending } = useLinkStatus();

  return (
    <>
      {(active || pending) && (
        <span
          aria-hidden="true"
          className={`absolute inset-0 -z-10 rounded-md ${
            active ? "bg-accent" : "bg-accent/60"
          }`}
        />
      )}
      <span className={pending ? "opacity-70" : undefined}>{label}</span>
    </>
  );
}

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-lg font-bold tracking-tight hover:text-primary/80 transition-colors"
        >
          <span className="text-xl">🦊</span>
          Kitsunezu
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ href, key }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={key}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                  ${isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <NavItem label={t(key)} active={isActive} />
              </Link>
            );
          })}
          <div className="ml-2 flex items-center gap-1">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile: only theme + language toggles (nav handled by BottomNav) */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}

