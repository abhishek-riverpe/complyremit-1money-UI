"use client";

import { Check } from "lucide-react";
import { ONBOARDING_STEPS } from "@/lib/constants/onboarding";
import type { OnboardingStep } from "@/types/onboarding";
import { cn } from "@/lib/utils";

interface StepperProps {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
}

export function Stepper({ currentStep, completedSteps }: StepperProps) {
  return (
    <div className="flex items-center justify-center w-full max-w-xl mx-auto py-6">
      {ONBOARDING_STEPS.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = completedSteps.includes(step.id);
        const isLast = index === ONBOARDING_STEPS.length - 1;

        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-full border-2 text-sm font-medium transition-colors",
                  isCompleted &&
                    "bg-emerald-500 border-emerald-500 text-white",
                  isActive &&
                    !isCompleted &&
                    "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20",
                  !isActive &&
                    !isCompleted &&
                    "border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.step
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium hidden sm:block",
                  isActive && "text-emerald-600 dark:text-emerald-400",
                  isCompleted && "text-emerald-600 dark:text-emerald-400",
                  !isActive && !isCompleted && "text-slate-400 dark:text-slate-500"
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-3 mt-[-1.25rem] sm:mt-[-0.5rem]",
                  isCompleted ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
