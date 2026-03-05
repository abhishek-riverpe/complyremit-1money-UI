"use client";

import { usePathname } from "next/navigation";
import { Home, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { SidebarItem } from "./sidebar-item";

const navItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <aside className="w-60 shrink-0 border-r bg-background flex flex-col h-screen sticky top-0">
      <div className="flex items-center gap-2.5 px-5 h-16">
        <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center">
          <span className="text-white font-bold text-sm">C</span>
        </div>
        <span className="font-bold text-lg tracking-tight">ComplyRemit</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <SidebarItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href}
          />
        ))}
      </nav>

      <div className="px-3 pb-2">
        <button
          onClick={signOut}
          className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
      <div className="px-5 py-4 text-xs text-muted-foreground">
        &copy; 2026 ComplyRemit
      </div>
    </aside>
  );
}
