"use client";

import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useActivityLog } from "@/hooks/use-activity-log";
import type { ActivityCategory, ActivityLogItem } from "@/types/activity";

const ACTION_LABELS: Record<string, string> = {
  USER_LOGIN: "User login",
  USER_LOGOUT: "User logout",
  CONVERSION_RULE_CREATED: "Created conversion rule",
  CONVERSION_RULE_UPDATED: "Updated conversion rule",
  CONVERSION_RULE_DELETED: "Deleted conversion rule",
  KYB_SUBMITTED: "KYB submitted",
  KYB_APPROVED: "KYB approved",
  KYB_REJECTED: "KYB rejected",
  DEPOSIT_RECEIVED: "Deposit received",
  DEPOSIT_CONFIRMED: "Deposit confirmed",
  TRANSACTION_CREATED: "Transaction created",
  TRANSACTION_COMPLETED: "Transaction completed",
  TRANSACTION_FAILED: "Transaction failed",
  PROFILE_UPDATED: "Profile updated",
  DOCUMENT_UPLOADED: "Document uploaded",
};

const CATEGORY_COLORS: Record<ActivityCategory, string> = {
  auth: "border-info-border bg-info-muted text-info-muted-foreground",
  kyb: "border-primary-border bg-primary-muted text-primary-muted-foreground",
  storage: "border-border bg-muted text-muted-foreground",
  conversion: "border-warning-border bg-warning-muted text-warning-muted-foreground",
  deposit: "border-brand-border bg-brand-muted text-brand-muted-foreground",
  transaction: "border-brand-border bg-brand-muted text-brand-muted-foreground",
  profile: "border-info-border bg-info-muted text-info-muted-foreground",
};

function formatActionLabel(action: string): string {
  const label =
    ACTION_LABELS[action] ??
    action
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase());

  return label
    .replace(/\bkyb\b/gi, "KYB")
    .replace(/\bkyc\b/gi, "KYC")
    .replace(/\baml\b/gi, "AML")
    .replace(/\btos\b/gi, "ToS");
}

const CATEGORY_LABELS: Record<string, string> = {
  auth: "Auth",
  kyb: "KYB",
  storage: "Storage",
  conversion: "Conversion",
  deposit: "Deposit",
  transaction: "Transaction",
  profile: "Profile",
};

function formatDetail(detail: string): string {
  return detail
    .replace(/\bkyb\b/gi, "KYB")
    .replace(/\bkyc\b/gi, "KYC")
    .replace(/\baml\b/gi, "AML")
    .replace(/\btos\b/gi, "ToS")
    .replace(/\baccount_number\b/gi, "Account Number")
    .replace(/\brouting_number\b/gi, "Routing Number")
    .replace(/_/g, " ");
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function CategoryBadge({ category }: { category: ActivityCategory }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
        CATEGORY_COLORS[category] ?? "border-border bg-muted text-muted-foreground"
      )}
    >
      {CATEGORY_LABELS[category] ?? category}
    </span>
  );
}

function SkeletonRows() {
  return Array.from({ length: 5 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell className="hidden sm:table-cell">
        <div className="h-4 w-20 animate-pulse rounded bg-muted" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
      </TableCell>
      <TableCell>
        <div className="h-5 w-20 animate-pulse rounded-full bg-muted" />
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
      </TableCell>
    </TableRow>
  ));
}

export function ActivityTable({ searchQuery = "" }: { searchQuery?: string }) {
  const { activities, loading, error } = useActivityLog();

  const filtered = searchQuery
    ? activities.filter((item: ActivityLogItem) => {
        const q = searchQuery.toLowerCase();
        return (
          formatActionLabel(item.action).toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.detail.toLowerCase().includes(q) ||
          formatDate(item.createdAt).toLowerCase().includes(q)
        );
      })
    : activities;

  return (
    <Card className="rounded-[32px]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">
            Recent Activity
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80"
          >
            View All <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        {error ? (
          <div className="flex h-24 items-center justify-center text-sm text-destructive">
            {error}
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="hidden sm:table-cell">
                  Date
                </TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden sm:table-cell">Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <SkeletonRows />
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No activity found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((item: ActivityLogItem) => (
                  <TableRow key={item.id} className="group">
                    <TableCell className="text-sm text-muted-foreground hidden sm:table-cell">
                      {formatDate(item.createdAt)}
                    </TableCell>
                    <TableCell className="text-sm font-medium text-foreground">
                      {formatActionLabel(item.action)}
                    </TableCell>
                    <TableCell>
                      <CategoryBadge category={item.category} />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground truncate">
                      {formatDetail(item.detail)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
