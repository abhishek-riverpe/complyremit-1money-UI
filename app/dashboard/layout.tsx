"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { OnboardingProvider } from "@/components/providers/onboarding-provider";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <ProtectedRoute>
      <OnboardingProvider>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 flex flex-col h-screen overflow-hidden">
            <header className="h-20 flex items-center justify-end px-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-b border-transparent">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </header>
            <div className="flex-1 overflow-y-auto p-10 pt-6">
              {children}
            </div>
          </main>
        </div>
      </OnboardingProvider>
    </ProtectedRoute>
  );
}
