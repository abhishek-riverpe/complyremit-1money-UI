"use client";

import { useOnboarding } from "@/components/providers/onboarding-provider";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createUser } from "@/services/user.service";
import { createTosLink, signTos } from "@/services/tos.service";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TosPage() {
  const { state, isHydrated, setSignedAgreement } = useOnboarding();
  const router = useRouter();
  const hasRun = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isHydrated || hasRun.current) return;

    if (state.signedAgreementId) {
      router.replace("/onboarding/business-details");
      return;
    }

    hasRun.current = true;

    async function initTos() {
      try {
        // Create user in backend (409 = already exists, that's fine)
        try {
          await createUser();
        } catch (err) {
          const message = err instanceof Error ? err.message : "";
          if (!message.includes("already exists") && !message.includes("409")) {
            throw err;
          }
        }

        // Create TOS link to get session token
        const callbackUrl = window.location.origin + "/onboarding/tos/callback";
        const { session_token } = await createTosLink(callbackUrl);
        console.log("[TOS] Session token:", session_token);

        // Sign TOS directly (skip hosted page)
        const { signed_agreement_id } = await signTos(session_token);
        console.log("[TOS] Signed agreement ID:", signed_agreement_id);

        // Store agreement and navigate to next step
        setSignedAgreement(signed_agreement_id);
        router.replace("/onboarding/business-details");
      } catch (err) {
        console.error("[TOS] Error during TOS initialization:", err);
        const message = err instanceof Error ? err.message : String(err);
        const isApiError = message.includes("fetch") || message.includes("network") || message.includes("500") || message.includes("502");
        setError(
          isApiError
            ? `Backend API error: ${message}`
            : `Failed to initialize TOS: ${message}`
        );
      }
    }

    initTos();
  }, [isHydrated, state.signedAgreementId, router]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-24 gap-4">
        <AlertCircle className="w-8 h-8 text-destructive" />
        <p className="text-destructive">{error}</p>
        <Button
          onClick={() => {
            setError(null);
            hasRun.current = false;
          }}
          className="bg-brand hover:bg-brand/90 text-brand-foreground"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-24 gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="text-muted-foreground">
        Signing Terms of Service, please wait...
      </p>
    </div>
  );
}
