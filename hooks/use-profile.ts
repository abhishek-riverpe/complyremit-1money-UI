import { useState, useEffect } from "react";
import { getUserProfile } from "@/services/user.service";
import type { UserProfile } from "@/types/profile";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserProfile()
      .then((data) => setProfile(data))
      .catch((err) => setError(err.message ?? "Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  return { profile, loading, error };
}
