import { useState, useEffect, useCallback } from "react";
import { getUserProfile } from "@/services/user.service";
import type { UserProfile } from "@/types/profile";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    getUserProfile()
      .then((data) => setProfile(data))
      .catch((err) => setError(err.message ?? "Failed to load profile"))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const refreshProfile = useCallback(() => setRefreshKey((k) => k + 1), []);

  return { profile, loading, error, refreshProfile };
}
