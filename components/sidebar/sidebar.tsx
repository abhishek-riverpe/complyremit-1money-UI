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
  const { signOut, user } = useAuth();
  const displayName = user?.email
    ? user.email.split("@")[0].charAt(0).toUpperCase() + user.email.split("@")[0].slice(1)
    : "User";

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col h-screen sticky top-0">
      <div className="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-lg">C</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100">ComplyRemit</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
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
          className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-800 dark:bg-slate-700 flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-sm">
            {displayName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium leading-none text-slate-800 dark:text-slate-200 truncate">{displayName}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">Business Account</p>
        </div>
      </div>
      <div className="px-5 py-4 text-[10px] text-slate-400 dark:text-slate-500 text-center">
        &copy; 2026 ComplyRemit Inc.
      </div>
    </aside>
  );
}
