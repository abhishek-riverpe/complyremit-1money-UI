"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { FiatAccountCard } from "@/components/cards/fiat-account-card";
import { WalletCard } from "@/components/cards/wallet-card";

export default function DashboardPage() {
  const { user } = useAuth();
  const displayName = user?.email
    ? user.email.split("@")[0].charAt(0).toUpperCase() + user.email.split("@")[0].slice(1)
    : "User";

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">
          Welcome back, {displayName}. Here&apos;s your account overview.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 items-start max-w-5xl mx-auto">
        <FiatAccountCard />
        <WalletCard />
      </div>
    </div>
  );
}
