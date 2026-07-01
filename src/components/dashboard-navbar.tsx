"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

interface DashboardNavbarProps {
  onMenuClick: () => void;
}

export function DashboardNavbar({ onMenuClick }: DashboardNavbarProps) {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-card z-40">
      <div className="px-4 h-full flex items-center justify-between">
        {/* Left: Logo + Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} className="text-foreground" />
          </button>

          <Link href="/dashboard" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Tactly"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="hidden sm:inline text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Tactly
            </span>
          </Link>
        </div>

        {/* Right: User Menu */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-foreground">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div className="hidden sm:block min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>

          <Button
            onClick={logout}
            variant="ghost"
            size="sm"
            className="text-sm"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
