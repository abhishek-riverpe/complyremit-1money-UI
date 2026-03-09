import { useState, useEffect, useCallback } from "react";
import {
  listAutoConversionRules,
  deleteAutoConversionRule,
} from "@/services/auto-conversion.service";
import type { AutoConversionRuleResponse } from "@/types/auto-conversion";

export function useAutoConversionRules() {
  const [rules, setRules] = useState<AutoConversionRuleResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRules = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listAutoConversionRules();
      setRules(data.items ?? []);
      setTotal(data.total ?? 0);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load rules"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  const removeRule = useCallback(
    async (ruleId: string) => {
      await deleteAutoConversionRule(ruleId);
      await fetchRules();
    },
    [fetchRules]
  );

  return { rules, total, loading, error, refetch: fetchRules, removeRule };
}
