"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { OnboardingProvider } from "@/components/providers/onboarding-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import type { ReactNode } from "react";

function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 h-14">
        <span className="font-bold text-lg tracking-tight text-slate-800 dark:text-slate-100">ComplyRemit</span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">
            {user?.email}
          </span>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-1.5" />
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <OnboardingProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
          <Header />
          <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
        </div>
      </OnboardingProvider>
    </ProtectedRoute>
  );
}
