"use client";

import { FiatAccountCard } from "@/components/cards/fiat-account-card";
import { WalletCard } from "@/components/cards/wallet-card";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back. Here&apos;s your account overview.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FiatAccountCard />
        <WalletCard />
      </div>
    </div>
  );
}
