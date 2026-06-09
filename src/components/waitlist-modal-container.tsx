"use client";

import { useWaitlist } from "@/contexts/waitlist-context";
import { WaitlistModal } from "./waitlist-modal";

export function WaitlistModalContainer() {
  const { isOpen, closeModal } = useWaitlist();

  return <WaitlistModal isOpen={isOpen} onClose={closeModal} />;
}
