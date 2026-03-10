import { queryClient } from "@/components/providers/auery-client-provider";

const CLEAR_KEYS = ["complyremit_onboarding", "complyremit_tos_session"];

export async function signOutAndClear(clerk: {
  signOut: (opts: { redirectUrl: string }) => Promise<void>;
}) {
  // Clear localStorage keys
  CLEAR_KEYS.forEach((key) => localStorage.removeItem(key));

  // Clear React Query cache
  queryClient.clear();

  // Sign out via Clerk
  await clerk.signOut({ redirectUrl: "/sign-in" });
}
