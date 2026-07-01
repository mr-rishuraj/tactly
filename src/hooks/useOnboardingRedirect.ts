import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export function useOnboardingRedirect() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading || !user) return;

    // Check if user is already on onboarding page
    if (pathname.includes("/onboarding")) return;

    // Check if onboarding is complete
    const isOnboardingComplete =
      typeof window !== "undefined" &&
      localStorage.getItem("tactly_onboarding_complete") === "true";

    // If not onboarded, redirect to onboarding
    if (!isOnboardingComplete && !pathname.includes("/onboarding")) {
      router.push("/onboarding");
    }
  }, [user, isLoading, pathname, router]);
}
