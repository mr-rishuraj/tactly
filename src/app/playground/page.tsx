"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
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
        {/* Hero */}
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 px-4 md:px-6 lg:px-8 overflow-hidden">
          {/* Background glows */}
          <motion.div
            className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-3xl pointer-events-none"
            animate={{ y: [0, 25, 0], opacity: [0.08, 0.12, 0.08] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-blue-500/6 rounded-full blur-3xl pointer-events-none"
            animate={{ y: [0, -25, 0], opacity: [0.06, 0.1, 0.06] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-8"
            >
              <Sparkles size={12} />
              Playground — No Extension Needed
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="block text-foreground">Experience Tactly</span>
              <span className="block text-cyan-400">right now.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Paste any message. Pick a tone. Watch Tactly transform your communication in seconds — no install required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                Get Early Access
                <ArrowRight size={16} />
              </button>
              <a
                href="#playground"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/50 hover:text-cyan-400 transition-colors"
              >
                Skip to playground ↓
              </a>
            </motion.div>
          </div>
        </section>

        {/* Section 1 — Showcase */}
        <ShowcaseSection />

        {/* Section 2 — Interactive Playground */}
        <div id="playground">
          <PlaygroundSection />
        </div>

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
