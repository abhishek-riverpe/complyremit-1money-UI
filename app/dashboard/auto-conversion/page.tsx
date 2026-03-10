"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAutoConversionRules } from "@/hooks/use-auto-conversion-rules";
import { RulesTable } from "@/components/auto-conversion/rules-table";
import { CreateRuleDialog } from "@/components/auto-conversion/create-rule-dialog";
import { toast } from "sonner";

export default function AutoConversionPage() {
  const { rules, loading, error, refetch, removeRule } =
    useAutoConversionRules();
  const [createOpen, setCreateOpen] = useState(false);

  async function handleDelete(ruleId: string) {
    try {
      await removeRule(ruleId);
      toast.success("Rule deleted");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete rule"
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Auto Conversion Rules
          </h2>
          <p className="text-sm text-muted-foreground">
            Automatically convert incoming deposits to your preferred currency.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Rule
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <RulesTable
        rules={rules}
        loading={loading}
        onDelete={handleDelete}
      />

      <CreateRuleDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={refetch}
      />

    </div>
  );
}
