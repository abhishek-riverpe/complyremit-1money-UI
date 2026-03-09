import { useState, useEffect, useCallback } from "react";
import { getActivityLog } from "@/services/activity.service";
import type { ActivityLogItem, ActivityCategory } from "@/types/activity";

export function useActivityLog(category?: ActivityCategory) {
  const [activities, setActivities] = useState<ActivityLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getActivityLog({ category });
      setActivities(data.items ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load activity log"
      );
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return { activities, loading, error, refetch: fetchActivities };
}
