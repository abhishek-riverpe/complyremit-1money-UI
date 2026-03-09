"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, type ReactNode } from "react";
import { setTokenGetter } from "@/lib/api-client";

export function AuthInitializer({ children }: { children: ReactNode }) {
  const { getToken } = useAuth();

  useEffect(() => {
    setTokenGetter(() => getToken());
  }, [getToken]);

  return <>{children}</>;
}
