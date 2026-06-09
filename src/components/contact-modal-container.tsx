"use client";

import { ContactModal } from "./contact-modal";
import { ContactProvider } from "@/contexts/contact-context";

export function ContactModalContainer() {
  return (
    <ContactProvider>
      <ContactModal />
    </ContactProvider>
  );
}
