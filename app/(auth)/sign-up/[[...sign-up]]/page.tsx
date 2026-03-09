"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center">
      <SignUp forceRedirectUrl="/onboarding/tos" />
    </div>
  );
}
