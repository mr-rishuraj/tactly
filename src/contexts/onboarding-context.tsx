"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export type CommunicationGoal = "LinkedIn" | "Email" | "Gmail" | "Slack" | "Discord" | "Twitter";

export interface OnboardingData {
  name: string;
  toneProfile: string;
  communicationGoals: CommunicationGoal[];
  writingSamples: string;
}

interface OnboardingContextType {
  currentStep: number;
  data: OnboardingData;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (stepData: Partial<OnboardingData>) => void;
  completeOnboarding: () => void;
  isComplete: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const INITIAL_DATA: OnboardingData = {
  name: "",
  toneProfile: "",
  communicationGoals: [],
  writingSamples: "",
};

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);
  const [isComplete, setIsComplete] = useState(false);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const updateData = useCallback((stepData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...stepData }));
  }, []);

  const completeOnboarding = useCallback(() => {
    // Save to localStorage
    const onboardingData = {
      ...data,
      completedAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("tactly_onboarding", JSON.stringify(onboardingData));
      localStorage.setItem("tactly_onboarding_complete", "true");
    }

    setIsComplete(true);
  }, [data]);

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        data,
        nextStep,
        prevStep,
        updateData,
        completeOnboarding,
        isComplete,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
}
