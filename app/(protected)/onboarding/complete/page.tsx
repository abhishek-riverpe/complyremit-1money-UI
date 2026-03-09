"use client";

import { useRouter } from "next/navigation";
import { useOnboarding } from "@/components/providers/onboarding-provider";
import { assemblePayload } from "@/lib/assemble-payload";
import { createCustomer } from "@/services/customer.service";
import { useEffect, useRef, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CompletePage() {
  const router = useRouter();
  const { state, setComplete, reset } = useOnboarding();
  const hasRun = useRef(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    state.signedAgreementId && state.businessDetails && state.addressDetails;

  useEffect(() => {
    if (hasRun.current) return;

    if (!canSubmit) {
      if (!state.signedAgreementId) {
        router.replace("/onboarding/tos");
      } else if (!state.businessDetails) {
        router.replace("/onboarding/business-details");
      } else {
        router.replace("/onboarding/address-details");
      }
      return;
    }

    hasRun.current = true;

    async function submit() {
      try {
        const payload = assemblePayload(
          state.businessDetails!,
          state.addressDetails!,
          state.signedAgreementId!
        );

        await createCustomer(payload);
        setComplete();
        reset();
        router.replace("/dashboard");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to create customer"
        );
      }
    }

    submit();
  }, [canSubmit, state, setComplete, reset, router]);

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
        Creating your account, please wait...
      </p>
    </div>
  );
}
