"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useOnboarding } from "@/components/providers/onboarding-provider";
import { useEffect, useRef, useState, Suspense } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function CallbackContent() {
  const searchParams = useSearchParams();
  const signedAgreementId = searchParams.get("signed_agreement_id");
  const errorParam = searchParams.get("error");
  const router = useRouter();
  const { setSignedAgreement } = useOnboarding();
  const hasRun = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Log all callback params for debugging
    const allParams = Object.fromEntries(searchParams.entries());
    console.log("[TOS Callback] Search params:", allParams);

    if (signedAgreementId) {
      console.log("[TOS Callback] Agreement signed:", signedAgreementId);
      setSignedAgreement(signedAgreementId);
      localStorage.removeItem("complyremit_tos_session");
      router.replace("/onboarding/business-details");
    } else if (errorParam) {
      console.error("[TOS Callback] Error from 1Money:", errorParam);
      setError(`Agreement signing failed: ${errorParam}`);
    } else {
      console.warn("[TOS Callback] No signed_agreement_id or error param. Params:", allParams);
      setError("No agreement ID received. The signing may have been cancelled or failed.");
    }
  }, [signedAgreementId, errorParam, setSignedAgreement, router, searchParams]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <AlertCircle className="w-8 h-8 text-destructive" />
        <p className="text-destructive">{error}</p>
        <Button
          onClick={() => router.replace("/onboarding/tos")}
          className="bg-brand hover:bg-brand/90 text-brand-foreground"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="text-muted-foreground">
        Processing agreement, please wait...
      </p>
    </div>
  );
}

export default function TosCallbackPage() {
  return (
    <Suspense>
      <CallbackContent />
    </Suspense>
  );
}
