"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Landmark, ShieldCheck, ChevronRight } from "lucide-react";

export function FiatAccountCard() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary-border transition-all duration-300">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-5">
          <div className="w-14 h-14 rounded-xl bg-primary-muted flex items-center justify-center text-primary-muted-foreground shadow-sm border border-primary-border/50">
            <Landmark size={28} strokeWidth={1.5} />
          </div>
          <div className="px-2.5 py-1 bg-success-muted text-success-muted-foreground text-xs font-semibold rounded-full flex items-center gap-1 border border-success-border">
            <ShieldCheck className="w-3 h-3" />
            Verified
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Fiat Account</h3>
          <p className="text-muted-foreground text-sm leading-relaxed flex-1">
            Manage your linked bank accounts for fiat currency transactions and settlements.
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-border/50 flex items-center text-primary font-semibold text-sm">
          <button
            onClick={(e) => { e.stopPropagation(); setShowDetails(!showDetails); }}
            className="inline-flex items-center gap-1 hover:gap-2 cursor-pointer transition-all duration-200"
          >
            {showDetails ? "Hide Details" : "Get Fiat Account Details"}
            <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showDetails ? "rotate-90" : ""}`} />
          </button>
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
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
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
                <p className="text-sm font-medium text-foreground">{value}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
