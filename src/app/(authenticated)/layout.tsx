"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { AuthProvider } from "@/contexts/auth-context";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isOnboarding = pathname.includes("/onboarding");

  // Hide navbar and sidebar during onboarding
  if (isOnboarding) {
    return (
      <AuthProvider>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <DashboardNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex pt-16">
          <DashboardSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main Content */}
          <main className="flex-1 px-4 py-8 md:px-6 md:py-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
