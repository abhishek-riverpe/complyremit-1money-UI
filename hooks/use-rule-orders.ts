import { useState, useEffect } from "react";
import { listRuleOrders } from "@/services/auto-conversion.service";
import type { AutoConversionOrderResponse } from "@/types/auto-conversion";

export function useRuleOrders(ruleId: string | null) {
  const [orders, setOrders] = useState<AutoConversionOrderResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ruleId) {
      setOrders([]);
      return;
    }
    setLoading(true);
    setError(null);
    listRuleOrders(ruleId)
      .then((data) => setOrders(data.orders ?? []))
      .catch((err) =>
        setError(
          err instanceof Error ? err.message : "Failed to load orders"
        )
      )
      .finally(() => setLoading(false));
  }, [ruleId]);

  return { orders, loading, error };
}
