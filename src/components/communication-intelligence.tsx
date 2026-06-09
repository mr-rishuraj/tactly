"use client";

import { motion } from "framer-motion";

export function CommunicationIntelligence() {
  return (
    <section className="relative py-20 md:py-32 lg:py-40 px-4 md:px-6 lg:px-8 overflow-hidden border-t border-white/5">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24 md:mb-32"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Grammar is a feature</span>
            <br />
            <span className="text-cyan-400">Communication is the goal</span>
          </h2>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto mb-16 md:mb-24">
          {/* Grammar Tools */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest">
              Traditional Grammar Tools
            </p>
            <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/5 to-white/3 p-8 space-y-6">
              <p className="text-lg md:text-xl text-foreground/85 leading-relaxed font-medium">
                "Hey, I wanted to ask a few questions regarding startups."
              </p>
              <div className="space-y-3 pt-6 border-t border-white/10">
                <p className="text-xs text-foreground/50 font-mono">✓ Grammar: Correct</p>
                <p className="text-xs text-foreground/50 font-mono">✓ Spelling: Correct</p>
                <p className="text-xs text-foreground/50 font-mono">✓ Punctuation: Correct</p>
              </div>
            </div>
            <p className="text-sm text-foreground/50 italic font-medium">
              Technically correct. Emotionally neutral. Low impact.
            </p>
          </motion.div>

          {/* Tactly Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xs font-bold text-cyan-400/70 uppercase tracking-widest">
              Tactly
            </p>
            <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8 space-y-6 backdrop-blur-sm">
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-medium">
                "Hey, saw your startup recently got into YC, congrats! I'm a first-year student at BITS Pilani and had a few questions about finding startup ideas. Would love to learn from your experience."
              </p>
              <div className="space-y-3 pt-6 border-t border-cyan-500/20">
                <p className="text-xs text-cyan-400 font-mono">✓ Context Aware: Personalized</p>
                <p className="text-xs text-cyan-400 font-mono">✓ Intent Clear: Strong</p>
                <p className="text-xs text-cyan-400 font-mono">✓ Reply Probability: 87%</p>
              </div>
            </div>
            <p className="text-sm text-cyan-400/70 italic font-medium">
              Personalized. Confident. High impact.
            </p>
          </motion.div>
        </div>

        {/* Key Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-8 md:p-12 text-center backdrop-blur-sm max-w-3xl mx-auto"
        >
          <p className="text-lg md:text-xl text-foreground/90 mb-4 font-medium">
            Grammar tools fix your sentences.
          </p>
          <p className="text-2xl md:text-3xl font-bold text-cyan-400">
            Tactly improves your outcomes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
