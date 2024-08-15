"use client";

import { cn } from "@/lib/utils";
import { LayoutGridIcon, UsersIcon } from "../ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: LayoutGridIcon, label: "Overview", href: "/" },
    { icon: UsersIcon, label: "People Directory", href: "/people" },
  ];

  return (
    <aside className="w-64 bg-background border-r hidden md:block">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 p-2 rounded-md transition-colors",
              pathname === item.href
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
