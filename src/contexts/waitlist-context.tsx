"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface WaitlistContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <WaitlistContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (context === undefined) {
    throw new Error("useWaitlist must be used within WaitlistProvider");
  }
  return context;
}
