"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { InfoItem } from "@/components/dashboard/info-item";
import {
  getBankDepositInstructions,
  getWalletDepositInstructions,
} from "@/services/deposit-instructions.service";
import type { BankInstruction, WalletInstruction } from "@/types/deposit-instructions";

interface DepositDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "bank" | "wallet";
}

export function DepositDetailsDialog({ open, onOpenChange, type }: DepositDetailsDialogProps) {
  const [bankData, setBankData] = useState<BankInstruction | null>(null);
  const [walletData, setWalletData] = useState<WalletInstruction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (type === "bank") {
        const res = await getBankDepositInstructions();
        setBankData(res.bank_instruction);
      } else {
        const res = await getWalletDepositInstructions();
        setWalletData(res.wallet_instruction);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load deposit instructions");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    if (open) {
      setBankData(null);
      setWalletData(null);
      fetchData();
    }
  }, [open, fetchData]);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const title = type === "bank" ? "Bank Account Details" : "Wallet Details";
  const description =
    type === "bank"
      ? "Use these details to deposit funds via bank transfer"
      : "Use this wallet address to deposit USDC";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchData}>
              Retry
            </Button>
          </div>
        )}

        {!loading && !error && type === "bank" && bankData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem label="Bank Name" value={bankData.bank_name} />
            <InfoItem label="Account Number" value={bankData.account_number} />
            <InfoItem label="Routing Number" value={bankData.routing_number} />
            <InfoItem label="Account Holder" value={bankData.account_holder} />
            {bankData.bic_code && <InfoItem label="BIC Code" value={bankData.bic_code} />}
            {bankData.transaction_fee && (
              <InfoItem
                label="Transaction Fee"
                value={`${bankData.transaction_fee.value} ${bankData.transaction_fee.asset}`}
              />
            )}
          </div>
        )}

        {!loading && !error && type === "wallet" && walletData && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2.5">
              <code className="flex-1 truncate text-sm text-muted-foreground">
                {walletData.wallet_address}
              </code>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-lg"
                onClick={() => handleCopy(walletData.wallet_address)}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoItem label="Network" value="SOLANA" />
              <InfoItem label="Asset" value="USDC" />
              <InfoItem label="Min. Deposit" value={walletData.minimum_deposit} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
