"use client";

import { useAuth } from "@clerk/nextjs";
import type { ReactNode } from "react";
import { setTokenGetter } from "@/lib/api-client";

export function AuthInitializer({ children }: { children: ReactNode }) {
  const { getToken, isLoaded } = useAuth();

  // Set synchronously during render so it's available before any child useEffect runs
  setTokenGetter(() => getToken());

  // Don't render children until Clerk's session is loaded
  // This prevents data-fetching hooks from firing before getToken() can return a valid token
  if (!isLoaded) {
    return null;
  }

  return <>{children}</>;
}
