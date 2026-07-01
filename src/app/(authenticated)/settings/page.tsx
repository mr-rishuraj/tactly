"use client";

import { useState } from "react";
import { Save, AlertCircle, Trash2 } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/auth-context";

export default function SettingsPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving settings:", formData);
    // TODO: Implement actual save logic
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your profile and account preferences
        </p>
      </div>

      {/* Profile Section */}
      <Card variant="elevated" padding="md">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
            <p className="text-xs text-muted-foreground">
              Email cannot be changed in this version
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} className="gap-2">
            <Save size={16} />
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      {/* Notification Preferences */}
      <Card variant="elevated" padding="md">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Control how we communicate with you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
            <div>
              <p className="text-sm font-medium text-foreground">
                Email Notifications
              </p>
              <p className="text-xs text-muted-foreground">
                Receive updates about your account
              </p>
            </div>
            <Checkbox defaultChecked />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
            <div>
              <p className="text-sm font-medium text-foreground">
                Feature Updates
              </p>
              <p className="text-xs text-muted-foreground">
                Learn about new Tactly features
              </p>
            </div>
            <Checkbox defaultChecked />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
            <div>
              <p className="text-sm font-medium text-foreground">
                Tips & Best Practices
              </p>
              <p className="text-xs text-muted-foreground">
                Get personalized communication tips
              </p>
            </div>
            <Checkbox />
          </div>
        </CardContent>
      </Card>

      {/* Connected Accounts */}
      <Card variant="elevated" padding="md">
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>
            Manage integrations with other platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Gmail Integration
                </p>
                <p className="text-xs text-muted-foreground">
                  Not connected yet
                </p>
              </div>
              <Button variant="outline" size="sm">
                Connect
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">
                  LinkedIn Integration
                </p>
                <p className="text-xs text-muted-foreground">
                  Not connected yet
                </p>
              </div>
              <Button variant="outline" size="sm">
                Connect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card variant="elevated" padding="md" className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle size={20} />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive font-medium">
              Delete Account
            </p>
            <p className="text-xs text-destructive/70 mt-1">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" size="sm" className="gap-2">
            <Trash2 size={16} />
            Delete Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
