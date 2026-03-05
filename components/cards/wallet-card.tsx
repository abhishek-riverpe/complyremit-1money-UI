"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, ChevronRight } from "lucide-react";

const walletDetails = [
  { label: "Wallet Address", value: "0x1a2B...9cD4" },
  { label: "Network", value: "Ethereum" },
  { label: "Balance", value: "1,250.00 USDC" },
  { label: "Last Updated", value: "March 5, 2026" },
];

export function WalletCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-green-50 p-2 rounded-lg">
            <Wallet className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h3 className="font-semibold">Wallet</h3>
            <p className="text-sm text-muted-foreground">
              Your digital wallet details
            </p>
          </div>
        </div>

        <Button
          onClick={() => setExpanded(!expanded)}
          className="w-full bg-green-400 hover:bg-green-500 text-white rounded-lg"
        >
          Get Wallet Details
          <ChevronRight
            className={`w-4 h-4 ml-auto transition-transform ${expanded ? "rotate-90" : ""}`}
          />
        </Button>

        <div
          className="grid transition-[grid-template-rows] duration-300 ease-in-out"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="space-y-3 pt-2">
              {walletDetails.map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
