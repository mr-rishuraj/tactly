"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingProvider, useOnboarding } from "@/contexts/onboarding-context";
import { OnboardingProgress } from "@/components/onboarding-progress";
import {
  StepWelcome,
  StepToneProfile,
  StepCommunicationGoals,
  StepWritingSamples,
  StepReview,
} from "@/components/onboarding-steps";

function OnboardingContent() {
  const { currentStep, isComplete } = useOnboarding();
  const router = useRouter();

  useEffect(() => {
    if (isComplete) {
      router.push("/dashboard");
    }
  }, [isComplete, router]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepWelcome />;
      case 2:
        return <StepToneProfile />;
      case 3:
        return <StepCommunicationGoals />;
      case 4:
        return <StepWritingSamples />;
      case 5:
        return <StepReview />;
      default:
        return <StepWelcome />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
          <OnboardingProgress />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full">
          {renderStep()}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border py-4 px-4 text-center">
        <p className="text-xs text-muted-foreground">
          Tactly • Communication Intelligence
        </p>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
}
