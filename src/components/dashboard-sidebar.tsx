"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, User, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = () => {
    onClose();
    logout();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card transition-transform duration-300 z-40 md:translate-x-0 md:sticky md:top-16 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-4">
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 p-1 hover:bg-muted rounded-lg"
            aria-label="Close sidebar"
          >
            <X size={20} className="text-foreground" />
          </button>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2 mt-8 md:mt-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button at Bottom */}
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
