"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Landmark, ShieldCheck, ChevronRight } from "lucide-react";

export function FiatAccountCard() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-500/50 transition-all duration-300">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-5">
          <div className="w-14 h-14 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-100/50 dark:border-emerald-800/50">
            <Landmark size={28} strokeWidth={1.5} />
          </div>
          <div className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-full flex items-center gap-1 border border-emerald-100 dark:border-emerald-800/50">
            <ShieldCheck className="w-3 h-3" />
            Verified
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Fiat Account</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex-1">
            Manage your linked bank accounts for fiat currency transactions and settlements.
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-50 dark:border-slate-700/50 flex items-center text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
          <button
            onClick={(e) => { e.stopPropagation(); setShowDetails(!showDetails); }}
            className="inline-flex items-center gap-1 hover:gap-2 cursor-pointer transition-all duration-200"
          >
            {showDetails ? "Hide Details" : "Get Fiat Account Details"}
            <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showDetails ? "rotate-90" : ""}`} />
          </button>
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50 space-y-3">
            {[
              ["Asset", "USD"],
              ["Network", "US_ACH"],
              ["Bank Name", "Sample Bank Name"],
              ["Routing Number", "121140399"],
              ["Account Holder", "Atomic Brokerage LLC"],
              ["Account Number", "99988881111111111"],
              ["Transaction Fee", "$0.55 USD"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{value}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
