"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, Radio } from "@/components/ui/radio";
import { useOnboarding, type CommunicationGoal } from "@/contexts/onboarding-context";

const TONE_PROFILES = [
  {
    id: "friendly",
    label: "Friendly",
    description: "Warm, approachable, conversational",
  },
  {
    id: "professional",
    label: "Professional",
    description: "Formal, business-appropriate, concise",
  },
  {
    id: "bold",
    label: "Bold",
    description: "Confident, direct, impactful",
  },
  {
    id: "creative",
    label: "Creative",
    description: "Imaginative, unique, engaging",
  },
];

const COMMUNICATION_GOALS: { id: CommunicationGoal; label: string }[] = [
  { id: "LinkedIn", label: "LinkedIn Posts & Messages" },
  { id: "Email", label: "Professional Email" },
  { id: "Gmail", label: "Gmail & Inbox" },
  { id: "Slack", label: "Slack Messages" },
  { id: "Discord", label: "Discord & Communities" },
  { id: "Twitter", label: "Twitter/X Posts" },
];

export function StepWelcome() {
  const { data, updateData, nextStep } = useOnboarding();
  const [name, setName] = useState(data.name);
  const [pitch, setPitch] = useState("");

  const handleNext = () => {
    if (name.trim()) {
      updateData({ name: name.trim() });
      nextStep();
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome to Tactly</CardTitle>
        <CardDescription>Let's get to know you better</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            label="Your Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Input
            label="Short Pitch (Optional)"
            placeholder="Tell us what you do in one sentence"
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            helperText="Help us personalize your experience"
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            variant="default"
            size="default"
            onClick={handleNext}
            disabled={!name.trim()}
            className="flex-1"
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function StepToneProfile() {
  const { data, updateData, nextStep, prevStep } = useOnboarding();
  const [selectedTone, setSelectedTone] = useState(data.toneProfile);
  const [customTone, setCustomTone] = useState("");
  const [showCustom, setShowCustom] = useState(!TONE_PROFILES.some((p) => p.id === data.toneProfile));

  const handleNext = () => {
    const tone = showCustom && customTone.trim() ? customTone.trim() : selectedTone;
    if (tone) {
      updateData({ toneProfile: tone });
      nextStep();
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Your Communication Tone</CardTitle>
        <CardDescription>Choose how you prefer to sound</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {TONE_PROFILES.map((profile) => (
            <label
              key={profile.id}
              className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => {
                setSelectedTone(profile.id);
                setShowCustom(false);
              }}
            >
              <input
                type="radio"
                name="tone"
                value={profile.id}
                checked={selectedTone === profile.id && !showCustom}
                onChange={() => {
                  setSelectedTone(profile.id);
                  setShowCustom(false);
                }}
                className="mt-1"
              />
              <div className="flex-1">
                <p className="font-medium text-foreground">{profile.label}</p>
                <p className="text-sm text-muted-foreground">{profile.description}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="border-t border-border pt-4">
          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showCustom}
              onChange={(e) => setShowCustom(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Custom tone</span>
          </label>
          {showCustom && (
            <Input
              placeholder="Describe your preferred tone..."
              value={customTone}
              onChange={(e) => setCustomTone(e.target.value)}
            />
          )}
        </div>

        <div className="flex gap-2 pt-4">
          <Button variant="outline" size="default" onClick={prevStep} className="flex-1">
            Back
          </Button>
          <Button
            variant="default"
            size="default"
            onClick={handleNext}
            disabled={!selectedTone && !customTone.trim()}
            className="flex-1"
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function StepCommunicationGoals() {
  const { data, updateData, nextStep, prevStep } = useOnboarding();
  const [selectedGoals, setSelectedGoals] = useState<CommunicationGoal[]>(data.communicationGoals);

  const toggleGoal = (goal: CommunicationGoal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleNext = () => {
    if (selectedGoals.length > 0) {
      updateData({ communicationGoals: selectedGoals });
      nextStep();
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Communication Goals</CardTitle>
        <CardDescription>Where do you want to improve your writing?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {COMMUNICATION_GOALS.map((goal) => (
            <label
              key={goal.id}
              className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedGoals.includes(goal.id)}
                onChange={() => toggleGoal(goal.id)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">{goal.label}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-2 pt-4">
          <Button variant="outline" size="default" onClick={prevStep} className="flex-1">
            Back
          </Button>
          <Button
            variant="default"
            size="default"
            onClick={handleNext}
            disabled={selectedGoals.length === 0}
            className="flex-1"
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function StepWritingSamples() {
  const { data, updateData, nextStep, prevStep } = useOnboarding();
  const [samples, setSamples] = useState(data.writingSamples);
  const [skipped, setSkipped] = useState(!data.writingSamples);

  const handleNext = () => {
    updateData({ writingSamples: samples });
    nextStep();
  };

  const handleSkip = () => {
    updateData({ writingSamples: "" });
    nextStep();
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Writing Samples (Optional)</CardTitle>
        <CardDescription>
          Share examples of your writing to help us personalize better
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <textarea
            placeholder="Paste a sample email, message, or post..."
            value={samples}
            onChange={(e) => setSamples(e.target.value)}
            className="w-full h-32 p-3 border border-input bg-input/30 rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none"
          />
          <p className="text-xs text-muted-foreground">
            A few sentences is enough. We won't store this data beyond your session.
          </p>
        </div>

        <div className="flex gap-2 pt-4">
          <Button variant="outline" size="default" onClick={prevStep} className="flex-1">
            Back
          </Button>
          <Button
            variant="outline"
            size="default"
            onClick={handleSkip}
            className="flex-1"
          >
            Skip
          </Button>
          <Button
            variant="default"
            size="default"
            onClick={handleNext}
            disabled={!samples.trim() && !skipped}
            className="flex-1"
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function StepReview() {
  const { data, completeOnboarding, prevStep } = useOnboarding();

  const handleComplete = () => {
    completeOnboarding();
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">You're All Set!</CardTitle>
        <CardDescription>Review your preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="border-b border-border pb-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Name</p>
            <p className="text-lg font-medium">{data.name}</p>
          </div>

          <div className="border-b border-border pb-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Tone Profile</p>
            <p className="text-lg font-medium capitalize">{data.toneProfile}</p>
          </div>

          <div className="border-b border-border pb-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Communication Goals</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.communicationGoals.map((goal) => (
                <span
                  key={goal}
                  className="px-3 py-1 text-sm font-medium bg-primary/20 text-primary rounded-full"
                >
                  {goal}
                </span>
              ))}
            </div>
          </div>

          {data.writingSamples && (
            <div className="border-b border-border pb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Writing Sample</p>
              <p className="text-sm text-foreground mt-2 line-clamp-3">{data.writingSamples}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4">
          <Button variant="outline" size="default" onClick={prevStep} className="flex-1">
            Back
          </Button>
          <Button variant="default" size="default" onClick={handleComplete} className="flex-1">
            Start Using Tactly
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
