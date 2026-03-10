"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import type { AutoConversionRuleResponse } from "@/types/auto-conversion";
import { useState } from "react";

interface RulesTableProps {
  rules: AutoConversionRuleResponse[];
  onDelete: (ruleId: string) => void;
  loading: boolean;
}

export function RulesTable({
  rules,
  onDelete,
  loading,
}: RulesTableProps) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  if (loading) {
    return (
      <Card className="rounded-[32px]">
        <CardContent className="p-6">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-12 rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-[32px]">
      <CardHeader className="pb-2">
        <h3 className="text-base font-semibold text-foreground">
          Conversion Rules
        </h3>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6">Source</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Created</TableHead>
              <TableHead className="pr-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No conversion rules yet. Create one to get started.
                </TableCell>
              </TableRow>
            ) : (
              rules.map((rule) => (
                <TableRow key={rule.auto_conversion_rule_id} className="group">
                  <TableCell className="pl-6">
                    <div className="text-sm font-medium text-foreground">
                      {rule.source.asset}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {rule.source.network}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-foreground">
                      {rule.destination.asset}
                    </div>
                    {rule.destination?.network && (
                      <div className="text-xs text-muted-foreground">
                        {rule.destination.network}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={rule.status} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {new Date(rule.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {confirmId === rule.auto_conversion_rule_id ? (
                        <Button
                          variant="destructive"
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => {
                            setConfirmId(null);
                            onDelete(rule.auto_conversion_rule_id);
                          }}
                        >
                          Confirm
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => setConfirmId(rule.auto_conversion_rule_id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
