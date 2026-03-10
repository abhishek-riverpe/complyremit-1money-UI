"use client";

import { useState } from "react";
import { Wallet, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InfoItem } from "@/components/dashboard/info-item";

const MOCK_WALLET = {
  address: "0x7a3b9c2d4e5f6a1b8c3d7e9f0a2b4c6d8e1f3a5b",
  network: "SOLANA",
  asset: "USDC",
  balance: "8,250",
};

export function WalletInfoCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(MOCK_WALLET.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateAddress = (addr: string) => {
    if (addr.length <= 12) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Card className="rounded-[32px]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-muted">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">USDC Wallet</h3>
              <p className="text-xs text-muted-foreground">Solana Network</p>
            </div>
          </div>
          <div className="rounded-full border border-success-border bg-success-muted px-2.5 py-1">
            <span className="text-xs font-bold text-success-muted-foreground">Active</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2.5">
          <code className="flex-1 truncate text-sm text-muted-foreground">
            {truncateAddress(MOCK_WALLET.address)}
          </code>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-lg"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-primary" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoItem label="Network" value={MOCK_WALLET.network} />
          <InfoItem label="Asset" value={MOCK_WALLET.asset} />
          <InfoItem label="Balance" value={`${MOCK_WALLET.balance} ${MOCK_WALLET.asset}`} />
        </div>
      </CardContent>
    </Card>
  );
}
