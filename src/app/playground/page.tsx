"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ShowcaseSection } from "@/components/playground/showcase-section";
import { PlaygroundSection } from "@/components/playground/playground-section";
import { useWaitlist } from "@/contexts/waitlist-context";

export default function PlaygroundPage() {
  const { openModal } = useWaitlist();

  return (
    <div className="w-full bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero = the interactive playground itself */}
        <PlaygroundSection hero />

        {/* Real examples */}
        <ShowcaseSection />

        {/* Bottom CTA */}
        <section className="relative py-16 md:py-20 px-4 md:px-6 lg:px-8 border-t border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/3 to-transparent pointer-events-none" />
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight text-foreground">
                Like what you see?
              </h2>
              <p className="text-foreground/50 text-sm md:text-base mb-8 leading-relaxed">
                The full Tactly extension works inline — inside LinkedIn, Gmail, X, Slack, and everywhere you communicate. No copy-paste required.
              </p>
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-base transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95"
              >
                <Sparkles size={18} />
                Join the Waitlist
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
