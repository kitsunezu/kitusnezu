"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
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

function BottomNavItem({
  label,
  active,
  Icon,
}: {
  label: string;
  active: boolean;
  Icon: typeof User;
}) {
  const { pending } = useLinkStatus();
  const highlighted = active || pending;

  return (
    <>
      {highlighted && (
        <span
          aria-hidden="true"
          className={`absolute inset-x-1 top-0 h-0.5 rounded-b-full ${
            active ? "bg-primary" : "bg-primary/50"
          }`}
        />
      )}
      <Icon
        className={`h-5 w-5 transition-colors ${
          highlighted ? "text-primary" : "text-muted-foreground"
        }`}
        strokeWidth={highlighted ? 2.5 : 1.75}
      />
      <span
        className={`text-[10px] font-medium transition-colors ${
          highlighted ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </>
  );
}

export function BottomNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-background/95">
      <div className="flex h-16 items-stretch">
        {navItems.map(({ href, key, Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={key}
              href={href}
              prefetch={true}
              aria-current={isActive ? "page" : undefined}
              className="relative flex flex-1 flex-col items-center justify-center gap-0.5 transition-colors"
            >
              <BottomNavItem label={t(key)} active={isActive} Icon={Icon} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
