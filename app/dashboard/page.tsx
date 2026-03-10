"use client";

import { useState } from "react";
import { DollarSign, Building2, Wallet, CheckCircle2, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActivityTable } from "@/components/dashboard/activity-table";
import { DepositDetailsDialog } from "@/components/dashboard/deposit-details-dialog";
import { useDashboardSearch } from "@/app/dashboard/layout";

export default function DashboardPage() {
  const searchQuery = useDashboardSearch();
  const [showBankDialog, setShowBankDialog] = useState(false);
  const [showWalletDialog, setShowWalletDialog] = useState(false);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Account Balance */}
        <Card>
          <CardContent className="flex flex-col gap-4 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary-muted-foreground">
                <DollarSign className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Account Balance</p>
                <p className="text-xl font-semibold leading-tight">$12,450.00</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-fit text-xs">
              View Account <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        {/* Account Details */}
        <Card>
          <CardContent className="flex flex-col gap-4 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary-muted-foreground">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Account Details</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold leading-tight">ComplyRemit Inc.</p>
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-fit text-xs"
              onClick={() => setShowBankDialog(true)}
            >
              Get Account Details <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        {/* Wallet Details */}
        <Card>
          <CardContent className="flex flex-col gap-4 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Wallet className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Wallet Details</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold leading-tight">ComplyRemit Inc.</p>
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-fit text-xs"
              onClick={() => setShowWalletDialog(true)}
            >
              Get Wallet Details <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Activity Table */}
      <ActivityTable searchQuery={searchQuery} />

      {/* Deposit Details Dialogs */}
      <DepositDetailsDialog open={showBankDialog} onOpenChange={setShowBankDialog} type="bank" />
      <DepositDetailsDialog open={showWalletDialog} onOpenChange={setShowWalletDialog} type="wallet" />
    </div>
  );
}
