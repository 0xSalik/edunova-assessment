"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ModeToggle } from "@/components/ui/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Code } from "lucide-react";
import { LayoutGridIcon, UsersIcon } from "../ui/icons";
import UserInfo from "../helpers/UserInfo";
import Notifications from "@/components/helpers/Notifications";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { icon: LayoutGridIcon, label: "Overview", href: "/" },
    { icon: UsersIcon, label: "People Directory", href: "/people" },
  ];

  return (
    <header className="sticky z-10 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg w-full font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a href="/" className="font-semibold text-2xl">
          EduNova{" "}
        </a>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <p className="font-semibold">EduNova</p>
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
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full mr-auto gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="flex items-center gap-2 ml-auto">
          <Notifications />
          <UserInfo />
          <ModeToggle />
          <Button variant={"outline"} size={"icon"}>
            <Link
              href="https://github.com/0xSalik/edunova-assessment"
              target="_blank"
            >
              <Code className="w-4 h-4 p-0" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
