"use client";

import { useState } from "react";
import { Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: "Professional",
    bio: "Communication enthusiast passionate about writing with tact.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving profile:", formData);
    setIsEditing(false);
    // TODO: Implement actual save logic
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      role: "Professional",
      bio: "Communication enthusiast passionate about writing with tact.",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your public profile and personal information
        </p>
      </div>

      {/* Profile Header Card */}
      <Card variant="elevated" padding="md">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                This is your public profile that others can see
              </CardDescription>
            </div>
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Edit size={16} />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-white">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Profile Picture
              </p>
              <p className="text-xs text-muted-foreground">
                Avatar generated from your name
              </p>
            </div>
          </div>

          {/* Form Fields */}
          {isEditing ? (
            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  size="lg"
                />
              </div>

              {/* Email - Read Only */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                  size="lg"
                  className="opacity-70"
                />
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Role / Title</Label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full h-9 px-3 py-2 rounded-lg border border-input bg-input/30 dark:bg-input/20 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-input dark:focus:ring-primary/40"
                >
                  <option value="Professional">Professional</option>
                  <option value="Student">Student</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  className="w-full h-24 px-3 py-2 rounded-lg border border-input bg-input/30 dark:bg-input/20 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none dark:border-input"
                />
                <p className="text-xs text-muted-foreground">
                  {formData.bio.length}/160 characters
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Full Name
                </p>
                <p className="text-base text-foreground mt-1">{formData.name}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Email
                </p>
                <p className="text-base text-foreground mt-1">{formData.email}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Role / Title
                </p>
                <p className="text-base text-foreground mt-1">{formData.role}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Bio
                </p>
                <p className="text-base text-foreground mt-1">{formData.bio}</p>
              </div>
            </div>
          )}
        </CardContent>

        {isEditing && (
          <CardFooter className="gap-3">
            <Button onClick={handleSave} className="gap-2">
              <Save size={16} />
              Save Changes
            </Button>
            <Button onClick={handleCancel} variant="outline">
              <X size={16} />
              Cancel
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Communication Preferences */}
      <Card variant="elevated" padding="md">
        <CardHeader>
          <CardTitle>Communication Preferences</CardTitle>
          <CardDescription>
            Configure how you prefer to communicate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <p className="text-sm font-medium text-foreground mb-1">Tone</p>
              <p className="text-lg font-semibold text-cyan-400">
                Professional & Warm
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Your current communication tone
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <p className="text-sm font-medium text-foreground mb-1">Formality Level</p>
              <p className="text-lg font-semibold text-blue-400">
                Medium
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Balanced between formal and casual
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connected Accounts - Placeholder */}
      <Card variant="elevated" padding="md">
        <CardHeader>
          <CardTitle>Connected Services</CardTitle>
          <CardDescription>
            Platforms where Tactly assists you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
              <div>
                <p className="text-sm font-medium text-foreground">Chrome Extension</p>
                <p className="text-xs text-muted-foreground">
                  Not installed yet
                </p>
              </div>
              <Button variant="outline" size="sm">
                Install
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
              <div>
                <p className="text-sm font-medium text-foreground">Gmail</p>
                <p className="text-xs text-muted-foreground">
                  Not connected
                </p>
              </div>
              <Button variant="outline" size="sm">
                Connect
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
              <div>
                <p className="text-sm font-medium text-foreground">LinkedIn</p>
                <p className="text-xs text-muted-foreground">
                  Not connected
                </p>
              </div>
              <Button variant="outline" size="sm">
                Connect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
