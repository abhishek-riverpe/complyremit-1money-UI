"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, TrendingUp, ChevronRight } from "lucide-react";

export function WalletCard() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary-border transition-all duration-300">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-5">
          <div className="w-14 h-14 rounded-xl bg-primary-muted flex items-center justify-center text-primary-muted-foreground shadow-sm border border-primary-border/50">
            <Wallet size={28} strokeWidth={1.5} />
          </div>
          <div className="px-2.5 py-1 bg-info-muted text-info-muted-foreground text-xs font-semibold rounded-full flex items-center gap-1 border border-info-border">
            <TrendingUp className="w-3 h-3" />
            Active
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Digital Wallet</h3>
          <p className="text-muted-foreground text-sm leading-relaxed flex-1">
            Access your digital wallet for cryptocurrency transactions and token management.
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-border/50 flex items-center text-primary font-semibold text-sm">
          <button
            onClick={(e) => { e.stopPropagation(); setShowDetails(!showDetails); }}
            className="inline-flex items-center gap-1 hover:gap-2 cursor-pointer transition-all duration-200"
          >
            {showDetails ? "Hide Details" : "Get Wallet Details"}
            <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showDetails ? "rotate-90" : ""}`} />
          </button>
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
            {[
              ["Asset", "USDC"],
              ["Network", "SOLANA"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
                <p className="text-sm font-medium text-foreground">{value}</p>
              </div>
            ))}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Wallet Address</p>
              <p className="text-sm font-medium text-foreground break-all">
                BcSga2wNHWVS1PVNjvdBVPEccQeMgGKRXdmkK9dfYwYh
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Minimum Deposit</p>
              <p className="text-sm font-medium text-foreground">0.1</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Contract Address</p>
              <a
                href="https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline break-all"
              >
                View on Etherscan
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
