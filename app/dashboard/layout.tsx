"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { OnboardingProvider } from "@/components/providers/onboarding-provider";
import { Sidebar } from "@/components/sidebar/sidebar";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <OnboardingProvider>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 bg-muted/30 overflow-auto min-h-screen p-8">
            {children}
          </main>
        </div>
      </OnboardingProvider>
    </ProtectedRoute>
  );
}
