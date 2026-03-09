"use client";

import { OnboardingProvider } from "@/components/providers/onboarding-provider";
import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import type { ReactNode } from "react";

function Header() {
  const { user } = useUser();
  const clerk = useClerk();

  return (
    <header className="border-b bg-card border-border">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 h-14">
        <span className="font-bold text-lg tracking-tight text-foreground">ComplyRemit</span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:block">
            {user?.emailAddresses[0]?.emailAddress}
          </span>
          <Button variant="ghost" size="sm" onClick={() => clerk.signOut({ redirectUrl: '/sign-in' })}>
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
    <OnboardingProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
      </div>
    </OnboardingProvider>
  );
}
