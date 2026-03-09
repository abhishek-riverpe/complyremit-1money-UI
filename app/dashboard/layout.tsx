"use client";

import { OnboardingProvider } from "@/components/providers/onboarding-provider";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { LayoutGrid, Search, Sun, Moon, Monitor } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const DashboardSearchContext = createContext("");

export function useDashboardSearch() {
  return useContext(DashboardSearchContext);
}

const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Here's your account overview." },
  "/dashboard/profile": { title: "Profile", subtitle: "Manage your account details." },
  "/dashboard/auto-conversion": { title: "Auto Conversion", subtitle: "Manage your auto conversion rules." },
  "/dashboard/settings": { title: "Settings", subtitle: "Configure your preferences." },
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { title, subtitle } = useMemo(() => {
    const meta = PAGE_META[pathname] ?? { title: "Dashboard", subtitle: "" };
    const email = user?.emailAddresses[0]?.emailAddress;
    const name = email
      ? email.split("@")[0].charAt(0) + email.split("@")[0].slice(1)
      : "User";
    if (pathname === "/dashboard") {
      return { title: meta.title, subtitle: `Welcome back, ${name}. ${meta.subtitle}` };
    }
    return meta;
  }, [pathname, user]);

  return (
    <OnboardingProvider>
      <DashboardSearchContext.Provider value={searchQuery}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
              <div className="flex items-center gap-2 min-w-0">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                <h1 className="text-lg font-semibold text-foreground tracking-tight">{title}</h1>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 w-32 sm:w-48 rounded-full bg-muted/50 border border-border pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div className="flex items-center gap-0.5 rounded-full border border-border p-0.5">
                  <button
                    onClick={() => setTheme("light")}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${mounted && theme === "light" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Sun className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${mounted && theme === "dark" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Moon className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${mounted && theme === "system" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Monitor className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6">
              {subtitle && (
                <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>
              )}
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </DashboardSearchContext.Provider>
    </OnboardingProvider>
  );
}
