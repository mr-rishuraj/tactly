"use client";

import { useOnboarding } from "@/contexts/onboarding-context";

const STEP_LABELS = ["Welcome", "Tone Profile", "Goals", "Writing Samples", "Review"];

export function OnboardingProgress() {
  const { currentStep } = useOnboarding();

  const progress = (currentStep / 5) * 100;

  return (
    <div className="w-full space-y-4">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            Step {currentStep} of 5
          </span>
          <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between gap-2 mt-6">
        {STEP_LABELS.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isComplete = stepNumber < currentStep;

          return (
            <div
              key={stepNumber}
              className="flex flex-col items-center gap-1 flex-1"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/50"
                    : isComplete
                      ? "bg-primary/30 text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {isComplete ? "✓" : stepNumber}
              </div>
              <span
                className={`text-xs hidden sm:block text-center ${
                  isActive ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
