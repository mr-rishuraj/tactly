"use client";

import Link from "next/link";
import {
  DownloadCloud,
  Edit,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import { useOnboardingRedirect } from "@/hooks/useOnboardingRedirect";

export default function DashboardPage() {
  const { user } = useAuth();
  useOnboardingRedirect();

  const recentActivities = [
    {
      id: 1,
      action: "Edited tone profile",
      timestamp: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      action: "Chrome extension installed",
      timestamp: "1 day ago",
      status: "completed",
    },
    {
      id: 3,
      action: "Updated communication preferences",
      timestamp: "3 days ago",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Welcome back, {user?.name?.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground">
          Your AI communication copilot is ready to help you write with tact.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Extension Status Card */}
        <Card variant="elevated" padding="md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Extension Status</span>
              <AlertCircle size={20} className="text-amber-500" />
            </CardTitle>
            <CardDescription>
              Chrome extension installation status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                The Tactly extension is not currently installed in your browser.
              </p>
              <Badge variant="outline" className="bg-amber-500/10 border-amber-500/30">
                Not Installed
              </Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="#" className="w-full">
              <Button variant="default" size="sm" className="w-full">
                <DownloadCloud size={16} />
                Download
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Tone Profile Card */}
        <Card variant="elevated" padding="md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Tone Profile</span>
              <Zap size={20} className="text-cyan-500" />
            </CardTitle>
            <CardDescription>
              Your current communication tone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Current Tone</p>
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                  Professional & Warm
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Strikes a balance between professionalism and approachability in all communications.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/profile" className="w-full">
              <Button variant="outline" size="sm" className="w-full">
                <Edit size={16} />
                Edit Tone
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Personalization Card */}
        <Card variant="elevated" padding="md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Personalization</span>
              <CheckCircle2 size={20} className="text-green-500" />
            </CardTitle>
            <CardDescription>
              Customize your communication style
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Set preferences for how Tactly should assist you across different platforms.
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>✓ LinkedIn enabled</p>
                <p>✓ Email enabled</p>
                <p>✓ Slack disabled</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/settings" className="w-full">
              <Button variant="outline" size="sm" className="w-full">
                Configure
                <ArrowRight size={16} />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Recent Activity Card */}
        <Card variant="elevated" padding="md" className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your recent actions on Tactly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Card */}
      <Card variant="elevated" padding="md">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your profile and account preferences
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/dashboard/settings" className="w-full">
            <Button variant="outline" className="w-full">
              Go to Settings
              <ArrowRight size={16} />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
